import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ProjectRow – one project as an editorial row on a dark navy band: { image, title, industry, challenge, delivered, outcome, url, isConcept, reverse, conceptLabel, challengeLabel, deliveredLabel, outcomeLabel, viewLabel } – outcome block shows only if outcome is set, the link only if url is set, the badge only if isConcept; without image an original UI mockup is drawn */
export default function ProjectRow({ image, title, industry, challenge, delivered, outcome, url, isConcept = false, reverse = false, conceptLabel, challengeLabel, deliveredLabel, outcomeLabel, viewLabel }) {
  const t = {
    row: 'grid items-center gap-8 lg:grid-cols-2 lg:gap-16',
    frame: 'overflow-hidden rounded-2xl border border-white/10 bg-[#0C1F47] shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-accent',
    bar: 'flex gap-1.5 border-b border-white/10 px-4 py-3',
    dot: 'h-2 w-2 rounded-full bg-white/20',
    dotOn: 'h-2 w-2 rounded-full bg-accent',
    tile: 'rounded-lg border border-white/10 bg-white/5 p-3',
    body: 'flex flex-col gap-5 text-start',
    eyebrow: 'text-xs font-bold uppercase tracking-[0.14em] text-accent',
    badge: 'rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 text-xs font-bold text-[#8AD0FF]',
    h3: 'text-[clamp(26px,3.4vw,38px)] font-extrabold leading-tight tracking-[-0.02em] text-white',
    blockH: 'mb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent',
    blockP: 'leading-[1.65] text-[#C9D8F2]',
    link: 'inline-flex items-center gap-2 font-bold text-[#8AD0FF] transition hover:gap-3 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
  };
  const block = (label, text) => text ? (
    <div>
      <h4 className={t.blockH}>{label}</h4>
      <p className={t.blockP}>{text}</p>
    </div>
  ) : null;
  return (
    <motion.article initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className={t.row}>
      <div className={`${t.frame} ${reverse ? 'lg:order-2' : ''}`}>
        <div className={t.bar} aria-hidden="true">
          <span className={t.dot} /><span className={t.dot} /><span className={t.dotOn} />
        </div>
        {image ? <img src={image} alt={title} className="aspect-[16/10] w-full object-cover" /> : (
          <div className="grid aspect-[16/10] grid-cols-3 gap-3 p-5 text-accent" aria-hidden="true">
            {[0, 1, 2].map((i) => <div key={i} className={t.tile}><div className="h-1.5 w-1/2 rounded bg-white/20" /><div className="mt-3 h-3 w-3/4 rounded bg-current opacity-70" /></div>)}
            <svg viewBox="0 0 300 100" className={`col-span-3 h-full w-full p-3 ${t.tile}`} fill="none"><polyline points="0,80 50,60 100,70 160,30 220,45 300,10" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" /></svg>
          </div>
        )}
      </div>
      <div className={t.body}>
        <div className="flex flex-wrap items-center gap-3">
          {industry ? <span className={t.eyebrow}>{industry}</span> : null}
          {isConcept && conceptLabel ? <span className={t.badge}>{conceptLabel}</span> : null}
        </div>
        <h3 className={t.h3}>{title}</h3>
        {block(challengeLabel, challenge)}
        {block(deliveredLabel, delivered)}
        {block(outcomeLabel, outcome)}
        {url && viewLabel ? <a href={url} className={t.link}>{viewLabel}<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></a> : null}
      </div>
    </motion.article>
  );
}
