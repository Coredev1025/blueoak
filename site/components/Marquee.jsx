import { MARQUEE_ITEMS } from "../data/content.js";
import { SectionBackdrop } from "./SectionBackdrop.jsx";
import React from "react";
function Marquee() {
  const row = (hidden) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {MARQUEE_ITEMS.map((item, i) => (
        <span className="flex items-center" key={`${item}-${i}`}>
          <span className="mx-7 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.4em] text-slate-500 sm:mx-10 sm:text-xs">
            {item}
          </span>
          <span className="accent-rule mx-7 h-1.5 w-1.5 rotate-45 sm:mx-10" />
        </span>
      ))}
    </div>
  );
  return (
    <section
      data-testid="marquee-band"
      className="cinematic-section border-y border-white/10 py-6"
    >
      <SectionBackdrop variant="services" id="marquee" />
      <div className="section-content flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
export default Marquee;
