import { Link } from 'react-router-dom'
import Seo from '../components/shared/Seo/Seo'
import { advisors } from '../data/siteData'

export default function AdvisorsPage() {
  return (
    <>
      <Seo title="Advisors" description="Meet CivicBridge advisory panel members." />
      <section className="section-pad">
        <div className="container-shell max-w-5xl">
          <p className="text-clay uppercase tracking-[0.3em] text-sm font-semibold">Advisors</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">Advisory panel members</h1>
          <p className="mt-4 text-base text-ink/75">Meet the advisors supporting strategy, programs, and community decisions.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {advisors.map((advisor) => (
            <Link className="rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" to={`/advisors/${advisor.id}`} key={advisor.id}>
              <img className="h-72 w-full rounded-md object-cover" src={advisor.image} alt={advisor.name} />
              <h2 className="mt-4 text-2xl font-bold">{advisor.name}</h2>
              <p className="text-gold">{advisor.role}</p>
              <p className="mt-3 text-ink/65">{advisor.bio}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}


