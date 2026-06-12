export default function FeatureCard({ icon, title, desc, idx, isVisible }) {
    const delay = 0.25 + idx * 0.1
    return (
        <div key={title}
            className={`flex flex-col items-center text-center px-4 sm:px-6 py-6 sm:py-10 bg-white hover:bg-[#faf9f7] transition-colors duration-200 wwd-reveal ${isVisible ? 'animate' : ''}`}
            style={{ transitionDelay: `${delay}s` }}>
            <i className={`ti ${icon} text-[26px] text-[#a0724a] mb-4`} aria-hidden="true" />
            <p className="font-['Jost'] text-sm font-medium text-[#2b3232] mb-2">{title}</p>
            <p className="font-['Jost'] text-xs font-light text-[#6a7878] leading-relaxed max-w-[180px]">{desc}</p>
        </div>
    );
}