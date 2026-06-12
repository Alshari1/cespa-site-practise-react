// src/pages/EventsPage.jsx
import { useState, useEffect } from "react";
import { EventCard } from "./Eventcard";

const API_BASE = "http://localhost:5000"; // adjust to your Express server

const CATEGORIES = ["All", "Workshop", "Seminar", "Competition", "Field Visit", "Conference"];


// ── MOCK DATA (remove when API is ready) ──────────────────────
const MOCK = [
  {
    _id: "cespa-event-001", title: "National Concrete Olympiad 2025", category: "Competition",
    date: "2025-08-15", status: "upcoming",
    excerpt: "CESPA sends its strongest team yet to the national concrete mix design competition held in Dhaka. Open registration for all CE students.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    location: "BUET, Dhaka",
  },
  {
    _id: "2", title: "Structural Analysis Workshop Series", category: "Workshop",
    date: "2025-09-02", status: "upcoming",
    excerpt: "A three-day intensive workshop on advanced structural analysis techniques led by industry professionals from AECOM Bangladesh.",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    location: "GSTU Campus, Lab 3",
  },
  {
    _id: "3", title: "Career in Civil Engineering — Alumni Talk", category: "Seminar",
    date: "2025-09-20", status: "upcoming",
    excerpt: "Distinguished alumni share their journeys from GSTU to global firms. Panel Q&A session open to all members.",
    imageUrl: "https://images.unsplash.com/photo-1560523159-4a9692d222ef?w=800&q=80",
    location: "Auditorium, GSTU",
  },
  {
    _id: "4", title: "Bridge Design Innovation Challenge", category: "Competition",
    date: "2025-07-10", status: "finished",
    excerpt: "Teams competed to design the most efficient bridge model under strict material and load constraints. CESPA Team A took first place.",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    location: "GSTU Engineering Hall",
  },
  {
    _id: "5", title: "Geotechnical Field Visit — Padma Bridge Site", category: "Field Visit",
    date: "2025-06-18", status: "finished",
    excerpt: "An exclusive site visit to the Padma Bridge construction zone, guided by senior engineers from the project team.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    location: "Padma Bridge, Munshiganj",
  },
  {
    _id: "6", title: "AutoCAD & BIM Fundamentals Workshop", category: "Workshop",
    date: "2025-05-05", status: "finished",
    excerpt: "Hands-on training in AutoCAD Civil 3D and Revit for beginners. 60 students completed the two-day programme.",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    location: "Computer Lab, GSTU",
  },
  {
    _id: "7", title: "Water Resources Management Symposium", category: "Conference",
    date: "2025-04-22", status: "finished",
    excerpt: "International researchers and local practitioners convened to discuss sustainable water management strategies for Bangladesh.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    location: "GSTU Conference Centre",
  },
];

// function formatDate(str) {
//   const d = new Date(str);
//   return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
// }

// function daysFromNow(str) {
//   const diff = new Date(str) - new Date();
//   const days = Math.ceil(diff / 86400000);
//   if (days === 0) return "Today";
//   if (days === 1) return "Tomorrow";
//   if (days > 0) return `In ${days} days`;
//   return `${Math.abs(days)} days remaining`;
// }


// ── SKELETON CARD ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-sm overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-[#e8e2d9]" />
      <div className="p-5 space-y-3">
        <div className="h-2.5 bg-[#e8e2d9] rounded w-1/3" />
        <div className="h-4 bg-[#e8e2d9] rounded w-4/5" />
        <div className="h-3 bg-[#e8e2d9] rounded w-full" />
        <div className="h-3 bg-[#e8e2d9] rounded w-2/3" />
      </div>
    </div>
  );
}

// ── EVENT CARD ────────────────────────────────────────────────


// ── SECTION HEADER ─────────────────────────────────────────────
function SectionHeader({ label, title, count }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-[9px] font-medium tracking-[0.26em] uppercase text-[#a0724a] font-['Jost'] mb-2">
          {label}
        </p>
        <h2 className="font-['Cormorant_Garamond'] text-[#2b3232] text-4xl font-light">
          {title}
        </h2>
      </div>
      <span className="text-[10px] tracking-[0.16em] text-[#9aabab] font-['Jost'] bg-white px-3 py-1.5 rounded-sm border border-[#e8e2d9]">
        {count} event{count !== 1 && "s"}
      </span>
    </div>
  );
}

// ── EMPTY SECTION ─────────────────────────────────────────────
function EmptySection({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-sm border border-dashed border-[#c9d4d4]">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9d4d4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <p className="font-['Cormorant_Garamond'] text-[#9aabab] text-xl">{message}</p>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function EventsPage() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setFilter] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs`)
      .then(r => r.json())
      .then(data => setAll(Array.isArray(data) ? data : MOCK))
      .catch(() => setAll(MOCK))          // fallback to mock on error
      .finally(() => setLoading(false));
  }, []);

  // filter by category
  const filtered = activeFilter === "All"
    ? all
    : all.filter(e => e.category === activeFilter);

  const upcoming = filtered.filter(e => e.status === "upcoming")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const finished = filtered.filter(e => e.status === "finished")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-[#f0ede8] font-['Jost']">

      {/* ── PAGE HERO ──────────────────────────────────── */}
      <div className="bg-[#2b3232] pt-24 pb-14 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#a0724a] mb-3">
            CESPA · Events & Activities
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-[#e8e2d9] text-5xl sm:text-6xl font-light mb-4">
            Events & Blog
          </h1>
          <p className="text-[#9aabab] text-sm font-light max-w-xl leading-relaxed">
            Workshops, seminars, competitions and field visits — everything happening at CESPA,
            past and present.
          </p>

          {/* ── CATEGORY FILTER ── */}
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm transition-colors duration-150
                  ${activeFilter === cat
                    ? "bg-[#a0724a] text-white"
                    : "bg-white/8 text-[#9aabab] hover:bg-white/12 hover:text-[#e8e2d9] border border-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 space-y-20">

        {/* ══ UPCOMING ══════════════════════════════════ */}
        <section>
          <SectionHeader
            label="What's Next"
            title="Upcoming Events"
            count={loading ? "—" : upcoming.length}
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : upcoming.length === 0 ? (
            <EmptySection message="No upcoming events right now" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((e, i) => (
                <EventCard key={e._id} event={e} featured={i === 0 && upcoming.length > 2} />
              ))}
            </div>
          )}
        </section>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#ddd8d0]" />
          <span className="text-[9px] tracking-[0.26em] uppercase text-[#9aabab]">Past Events</span>
          <div className="flex-1 h-px bg-[#ddd8d0]" />
        </div>

        {/* ══ FINISHED ══════════════════════════════════ */}
        <section>
          <SectionHeader
            label="Archive"
            title="Finished Events"
            count={loading ? "—" : finished.length}
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : finished.length === 0 ? (
            <EmptySection message="No finished events yet" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {finished.map((e, i) => (
                <EventCard key={e._id} event={e} featured={i === 0 && finished.length > 2} />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* ── FOOTER STRIP ── */}
      <div className="border-t border-[#ddd8d0] py-6 px-6 text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#9aabab]">
          CESPA · Civil Engineering Association of Students &amp; Professionals · GSTU
        </p>
      </div>
    </div>
  );
}