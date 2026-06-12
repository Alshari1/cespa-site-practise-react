import React, { useEffect } from 'react';

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

const Marquee = () => {

    useEffect(() => {
        const cleanup = startMarquee(".marquee", 1.2);

        return () => {
            if (cleanup) cleanup();
        };
    }, []);


    return (
        <div className="marquee-wrapper shadow-md bg-green1 text-cream1 overflow-hidden">
            <div className="marquee flex gap-4 font-inter uppercase whitespace-nowrap space-x-4 ">
                <span>Notice here.</span>
                <span>Notice here.</span>
                <span>Notice here.</span>
                <span>Notice here.</span>
                <span>Notice here.</span>
            </div>
        </div>
    )
};

export default Marquee;


//

//  