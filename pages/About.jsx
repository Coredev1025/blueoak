import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Compass, Hammer } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import OakBranch from "../components/OakBranch.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function About({ navigateTo }) {
  const editableCopy = {
    eyebrow: "About BlueOak Software LLC",
    titleLine1: "Thoughtful software.",
    titleLine2: "Built for what's next.",
    statement: "BlueOak Software LLC brings a considered approach to digital products: understand the problem, design with purpose, and build with care.",
    principlesEyebrow: "How we think",
    principlesTitle: "Three principles, one way of working.",
    principlesSubtitle: "Everything we make starts from the same short idea.",
    principles: [
      { n: "01", icon: Search, title: "Understand the problem", text: "We start by learning what your business, your users and your priorities really need, before anything is designed or built." },
      { n: "02", icon: Compass, title: "Design with purpose", text: "Every screen, flow and decision earns its place by serving a clear goal." },
      { n: "03", icon: Hammer, title: "Build with care", text: "Careful, reviewed engineering, so the product you launch is one you can rely on and keep improving." }
    ],
    ctaTitle: "Let's build your next chapter.",
    ctaText: "Tell us what you're planning and what you need your software to achieve.",
    ctaButton: "Discuss your project"
  };

  const t = {
    wrap: "mx-auto max-w-[1200px] px-5 md:px-8",
    heroSection: "relative overflow-hidden bg-background pb-16 pt-16 md:pb-28 md:pt-28",
    arc: "pointer-events-none absolute -end-40 -top-24 h-[560px] w-[560px] text-accent opacity-15 rtl:-scale-x-100 md:h-[720px] md:w-[720px]",
    eyebrow: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-accent",
    rule: "h-px w-8 bg-gradient-to-r from-primary to-accent",
    h1: "mt-6 text-[clamp(44px,8vw,96px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-text",
    branch: "mt-10 h-auto w-full text-accent md:mt-16",
    statementSection: "relative bg-surface-2 py-20 md:py-32",
    statement: "border-s-2 border-accent ps-6 text-[clamp(24px,3vw,36px)] font-semibold leading-[1.3] tracking-[-0.01em] text-text md:ps-8",
    diagramFrame: "overflow-hidden rounded-2xl border border-white/10 bg-[#091A3A] p-4 shadow-xl md:p-6",
    principlesSection: "relative bg-background pt-20 md:pt-32",
    card: "group relative flex h-full flex-col gap-5 rounded-card-radius border border-card-border bg-card-bg p-7 shadow-card-shadow transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-card-hover-shadow md:p-8",
    iconBox: "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-sm",
    num: "font-heading text-5xl font-extrabold tracking-[-0.03em] text-surface-3",
    cardTitle: "text-2xl font-extrabold tracking-[-0.02em] text-text",
    cardText: "text-[17px] leading-[1.65] text-text-secondary",
    seam: "relative mt-16 h-16 md:mt-28 md:h-24",
    seamFill: "absolute inset-0 bg-[#091A3A]",
    seamBranch: "pointer-events-none absolute inset-0 h-full w-full text-accent opacity-80"
  };

  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const layers = [
    { label: "INTERFACE", y: 40, xs: [60, 192, 324] },
    { label: "LOGIC", y: 190, xs: [60, 192, 324] },
    { label: "FOUNDATION", y: 340, xs: [126, 258] }
  ];
  const links = [
    [0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 0, 1],
    [1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 2, 1]
  ];
  const mw = 96;
  const linkPath = (l) => {
    const [from, i, j] = l;
    const x1 = layers[from].xs[i] + mw / 2;
    const y1 = layers[from].y + 86;
    const x2 = layers[from + 1].xs[j] + mw / 2;
    const y2 = layers[from + 1].y + 46;
    return `M${x1} ${y1} C${x1} ${y1 + 55} ${x2} ${y2 - 55} ${x2} ${y2}`;
  };

  return (
    <div>
      <section className={t.heroSection}>
        <OakBranch variant="arc" pulse={false} className={t.arc} />
        <div className={`${t.wrap} relative`}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <span className={t.eyebrow}>
              <span className={t.rule} aria-hidden="true" />
              {editableCopy.eyebrow}
            </span>
            <h1 className={t.h1}>
              {editableCopy.titleLine1}
              <br />
              <span className="yb-gradient-text">{editableCopy.titleLine2}</span>
            </h1>
          </motion.div>
          <OakBranch variant="branch" className={t.branch} />
        </div>
      </section>

      <section className={t.statementSection}>
        <div className={`${t.wrap} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="lg:col-span-7">
            <p className={t.statement}>{editableCopy.statement}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="lg:col-span-5">
            <div className={t.diagramFrame}>
              <svg viewBox="0 0 480 470" className="h-auto w-full text-accent" fill="none" role="img" aria-label="Layered system diagram of connected modules">
                {layers.map((layer) => (
                  <g key={layer.label}>
                    <rect x="40" y={layer.y} width="400" height="110" rx="16" fill="#fff" fillOpacity="0.03" stroke="#fff" strokeOpacity="0.12" />
                    <text x="60" y={layer.y + 26} fill="#8FB4E8" fontSize="11" fontWeight="700" letterSpacing="2">{layer.label}</text>
                    {layer.xs.map((x, mi) => (
                      <g key={x}>
                        <rect x={x} y={layer.y + 46} width={mw} height="40" rx="8" fill={mi === 0 ? "#008FF0" : "#fff"} fillOpacity={mi === 0 ? 0.22 : 0.06} stroke={mi === 0 ? "#008FF0" : "#fff"} strokeOpacity={mi === 0 ? 0.8 : 0.18} />
                        <rect x={x + 12} y={layer.y + 58} width={mi === 0 ? 44 : 32} height="5" rx="2.5" fill="#fff" fillOpacity="0.5" />
                        <rect x={x + 12} y={layer.y + 70} width="60" height="4" rx="2" fill="#fff" fillOpacity="0.2" />
                      </g>
                    ))}
                  </g>
                ))}
                {links.map((l, i) => (
                  <motion.path key={i} d={linkPath(l)} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3 + i * 0.12 }} />
                ))}
                {!reduce ? [links[0], links[4]].map((l, i) => (
                  <circle key={i} r="4" fill="#BFE6FF">
                    <animateMotion dur="4s" begin={`${i * 1.6}s`} repeatCount="indefinite" path={linkPath(l)} />
                  </circle>
                )) : null}
                <rect x="40" y="455" width="400" height="1.5" rx="1" fill="currentColor" opacity="0.35" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={t.principlesSection}>
        <div className={t.wrap}>
          <SectionHeading eyebrow={editableCopy.principlesEyebrow} title={editableCopy.principlesTitle} subtitle={editableCopy.principlesSubtitle} highlight="one way of working" />
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {editableCopy.principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.n} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.12 }} className={i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}>
                  <article className={t.card}>
                    <div className="flex items-start justify-between">
                      <span className={t.iconBox}><Icon size={22} aria-hidden="true" /></span>
                      <span className={t.num} aria-hidden="true">{p.n}</span>
                    </div>
                    <h3 className={t.cardTitle}>{p.title}</h3>
                    <p className={t.cardText}>{p.text}</p>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className={t.seam}>
          <div className={t.seamFill} style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
          <OakBranch variant="seam" pulse={false} className={t.seamBranch} />
        </div>
      </section>

      <CtaBand title={editableCopy.ctaTitle} text={editableCopy.ctaText} buttonLabel={editableCopy.ctaButton} onClick={() => navigateTo("Contact")} />
    </div>
  );
}
