export default function Toast({ toast }) {
  if (!toast) return null;
  const isErr = toast.type === "error";
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-sm shadow-lg text-xs tracking-wide font-['Jost']
      ${isErr ? "bg-red-600 text-white" : "bg-[#2b3232] text-[#e8e2d9]"}`}>
      <span>{isErr ? "✕" : "✓"}</span>{toast.msg}
    </div>
  );
}
