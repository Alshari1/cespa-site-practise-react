// import { Mail, MapPin, Phone } from 'lucide-react'
import './contact.css';
import './contact.js'

export default function Contacts() {
  return (
    <div className="bg-[#333c3c]">
      <section className="max-w-7xl mx-auto px-10 py-24">

        {/* Top label */}
        <div className="fade-up flex items-center gap-4 mb-6">
          <span className="font-inter text-[12px] uppercase text-gold1 tracking-wide font-medium">
            Get in touch
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-cormorant text-cream1 text-5xl my-6 fade-up">Contact CESPA</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">

          {/* LEFT */}
          <div className="lg:col-span-2 fade-up">

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <p className="info-label">Address</p>
                <p className="info-val">
                  Dept. of Civil Engineering<br />
                  Gopalganj Science &amp; Technology University<br />
                  Gopalganj-8105, Bangladesh
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </div>
              <div>
                <p className="info-label">Email</p>
                <p className="info-val">cespa@GSTU.ac.bd</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.6 10.8a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.59 1 1 0 01-.25 1.02L6.6 10.8z" />
                </svg>
              </div>
              <div>
                <p className="info-label">Phone</p>
                <p className="info-val">+880-41-774780</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <p className="info-label">Department</p>
                <p className="info-val">
                  Civil Engineering<br />
                  GSTU, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-3 fade-up">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-8">
              <div className="field-wrap">
                <label htmlFor="name">Full Name</label>
                <input className="field" id="name" type="text" placeholder="Your name" autoComplete="off" />
              </div>

              <div className="field-wrap">
                <label htmlFor="email">Email Address</label>
                <input className="field" id="email" type="email" placeholder="you@example.com" autoComplete="off" />
              </div>

              <div className="field-wrap col-span-2">
                <label htmlFor="subject">Subject</label>
                <input className="field" id="subject" type="text" placeholder="How can we help?" />
              </div>

              <div className="field-wrap col-span-2">
                <label htmlFor="message">Message</label>
                <textarea className="field" id="message" rows="5" placeholder="Write your message here..."></textarea>
              </div>
            </div>

            {/* Status line */}
            <p id="statusLine" className="text-xs mb-4 h-4" style={{ color: '#999', letterSpacing: '0.08em', fontWeight: 300 }}></p>

            {/* Button */}
            <button className="btn-main" id="sendBtn">
              <div className="btn-progress" id="btnProgress" style={{ width: '0%' }}></div>
              <span id="btnIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </span>
              <span id="btnText">Send Message</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


