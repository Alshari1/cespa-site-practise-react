import { Link } from 'react-router-dom'
import Seo from '../components/shared/Seo/Seo'
import { events } from '../data/siteData'

export default function EventsPage() {
  return (
    <>
      <Seo title="Events" description="Browse CivicBridge events and event stories." />
      <section className="section-pad">
        <div className="container-shell max-w-5xl">
          <p className="text-clay uppercase tracking-[0.3em] text-sm font-semibold">Events</p>
          <h1 className="mt-4 text-4xl font-bold text-ink">All programs and stories</h1>
          <p className="mt-4 text-base text-ink/75">Browse the event posts and open any item to see full details.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <Link className="rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" to={`/events/${event.id}`} key={event.id}>
              <img className="h-56 w-full rounded-md object-cover" src={event.image} alt={event.title} />
              <p className="mt-4 text-sm font-semibold text-clay">{event.category} | {event.date}</p>
              <h2 className="mt-2 text-2xl font-bold">{event.title}</h2>
              <p className="mt-2 text-ink/65">{event.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}


