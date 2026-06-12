import { useNavigate } from "react-router-dom";

// ── HELPERS ───────────────────────────────────────────────────
function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function daysFromNow(str) {
  const diff = new Date(str) - new Date();
  const days = Math.ceil(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days > 0) return `In ${days} days`;
  return `${Math.abs(days)} days remaining`;
}


export function EventCard({ event, featured = false }) {
  const navigate = useNavigate()

  if (featured) {
    return (
      <div className="col-span-full lg:col-span-2 group cursor-pointer bg-white rounded-sm overflow-hidden flex flex-col sm:flex-row">
        <div className="sm:w-3/5 aspect-[16/10] sm:aspect-auto overflow-hidden relative">
          <img src={event.imageUrl} alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {event.status === "upcoming" && (
            <div className="absolute top-4 left-4 bg-[#a0724a] text-white text-[9px] font-medium tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm">
              {daysFromNow(event.date)}
            </div>
          )}
        </div>
        <div className="sm:w-2/5 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block text-[9px] font-medium tracking-[0.2em] uppercase text-[#a0724a] border-b border-[#a0724a] pb-0.5 mb-4">
              {event.category}
            </span>
            <h3 className="font-['Cormorant_Garamond'] text-[#2b3232] text-2xl font-medium leading-snug mb-3 group-hover:text-[#3d5454] transition-colors">
              {event.title}
            </h3>
            <p className="text-xs text-[#6a7878] leading-relaxed font-['Jost'] font-light line-clamp-4">
              {event.excerpt}
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-[#f0ede8] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#9aabab] font-['Jost'] tracking-wide">{formatDate(event.date)}</p>
              {event.location && (
                <p className="text-[10px] text-[#9aabab] font-['Jost'] mt-0.5 flex items-center gap-1">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {event.location}
                </p>
              )}
            </div>
            <span
              className="text-[9px] tracking-[0.18em] uppercase text-[#a0724a] font-['Jost'] font-medium flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
              onClick={() => navigate(`/events/${event._id}`)}
            >
              Details <span>→</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer bg-white rounded-sm overflow-hidden flex flex-col">
      <div className="overflow-hidden relative aspect-[16/10]">
        <img src={event.imageUrl} alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {event.status === "upcoming" && (
          <div className="absolute top-3 left-3 bg-[#a0724a] text-white text-[9px] font-medium tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm">
            {daysFromNow(event.date)}
          </div>
        )}
        {event.status === "finished" && (
          <div className="absolute top-3 left-3 bg-[#2b3232]/80 text-[#e8e2d9] text-[9px] font-medium tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm">
            Finished
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block text-[9px] font-medium tracking-[0.2em] uppercase text-[#a0724a] border-b border-[#a0724a] pb-0.5 mb-3 w-fit">
          {event.category}
        </span>
        <h3 className="font-['Cormorant_Garamond'] text-[#2b3232] text-lg font-medium leading-snug mb-2 group-hover:text-[#3d5454] transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-xs text-[#6a7878] leading-relaxed font-['Jost'] font-light line-clamp-3 flex-1">
          {event.excerpt}
        </p>
        <div className="mt-4 pt-3 border-t border-[#f0ede8] flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#9aabab] font-['Jost'] tracking-wide">{formatDate(event.date)}</p>
            {event.location && (
              <p className="text-[10px] text-[#9aabab] font-['Jost'] mt-0.5 flex items-center gap-1">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {event.location}
              </p>
            )}
          </div>
          <span className="text-[9px] tracking-[0.18em] uppercase text-[#a0724a] font-['Jost'] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Details <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}