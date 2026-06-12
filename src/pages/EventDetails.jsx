import { Link, useParams } from 'react-router-dom'
import Seo from '../components/shared/Seo/Seo'
import { events } from '../data/siteData'

export default function EventDetails() {
  const { eventId } = useParams()
  const event = events.find((item) => item.id === eventId)

  if (!event) {
    return <MissingItem label="event" backTo="/events" />
  }

  return (
    <section className="section-pad">
      <Seo title={event.title} description={event.excerpt} />
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <img className="h-[520px] w-full rounded-lg object-cover" src={event.image} alt={event.title} />
        <div>
          <p className="font-semibold text-clay">{event.category} | {event.date}</p>
          <h1 className="font-display mt-3 text-5xl font-bold">{event.title}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">{event.details}</p>
          <div className="mt-8 rounded-lg bg-white p-5">
            <h2 className="text-xl font-bold">Event Details</h2>
            <p className="mt-2 text-ink/65">Location, schedule, speakers, registration, and gallery fields can be connected here later.</p>
          </div>
          <Link className="btn mt-8 bg-forest text-white hover:bg-forest/90" to="/events">Back to Events</Link>
        </div>
      </div>
    </section>
  )
}

function MissingItem({ label, backTo }) {
  return (
    <section className="section-pad text-center">
      <Seo title="Not Found" />
      <h1 className="font-display text-5xl font-bold">No {label} found</h1>
      <Link className="btn mt-6 bg-forest text-white" to={backTo}>Go Back</Link>
    </section>
  )
}


