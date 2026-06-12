import { useState, useRef, useCallback } from "react";
import Badge from "../components/Badge";
import Toast from "../components/Toast";
import NotFound from "../components/NotFound";
import EmptyState from "../components/EmptyState";
import ActionBtn from "../components/ActionBtn";

const API_BASE = "http://localhost:5000";
const ENDPOINT = "/api/membership";

export default function MembershipSection() {
  // Local state for data
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
  // Local UI state
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);
  const searchRef = useRef();

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Handle approve/reject status updates
  const handleApprove = async (id, action) => {
    try {
      const res = await fetch(`${API_BASE}${ENDPOINT}/${id}/${action}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error(`Failed to ${action} membership`);
      const updated = await res.json();
      setRows(rows.map(r => r._id === id ? updated : r));
      showToast(`Request ${action}d`);
    } catch (error) {
      showToast(error.message || "Action failed", "error");
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#f0ede8] font-['Jost']">
      <Toast toast={toast} />

      {/* Header */}
      <div className="bg-white border-b border-[#e8e2d9] px-6 py-4 shrink-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-[#a0724a] mb-0.5">
              Manage
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-[#2b3232] text-2xl font-medium">
              Membership Requests
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabab]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search requests…"
                className="pl-8 pr-4 py-2 text-xs bg-[#f5f2ee] border border-transparent focus:border-[#a0724a] focus:bg-white outline-none rounded-sm w-52 transition-colors text-[#2b3232] placeholder-[#c9d4d4]"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aabab] hover:text-[#2b3232]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>

            <span className="text-[10px] tracking-wide text-[#9aabab] bg-[#f5f2ee] px-3 py-1.5 rounded-sm">
              {filtered.length} request{filtered.length !== 1 && "s"}
            </span>
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
                <p className="text-xs text-red-500">{fetchError.message || "Failed to load membership requests"}</p>
                <button onClick={() => window.location.reload()} className="text-[10px] text-[#a0724a] hover:text-[#2b3232] underline">Retry</button>
              </div>
            </div>
          ) : filtered.length === 0 && query ? (
            <NotFound query={query} onClear={() => setQuery("")} />
          ) : filtered.length === 0 ? (
            <EmptyState label="membership requests" readOnly={true} />
          ) : (
            <>
              {/* Header */}
              <div className="shrink-0 grid border-b border-[#f0ede8] bg-[#f8f6f3]" style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 120px" }}>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab]">Name</div>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab]">Email</div>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab]">Status</div>
                <div className="px-4 py-3 text-[9px] font-medium tracking-[0.2em] uppercase text-[#9aabab] text-right">Actions</div>
              </div>

              {/* Rows */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#f0ede8]">
                {filtered.map((row, idx) => (
                  <div key={row._id || idx} className="grid items-center hover:bg-[#faf9f7] transition-colors group" style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 120px" }}>
                    <div className="px-4 py-3 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#3d5454] flex items-center justify-center shrink-0">
                        <span className="font-['Cormorant_Garamond'] text-xs font-semibold text-[#e8e2d9]">
                          {(row.name || "?").charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#2b3232] truncate">{row.name || "—"}</span>
                    </div>
                    <div className="px-4 py-3 text-xs text-[#4a5555] truncate">{row.email || "—"}</div>
                    <div className="px-4 py-3"><Badge value={row.status} /></div>
                    <div className="px-4 py-3 flex items-center justify-end gap-1">
                      {row.status !== "Approved" && (
                        <ActionBtn color="emerald" title="Approve" onClick={() => handleApprove(row._id, "approve")}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </ActionBtn>
                      )}
                      {row.status !== "Rejected" && (
                        <ActionBtn color="red" title="Reject" onClick={() => handleApprove(row._id, "reject")}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </ActionBtn>
                      )}
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
