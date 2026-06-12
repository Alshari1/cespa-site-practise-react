export default function ActionBtn({ children, title, onClick, color }) {
  const colors = {
    teal:   "text-[#3d5454] hover:bg-[#3d5454]/10",
    red:    "text-red-400   hover:bg-red-50",
    emerald:"text-emerald-600 hover:bg-emerald-50",
  };
  return (
    <button onClick={onClick} title={title}
      className={`w-7 h-7 flex items-center justify-center rounded-sm transition-colors ${colors[color]}`}>
      {children}
    </button>
  );
}
