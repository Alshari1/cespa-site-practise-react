import { Handshake, Megaphone, ShieldCheck } from 'lucide-react'

const services = [
  { title: 'Coordinate Programs', icon: Handshake, text: 'Publish event updates and connect members with real opportunities.' },
  { title: 'Manage Leadership', icon: ShieldCheck, text: 'Present advisory and committee profiles with clean detail pages.' },
  { title: 'Communicate Clearly', icon: Megaphone, text: 'Keep visitors informed with contact, blog, and announcement sections.' },
]

export default function WhatWeDo() {
  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="font-poppins text-sm font-bold uppercase tracking-widest text-clay">What we do</p>
          <h2 className="font-display mt-3 text-5xl font-bold">Simple tools for real operations.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map(({ title, icon: Icon, text }) => (
            <article className="rounded-lg border border-forest/10 bg-paper p-6" key={title}>
              <Icon className="text-forest" size={34} />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-ink/65">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


