export default function NotFound({ query, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 select-none">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9d4d4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
      <p className="font-['Cormorant_Garamond'] text-[#2b3232] text-xl font-medium mb-1">
        No results for "{query}"
      </p>
      <p className="text-xs text-[#9aabab] mb-5">Try a different name or email.</p>
      <button onClick={onClear}
        className="text-[10px] tracking-[0.18em] uppercase text-[#a0724a] border border-[#a0724a]/40 px-4 py-2 rounded-sm hover:bg-[#a0724a]/5 transition-colors">
        Clear Search
      </button>
    </div>
  );
}
