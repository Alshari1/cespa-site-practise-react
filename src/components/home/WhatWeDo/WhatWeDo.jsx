import FeatureCard from "./Featurecard"
import useReveal from "../../../hooks/useReveal"
import "./WhatWeDo.css"

const services = [
  { icon: "ti-tools", title: "Workshops", desc: "Hands-on technical sessions led by industry professionals and faculty advisors." },
  { icon: "ti-trophy", title: "Competitions", desc: "Inter-university contests that challenge students to solve real engineering problems." },
  { icon: "ti-users", title: "Mentorship", desc: "Connect with alumni and senior professionals for career guidance and growth." },
  { icon: "ti-microscope", title: "Research", desc: "Collaborative initiatives bridging academia and real-world civil engineering practice." },
  { icon: "ti-map-pin", title: "Field Visits", desc: "Guided site visits to major infrastructure projects across Bangladesh." },
  { icon: "ti-presentation", title: "Seminars", desc: "Expert talks on emerging trends, policies, and innovations in the field." },
]

export default function WhatWeDo() {
  const [ref, isVisible] = useReveal({ threshold: 0.15 })

  return (
    <section ref={ref} className="bg-white py-12 lg:py-20 px-4">
        <div className="mx-auto max-w-295">
          <p className={`font-inter text-[11px] lg:text-[12px] uppercase text-gold1 tracking-wide wwd-reveal ${isVisible ? 'animate' : ''}`}
             style={{ transitionDelay: '0.05s' }}>
            What we do
          </p>
          <h2 className={`font-cormorant text-black text-3xl sm:text-4xl lg:text-5xl my-4 lg:my-6 wwd-reveal ${isVisible ? 'animate' : ''}`}
              style={{ transitionDelay: '0.15s' }}>
            Simple tools for real operations.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#e8e2d9] rounded-lg overflow-hidden divide-y sm:divide-x sm:divide-y divide-[#e8e2d9] mt-12">
            {
              services.map((service, idx) => (
                <FeatureCard key={idx} {...service} idx={idx} isVisible={isVisible} />
              ))
            }
          </div>
        </div>
    </section>
  )
}


