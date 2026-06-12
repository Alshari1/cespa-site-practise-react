import { Link, useParams } from 'react-router-dom'
import Seo from '../components/shared/Seo/Seo'
import { committees } from '../data/siteData'

export default function CommitteeDetails() {
  const { committeeId } = useParams()
  const committee = committees.find((item) => item.id === committeeId)

  if (!committee) return <section className="section-pad text-center">Committee not found.</section>

  return (
    <section className="section-pad">
      <Seo title={committee.name} description={committee.summary} />
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <img className="h-[500px] w-full rounded-lg object-cover" src={committee.image} alt={committee.name} />
        <div>
          <p className="font-semibold text-forest">Lead: {committee.lead}</p>
          <h1 className="font-display mt-3 text-6xl font-bold">{committee.name}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">{committee.summary}</p>
          <ul className="mt-6 grid gap-3 text-ink/70">
            <li className="rounded-lg bg-white p-4">Monthly planning and progress review</li>
            <li className="rounded-lg bg-white p-4">Member coordination and task assignment</li>
            <li className="rounded-lg bg-white p-4">Reporting updates to the advisory panel</li>
          </ul>
          <Link className="btn mt-8 bg-forest text-white hover:bg-forest/90" to="/committees">View All Committees</Link>
        </div>
      </div>
    </section>
  )
}


