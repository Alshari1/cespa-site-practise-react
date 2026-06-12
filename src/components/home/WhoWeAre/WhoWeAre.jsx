import "./WhoWeAre.css";
import { useEffect } from "react";
// import { initScrollAnimation } from "./WhoWeAre";



function initScrollAnimation() {
  const TOTAL_STEPS = 8;
  const PX_PER_STEP = 260;

  const outer = document.getElementById("outer");
  const nudge = document.getElementById("nudge");
  const pipsEl = document.getElementById("pips");

  if (!outer || !nudge || !pipsEl) return;

  const textEls = ["tb0", "tb1", "tb2"].map((id) =>
    document.getElementById(id)
  );

  const cardEls = ["c1", "c2", "c3", "c4"].map((id) =>
    document.getElementById(id)
  );

  const footerEl = document.getElementById("cfooter");

  // Clear old pips if component remounts
  pipsEl.innerHTML = "";

  const pipNodes = [];

  for (let i = 0; i < TOTAL_STEPS; i++) {
    const p = document.createElement("div");
    p.className = "pip";
    pipsEl.appendChild(p);
    pipNodes.push(p);
  }

  const setHeight = () => {
    outer.style.height =
      window.innerHeight + TOTAL_STEPS * PX_PER_STEP + "px";
  };

  setHeight();

  function update() {
    const scrolledIn = window.scrollY - outer.offsetTop;

    const scrolled = Math.max(
      0,
      Math.min(scrolledIn, TOTAL_STEPS * PX_PER_STEP)
    );

    const step = scrolled / PX_PER_STEP;

    nudge.classList.toggle("hidden", step > 0.3);

    pipNodes.forEach((p, i) =>
      p.classList.toggle("active", step > i)
    );

    textEls.forEach((el, i) => {
      el?.classList.toggle("in", step > i);
    });

    cardEls.forEach((el, i) => {
      el?.classList.toggle("in", step > 3 + i);
    });

    footerEl?.classList.toggle("in", step > 7);
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", setHeight);

  update();

  // cleanup
  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", setHeight);
  };
}




export default function AboutSection() {
  useEffect(() => {
    const cleanup = initScrollAnimation();
    return () => cleanup?.();
  }, []);

  return (
    <section id="outer">
      <div id="sticky">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="cards-stage">

            <div className="s-card shadow-lg" id="c1">
              <div className="lbl">Founded</div>
              <div className="accent-bar"></div>
              <div className="num">2026</div>
              <div className="sub">at GSTU, Bangladesh</div>
            </div>

            <div className="s-card shadow-lg" id="c2">
              <div className="lbl">Total Members</div>
              <div className="accent-bar"></div>
              <div className="num">200+</div>
              <div className="sub">active students</div>
            </div>

            <div className="s-card shadow-lg" id="c3">
              <div className="lbl">Advisors</div>
              <div className="accent-bar"></div>
              <div className="num">4+</div>
              <div className="sub">faculty & industry</div>
            </div>

            <div className="s-card shadow-lg" id="c4">
              <div className="lbl">Alumni Network</div>
              <div className="accent-bar"></div>
              <div className="num">100+</div>
              <div className="sub">across the globe</div>
            </div>

          </div>

          <div className="cards-footer text-center lg:ml-10" id="cfooter">
            2025 · GSTU · 1 Chapters
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">

          <div className="font-inter text-[12px] uppercase text-gold1 tracking-wide">
            Who We Are
          </div>

          <h2 className="font-cormorant text-black text-5xl my-6">
            A Community Built on<br />
            Engineering Excellence
          </h2>

          <div
            className="t-block font-poppins border-l-2 border-[#A87040] ps-5 text-justify text-black mt-4"
            id="tb0"
          >
            <div className="mb-2">Our Mission</div>
            <blockquote>
              <p>
                We empower Civil Engineering students, industry pioneers, and young alumni with
                opportunities to grow academically, professionally, and as responsible leaders.
              </p>
            </blockquote>
          </div>

          <div className="t-block text-justify text-black" id="tb1">
            <p>
              Founded at GSTU in 2013, CESPA has grown into one of Bangladesh's most impactful engineering
              student societies — producing award-winning graduates, accomplished civil servants, and
              trailblazing entrepreneurs across the globe.
            </p>
          </div>

          <div className="t-block text-justify text-black" id="tb2">
            <p>
              Our alumni network spans prominent positions in government, NGOs, international firms, and
              research institutions. With a vibrant executive committee, student members participate in
              national competitions, workshops, seminars, research, and community outreach year-round.
            </p>
          </div>

          <div className="progress-bar" id="pips"></div>

          <div className="scroll-nudge" id="nudge">
            scroll to reveal
          </div>

        </div>

      </div>
    </section>
  );
}