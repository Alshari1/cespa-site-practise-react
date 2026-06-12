export default function Badge({ value }) {
  const map = {
    Published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Draft:     "bg-amber-50  text-amber-700  border-amber-200",
    Pending:   "bg-blue-50   text-blue-700   border-blue-200",
    Approved:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rejected:  "bg-red-50    text-red-700    border-red-200",
  };
  const cls = map[value];
  if (!cls) return <span className="text-[#2b3232] text-xs">{value || "—"}</span>;
  return (
    <span className={`inline-block text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-sm border ${cls}`}>
      {value}
    </span>
  );
}
