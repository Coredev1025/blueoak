import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* SectionHeading – eyebrow, big title and subtitle that open a section: { eyebrow, title, subtitle, align ('start'|'center', default 'start'), dark (boolean, true on navy bands), highlight (optional: a part of the title shown in the blue gradient) } */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'start', dark = false, highlight }) {
  const t = {
    root: 'flex max-w-3xl flex-col gap-4',
    start: 'items-start text-start',
    center: 'mx-auto items-center text-center',
    eyebrow: 'flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-accent',
    rule: 'h-px w-8 bg-gradient-to-r from-primary to-accent',
    h2: 'text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.06] tracking-[-0.02em]',
    h2Light: 'text-text',
    h2Dark: 'text-white',
    p: 'text-[17px] leading-[1.65] md:text-[18px]',
    pLight: 'text-text-secondary',
    pDark: 'text-[#C9D8F2]'
  };
  const center = align === 'center';
  let head = title;
  if (title && highlight && title.indexOf(highlight) !== -1) {
    const i = title.indexOf(highlight);
    head = (
      <>
        {title.slice(0, i)}
        <span className={dark ? 'yb-gradient-text-light' : 'yb-gradient-text'}>{highlight}</span>
        {title.slice(i + highlight.length)}
      </>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${t.root} ${center ? t.center : t.start}`}
    >
      {eyebrow ? (
        <span className={t.eyebrow}>
          <span className={t.rule} aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      {title ? <h2 className={`${t.h2} ${dark ? t.h2Dark : t.h2Light}`}>{head}</h2> : null}
      {subtitle ? <p className={`${t.p} ${dark ? t.pDark : t.pLight}`}>{subtitle}</p> : null}
    </motion.div>
  );
}
