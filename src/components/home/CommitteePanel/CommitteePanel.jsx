import React, { useEffect, useState } from "react";
import "./committee.css";

// Merged data + icons from committee.js
const members = [
  {
    name: "Tanvir Ahmed",
    role: "Organizing Secretary",
    year: "2nd Year, ME",
    initials: "TA",
    avatarBg: "from-blue-200 to-blue-300",
    facebook: "fb.com/tanvirahmed",
    email: "tanvir@me.buet.ac.bd",
    linkedin: "linkedin.com/in/tanvirahmed",
    image: "https://randomuser.me/api/portraits/men/1.jpg",

  },
  {
    name: "Sara Islam",
    role: "Vice President",
    year: "3rd Year, CSE",
    initials: "SI",
    avatarBg: "from-rose-200 to-pink-300",
    facebook: "fb.com/saraislam",
    email: "sara@cse.buet.ac.bd",
    linkedin: "linkedin.com/in/saraislam",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Rafiq Hasan",
    role: "General Secretary",
    year: "3rd Year, EEE",
    initials: "RH",
    avatarBg: "from-emerald-200 to-teal-300",
    facebook: "fb.com/rafiqhasan",
    email: "rafiq@eee.buet.ac.bd",
    linkedin: "linkedin.com/in/rafiqhasan",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Nadia Chowdhury",
    role: "Treasurer",
    year: "2nd Year, CE",
    initials: "NC",
    avatarBg: "from-violet-200 to-purple-300",
    facebook: "fb.com/nadiac",
    email: "nadia@ce.buet.ac.bd",
    linkedin: "linkedin.com/in/nadiac",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Jahid Alam",
    role: "President",
    year: "4th Year, ME",
    initials: "JA",
    avatarBg: "from-amber-200 to-orange-300",
    facebook: "fb.com/jahidalam",
    email: "jahid@me.buet.ac.bd",
    linkedin: "linkedin.com/in/jahidalam",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Jahid Alam",
    role: "President",
    year: "4th Year, ME",
    initials: "JA",
    avatarBg: "from-amber-200 to-orange-300",
    facebook: "fb.com/jahidalam",
    email: "jahid@me.buet.ac.bd",
    linkedin: "linkedin.com/in/jahidalam",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

const ICONS = {
  facebook:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  email:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>',
  linkedin:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  copy:
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  check:
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
};

export default function CommitteePanel() {
  const [openTip, setOpenTip] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // toggle tooltip for a given tip id
  const toggleTip = (tipId) => {
    setOpenTip((prev) => (prev === tipId ? null : tipId));
  };

  // copy with fallback and show temporary "Copied!" state
  const copyVal = async (text, copyBtnId) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    setCopiedId(copyBtnId);

    setTimeout(() => {
      setCopiedId(null);
      setOpenTip(null);
    }, 150);
  };

  // close on outside click (matches existing site logic)
  useEffect(() => {
    const onDoc = (e) => {
      if (!e.target.closest(".relative")) setOpenTip(null);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <section className="bg-white my-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <p className="font-inter text-[12px] uppercase text-gold1 tracking-wide font-medium mb-4">
              Committee
            </p>
            <h2 className="font-cormorant text-black text-5xl my-6">Meet the Leaders</h2>
          </div>

          <div className="flex items-end pb-4">
            <a
              href="#"
              className="font-inter text-[11px] font-medium tracking-[0.15em] uppercase flex items-center gap-1.5 group text-gold1"
            >
              See All
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>

        {/* GRID */}
        <div id="members-grid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
          {members.map((member, i) => {
            const ids = {
              tipFb: `tip-fb-${i}`,
              tipMail: `tip-mail-${i}`,
              tipLi: `tip-li-${i}`,
              copyFb: `tip-fb-${i}-copy`,
              copyMail: `tip-mail-${i}-copy`,
              copyLi: `tip-li-${i}-copy`,
            };

            return (
              <div key={i} className="relative">
                <div className="bg-white rounded px-5 py-7 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-[0_0_0_1px_#A87040,0_0_0_3px_rgba(168,112,64,0.25)] mb-4 select-none">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>

                  <p className="font-cormorant text-[14px] font-semibold text-gray-900 leading-snug mb-1">{member.name}</p>
                  <p className="font-poppins text-[11.5px] font-medium mb-1">{member.role}</p>
                  <p className="font-poppins text-[11px] text-gray-400 mb-5">{member.year}</p>

                  <div className="flex items-center justify-center gap-2.5">
                    {/* FACEBOOK */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTip(ids.tipFb);
                        }}
                        className={`icon-btn w-9 h-9 rounded-full flex items-center justify-center border border-black/[0.12] bg-white text-gray-500 shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition-all duration-150 outline-none ${
                          openTip === ids.tipFb ? "active" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: ICONS.facebook }}
                      />

                      {openTip === ids.tipFb && (
                        <div className="tip open absolute bottom-[calc(100%+10px)] left-1/2 z-50 bg-white border border-black/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] p-[10px_11px_9px] min-w-[185px] text-left" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-gray-400 mb-2">
                            <span dangerouslySetInnerHTML={{ __html: ICONS.facebook }} />
                            Facebook
                          </div>

                          <button
                            id={ids.copyFb}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyVal(member.facebook, ids.copyFb);
                            }}
                            className={`flex items-center justify-between gap-2 w-full bg-gray-50 hover:bg-blue-50 border border-black/[0.07] hover:border-blue-300 text-gray-800 hover:text-blue-700 rounded-lg px-2.5 py-[7px] font-mono-dm text-[11.5px] transition-colors duration-150 outline-none whitespace-nowrap overflow-hidden ${
                              copiedId === ids.copyFb ? "!bg-green-50 !border-green-400 !text-green-700" : ""
                            }`}
                          >
                            <span className="overflow-hidden text-ellipsis">{copiedId === ids.copyFb ? "Copied!" : member.facebook}</span>
                            <span className="copy-icon flex-shrink-0" dangerouslySetInnerHTML={{ __html: copiedId === ids.copyFb ? ICONS.check : ICONS.copy }} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTip(ids.tipMail);
                        }}
                        className={`icon-btn w-9 h-9 rounded-full flex items-center justify-center border border-black/[0.12] bg-white text-gray-500 shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition-all duration-150 outline-none ${
                          openTip === ids.tipMail ? "active" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: ICONS.email }}
                      />

                      {openTip === ids.tipMail && (
                        <div className="tip open absolute bottom-[calc(100%+10px)] left-1/2 z-50 bg-white border border-black/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] p-[10px_11px_9px] min-w-[185px] text-left" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-gray-400 mb-2">
                            <span dangerouslySetInnerHTML={{ __html: ICONS.email }} />
                            Email
                          </div>

                          <button
                            id={ids.copyMail}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyVal(member.email, ids.copyMail);
                            }}
                            className={`flex items-center justify-between gap-2 w-full bg-gray-50 hover:bg-blue-50 border border-black/[0.07] hover:border-blue-300 text-gray-800 hover:text-blue-700 rounded-lg px-2.5 py-[7px] font-mono-dm text-[11.5px] transition-colors duration-150 outline-none whitespace-nowrap overflow-hidden ${
                              copiedId === ids.copyMail ? "!bg-green-50 !border-green-400 !text-green-700" : ""
                            }`}
                          >
                            <span className="overflow-hidden text-ellipsis">{copiedId === ids.copyMail ? "Copied!" : member.email}</span>
                            <span className="copy-icon flex-shrink-0" dangerouslySetInnerHTML={{ __html: copiedId === ids.copyMail ? ICONS.check : ICONS.copy }} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* LINKEDIN */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTip(ids.tipLi);
                        }}
                        className={`icon-btn w-9 h-9 rounded-full flex items-center justify-center border border-black/[0.12] bg-white text-gray-500 shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition-all duration-150 outline-none ${
                          openTip === ids.tipLi ? "active" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: ICONS.linkedin }}
                      />

                      {openTip === ids.tipLi && (
                        <div className="tip open absolute bottom-[calc(100%+10px)] left-1/2 z-50 bg-white border border-black/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] p-[10px_11px_9px] min-w-[185px] text-left" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-gray-400 mb-2">
                            <span dangerouslySetInnerHTML={{ __html: ICONS.linkedin }} />
                            LinkedIn
                          </div>

                          <button
                            id={ids.copyLi}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyVal(member.linkedin, ids.copyLi);
                            }}
                            className={`flex items-center justify-between gap-2 w-full bg-gray-50 hover:bg-blue-50 border border-black/[0.07] hover:border-blue-300 text-gray-800 hover:text-blue-700 rounded-lg px-2.5 py-[7px] font-mono-dm text-[11.5px] transition-colors duration-150 outline-none whitespace-nowrap overflow-hidden ${
                              copiedId === ids.copyLi ? "!bg-green-50 !border-green-400 !text-green-700" : ""
                            }`}
                          >
                            <span className="overflow-hidden text-ellipsis">{copiedId === ids.copyLi ? "Copied!" : member.linkedin}</span>
                            <span className="copy-icon flex-shrink-0" dangerouslySetInnerHTML={{ __html: copiedId === ids.copyLi ? ICONS.check : ICONS.copy }} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
