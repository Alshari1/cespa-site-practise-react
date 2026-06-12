export default function Hero() {
  return (
    <section
      className="section-container overflow-hidden min-h-screen mx-auto  lg:px-10 flex flex-col items-center justify-center lg:items-center bg-[#333c3c] text-cream1">

      <div className="flex items-center justify-center gap-3 mb-10 anim-ready slide-from-top delay-1">
        <span className="w-6 h-px bg-cream1  inline-block"></span>
        <p className="font-inter text-[10px] font-medium tracking-[0.2em] uppercase ">
          Civil Engineering Student Club
        </p>
        <span className="w-6 h-px inline-block bg-cream1 "></span>
      </div>


      <h1
        className=" flex flex-col justify-center items-center font-cormorant font-light text-[clamp(38px,5.5vw,64px)] leading-[1.15] tracking-[-0.01em] text-cream1 mb-3">

        <span className="block anim-ready slide-from-left  delay-2">Civil Engineering</span>
        <span className="block anim-ready slide-from-right delay-3">Association of</span>
        <span className="block italic font-normal
                   anim-ready slide-from-bottom delay-4">Student &amp; Professionals</span>

      </h1>

      {/* <!-- Divider --> */}
      <div className="h-px bg-cream1  mx-auto my-7 divider-anim"></div>

      {/* <!-- Subtitle --> */}
      <p
        className="font-inter text-[11px] font-normal tracking-[0.12em] uppercase  mb-12 mt-4 anim-ready fade-in delay-5">
        CESPA &mdash; Est. Since 2026
      </p>

      {/* <!-- CTAs --> */}
      <div className="flex items-center justify-center gap-8 ">
        <a href="#"
          className="font-inter text-[11px] font-medium tracking-[0.15em] uppercase text-cream1 border border-[#A87040] px-7 py-3  hover:!bg-[#A87040] hover:text-white transition-colors duration-300">
          Explore CESPA
        </a>
        <a href="#"
          className="font-inter text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 flex items-center gap-1.5 group ">
          View Activities
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </div>

    </section>
  )
}


