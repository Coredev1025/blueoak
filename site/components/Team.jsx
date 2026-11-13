import React, { useState, useEffect, useRef } from "react";
import { TEAM, COMPANY } from "../data/content.js";
import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { SectionHead } from "./Reveal.jsx";
import { SectionMotion } from "./SectionMotion.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, ArrowUpRight } from "lucide-react";
function Team() {
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    dialogRef.current?.querySelector("button")?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll("button, a[href]");
      if (!controls?.length) return;
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus({
        preventScroll: true,
      });
    };
  }, [active]);
  const member = TEAM.find((m) => m.id === active);
  return (
    <section
      id="team"
      data-testid="team-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="team" />
      <div className="section-content page-container">
        <SectionHead
          index="04"
          label="The people behind BlueOak"
          title="Eleven specialists. One shared standard."
          desc="Engineers, designers and strategists across the US and Europe. Tap a portrait to meet them."
        />
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <SectionMotion
              kind="team"
              index={i % 4}
              id={`team-motion-${m.id}`}
              key={m.id}
            >
              <button
                type="button"
                data-testid={`team-member-${i}`}
                data-cursor="card"
                data-cursor-label="Meet"
                onClick={() => setActive(m.id)}
                aria-label={`Read about ${m.name}`}
                className="team-portrait group block w-full text-left"
              >
                <div className="portrait-frame">
                  <img
                    data-testid={`team-photo-${m.id}`}
                    src={m.img}
                    alt={m.name}
                    width="600"
                    height="750"
                    loading="lazy"
                  />
                  <span className="portrait-shine" aria-hidden="true" />
                </div>
                <div className="mt-6 border-t border-white/15 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      data-testid={`team-name-${m.id}`}
                      className="text-xl font-semibold tracking-tight text-slate-50"
                    >
                      {m.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-oak-300"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p
                    data-testid={`team-role-${m.id}`}
                    className="mt-2 text-sm text-slate-400"
                  >
                    {m.role}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    {m.base}
                  </p>
                </div>
              </button>
            </SectionMotion>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {member && (
          <motion.div
            data-testid="team-spotlight-overlay"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setActive(null)}
          >
            <motion.div
              ref={dialogRef}
              data-lenis-prevent
              data-testid="team-spotlight-panel"
              role="dialog"
              aria-modal="true"
              aria-label={`${member.name} — ${member.role}`}
              className="spotlight-panel grid w-full max-w-4xl grid-cols-1 gap-8 p-6 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] sm:p-9"
              initial={{
                opacity: 0,
                y: 36,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 24,
                scale: 0.97,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="spotlight-photo">
                <img
                  src={member.img}
                  alt={member.name}
                  width="600"
                  height="750"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{member.role}</p>
                    <h3
                      data-testid="spotlight-name"
                      className="mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
                    >
                      {member.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    data-testid="spotlight-close"
                    data-cursor="link"
                    onClick={() => setActive(null)}
                    aria-label="Close"
                    className="rounded-full border border-white/15 p-2.5 text-slate-400 transition-colors hover:border-oak-500 hover:text-oak-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  <span
                    style={{
                      display: "contents",
                    }}
                  >
                    {member.base}
                  </span>
                  {" studio"}
                </p>
                <p
                  data-testid="spotlight-bio"
                  className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg"
                >
                  {member.bio}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {member.focus.map((f) => (
                    <li
                      className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400"
                      key={f}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`For ${member.name}`)}`}
                  data-testid="spotlight-contact"
                  data-cursor="link"
                  className="text-link mt-8"
                >
                  {"Reach "}
                  <span
                    style={{
                      display: "contents",
                    }}
                  >
                    {member.name.split(" ")[0]}
                  </span>{" "}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default Team;
