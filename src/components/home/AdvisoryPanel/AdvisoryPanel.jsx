import { Link } from 'react-router-dom'

const teamMembers = [
  {
    name: "Albert Flores",
    role: "VP of Sales",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Theresa Webb",
    role: "Business Development Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Savannah Nguyen",
    role: "Director of Product",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Daniel Murphy",
    role: "Business Analyst",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Darrell Steward",
    role: "Director of Sales",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
  }
];

export default function AdvisoryPanel() {
  return (
    <section className="w-full bg-[#2b3a3a] py-20 px-8 lg:px-16 overflow-hidden">

      {/* ── outer grid: left label col + right photo grid ── */}
      <div className="grid grid-cols-[280px_1fr] gap-8 items-start max-w-[1200px] mx-auto">

        {/* LEFT — label, heading, see all */}
        <div className="flex flex-col justify-between h-full pt-2 pb-4">
          <div className="border-red-500">
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#a0724a] font-['Jost'] mb-5">
              Advisory Panel
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-[#e8e2d9] text-5xl font-light leading-tight lg:w-xl">
              Meet the Brain
            </h2>
          </div>
          <Link
            to="/team"
            className="mt-auto pt-10 flex items-center gap-2 text-[10px] font-medium tracking-[0.2em] uppercase text-[#a0724a] font-['Jost'] group w-fit"
          >
            See All
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* RIGHT — photo grid */}
        <div className="grid grid-cols-3 gap-3">

          {/* Row 1: col 1 empty, col 2 + col 3 filled */}
          <div /> {/* spacer */}

          {[teamMembers[0], teamMembers[1]].map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}

          {/* Row 2: col 1 + col 2 + col 3 all filled */}
          {[teamMembers[2], teamMembers[3], teamMembers[4]].map((member, i) => (
            <MemberCard key={i + 2} member={member} />
          ))}

        </div>
      </div>
    </section>
  )
}

function MemberCard({ member }) {
  return (
    <div className="relative group overflow-hidden rounded-sm aspect-3/4">
      <img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      {/* name + role */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
        <h3 className="font-['Cormorant_Garamond'] text-white font-semibold text-lg leading-tight tracking-wide">
          {member.name}
        </h3>
        <p className="text-[#a0724a] text-xs font-medium mt-1 font-['Jost'] tracking-wide">
          {member.role}
        </p>
      </div>
    </div>
  )
}