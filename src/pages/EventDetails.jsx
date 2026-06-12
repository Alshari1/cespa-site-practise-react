// src/pages/EventDetailPage.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_BASE = "http://localhost:5000";

// ── MOCK (remove when API ready) ──────────────────────────────
const MOCK = {
  id: "cespa-event-001",
  card_info: {
    title: "National Concrete Olympiad 2025",
    category: "Competition",
    date: "2025-08-15",
    status: "upcoming",
    excerpt: "CESPA sends its strongest team yet to the national concrete mix design competition held in Dhaka. Open registration for all CE students.",
    bannerImageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
    location: "BUET, Dhaka",
  },
  about: {
    descriptions: [
      "The National Concrete Olympiad is Bangladesh's premier inter-university concrete mix design competition, bringing together civil engineering students from across the country to compete in structural innovation, material science, and real-world problem solving.",
      "CESPA has been a consistent participant since 2018, and this year fields its most prepared delegation to date. Members have undergone six weeks of intensive preparation under the guidance of faculty advisors and industry mentors.",
      "The competition evaluates teams on mix design efficiency, compressive strength outcomes, cost optimisation, and presentation quality before a panel of judges from BUET, CUET, and leading construction firms.",
    ],
  },
  timeline: [
    { time: "08:00 AM", title: "Registration & Arrival", description: "Participants check in at Gate 3, BUET campus. Kit distribution and briefing." },
    { time: "09:30 AM", title: "Opening Ceremony", description: "Welcome address by the chief guest and competition overview by the chief judge." },
    { time: "10:00 AM", title: "Mix Design Phase", description: "Teams begin the 90-minute mix design and batching phase in assigned labs." },
    { time: "12:00 PM", title: "Lunch Break", description: "Provided for all participants and accompanying faculty." },
    { time: "01:00 PM", title: "Testing & Evaluation", description: "Specimens are tested for slump, air content, and early compressive strength." },
    { time: "03:30 PM", title: "Presentation Round", description: "Each team presents their design rationale to the judging panel (10 minutes each)." },
    { time: "05:00 PM", title: "Awards Ceremony", description: "Results announced. Top three teams receive trophies and prize money." },
  ],
  event_gallery: [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    "https://images.unsplash.com/photo-1560523159-4a9692d222ef?w=800&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  ],
  event_committee: {
    leader: {
      name: "Dr. Rafiqul Islam",
      role: "Event Director",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    members: [
      { name: "Fatema Khanam",   role: "Logistics Head",   photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
      { name: "Reza Ahmed",      role: "Technical Lead",   photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
      { name: "Nusrat Jahan",    role: "Registration",     photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80" },
      { name: "Tanvir Hossain",  role: "Media & Comms",    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80" },
    ],
  },
  event_info: {
    organizer:   "CESPA, GSTU",
    venue:       "Department of Civil Engineering, BUET, Dhaka",
    event_type:  "Inter-university Competition",
    partner:     "Bangladesh Concrete Institute",
    coordinator: "Eng. Shahriar Kabir",
    status:      "upcoming",
    description: "Registrations close 3 August 2025. Teams of 3–4 members. Faculty clearance required.",
  },
};

// ── HELPERS ───────────────────────────────────────────────────
function formatDate(str) {
  return new Date(str).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function daysLabel(str) {
  const d = Math.ceil((new Date(str) - new Date()) / 86400000);
  if (d < 0)  return "Event ended";
  if (d === 0) return "Today";
  if (d === 1) return "Tomorrow";
  return `${d} days away`;
}

// ── SKELETON ──────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="min-h-screen bg-[#f0ede8] animate-pulse">
      <div className="h-[70vh] bg-[#2b3232]" />
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-3 bg-[#e8e2d9] rounded ${i === 3 ? "w-1/2" : "w-full"}`} />
          ))}
        </div>
        <div className="h-64 bg-[#e8e2d9] rounded-sm" />
      </div>
    </div>
  );
}

// ── NOT FOUND ─────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0ede8] flex flex-col items-center justify-center font-['Jost'] px-4">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#c9d4d4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-5">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <h2 className="font-['Cormorant_Garamond'] text-[#2b3232] text-3xl font-medium mb-2">Event not found</h2>
      <p className="text-sm text-[#9aabab] mb-8">This event may have been removed or the link is incorrect.</p>
      <Link to="/events" className="text-[10px] tracking-[0.2em] uppercase text-[#a0724a] border border-[#a0724a]/40 px-5 py-2.5 rounded-sm hover:bg-[#a0724a]/5 transition-colors">
        ← Back to Events
      </Link>
    </div>
  );
}

// ── SECTION WRAPPER ───────────────────────────────────────────
function Section({ label, title, children, className = "" }) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="mb-8">
        {label && (
          <p className="text-[9px] font-medium tracking-[0.28em] uppercase text-[#a0724a] font-['Jost'] mb-2">{label}</p>
        )}
        {title && (
          <h2 className="font-['Cormorant_Garamond'] text-[#2b3232] text-3xl font-light">{title}</h2>
        )}
        <div className="w-10 h-0.5 bg-[#a0724a] mt-3" />
      </div>
      {children}
    </section>
  );
}

