import { Link, useParams } from 'react-router-dom'
import Seo from '../components/shared/Seo/Seo'
import { advisors } from '../data/siteData'

export default function AdvisorDetails() {
  const { advisorId } = useParams()
  const advisor = advisors.find((item) => item.id === advisorId)

  if (!advisor) return <section className="section-pad text-center">Advisor not found.</section>

  return (
    <section className="section-pad">
      <Seo title={advisor.name} description={advisor.bio} />
      <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1fr]">
        <img className="h-[520px] w-full rounded-lg object-cover" src={advisor.image} alt={advisor.name} />
        <div>
          <p className="font-semibold text-gold">{advisor.role}</p>
          <h1 className="font-display mt-3 text-6xl font-bold">{advisor.name}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">{advisor.bio}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-4"><p className="font-bold">Focus</p><p className="text-ink/65">Strategy and governance</p></div>
            <div className="rounded-lg bg-white p-4"><p className="font-bold">Status</p><p className="text-ink/65">Active panel member</p></div>
          </div>
          <Link className="btn mt-8 bg-forest text-white hover:bg-forest/90" to="/advisors">View All Advisors</Link>
        </div>
      </div>
    </section>
  )
}


