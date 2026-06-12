import { Link } from 'react-router-dom'
import Seo from '../components/shared/Seo/Seo'
import { committees } from '../data/siteData'

export default function CommitteesPage() {
  return (
    <>
      <Seo title="Committees" description="Explore CivicBridge committees and responsibilities." />
      <section className="section-pad">
        <div className="container-shell max-w-5xl">
          <p className="text-clay uppercase tracking-[0.3em] text-sm font-semibold">Committees</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">Committee teams</h1>
          <p className="mt-4 text-base text-ink/75">Open a committee to review its purpose, lead, and current responsibilities.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {committees.map((committee) => (
            <Link className="rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" to={`/committees/${committee.id}`} key={committee.id}>
              <img className="h-56 w-full rounded-md object-cover" src={committee.image} alt={committee.name} />
              <h2 className="mt-4 text-2xl font-bold">{committee.name}</h2>
              <p className="text-forest">Lead: {committee.lead}</p>
              <p className="mt-3 text-ink/65">{committee.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}