// ── INFO ROW ──────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#f0ede8] last:border-0">
      <div className="w-7 h-7 bg-[#f5f2ee] rounded-sm flex items-center justify-center shrink-0 mt-0.5 text-[#3d5454]">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-[#9aabab] font-['Jost'] mb-0.5">{label}</p>
        <p className="text-xs text-[#2b3232] font-['Jost'] leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

// ── REGISTER MODAL ────────────────────────────────────────────
function RegisterModal({ event, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", studentId: "", batch: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.studentId) { setErr("Please fill all required fields."); return; }
    setSending(true);
    try {
      await fetch(`${API_BASE}/api/events/${event.id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eventId: event.id }),
      });
      setDone(true);
    } catch {
      setErr("Registration failed. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputCls = "w-full bg-[#f5f2ee] border border-transparent focus:border-[#a0724a] focus:bg-white outline-none rounded-sm px-3 py-2.5 text-sm text-[#2b3232] placeholder-[#c9d4d4] transition-colors font-['Jost']";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-md font-['Jost'] overflow-hidden"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-[#2b3232] px-6 py-5 flex items-start justify-between">
          <div>
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#a0724a] mb-1">Registration</p>
            <h3 className="font-['Cormorant_Garamond'] text-[#e8e2d9] text-xl font-medium leading-snug">
              {event.card_info.title}
            </h3>
            <p className="text-[10px] text-[#9aabab] mt-1">{formatDate(event.card_info.date)}</p>
          </div>
          <button onClick={onClose} className="text-[#9aabab] hover:text-[#e8e2d9] transition-colors mt-1 shrink-0 ml-4">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {done ? (
          <div className="px-6 py-12 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-[#2b3232] text-xl font-medium mb-2">You're registered!</h4>
            <p className="text-xs text-[#6a7878] leading-relaxed mb-6">
              We'll send confirmation details to <strong>{form.email}</strong>. See you at the event.
            </p>
            <button onClick={onClose}
              className="text-[10px] tracking-[0.18em] uppercase text-[#a0724a] border border-[#a0724a]/40 px-5 py-2 rounded-sm hover:bg-[#a0724a]/5 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {err && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-sm">{err}</p>}
            {[
              { k: "name",      label: "Full Name *",      type: "text",  ph: "Your full name" },
              { k: "email",     label: "Email Address *",  type: "email", ph: "you@example.com" },
              { k: "studentId", label: "Student ID *",     type: "text",  ph: "e.g. 2001012" },
              { k: "batch",     label: "Batch",            type: "text",  ph: "e.g. CE '22" },
            ].map(f => (
              <div key={f.k}>
                <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-[#3d5454] mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.ph} className={inputCls}
                  value={form[f.k]} onChange={e => set(f.k, e.target.value)} />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 text-xs tracking-[0.14em] uppercase text-[#9aabab] border border-[#e8e2d9] rounded-sm hover:border-[#9aabab] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={sending}
                className="flex-1 py-2.5 text-xs tracking-[0.14em] uppercase bg-[#a0724a] hover:bg-[#b8854f] disabled:opacity-60 text-white rounded-sm transition-colors flex items-center justify-center gap-2">
                {sending && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {sending ? "Submitting…" : "Register Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function EventDetailPage() {
  const { id }                      = useParams();
  const navigate                    = useNavigate();
  const [event, setEvent]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [notFound, setNotFound]     = useState(false);
  const [showModal, setShowModal]   = useState(false);
  const [lightbox, setLightbox]     = useState(null); // image src
  const galleryRef                  = useRef();

  // ── fetch ──
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE}/api/blogs/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setEvent(data))
      .catch(() => {
        // use mock in dev
        if (MOCK.id === id || true) { setEvent(MOCK); }
        else { setNotFound(true); }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ── gallery drag scroll ──
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const onMouseDown = (e) => {
    dragState.current = { active: true, startX: e.pageX - galleryRef.current.offsetLeft, scrollLeft: galleryRef.current.scrollLeft };
  };
  const onMouseMove = (e) => {
    if (!dragState.current.active) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    galleryRef.current.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX) * 1.5;
  };
  const onMouseUp = () => { dragState.current.active = false; };

  if (loading) return <Skeleton />;
  if (notFound || !event) return <NotFound />;

  const { card_info, about, timeline, event_gallery, event_committee, event_info } = event;
  const isUpcoming = card_info.status === "upcoming";

  return (
    <div className="min-h-screen bg-[#f0ede8] font-['Jost']">

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-w-4xl max-h-[90vh] object-contain rounded-sm" />
          <button className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      {/* ── REGISTER MODAL ── */}
      {showModal && <RegisterModal event={event} onClose={() => setShowModal(false)} />}

      {/* ══ HERO ══════════════════════════════════════ */}
      <div className="relative h-[72vh] min-h-[500px] overflow-hidden">
        <img src={card_info.bannerImageUrl} alt={card_info.title}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2626] via-[#1a2626]/50 to-transparent" />

        {/* back button */}
        <div className="absolute top-6 left-6 z-10">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-[#e8e2d9]/70 hover:text-[#e8e2d9] transition-colors bg-black/20 backdrop-blur-sm px-3 py-2 rounded-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Events
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-12 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[9px] font-medium tracking-[0.22em] uppercase text-[#a0724a] border border-[#a0724a]/50 px-2.5 py-1 rounded-sm">
              {card_info.category}
            </span>
            <span className={`text-[9px] font-medium tracking-[0.22em] uppercase px-2.5 py-1 rounded-sm
              ${isUpcoming
                ? "bg-[#a0724a] text-white"
                : "bg-white/10 text-[#e8e2d9]/70"}`}>
              {isUpcoming ? daysLabel(card_info.date) : "Finished"}
            </span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-[#e8e2d9] text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-4 max-w-3xl">
            {card_info.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-[11px] text-[#9aabab]">
            <span className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {formatDate(card_info.date)}
            </span>
            {card_info.location && (
              <span className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {card_info.location}
              </span>
            )}
          </div>

          {/* Register CTA in hero for upcoming */}
          {isUpcoming && (
            <button onClick={() => setShowModal(true)}
              className="mt-6 inline-flex items-center gap-2 bg-[#a0724a] hover:bg-[#b8854f] text-white px-6 py-3 rounded-sm text-xs font-medium tracking-[0.18em] uppercase transition-all duration-200 hover:-translate-y-0.5">
              Register Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* ══ BODY ══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT: main content ─────────────────── */}
          <div className="lg:col-span-2">

            {/* ABOUT */}
            {about?.descriptions?.length > 0 && (
              <Section label="Overview" title="About This Event">
                <div className="space-y-4">
                  {about.descriptions.map((p, i) => (
                    <p key={i} className="text-sm text-[#4a5555] leading-[1.9] font-light">{p}</p>
                  ))}
                </div>
              </Section>
            )}

            {/* TIMELINE */}
            {timeline?.length > 0 && (
              <Section label="Schedule" title="Event Timeline">
                <div className="relative">
                  {/* vertical line */}
                  <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[#e8e2d9]" />
                  <div className="space-y-0">
                    {timeline.map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                        {/* time */}
                        <div className="w-16 shrink-0 text-right pt-5">
                          <span className="text-[10px] font-medium text-[#9aabab] tracking-wide leading-tight">{item.time}</span>
                        </div>
                        {/* dot */}
                        <div className="relative flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full border-2 border-[#a0724a] bg-[#f0ede8] mt-[18px] shrink-0 group-hover:bg-[#a0724a] transition-colors z-10" />
                          {i < timeline.length - 1 && <div className="flex-1 w-px bg-transparent" />}
                        </div>
                        {/* content */}
                        <div className="flex-1 pb-8 pt-3">
                          <h4 className="font-['Cormorant_Garamond'] text-[#2b3232] text-lg font-medium mb-1">{item.title}</h4>
                          <p className="text-xs text-[#6a7878] leading-relaxed font-light">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            )}

            {/* GALLERY */}
            {event_gallery?.length > 0 && (
              <Section label="Photos" title="Event Gallery">
                <div
                  ref={galleryRef}
                  className="flex gap-3 overflow-x-auto pb-3 cursor-grab active:cursor-grabbing select-none"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseUp}
                >
                  {event_gallery.map((src, i) => (
                    <div key={i}
                      className="shrink-0 w-64 h-44 rounded-sm overflow-hidden cursor-pointer"
                      onClick={() => setLightbox(src)}>
                      <img src={src} alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 pointer-events-none" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#9aabab] mt-2 tracking-wide">
                  ← Drag to scroll · Click to enlarge
                </p>
              </Section>
            )}

            {/* COMMITTEE */}
            {(event_committee?.leader?.name || event_committee?.members?.length > 0) && (
              <Section label="Organising Team" title="Event Committee">
                {/* Leader */}
                {event_committee.leader?.name && (
                  <div className="mb-6">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#9aabab] mb-3">Director</p>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-sm border border-[#e8e2d9] w-fit">
                      {event_committee.leader.photoUrl ? (
                        <img src={event_committee.leader.photoUrl} alt={event_committee.leader.name}
                          className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#3d5454] flex items-center justify-center">
                          <span className="font-['Cormorant_Garamond'] text-lg text-[#e8e2d9]">
                            {event_committee.leader.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-['Cormorant_Garamond'] text-[#2b3232] text-lg font-medium">
                          {event_committee.leader.name}
                        </p>
                        <p className="text-[10px] tracking-[0.14em] uppercase text-[#a0724a]">
                          {event_committee.leader.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Members */}
                {event_committee.members?.length > 0 && (
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#9aabab] mb-3">Team Members</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {event_committee.members.map((m, i) => (
                        <div key={i} className="bg-white p-4 rounded-sm border border-[#e8e2d9] text-center">
                          {m.photoUrl ? (
                            <img src={m.photoUrl} alt={m.name}
                              className="w-10 h-10 rounded-full object-cover mx-auto mb-2" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#3d5454] flex items-center justify-center mx-auto mb-2">
                              <span className="font-['Cormorant_Garamond'] text-base text-[#e8e2d9]">
                                {m.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <p className="font-['Cormorant_Garamond'] text-[#2b3232] text-sm font-medium leading-tight">{m.name}</p>
                          <p className="text-[9px] tracking-[0.12em] uppercase text-[#9aabab] mt-0.5">{m.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Section>
            )}

          </div>

          {/* ── RIGHT: sticky sidebar ──────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4 py-12">

              {/* Register card for upcoming */}
              {isUpcoming && (
                <div className="bg-[#2b3232] rounded-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/8">
                    <p className="text-[9px] tracking-[0.24em] uppercase text-[#a0724a] mb-1">Open for Registration</p>
                    <p className="font-['Cormorant_Garamond'] text-[#e8e2d9] text-xl font-light">
                      {daysLabel(card_info.date)}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-[#9aabab] leading-relaxed mb-4 font-light">
                      {event_info.description || "Secure your spot before registration closes."}
                    </p>
                    <button onClick={() => setShowModal(true)}
                      className="w-full bg-[#a0724a] hover:bg-[#b8854f] text-white py-3 rounded-sm text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200">
                      Register Now →
                    </button>
                  </div>
                </div>
              )}

              {/* Event info card */}
              <div className="bg-white rounded-sm overflow-hidden border border-[#e8e2d9]">
                <div className="px-5 py-4 border-b border-[#f0ede8]">
                  <p className="text-[9px] tracking-[0.22em] uppercase text-[#a0724a]">Event Details</p>
                </div>
                <div className="px-5 py-2">
                  <InfoRow
                    label="Organizer"
                    value={event_info.organizer}
                    icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                  />
                  <InfoRow
                    label="Venue"
                    value={event_info.venue}
                    icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                  />
                  <InfoRow
                    label="Event Type"
                    value={event_info.event_type}
                    icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                  />
                  <InfoRow
                    label="Partner"
                    value={event_info.partner}
                    icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>}
                  />
                  <InfoRow
                    label="Coordinator"
                    value={event_info.coordinator}
                    icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  />
                </div>
              </div>

              {/* Share */}
              <div className="bg-white rounded-sm border border-[#e8e2d9] px-5 py-4">
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#9aabab] mb-3">Share Event</p>
                <div className="flex gap-2">
                  {[
                    { label: "Copy Link", icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
                    { label: "Facebook", icon: "f" },
                    { label: "LinkedIn", icon: "in" },
                  ].map(s => (
                    <button key={s.label}
                      onClick={() => s.label === "Copy Link" && navigator.clipboard.writeText(window.location.href)}
                      title={s.label}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#e8e2d9] rounded-sm text-[10px] text-[#9aabab] hover:border-[#a0724a] hover:text-[#a0724a] transition-colors">
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Back link */}
              <Link to="/events"
                className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase text-[#9aabab] hover:text-[#a0724a] transition-colors">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                All Events
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* ── FOOTER STRIP ── */}
      <div className="border-t border-[#ddd8d0] mt-12 py-6 px-6 text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#9aabab]">
          CESPA · Civil Engineering Association of Students &amp; Professionals · GSTU
        </p>
      </div>
    </div>
  );
}