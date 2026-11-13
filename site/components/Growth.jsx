import { GROWTH } from "../data/content.js";
import React, { useRef, useState, useEffect } from "react";
import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { SectionHead } from "./Reveal.jsx";
import { OFFICE } from "../data/visuals.js";
const peak = Math.max(...GROWTH.map((g) => g.people));
const Step = ({ step, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    let frame;
    const start = performance.now();
    const run = (t) => {
      const p = Math.min(1, (t - start) / 1100);
      setCount(Math.round(step.people * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [visible, step.people]);
  return (
    <div
      ref={ref}
      data-testid={`growth-step-${step.year}`}
      className={`growth-step ${visible ? "in" : ""}`}
      style={{
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <p className="eyebrow">{step.year}</p>
      <p
        data-testid={`growth-count-${step.year}`}
        className="growth-count mt-5"
      >
        {String(count).padStart(2, "0")}
      </p>
      <p className="mt-2 text-sm text-slate-400">{"people on the team"}</p>
      <div
        className="growth-bar mt-6"
        style={{
          "--w": `${(step.people / peak) * 100}%`,
        }}
      >
        <span />
      </div>
      <p className="mt-6 text-base leading-relaxed text-slate-300">
        {step.note}
      </p>
    </div>
  );
};
function Growth() {
  return (
    <section
      id="growth"
      data-testid="growth-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="growth" id="growth" />
      <div className="section-content page-container">
        <SectionHead
          index="06"
          label="Our growth"
          title="From two engineers to a studio."
          desc="Every hire added a discipline, not a layer. Here is how BlueOak has grown."
        />
        <figure
          data-testid="growth-group-plate"
          className="plate plate-wide kenburns mb-14"
        >
          <img
            src={OFFICE.group}
            alt="The BlueOak team together in the studio"
            loading="lazy"
            width="1264"
            height="848"
          />
          <div className="plate-shade" aria-hidden="true" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="eyebrow">{"Today"}</p>
            <p className="mt-2 text-xl font-semibold text-slate-50 sm:text-2xl">
              {"Four studios. One engineering floor."}
            </p>
          </figcaption>
        </figure>
        <div className="growth-rail">
          {GROWTH.map((step, i) => (
            <Step step={step} index={i} key={step.year} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Growth;
