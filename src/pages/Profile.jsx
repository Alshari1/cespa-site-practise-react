import { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";



// ── CONFIG ────────────────────────────────────────────────────
// Replace with your actual values
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "djcmjuizm";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || "689812215252213";
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || "GeKRZjaR_vHNxs8RaERjsRGecoA";
const API_BASE = "http://localhost:5000";

// ── HELPERS ───────────────────────────────────────────────────
const SECTORS = ["Industry", "Academia", "Government", "NGO", "Research", "Entrepreneur", "Other"];
const DEGREES = ["B.Sc. Civil Engineering", "B.Sc. Environmental Engineering", "M.Sc. Structural Engineering", "M.Sc. Geotechnical Engineering", "M.Sc. Water Resources", "PhD Civil Engineering", "Other"];

async function sha1(text) {
  const buffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getCloudinarySignature(params) {
  const sorted = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .sort(([a], [b]) => a.localeCompare(b));
  const stringToSign = sorted.map(([key, value]) => `${key}=${value}`).join("&");
  return sha1(`${stringToSign}${CLOUDINARY_API_SECRET}`);
}

async function uploadToCloudinary(file) {
  if (!CLOUDINARY_CLOUD_NAME) throw new Error("Cloudinary cloud name is not configured.");

  const form = new FormData();
  form.append("file", file);

  if (CLOUDINARY_UPLOAD_PRESET) {
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  } else if (CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await getCloudinarySignature({ timestamp });
    form.append("api_key", CLOUDINARY_API_KEY);
    form.append("timestamp", timestamp.toString());
    form.append("signature", signature);
  } else {
    throw new Error("No Cloudinary upload preset or API key/secret configured.");
  }

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Image upload failed: ${body}`);
  }
  const data = await res.json();
  console.log(data.secure_url)
  return data.secure_url; // permanent HTTPS link
}

async function saveProfile(payload) {
  const res = await fetch(`${API_BASE}/alumni`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to save profile");
  return res.json();
}

async function updateProfile(email, payload) {
  const res = await fetch(`${API_BASE}/alumni/${email}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

// fetch a profile by id from backend
async function fetchProfile(email) {
  const res = await fetch(`${API_BASE}/alumni/${email}`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}


// fetch all alumni from the provided endpoint
// async function fetchAllAlumni() {
//   const res = await fetch(`${API_BASE}/alumni`);
//   if (!res.ok) throw new Error("Failed to fetch alumni list");
//   return res.json();
// }

// ── INITIAL FORM STATE ────────────────────────────────────────
const EMPTY = {
  name: "",
  batch: "",
  designation: "",
  company: "",
  location: "",
  sector: "",
  graduation: "",
  degree: "",
  postgrad: "",
  phd: "",
  yearsExp: "",
  email: "",
  facebook: "",
  linkedin: "",
  photoUrl: "",
};

// ── FIELD LABEL MAP ───────────────────────────────────────────

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function Profile() {
  const [mode, setMode] = useState("form"); // "form" | "view"
  const [form, setForm] = useState(EMPTY);
  const [savedId, setSavedId] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [allAlumni, setAllAlumni] = useState([]);
  const [hasProfile, setHasProfile] = useState(false);
  const fileRef = useRef();
  const { user } = useAuth();

  // ── helpers ──
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.batch.trim()) e.batch = "Batch is required";
    if (!form.designation.trim()) e.designation = "Designation is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.graduation.trim()) e.graduation = "Graduation info is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.email) return;
      setForm(f => ({ ...f, email: user.email }));
      try {
        const latest = await fetchProfile(user.email);
        setSavedId(latest._id || latest.id || user.email);
        setForm(latest);
        setImgPreview(latest.photoUrl || null);
        setHasProfile(true);
        setMode("view");
      } catch {
        setHasProfile(false);
        setMode("form");
      }
    };

    loadProfile();
  }, [user]);

  // ── image pick ──
  const onImagePick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("Image must be under 5 MB", "error"); return; }
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  // ── submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      let photoUrl = form.photoUrl;

      if (imgFile) {
        setUploading(true);
        photoUrl = await uploadToCloudinary(imgFile);
        setUploading(false);
        set("photoUrl", photoUrl);
      }

      const payload = {
        role: "alumni",
        photoUrl,
        name: form.name,
        batch: form.batch,
        designation: form.designation,
        company: form.company,
        location: form.location,
        sector: form.sector,
        info: {
          Graduation: form.graduation,
          Degree: form.degree,
          Postgrad: form.postgrad,
          PhD: form.phd,
          "Years Exp.": form.yearsExp,
          "Current Role": form.designation,
        },
        email: form.email,
        facebook: form.facebook,
        linkedin: form.linkedin,
      };
      console.log('clicked for post', savedId)

      if (hasProfile && user?.email) {
        await updateProfile(user.email, payload);
        showToast("Profile updated successfully");
        // fetch latest from DB
        try {
          const latest = await fetchProfile(user.email);
          setSavedId(latest._id || latest.id || user.email);
          setForm(latest);
          setImgPreview(latest.photoUrl || null);
        } catch (err) {
          console.warn("Could not fetch latest profile:", err.message);
        }
      } else {
        const res = await saveProfile(payload);
        const id = res._id || res.id || user?.email;
        setSavedId(id);
        setHasProfile(true);
        showToast("Profile saved successfully");
        // fetch fresh from DB if possible
        if (user?.email) {
          try {
            const latest = await fetchProfile(user.email);
            setSavedId(latest._id || latest.id || user.email);
            setForm(latest);
            setImgPreview(latest.photoUrl || null);
          } catch (err) {
            console.warn("Could not fetch saved profile:", err.message);
          }
        }
      }

      try {
        const list = await fetchAllAlumni();
        setAllAlumni(Array.isArray(list) ? list : []);
      } catch (err) {
        console.warn("Could not fetch alumni list:", err.message);
      }

      setForm(f => ({ ...f, photoUrl }));
      setMode("view");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleEdit = () => setMode("form");

  // Ensure there's a permanent preview link for the image.
  // If the image isn't uploaded yet, upload it first and return the final URL.
  const getLifetimePreview = async () => {
    if (form.photoUrl) return form.photoUrl;
    if (imgFile) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(imgFile);
        set("photoUrl", url);
        // also persist to backend if we have an id
        if (savedId) {
          try {
            await updateProfile(savedId, { ...form, photoUrl: url });
          } catch (err) {
            console.warn("Could not update profile with photoUrl:", err.message);
          }
        }
        return url;
      } finally {
        setUploading(false);
      }
    }
    throw new Error("No image available to generate preview link");
  };

  const handleGeneratePreview = async () => {
    try {
      const link = await getLifetimePreview();
      if (navigator?.clipboard) await navigator.clipboard.writeText(link);
      showToast("Preview link copied to clipboard");
    } catch (err) {
      showToast(err.message || "Could not generate preview link", "error");
    }
  };

  // ── INPUT CLASSES ──
  const inputCls = (k) =>
    `w-full bg-[#f5f2ee] border ${errors[k] ? "border-red-400" : "border-transparent"} 
     focus:border-[#a0724a] focus:bg-white outline-none rounded-sm px-4 py-3 
     font-['Jost'] text-sm text-[#2b3232] placeholder-[#9aabab] transition-colors duration-200`;

  // ─────────────────────────────────────────────────────────────
  // VIEW MODE
  // ─────────────────────────────────────────────────────────────
  if (mode === "view") {
    const photo = imgPreview || form.photoUrl;
    return (
      <div className="min-h-screen bg-[#f0ede8] py-12 px-4 font-['Jost']">
        {toast && <Toast toast={toast} />}

        <div className="max-w-4xl mx-auto">

          {/* ── PROFILE HEADER ── */}
          <div className="bg-[#2b3232] rounded-sm overflow-hidden mb-4">
            <div className="h-28 bg-[#3d5454]" />
            <div className="px-8 pb-8 relative">
              {/* Avatar */}
              <div className="absolute -top-14 left-8">
                {photo ? (
                  <img src={photo} alt={form.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#2b3232]" />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-[#3d5454] border-4 border-[#2b3232] flex items-center justify-center">
                    <span className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#e8e2d9]">
                      {form.name?.charAt(0) || "?"}
                    </span>
                  </div>
                )}
              </div>

              {/* Edit + Photo link buttons */}
              <div className="flex justify-end items-center gap-3 pt-4">
                {(imgPreview || form.photoUrl) && (
                  <button type="button" onClick={async () => {
                    const link = imgPreview || form.photoUrl;
                    try {
                      if (navigator?.clipboard) await navigator.clipboard.writeText(link);
                      showToast('Photo link copied to clipboard');
                    } catch {
                      showToast('Could not copy link', 'error');
                    }
                  }}
                    className="text-xs tracking-[0.15em] uppercase text-[#e8e2d9] bg-[#3d5454] px-4 py-2 rounded-sm hover:bg-[#525b5b] transition-colors">
                    Copy Photo Link
                  </button>
                )}

                <button onClick={handleEdit}
                  className="flex items-center gap-2 bg-[#a0724a] hover:bg-[#b8854f] text-[#e8e2d9] px-5 py-2 rounded-sm text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200">
                  ✎ Edit Profile
                </button>
              </div>

              {/* Name block — offset for avatar */}
              <div className="mt-6">
                <h1 className="font-['Cormorant_Garamond'] text-[#e8e2d9] text-4xl font-medium">
                  {form.name}
                </h1>
                <p className="text-[#a0724a] text-xs tracking-[0.18em] uppercase mt-1 font-medium">
                  {form.designation}{form.company ? ` · ${form.company}` : ""}
                </p>
                <div className="flex flex-wrap gap-4 mt-3">
                  {form.batch && (
                    <span className="text-[#9aabab] text-xs tracking-wide">🎓 {form.batch}</span>
                  )}
                  {form.location && (
                    <span className="text-[#9aabab] text-xs tracking-wide">📍 {form.location}</span>
                  )}
                  {form.sector && (
                    <span className="inline-block bg-[#3d5454] text-[#e8e2d9] text-[10px] tracking-[0.16em] uppercase px-3 py-1 rounded-sm">
                      {form.sector}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── TWO-COL LOWER ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* LEFT: Academic Info */}
            <div className="lg:col-span-2 space-y-4">
              <Card title="Academic Background">
                <InfoGrid rows={[
                  ["Graduation", form.graduation],
                  ["Degree", form.degree],
                  ["Postgraduate", form.postgrad],
                  ["PhD", form.phd],
                  ["Experience", form.yearsExp ? `${form.yearsExp} years` : ""],
                ].filter(([, v]) => v)} />
              </Card>

              <Card title="Professional Info">
                <InfoGrid rows={[
                  ["Designation", form.designation],
                  ["Company", form.company],
                  ["Sector", form.sector],
                  ["Location", form.location],
                ].filter(([, v]) => v)} />
              </Card>
            </div>

            {/* RIGHT: Contact */}
            <div className="space-y-4">
              <Card title="Contact">
                <div className="space-y-3">
                  {form.email && (
                    <a href={`mailto:${form.email}`}
                      className="flex items-center gap-3 text-sm text-[#3d5454] hover:text-[#a0724a] transition-colors">
                      <span className="w-8 h-8 bg-[#f0ede8] rounded-sm flex items-center justify-center text-base">✉</span>
                      <span className="text-xs break-all">{form.email}</span>
                    </a>
                  )}
                  {form.linkedin && (
                    <a href={form.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[#3d5454] hover:text-[#a0724a] transition-colors">
                      <span className="w-8 h-8 bg-[#f0ede8] rounded-sm flex items-center justify-center text-base">in</span>
                      <span className="text-xs">LinkedIn Profile</span>
                    </a>
                  )}
                  {form.facebook && (
                    <a href={form.facebook} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[#3d5454] hover:text-[#a0724a] transition-colors">
                      <span className="w-8 h-8 bg-[#f0ede8] rounded-sm flex items-center justify-center text-base">f</span>
                      <span className="text-xs">Facebook Profile</span>
                    </a>
                  )}
                </div>
              </Card>

              <Card title="Role">
                <span className="inline-block bg-[#3d5454] text-[#e8e2d9] text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
                  Alumni
                </span>
              </Card>
              {allAlumni && allAlumni.length > 0 && (
                <Card title="Alumni (from DB)">
                  <div className="space-y-2 max-h-40 overflow-auto">
                    {allAlumni.map(a => (
                      <div key={a._id || a.id || a.email || a.name} className="text-sm text-[#3d5454]">
                        <div className="font-medium">{a.name || a.fullName || a.email}</div>
                        <div className="text-xs text-[#9aabab]">{a.company || a.designation || ''}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // FORM MODE
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f0ede8] py-12 px-4 font-['Jost']">
      {toast && <Toast toast={toast} />}

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#a0724a] mb-1">
              Alumni · CESPA
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-[#2b3232] text-4xl font-medium">
              {savedId ? "Edit Your Profile" : "Complete Your Profile"}
            </h1>
          </div>
          {savedId && (
            <button type="button" onClick={() => setMode("view")}
              className="text-xs tracking-[0.15em] uppercase text-[#3d5454] border border-[#3d5454]/30 px-4 py-2 rounded-sm hover:border-[#3d5454] transition-colors">
              View Profile
            </button>
          )}
        </div>

        {/* ── PHOTO UPLOAD ── */}
        <FormSection title="Profile Photo">
          <div className="flex items-center gap-6">
            <div className="relative">
              {imgPreview || form.photoUrl ? (
                <img src={imgPreview || form.photoUrl} alt="preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#a0724a]/30" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#3d5454] flex items-center justify-center">
                  <span className="font-['Cormorant_Garamond'] text-3xl text-[#e8e2d9]">
                    {form.name?.charAt(0) || "?"}
                  </span>
                </div>
              )}
            </div>
            <div>
              <button type="button" onClick={() => fileRef.current.click()}
                className="bg-[#2b3232] hover:bg-[#3d5454] text-[#e8e2d9] px-5 py-2.5 rounded-sm text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 mb-2 block">
                {imgPreview ? "Change Photo" : "Upload Photo"}
              </button>
              <p className="text-[#9aabab] text-xs">JPG, PNG · Max 5 MB · Uploaded to Cloudinary (permanent link)</p>
              <div className="mt-2">
                <button type="button" onClick={handleGeneratePreview}
                  className="text-xs tracking-[0.12em] uppercase text-[#3d5454] border border-[#3d5454]/20 px-3 py-1 rounded-sm hover:bg-[#f7f5f3] transition-colors">
                  Generate Preview Link
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImagePick} />
            </div>
          </div>
        </FormSection>

        {/* ── PERSONAL INFO ── */}
        <FormSection title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name *" error={errors.name}>
              <input className={inputCls("name")} placeholder="Dr. Rafiqul Islam"
                value={form.name} onChange={e => set("name", e.target.value)} />
            </Field>
            <Field label="Batch *" error={errors.batch}>
              <input className={inputCls("batch")} placeholder="GSTU CE '08"
                value={form.batch} onChange={e => set("batch", e.target.value)} />
            </Field>
            <Field label="Email Address *" error={errors.email}>
              <input type="email" className={inputCls("email")} placeholder="you@example.com"
                value={form.email} onChange={e => set("email", e.target.value)} />
            </Field>
            <Field label="Location">
              <input className={inputCls("location")} placeholder="Dhaka, Bangladesh"
                value={form.location} onChange={e => set("location", e.target.value)} />
            </Field>
          </div>
        </FormSection>

        {/* ── PROFESSIONAL ── */}
        <FormSection title="Professional Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Current Designation *" error={errors.designation}>
              <input className={inputCls("designation")} placeholder="Senior Structural Engineer"
                value={form.designation} onChange={e => set("designation", e.target.value)} />
            </Field>
            <Field label="Company / Organisation">
              <input className={inputCls("company")} placeholder="AECOM Bangladesh"
                value={form.company} onChange={e => set("company", e.target.value)} />
            </Field>
            <Field label="Sector">
              <select className={inputCls("sector")}
                value={form.sector} onChange={e => set("sector", e.target.value)}>
                <option value="">Select sector</option>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Years of Experience">
              <input type="number" min="0" max="60" className={inputCls("yearsExp")} placeholder="16"
                value={form.yearsExp} onChange={e => set("yearsExp", e.target.value)} />
            </Field>
          </div>
        </FormSection>

        {/* ── ACADEMIC ── */}
        <FormSection title="Academic Background">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Graduation University & Year *" error={errors.graduation}>
              <input className={inputCls("graduation")} placeholder="KUET, 2008"
                value={form.graduation} onChange={e => set("graduation", e.target.value)} />
            </Field>
            <Field label="Degree">
              <select className={inputCls("degree")}
                value={form.degree} onChange={e => set("degree", e.target.value)}>
                <option value="">Select degree</option>
                {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Postgraduate (if any)">
              <input className={inputCls("postgrad")} placeholder="M.Sc. Structural Eng., BUET"
                value={form.postgrad} onChange={e => set("postgrad", e.target.value)} />
            </Field>
            <Field label="PhD (if any)">
              <input className={inputCls("phd")} placeholder="Tokyo University, 2015"
                value={form.phd} onChange={e => set("phd", e.target.value)} />
            </Field>
          </div>
        </FormSection>

        {/* ── SOCIAL LINKS ── */}
        <FormSection title="Social Links">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="LinkedIn URL">
              <input className={inputCls("linkedin")} placeholder="https://linkedin.com/in/..."
                value={form.linkedin} onChange={e => set("linkedin", e.target.value)} />
            </Field>
            <Field label="Facebook URL">
              <input className={inputCls("facebook")} placeholder="https://facebook.com/..."
                value={form.facebook} onChange={e => set("facebook", e.target.value)} />
            </Field>
          </div>
        </FormSection>

        {/* ── SUBMIT ── */}
        <div className="flex items-center justify-between pt-2 pb-10">
          <p className="text-[#9aabab] text-xs">* Required fields</p>
          <button type="submit" disabled={saving}
            className="bg-[#2b3232] hover:bg-[#3d5454] disabled:opacity-60 text-[#e8e2d9] px-10 py-3.5 rounded-sm text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200 flex items-center gap-2">
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#e8e2d9]/40 border-t-[#e8e2d9] rounded-full animate-spin" />
                {uploading ? "Uploading image…" : "Saving…"}
              </>
            ) : (
              savedId ? "Update Profile" : "Save Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── SMALL REUSABLE COMPONENTS ─────────────────────────────────

function FormSection({ title, children }) {
  return (
    <div className="bg-white rounded-sm overflow-hidden">
      <div className="px-6 py-3.5 border-b border-[#f0ede8]">
        <h2 className="font-['Jost'] text-[10px] font-medium tracking-[0.2em] uppercase text-[#a0724a]">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block font-['Jost'] text-xs font-medium tracking-[0.12em] uppercase text-[#3d5454] mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-[#f0ede8]">
        <h3 className="font-['Jost'] text-[10px] font-medium tracking-[0.2em] uppercase text-[#a0724a]">
          {title}
        </h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoGrid({ rows }) {
  return (
    <dl className="space-y-3">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-start gap-3">
          <dt className="font-['Jost'] text-[10px] font-medium tracking-[0.14em] uppercase text-[#9aabab] w-28 shrink-0 pt-0.5">
            {label}
          </dt>
          <dd className="text-[#2b3232] text-sm font-light">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Toast({ toast }) {
  const isError = toast.type === "error";
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-sm shadow-lg
      ${isError ? "bg-red-50 border border-red-200 text-red-700" : "bg-[#2b3232] text-[#e8e2d9]"}
      font-['Jost'] text-xs tracking-wide transition-all duration-300`}>
      <span>{isError ? "✕" : "✓"}</span>
      {toast.msg}
    </div>
  );
}