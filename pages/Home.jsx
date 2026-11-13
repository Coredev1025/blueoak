import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Sparkles, Globe, Smartphone, Layers, Puzzle } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import OakBranch from "../components/OakBranch.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { sdk } from "../runtime/data.js";

export default function Home({ navigateTo }) {
  const t = {
    wrap: "mx-auto max-w-[1200px] px-5 md:px-8",
    btnPrimary: "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,143,240,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    btnOutline: "inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    linkLight: "inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3 hover:text-accent",
    card: "group relative flex flex-col rounded-2xl border border-[#D6E6FA] bg-surface p-7 shadow-[0_10px_34px_rgba(9,26,58,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#008FF0] hover:shadow-[0_18px_44px_rgba(18,68,173,0.14)]",
    cardPale: "group relative flex flex-col overflow-hidden rounded-2xl border border-[#BBD7F5] bg-[#EAF5FF] p-7 text-[#152440] shadow-[0_10px_34px_rgba(9,26,58,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(18,68,173,0.16)] md:p-9",
    cardNavy: "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#091A3A] p-7 text-white shadow-[0_18px_44px_rgba(9,26,58,0.25)] transition duration-300 hover:-translate-y-1 md:p-9",
    icon: "flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5FF] text-[#1244AD]",
    iconDark: "flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#6CC4FF]",
    kpi: "rounded-lg border border-white/10 bg-white/5 p-2.5",
    skel: "h-72 animate-pulse rounded-2xl border border-white/10 bg-white/5"
  };

  const reduced = useMemo(() => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await sdk.getPublicAll("Project", { limit: 2, sort: { field: "sortOrder", direction: "asc" } });
        if (alive) setProjects(res.data || []);
      } catch (e) {
        if (alive) setProjects([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const go = (name) => (e) => { e.preventDefault(); navigateTo(name); };

  const concepts = [
    { id: "c1", title: "Operations command center", industry: "Logistics", challenge: "Teams juggling spreadsheets, inboxes and status calls need one clear view of what is happening right now.", delivered: "A concept for a unified dashboard with live status, smart alerts and role-based views.", isConcept: true },
    { id: "c2", title: "Client onboarding portal", industry: "Professional services", challenge: "Onboarding new clients by email means lost documents, repeated questions and slow starts.", delivered: "A concept for a guided portal with secure uploads, progress tracking and automated reminders.", isConcept: true }
  ];
  const usingConcepts = !loading && projects.length === 0;
  const shown = projects.length ? projects : (loading ? [] : concepts);

  const services = [
    { id: "custom", icon: Code, title: "Custom Software Development", featured: "pale", text: "Off-the-shelf tools rarely fit the way your business really works. We design and build software around your processes, so your team spends less time on workarounds and more on what matters." },
    { id: "ai", icon: Sparkles, title: "AI and Automation", featured: "navy", text: "Repetitive work slows good people down. We apply AI and automation where it genuinely helps, from routing to summarising to extracting data, and keep people in control of the decisions." },
    { id: "web", icon: Globe, title: "Web Application Development", text: "Complex workflows deserve more than a patchwork of plugins. We build fast, secure web applications your team and customers can rely on every day." },
    { id: "mobile", icon: Smartphone, title: "Mobile App Development", text: "Your users expect a polished experience in their pocket. We build mobile apps that feel native, stay reliable and connect cleanly to your systems." },
    { id: "saas", icon: Layers, title: "SaaS Product Development", text: "Turning an idea into a subscription product takes more than code. We shape the product, build the foundation and prepare it to grow." },
    { id: "design", icon: Puzzle, title: "Product Design and Integrations", text: "Great software must be clear to use and connect to the tools you already have. We design the experience and wire it into your existing systems and data." }
  ];

  const steps = [
    { n: "01", title: "Discover", text: "Align on the problem, users, and priorities." },
    { n: "02", title: "Design", text: "Shape the experience and validate the direction." },
    { n: "03", title: "Build", text: "Develop, review, and refine the product." },
    { n: "04", title: "Launch & Evolve", text: "Release, learn, and plan the next improvements." }
  ];

  const seam = (fill) => (
    <svg className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full md:h-20 ${fill}`} viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="0,81 1200,10 1200,81" fill="currentColor" />
      <motion.path d="M0 80 L1200 10" stroke="#008FF0" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
      <motion.path d="M760 31 L840 52 L900 48" stroke="#008FF0" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />
    </svg>
  );

  const leaf = (x, y, r, s, k) => (
    <path key={k} d="M0 0C5-9 17-9 24 0C17 9 5 9 0 0Z" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill="currentColor" opacity="0.6" />
  );
  const leaves = (list, p) => list.map((l, i) => leaf(l[0], l[1], l[2], l[3], p + i));

  const pulse = (id, dur) => reduced ? null : (
    <g>
      <circle r="9" fill="#008FF0" opacity="0.25"><animateMotion dur={dur} repeatCount="indefinite"><mpath href={"#" + id} /></animateMotion></circle>
      <circle r="3.5" fill="#8AD0FF"><animateMotion dur={dur} repeatCount="indefinite"><mpath href={"#" + id} /></animateMotion></circle>
    </g>
  );

  const float = (key, cls, rot, delay, children) => (
    <motion.div key={key} className={cls} animate={reduced ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}>
      <div className={rot}>{children}</div>
    </motion.div>
  );

  const miniCode = () => (
    <div className="mt-8 space-y-2 rounded-xl border border-[#BBD7F5] bg-white/70 p-4" aria-hidden="true">
      {[["w-1/3", "bg-[#1244AD]"], ["w-2/3", "bg-[#008FF0]/60"], ["w-1/2", "bg-[#152440]/20"], ["w-3/4", "bg-[#008FF0]/40"], ["w-2/5", "bg-[#152440]/20"]].map((r, i) => (
        <div key={i} className={`flex items-center gap-3 ${i === 2 || i === 4 ? "ps-6" : ""}`}>
          <span className="w-4 text-[10px] text-[#152440]/40">{i + 1}</span>
          <span className={`h-2 rounded-full ${r[0]} ${r[1]}`} />
        </div>
      ))}
    </div>
  );

  const miniFlow = () => (
    <svg viewBox="0 0 300 70" className="mt-8 w-full text-[#008FF0]" fill="none" aria-hidden="true">
      <motion.path id="fp1" d="M80 35 H110 M190 35 H220" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
      {[0, 110, 220].map((x, i) => (
        <g key={x}>
          <rect x={x} y="15" width="80" height="40" rx="10" stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.05)" />
          <rect x={x + 14} y="29" width={i === 1 ? 52 : 36} height="5" rx="2.5" fill="currentColor" opacity={i === 1 ? 0.9 : 0.5} />
          <rect x={x + 14} y="40" width="26" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
        </g>
      ))}
    </svg>
  );

  const serviceCard = (s, i) => {
    const Icon = s.icon;
    const navy = s.featured === "navy";
    const cls = s.featured ? (navy ? t.cardNavy : t.cardPale) : t.card;
    return (
      <motion.article key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: (i % 4) * 0.06 }} className={`${cls} ${s.featured ? "lg:col-span-6" : "sm:col-span-6 lg:col-span-3"} col-span-12`}>
        <div className={navy ? t.iconDark : t.icon}><Icon size={22} aria-hidden="true" /></div>
        <h3 className={`mt-5 font-extrabold tracking-[-0.01em] ${s.featured ? "text-2xl md:text-3xl" : "text-xl"} ${navy ? "text-white" : s.featured ? "text-[#091A3A]" : "text-text"}`}>{s.title}</h3>
        <p className={`mt-3 leading-[1.65] ${navy ? "text-[#C9D8F2]" : s.featured ? "text-[#152440]" : "text-text-secondary"}`}>{s.text}</p>
        {s.id === "custom" ? miniCode() : null}
        {s.id === "ai" ? miniFlow() : null}
      </motion.article>
    );
  };

  const dashboard = (
    <div className="rounded-2xl border border-white/10 bg-[#0C1F47] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3" aria-hidden="true">
        <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-[#008FF0]" /></div>
        <span className="rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-semibold text-[#C9D8F2]">Overview · Last 30 days</span>
      </div>
      <div className="p-4 md:p-5" aria-hidden="true">
        <div className="grid grid-cols-3 gap-2.5">
          {[["Requests", "24.8k", "+12%"], ["Latency", "182 ms", "-8%"], ["Errors", "0.4%", "-0.1%"]].map((k) => (
            <div key={k[0]} className={t.kpi}>
              <div className="text-[10px] text-[#8FA6CC]">{k[0]}</div>
              <div className="mt-1 text-base font-extrabold text-white md:text-lg">{k[1]}</div>
              <div className="text-[10px] font-semibold text-[#6CC4FF]">{k[2]}</div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 320 110" className="mt-4 h-28 w-full" fill="none">
          <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#008FF0" stopOpacity="0.35" /><stop offset="1" stopColor="#008FF0" stopOpacity="0" /></linearGradient></defs>
          {[25, 55, 85].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" />)}
          <path d="M0 90 C30 80 50 85 80 60 S130 70 160 45 S220 55 250 25 S300 30 320 12 L320 110 L0 110 Z" fill="url(#hg)" />
          <motion.path d="M0 90 C30 80 50 85 80 60 S130 70 160 45 S220 55 250 25 S300 30 320 12" stroke="#008FF0" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.4 }} />
          <circle cx="320" cy="12" r="4" fill="#8AD0FF" />
        </svg>
        <div className="mt-3 space-y-2">
          {[["Order sync", "Healthy", "w-4/5"], ["Invoice export", "Running", "w-3/5"], ["Report builder", "Queued", "w-2/5"]].map((r) => (
            <div key={r[0]} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-[11px]">
              <span className="w-24 shrink-0 font-semibold text-white">{r[0]}</span>
              <span className="h-1.5 flex-1 rounded-full bg-white/10"><span className={`block h-full rounded-full bg-[#008FF0] ${r[2]}`} /></span>
              <span className="rounded-full bg-[#008FF0]/15 px-2 py-0.5 text-[10px] font-semibold text-[#7CC8FF]">{r[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const settingsPanel = (
    <div className="w-44 rounded-xl border border-white/10 bg-[#0F2859] p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:w-48" aria-hidden="true">
      <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8FA6CC]">Workflow</div>
      {[["Auto-sync", true], ["Alerts", true], ["Approvals", false]].map((r) => (
        <div key={r[0]} className="flex items-center justify-between py-1.5 text-[11px] font-semibold text-white">
          {r[0]}
          <span className={`flex h-4 w-7 items-center rounded-full p-0.5 ${r[1] ? "justify-end bg-[#008FF0]" : "justify-start bg-white/20"}`}><span className="h-3 w-3 rounded-full bg-white" /></span>
        </div>
      ))}
    </div>
  );

  const donutPanel = (
    <div className="flex w-36 items-center gap-3 rounded-xl border border-white/10 bg-[#0F2859] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:w-40" aria-hidden="true">
      <svg viewBox="0 0 36 36" className="h-12 w-12 shrink-0 -rotate-90" fill="none">
        <circle cx="18" cy="18" r="15.9" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
        <motion.circle cx="18" cy="18" r="15.9" stroke="#008FF0" strokeWidth="4" strokeLinecap="round" strokeDasharray="72 100" initial={{ strokeDashoffset: 72 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.4, delay: 0.6 }} />
      </svg>
      <div><div className="text-base font-extrabold text-white">72%</div><div className="text-[10px] text-[#8FA6CC]">Release ready</div></div>
    </div>
  );

  return (
    <div className="bg-background text-text">
      <section className="relative overflow-hidden bg-[#091A3A] pb-28 pt-32 md:pb-40 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_60%_40%,black,transparent_75%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -end-40 top-0 h-[520px] w-[520px] rounded-full bg-[#1244AD]/30 blur-3xl" aria-hidden="true" />
        <OakBranch variant="arc" pulse={false} className="pointer-events-none absolute -bottom-40 -start-40 h-[560px] w-[560px] text-accent opacity-20 rtl:-scale-x-100" />
        <div className={`${t.wrap} relative grid items-center gap-14 lg:grid-cols-[1.02fr_1fr]`}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-start gap-7">
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#008FF0]">
              <span className="h-px w-8 bg-[#008FF0]" aria-hidden="true" />BlueOak Software LLC
            </span>
            <h1 className="text-[clamp(40px,6vw,76px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
              Strong foundations.<br />
              <span className="yb-gradient-text-light">Exceptional software.</span>
            </h1>
            <p className="max-w-xl text-[17px] leading-[1.65] text-[#C9D8F2] md:text-[19px]">
              We turn ambitious ideas into thoughtfully designed digital products—built around your business, your users, and what comes next.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/contact" onClick={go("Contact")} className={t.btnPrimary}>Discuss your project<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></a>
              <a href="/work" onClick={go("Work")} className={t.btnOutline}>Explore our work</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="relative mx-auto w-full max-w-[620px] md:aspect-[600/520]">
              <svg viewBox="0 0 600 520" className="pointer-events-none absolute inset-0 hidden h-full w-full text-[#008FF0] md:block" fill="none" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="1.3" opacity="0.55">
                  <motion.path id="hp1" d="M10 330 C 10 250 60 230 60 160 S 20 70 70 20" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
                  <motion.path d="M60 160 L 0 195" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.8 }} />
                  <motion.path id="hp2" d="M300 508 C 380 508 420 470 480 440 S 560 380 590 330" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
                  <motion.path d="M480 440 L 520 500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.2 }} />
                  <motion.path id="hp3" d="M590 20 C 560 80 596 120 566 190" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.5 }} />
                </g>
                {[[60, 160], [70, 20], [480, 440], [590, 330], [520, 500], [566, 190]].map((p) => <circle key={p.join()} cx={p[0]} cy={p[1]} r="3.5" fill="currentColor" />)}
                {leaves([[60, 160, -20, 1], [44, 118, -60, 0.8], [66, 86, 20, 0.8], [20, 190, 150, 0.7]], "h1")}
                {leaves([[480, 440, -30, 1], [520, 500, 40, 0.9], [545, 400, -50, 0.8], [440, 470, -20, 0.7]], "h2")}
                {leaves([[566, 190, 20, 1], [588, 100, -30, 0.8], [578, 60, -60, 0.7]], "h3")}
                {pulse("hp1", "6s")}{pulse("hp2", "7s")}{pulse("hp3", "5s")}
              </svg>
              <div className="relative z-10 md:absolute md:left-[2%] md:top-[9%] md:w-[84%]">{dashboard}</div>
              {float("p1", "absolute -right-1 top-0 z-20 hidden md:block", "rotate-3", 0, donutPanel)}
              {float("p2", "absolute bottom-[3%] right-0 z-20 hidden md:block", "-rotate-2", 1.2, settingsPanel)}
            </div>
            <p className="mt-5 text-center text-xs text-[#8FA6CC] md:mt-3">Illustrative interface concept — not a shipped product.</p>
          </motion.div>
        </div>
        {seam("text-background")}
      </section>

      <section className="relative overflow-hidden pb-28 pt-16 md:pb-44 md:pt-24">
        <div className={t.wrap}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Services" title="From first idea to working product." subtitle="Six ways we help you design, build and grow software that fits your business." />
            <a href="/services" onClick={go("Services")} className={t.linkLight}>See all services<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></a>
          </div>
          <div className="mt-12 grid grid-cols-12 gap-4 md:mt-16 md:gap-6">
            {services.map(serviceCard)}
          </div>
        </div>
        {seam("text-[#091A3A]")}
      </section>

      <section className="relative overflow-hidden bg-[#091A3A] pb-28 pt-10 md:pb-44 md:pt-16">
        <div className={t.wrap}>
          <SectionHeading dark eyebrow="Selected work" title="Software with a purpose." subtitle={usingConcepts ? "Concept projects shown while real case studies are being prepared." : "A look at how we approach the problem, the design and the build."} />
          <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
            {loading ? [0, 1].map((i) => <div key={i} className={t.skel} />) : shown.map((p, i) => (
              <ProjectRow key={p.id} image={p.image} title={p.title} industry={p.industry} challenge={p.challenge} delivered={p.delivered} outcome={p.outcome} url={p.url} isConcept={usingConcepts ? true : p.isConcept} reverse={i % 2 === 1} conceptLabel="Concept project" challengeLabel="The challenge" deliveredLabel="What we delivered" outcomeLabel="Outcome" viewLabel="View project" />
            ))}
          </div>
          <div className="mt-16 flex">
            <a href="/work" onClick={go("Work")} className={t.btnOutline}>See all work<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></a>
          </div>
        </div>
        {seam("text-background")}
      </section>

      <section className="relative overflow-hidden pb-28 pt-16 md:pb-44 md:pt-24">
        <OakBranch variant="arc" pulse={false} className="pointer-events-none absolute -end-32 top-10 h-[480px] w-[480px] text-accent opacity-10 rtl:-scale-x-100" />
        <div className={t.wrap + " relative"}>
          <SectionHeading eyebrow="Process" title="A clear path from idea to launch." subtitle="Four focused stages, each with a clear purpose and a clear handover." />
          <div className="mt-14 md:mt-20">
            <svg viewBox="0 0 1200 110" className="mb-8 hidden w-full text-[#008FF0] lg:block" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="1.5">
                <motion.path id="pp1" d="M150 70 C 300 70, 300 30, 450 30 S 600 70, 750 70 S 900 30, 1050 30" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
                {["M150 70 L110 100", "M450 30 L490 6", "M750 70 L790 100", "M1050 30 L1090 6"].map((d, i) => (
                  <motion.path key={d} d={d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.2 + i * 0.15 }} />
                ))}
              </g>
              {[[110, 100], [490, 6], [790, 100], [1090, 6]].map((p) => <circle key={p.join()} cx={p[0]} cy={p[1]} r="3.5" fill="currentColor" />)}
              {[[150, 70], [450, 30], [750, 70], [1050, 30]].map((p) => (
                <g key={p.join()}><circle cx={p[0]} cy={p[1]} r="12" fill="#EAF5FF" stroke="currentColor" strokeWidth="1.5" /><circle cx={p[0]} cy={p[1]} r="5" fill="#1244AD" /></g>
              ))}
              {leaves([[110, 100, 150, 0.9], [490, 6, -30, 0.9], [790, 100, 150, 0.9], [1090, 6, -30, 0.9], [300, 58, -25, 0.7], [900, 48, -15, 0.7]], "pl")}
              {pulse("pp1", "8s")}
            </svg>
            <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
              {steps.map((s, i) => (
                <motion.li key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative border-s-2 border-[#D6E6FA] ps-7 lg:border-s-0 lg:ps-0 lg:text-center">
                  <span className="absolute -start-[7px] top-2 h-3 w-3 rounded-full bg-[#008FF0] ring-4 ring-background lg:hidden" aria-hidden="true" />
                  <div className="text-5xl font-extrabold tracking-[-0.02em] text-[#008FF0]">{s.n}</div>
                  <h3 className="mt-2 text-xl font-extrabold text-text">{s.title}</h3>
                  <p className="mt-2 leading-[1.65] text-text-secondary lg:mx-auto lg:max-w-[240px]">{s.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
        {seam("text-[#091A3A]")}
      </section>

      <CtaBand title="Let's build your next chapter." text="Tell us what you're planning and what you need your software to achieve." buttonLabel="Discuss your project" href="/contact" onClick={go("Contact")} />
    </div>
  );
}
