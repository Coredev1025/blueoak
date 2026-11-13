import { useReducedMotion, motion } from "framer-motion";
import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { OFFICE } from "../data/visuals.js";
import { SectionHead } from "./Reveal.jsx";
import { MOMENTS } from "../data/content.js";
import React from "react";
function TeamMoments() {
  const reduced = useReducedMotion();
  return (
    <section
      id="moments"
      data-testid="moments-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop
        variant="workspace"
        src={OFFICE.workspace}
        id="moments"
      />
      <div className="section-content page-container">
        <SectionHead
          index="05"
          label="How the work happens"
          title="Ideas argued out loud, together."
          desc="Architecture reviews, product debates and whiteboard sessions \u2014 the daily rhythm of the studio."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {MOMENTS.map((m, i) => (
            <motion.figure
              data-testid={`moment-${m.id}`}
              className={`plate kenburns ${i % 2 ? "kenburns-b" : ""} ${i === 0 ? "md:col-span-4" : "md:col-span-2"} ${i === 1 ? "md:row-span-1" : ""}`}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      scale: 1.04,
                      y: 30,
                    }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: reduced ? 0 : 1,
                delay: reduced ? 0 : i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              key={m.id}
            >
              <img
                src={m.img}
                alt={m.alt}
                loading="lazy"
                width="1264"
                height="848"
              />
              <div className="plate-shade" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="eyebrow">{m.kicker}</p>
                <p
                  data-testid={`moment-caption-${m.id}`}
                  className="mt-2 text-lg font-semibold text-slate-50 sm:text-xl"
                >
                  {m.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <p data-testid="moments-sample-notice" className="sample-note mt-7">
          {"Generated studio imagery \xB7 Illustrative of our working sessions"}
        </p>
      </div>
    </section>
  );
}
export default TeamMoments;
