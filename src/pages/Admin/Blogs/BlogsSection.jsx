import { useState, useRef, useCallback } from "react";
import Badge from "../components/Badge";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import NotFound from "../components/NotFound";
import EmptyState from "../components/EmptyState";
import ActionBtn from "../components/ActionBtn";
import { useBlog, useDeleteBlog } from "../../../Hooks/Hooks";
import { uploadToCloudinary } from "../../../Cloud/Cloud";

export default function BlogsSection() {

  const {
    data: rows = [],
    isLoading,
  } = useBlog();

  const { mutate: handleDelete, isPending } = useDeleteBlog();

  const [fetchError, setFetchError] = useState(null);

  // Local UI state
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const searchRef = useRef();

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Handle delete
  const filtered = query.trim()
    ? rows.filter(r =>
      r.title?.toLowerCase().includes(query.toLowerCase()) ||
      r.tag?.toLowerCase().includes(query.toLowerCase())
    )
    : rows;

  const handleSaved = (isEdit) => {
    setModal(null);
    showToast(isEdit ? "Blog updated" : "Blog added");
  };

  return (
    <div className="h-full flex flex-col bg-[#f0ede8] font-['Jost']">
      <Toast toast={toast} />
      {modal && (
        <BlogModal
          record={modal.record}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
      {confirm && (
        <ConfirmDialog
          message="This blog post will be permanently deleted. Are you sure?"
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b border-[#e8e2d9] px-6 py-4 shrink-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-[#a0724a] mb-0.5">
              Manage
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-[#2b3232] text-2xl font-medium">
              Blogs
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabab]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search blogs…"
                className="pl-8 pr-4 py-2 text-xs bg-[#f5f2ee] border border-transparent focus:border-[#a0724a] focus:bg-white outline-none rounded-sm w-52 transition-colors text-[#2b3232] placeholder-[#c9d4d4]"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aabab] hover:text-[#2b3232]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              )}
            </div>

            <span className="text-[10px] tracking-wide text-[#9aabab] bg-[#f5f2ee] px-3 py-1.5 rounded-sm">
              {filtered.length} record{filtered.length !== 1 && "s"}
            </span>

            <button
              onClick={() => setModal({})}
              className="flex items-center gap-2 bg-[#2b3232] hover:bg-[#3d5454] text-[#e8e2d9] px-4 py-2 rounded-sm text-xs font-medium tracking-[0.14em] uppercase transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-hidden flex flex-col px-6 py-4">
        <div className="flex-1 bg-white rounded-sm overflow-hidden flex flex-col border border-[#e8e2d9]">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#e8e2d9] border-t-[#a0724a] rounded-full animate-spin" />
                <p className="text-xs text-[#9aabab] tracking-wide">Loading…</p>
              </div>
            </div>
          ) : fetchError ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                <p className="text-xs text-red-500">{fetchError.message || "Failed to load blogs"}</p>
                <button onClick={() => window.location.reload()} className="text-[10px] text-[#a0724a] hover:text-[#2b3232] underline">Retry</button>
              </div>
            </div>
          ) : filtered.length === 0 && query ? (
            <NotFound query={query} onClear={() => setQuery("")} />
          ) : filtered.length === 0 ? (
            <EmptyState label="blogs" readOnly={false} onAdd={() => setModal({})} />
          ) : (
            <>
              {/* Header */}
              <div className="shrink-0 grid border-b border-[#f0ede8] bg-[#f8f6f3]" style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 120px" }}>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab]">Title</div>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab]">Tag</div>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab]">Status</div>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab] text-right">Actions</div>
              </div>

              {/* Rows */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#f0ede8]">
                {filtered.map((row, idx) => (
                  <div key={row._id || idx} className="grid items-center hover:bg-[#faf9f7] transition-colors group" style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 120px" }}>
                    <div className="px-4 py-3 flex items-center gap-3">
                      {row.imageUrl ? (
                        <img src={row.imageUrl} alt={row.title} className="w-7 h-7 rounded-full object-cover border border-[#e8e2d9] shrink-0" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[#3d5454] flex items-center justify-center shrink-0">
                          <span className="font-['Cormorant_Garamond'] text-xs font-semibold text-[#e8e2d9]">
                            {(row.title || "?").charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-xs font-medium text-[#2b3232] truncate">{row.title || "—"}</span>
                    </div>
                    <div className="px-4 py-3 text-xs text-[#4a5555] truncate">{row.tag || "—"}</div>
                    <div className="px-4 py-3"><Badge value={row.date} /></div>
                    <div className="px-4 py-3 flex items-center justify-end gap-1">
                      <ActionBtn color="teal" title="Edit" onClick={() => setModal({ record: row })}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </ActionBtn>
                      <ActionBtn color="red" title="Delete" onClick={() => setConfirm(row._id)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                      </ActionBtn>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogModal({ record, onClose, onSaved }) {
  console.log(record)
  // const [imageUrl, setImageUrl] = useState("");
  const isEdit = !!record?._id;

  const [form, setForm] = useState({
    title: record?.title ?? "",
    tag: record?.tag ?? "",
    category: record?.category ?? "",
    status: record?.status ?? "Upcoming",
    excerpt: record?.excerpt ?? "",
    imageUrl: record?.imageUrl ?? "",
  });

  const [imageMode, setImageMode] = useState(
    form.imageUrl ? "url" : "upload"
  );

  // console.log(form, 'blog form state');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `http://localhost:5000/blog/${record._id}` : `http://localhost:5000/blog`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed to save");
      onSaved(isEdit);
    } catch (error) {
      setErrors({ _global: error.message || "Failed to save blog post. Please try again." });
    }
  };

  const isSaving = false;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file, 'selected file');
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file);
      // setImageUrl(url);

      setForm((prev) => ({
        ...prev,
        imageUrl: url,
      }));
      console.log(form.imgUrl, 'updated form state with image url');
    } catch (err) {
      console.error(err);
    }
  };


  const inputCls = (k) =>
    `w-full bg-[#f5f2ee] border ${errors[k] ? "border-red-400" : "border-transparent"}
     focus:border-[#a0724a] focus:bg-white outline-none rounded-sm px-3 py-2.5
     text-sm text-[#2b3232] placeholder-[#c9d4d4] transition-colors`;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-sm shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0ede8]">
          <div>
            <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-[#a0724a]">Blogs</p>
            <h3 className="font-['Cormorant_Garamond'] text-[#2b3232] text-xl font-medium">{isEdit ? "Edit Blog" : "Add Blog"}</h3>
          </div>
          <button onClick={onClose} className="text-[#9aabab] hover:text-[#2b3232] transition-colors p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          {errors._global && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-sm">{errors._global}</p>}

          <div>
            <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-[#3d5454] mb-1.5">Title *</label>
            <input type="text" className={inputCls("title")} placeholder="Blog Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            {errors.title && <p className="text-[10px] text-red-400 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-[#3d5454] mb-1.5">date *</label>
            <input type="date" className={inputCls("date")} placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            {errors.date && <p className="text-[10px] text-red-400 mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-[#3d5454] mb-1.5">Category</label>
            <select className={inputCls("category")} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="">Select Category…</option>
              <option value="Achievement">Achievement</option>
              <option value="Event">Event</option>
              <option value="Research">Research</option>
              <option value="News">News</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-[#3d5454] mb-1.5">Status *</label>
            <select className={inputCls("status")} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="Upcoming">Upcoming</option>
              <option value="Published">Published</option>
            </select>
            {errors.status && <p className="text-[10px] text-red-400 mt-1">{errors.status}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-[#3d5454] mb-1.5">Excerpt</label>
            <textarea rows={2} className={inputCls("excerpt")} placeholder="Excerpt / Short Summary" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          </div>

          <div className="relative">
            {/* LABEL */}
            <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-[#3d5454] mb-1.5">
              Cover Image
            </label>

            {/* INPUT AREA */}
            {imageMode === "url" ? (
              <input
                type="url"
                value={form.imageUrl}
                placeholder="https://example.com/image.jpg"
                className={inputCls("imageUrl")}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full pr-20"
                onChange={handleFileChange}
              />
            )}

            {/* SMALL TOGGLE BUTTONS INSIDE BOTTOM RIGHT */}
            <div className=" mt-2 flex gap-1">
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`text-[9px] px-2 py-1 rounded ${imageMode === "url"
                  ? "bg-teal-700 text-white"
                  : "bg-gray-200 text-gray-600"
                  }`}
              >
                URL
              </button>

              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`text-[9px] px-2 py-1 rounded ${imageMode === "upload"
                  ? "bg-teal-700 text-white"
                  : "bg-gray-200 text-gray-600"
                  }`}
              >
                Upload
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#f0ede8]">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs tracking-[0.14em] uppercase text-[#9aabab] border border-[#e8e2d9] rounded-sm hover:border-[#9aabab] transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={isSaving} className="px-5 py-2 text-xs tracking-[0.14em] uppercase bg-[#2b3232] hover:bg-[#3d5454] disabled:opacity-60 text-[#e8e2d9] rounded-sm transition-colors flex items-center gap-2">
            {isSaving && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
