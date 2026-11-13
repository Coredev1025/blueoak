import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { SectionHead } from "./Reveal.jsx";
import { TESTIMONIALS } from "../data/content.js";
import { SectionMotion } from "./SectionMotion.jsx";
import { Quote } from "lucide-react";
import React from "react";
function Testimonials() {
  return (
    <section
      id="voices"
      data-testid="testimonials-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="voices" />
      <div className="section-content page-container">
        <SectionHead
          index="03"
          label="Perspectives"
          title="Good work starts with trust."
        />
        <p
          data-testid="testimonials-sample-notice"
          className="sample-note mb-8"
        >
          {"Sample testimonials \xB7 Awaiting approved client stories"}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <SectionMotion
              kind="voices"
              index={i % 2}
              id={`testimonial-motion-${i}`}
              key={t.name}
            >
              <figure data-testid={`testimonial-${i}`} className="quote-card">
                <Quote size={28} className="text-oak-300" strokeWidth={1.3} />
                <blockquote className="mt-7 text-lg leading-relaxed text-slate-200 sm:text-xl">
                  {"\u201C"}
                  <span
                    style={{
                      display: "contents",
                    }}
                  >
                    {t.quote}
                  </span>
                  {"\u201D"}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-4 pt-9">
                  <span className="quote-initials">{t.initials}</span>
                  <span>
                    <span className="block text-base font-semibold">
                      {t.name}
                    </span>
                    <span className="mt-1 block text-sm text-slate-400">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
