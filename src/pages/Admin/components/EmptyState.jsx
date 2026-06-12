export default function EmptyState({ label, onAdd, readOnly }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 select-none">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9d4d4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/>
        {!readOnly && <line x1="12" y1="9" x2="12" y2="15"/>}
      </svg>
      <p className="font-['Cormorant_Garamond'] text-[#2b3232] text-xl font-medium mb-1">
        No {label} yet
      </p>
      {!readOnly && (
        <button onClick={onAdd}
          className="mt-4 text-[10px] tracking-[0.18em] uppercase text-[#a0724a] border border-[#a0724a]/40 px-4 py-2 rounded-sm hover:bg-[#a0724a]/5 transition-colors">
          + Add First Record
        </button>
      )}
    </div>
  );
}
