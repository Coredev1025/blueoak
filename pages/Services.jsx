import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code, Globe, Smartphone, Sparkles, Layers, PenTool, Leaf } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import OakBranch from "../components/OakBranch.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Services({ navigateTo }) {
  // ── EDITABLE CONTENT: replace the services and steps below ──
  const services = [
    { id: "custom", n: "01", title: "Custom Software Development", featured: true, art: "modules", icon: Code,
      text: "Off-the-shelf tools rarely fit how your team actually works. We design and build software around your processes so it grows with you." },
    { id: "web", n: "02", title: "Web Application Development", icon: Globe,
      text: "Browser-based tools get slow and tangled as usage grows. We build fast, maintainable web applications with clear architecture and dependable integrations." },
    { id: "mobile", n: "03", title: "Mobile App Development", icon: Smartphone,
      text: "Good ideas lose people when the mobile experience feels like an afterthought. We build polished iOS and Android apps that feel native and stay easy to extend." },
    { id: "ai", n: "04", title: "AI and Automation", featured: true, art: "flow", icon: Sparkles,
      text: "Repetitive work drains your team's time and attention. We design AI-assisted workflows and automations that handle routine steps and keep people in control of decisions." },
    { id: "saas", n: "05", title: "SaaS Product Development", icon: Layers,
      text: "Turning an idea into a subscription product takes more than a list of features. We shape, build and prepare SaaS platforms with accounts, billing and a roadmap ready for growth." },
    { id: "design", n: "06", title: "Product Design and Integrations", icon: PenTool,
      text: "Disconnected tools and unclear interfaces slow every user down. We design coherent product experiences and connect them to the systems you already rely on." }
  ];
  const steps = [
    { n: "01", title: "Discover", text: "Align on the problem, users, and priorities." },
    { n: "02", title: "Design", text: "Shape the experience and validate the direction." },
    { n: "03", title: "Build", text: "Develop, review, and refine the product." },
    { n: "04", title: "Launch & Evolve", text: "Release, learn, and plan the next improvements." }
  ];
  // leaves on the process branch (position classes, rotation in degrees)
  const twigLeaves = [
    { pos: "start-[21.5%] top-[6px]", r: -40, d: 0.5 },
    { pos: "start-[33.5%] top-[58px]", r: 40, d: 0.7 },
    { pos: "start-[58.5%] top-[6px]", r: -40, d: 0.9 },
    { pos: "start-[83.5%] top-[58px]", r: 40, d: 1.1 },
    { pos: "start-[92.5%] top-[12px]", r: -30, d: 1.3 }
  ];
  const seamLeaves = [
    { pos: "start-[22%] bottom-[24%]", r: -55, d: 0.6 },
    { pos: "start-[52%] bottom-[54%]", r: -55, d: 0.9 },
    { pos: "start-[78%] bottom-[80%]", r: -55, d: 1.2 }
  ];

  const t = {
    page: "relative overflow-x-clip bg-surface",
    wrap: "mx-auto max-w-[1200px] px-5 md:px-8",
    hero: "relative overflow-hidden pb-10 pt-16 md:pb-14 md:pt-28",
    arc: "pointer-events-none absolute -end-24 -top-20 h-[420px] w-[420px] text-accent opacity-20 md:h-[560px] md:w-[560px] rtl:-scale-x-100",
    eyebrow: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-accent",
    eyebrowRule: "h-px w-8 bg-gradient-to-r from-primary to-accent",
    h1: "mt-5 max-w-3xl text-[clamp(38px,6vw,68px)] font-extrabold leading-[1.04] tracking-[-0.02em] text-text",
    lead: "mt-6 max-w-xl text-[17px] leading-[1.65] text-text-secondary md:text-[18px]",
    branch: "mt-10 h-16 w-full max-w-xl text-accent rtl:-scale-x-100",
    gridSection: "relative py-12 md:py-20",
    grid: "grid items-stretch gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4",
    card: "group relative flex h-full flex-col overflow-hidden rounded-card-radius border border-card-border bg-card-bg p-6 shadow-shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_0_1px_var(--accent),0_18px_44px_rgba(0,143,240,0.2)] focus-within:border-accent md:p-8",
    cardNum: "text-xs font-bold uppercase tracking-[0.14em] text-accent",
    cardTitle: "mt-5 text-[clamp(21px,2.2vw,26px)] font-extrabold leading-tight tracking-[-0.01em] text-text",
    cardText: "mt-3 text-[16px] leading-[1.65] text-text-secondary",
    iconBox: "flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary transition duration-300 group-hover:border-accent group-hover:bg-primary group-hover:text-primary-text",
    artBox: "mb-6 overflow-hidden rounded-xl border border-border bg-surface-2 p-3",
    process: "relative bg-background pb-32 pt-20 md:pb-52 md:pt-32",
    processBody: "relative mt-14 md:mt-20",
    lineSvg: "pointer-events-none absolute inset-x-0 top-0 hidden h-20 w-full text-accent rtl:-scale-x-100 lg:block",
    twigLeaf: "pointer-events-none absolute hidden h-3.5 w-5 origin-left text-accent lg:block",
    dot: "pointer-events-none absolute top-[40px] z-20 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_4px_rgba(0,143,240,0.55)] lg:block",
    vLine: "absolute bottom-7 start-[27px] top-7 w-px origin-top bg-accent opacity-50 lg:hidden",
    stepList: "relative grid gap-10 lg:grid-cols-4 lg:gap-6",
    step: "flex items-start gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center",
    badge: "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-card-bg text-base font-extrabold text-primary shadow-shadow-sm",
    stepTitle: "text-xl font-extrabold tracking-[-0.01em] text-text",
    stepText: "mt-1.5 max-w-[16rem] leading-[1.6] text-text-secondary",
    seamTriangle: "pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-[#091A3A] [clip-path:polygon(0_100%,100%_0,100%_100%)] md:h-24",
    seamBox: "pointer-events-none absolute inset-x-0 bottom-0 h-14 text-accent md:h-24",
    seamLeaf: "absolute h-3.5 w-5 origin-left text-accent"
  };

  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const draw = { initial: { pathLength: reduce ? 1 : 0 }, whileInView: { pathLength: 1 }, viewport: { once: true, margin: "-60px" }, transition: { duration: reduce ? 0 : 1.6, ease: "easeInOut" } };

  const Leaf = ({ className, rotate, delay }) => (
    <motion.svg
      viewBox="0 0 24 18"
      className={className}
      style={{ rotate: rotate }}
      initial={{ opacity: reduce ? 0.7 : 0, scale: reduce ? 1 : 0.4 }}
      whileInView={{ opacity: 0.7, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay }}
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 9C5 0 17 0 24 9C17 18 5 18 0 9Z" fill="currentColor" />
    </motion.svg>
  );

  const ModuleArt = () => (
    <svg viewBox="0 0 400 160" className="h-auto w-full" fill="none" role="img" aria-label="Code editor connected to software modules">
      <rect x="12" y="14" width="172" height="132" rx="10" fill="#fff" stroke="#BBD6F5" />
      <circle cx="28" cy="30" r="3" fill="#BBD6F5" /><circle cx="40" cy="30" r="3" fill="#BBD6F5" /><circle cx="52" cy="30" r="3" fill="#008FF0" />
      <line x1="12" y1="42" x2="184" y2="42" stroke="#D6E6FA" />
      {[[26, 56, 70, "#1244AD"], [38, 72, 100, "#BBD6F5"], [38, 88, 64, "#008FF0"], [38, 104, 88, "#BBD6F5"], [26, 120, 48, "#1244AD"]].map((l, i) => (
        <rect key={i} x={l[0]} y={l[1]} width={l[2]} height="6" rx="3" fill={l[3]} />
      ))}
      {[18, 65, 112].map((y, i) => (
        <g key={y}>
          <motion.path d={`M184 80 C218 80 218 ${y + 15} 250 ${y + 15}`} stroke="#008FF0" strokeWidth="1.5" {...draw} />
          <rect x="250" y={y} width="138" height="30" rx="8" fill="#fff" stroke="#BBD6F5" />
          <rect x="262" y={y + 11} width={[54, 70, 44][i]} height="8" rx="4" fill="#1244AD" />
          <circle cx="372" cy={y + 15} r="4" fill="#008FF0" />
        </g>
      ))}
    </svg>
  );

  const FlowArt = () => (
    <svg viewBox="0 0 400 160" className="h-auto w-full" fill="none" role="img" aria-label="Automation workflow with connected steps">
      {["M86 80 C118 80 118 38 150 38", "M86 80 C118 80 118 122 150 122", "M230 38 C272 38 272 80 314 80", "M230 122 C272 122 272 80 314 80"].map((d) => (
        <motion.path key={d} d={d} stroke="#008FF0" strokeWidth="1.5" {...draw} />
      ))}
      {[[16, 60, 70, 40], [150, 20, 80, 36], [150, 104, 80, 36], [314, 60, 70, 40]].map((r, i) => (
        <g key={i}>
          <rect x={r[0]} y={r[1]} width={r[2]} height={r[3]} rx="9" fill="#fff" stroke={i === 3 ? "#1244AD" : "#BBD6F5"} strokeWidth={i === 3 ? 1.5 : 1} />
          <rect x={r[0] + 12} y={r[1] + r[3] / 2 - 4} width={r[2] - 40} height="8" rx="4" fill={i === 0 || i === 3 ? "#1244AD" : "#BBD6F5"} />
          <circle cx={r[0] + r[2] - 14} cy={r[1] + r[3] / 2} r="4" fill="#008FF0" />
        </g>
      ))}
      {!reduce && (
        <circle r="4" fill="#008FF0">
          <animateMotion dur="3.4s" repeatCount="indefinite" path="M86 80 C118 80 118 38 150 38 L230 38 C272 38 272 80 314 80" />
        </circle>
      )}
    </svg>
  );

  const Card = ({ s, i }) => {
    const Icon = s.icon;
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
        className={s.featured ? "md:col-span-2" : ""}
      >
        <div className={t.card}>
          {s.featured && (
            <div className={t.artBox}>
              {s.art === "modules" ? <ModuleArt /> : <FlowArt />}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className={t.iconBox}><Icon size={22} aria-hidden="true" /></div>
            <span className={t.cardNum}>{s.n}</span>
          </div>
          <h3 className={t.cardTitle}>{s.title}</h3>
          <p className={t.cardText}>{s.text}</p>
        </div>
      </motion.article>
    );
  };

  return (
    <div className={t.page}>
      <section className={t.hero}>
        <OakBranch variant="arc" className={t.arc} />
        <div className={t.wrap}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className={t.eyebrow}><span className={t.eyebrowRule} aria-hidden="true" />Services</span>
            <h1 className={t.h1}>From first idea to <span className="yb-gradient-text">working product.</span></h1>
            <p className={t.lead}>Six ways we help teams design, build and grow software that fits their business.</p>
          </motion.div>
          <OakBranch variant="branch" className={t.branch} fit="xMinYMid meet" />
        </div>
      </section>

      <section className={t.gridSection} aria-label="Our services">
        <div className={t.wrap}>
          <div className={t.grid}>
            {services.map((s, i) => <Card key={s.id} s={s} i={i} />)}
          </div>
        </div>
      </section>

      <section className={t.process}>
        <div className={t.wrap}>
          <SectionHeading eyebrow="Process" title="A clear path from idea to launch." highlight="idea to launch" subtitle="Four steps, one continuous thread — from the first conversation to the next release." />
          <div className={t.processBody}>
            <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className={t.lineSvg} fill="none" aria-hidden="true">
              <motion.path d="M125 40 H875" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" {...draw} />
              {["M125 40 C170 40 170 14 215 14", "M250 40 C290 40 290 66 335 66", "M500 40 C540 40 540 14 585 14", "M750 40 C790 40 790 66 835 66", "M875 40 C900 40 900 20 925 20"].map((d) => (
                <motion.path key={d} d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" vectorEffect="non-scaling-stroke" {...draw} />
              ))}
            </svg>
            {twigLeaves.map((l) => (
              <Leaf key={l.pos} className={t.twigLeaf + " " + l.pos} rotate={l.r} delay={l.d} />
            ))}
            {!reduce && (
              <motion.span
                className={t.dot}
                initial={{ left: "12.5%" }}
                animate={{ left: ["12.5%", "87.5%"] }}
                transition={{ duration: 6, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                aria-hidden="true"
              />
            )}
            <motion.div
              className={t.vLine}
              initial={{ scaleY: reduce ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 1.4 }}
              aria-hidden="true"
            />
            <ol className={t.stepList}>
              {steps.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={t.step}
                >
                  <div className="flex shrink-0 items-center lg:h-20"><span className={t.badge}>{s.n}</span></div>
                  <div>
                    <h3 className={t.stepTitle}>{s.title}</h3>
                    <p className={t.stepText}>{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
        <div className={t.seamTriangle} aria-hidden="true" />
        <div className={t.seamBox} aria-hidden="true">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
            <motion.path d="M0 100 L1000 0" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" {...draw} />
          </svg>
          {seamLeaves.map((l) => (
            <Leaf key={l.pos} className={t.seamLeaf + " " + l.pos} rotate={l.r} delay={l.d} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Let's build your next chapter."
        text="Tell us what you're planning and what you need your software to achieve."
        buttonLabel="Discuss your project"
        onClick={() => navigateTo("Contact")}
      />
    </div>
  );
}
