import { useEffect } from 'react';

function startMarquee(selector, speed = 1.2) {
    const parent = document.querySelector(selector);

    if (!parent) return;

    const containerWidth = parent.parentElement.offsetWidth;
    let position = containerWidth;

    let animationFrame;

    const animate = () => {
        position -= speed;

        if (position < -parent.offsetWidth) {
            position = containerWidth;
        }

        parent.style.transform = `translateX(${position}px)`;

        animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
}

const notices = [
  { id: 1, text: '📢 Fresher Welcome 2026 — January 15' },
  { id: 2, text: '🏗️ Civil Tech Fest registrations open' },
  { id: 3, text: '📝 Workshop on Structural Analysis — Jan 20' },
  { id: 4, text: '🎓 Mentorship program applications due Jan 25' },
  { id: 5, text: '🔬 Research Symposium — Call for Papers' },
]

const Marquee = () => {

    useEffect(() => {
        const cleanup = startMarquee(".marquee", 1.2);

        return () => {
            if (cleanup) cleanup();
        };
    }, []);


    return (
        <div className="marquee-wrapper w-full overflow-hidden py-[15px] shadow-md bg-green1 text-cream1 flex items-center">
            <div className="marquee inline-flex whitespace-nowrap will-change-transform gap-4 font-poppins text-sm">
                {notices.map((n) => (
                  <span key={n.id}>{n.text}</span>
                ))}
            </div>
        </div>
    )
};

export default Marquee;