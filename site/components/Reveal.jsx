import { useReducedMotion, motion } from "framer-motion";
import React from "react";
const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduced ? 0 : 0.8,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
const SplitWords = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.3,
      }}
    >
      {words.map((w, i) => (
        <span
          className="inline-block overflow-hidden pb-1 -mb-1 align-bottom"
          key={i}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: {
                y: "110%",
                opacity: 0,
              },
              show: {
                y: 0,
                opacity: 1,
              },
            }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
const SectionHead = ({ index, label, title, desc }) => (
  <Reveal className="mb-14 flex flex-col gap-7 sm:mb-20 md:flex-row md:items-end md:justify-between">
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-oak-400">
        <span className="text-slate-600">{index}</span>
        <span className="accent-rule h-px w-10" />
        <span>{label}</span>
      </div>
      <h2 className="section-title mt-5 font-display text-slate-50">
        <SplitWords text={title} />
      </h2>
    </div>
    {desc && (
      <p className="max-w-sm text-base leading-relaxed text-slate-400 md:text-right lg:text-lg">
        {desc}
      </p>
    )}
  </Reveal>
);
export { Reveal };
export { SectionHead };
export { SplitWords };
