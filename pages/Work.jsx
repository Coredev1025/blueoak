import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import OakBranch from "../components/OakBranch.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { sdk } from "../runtime/data.js";

export default function Work({ navigateTo }) {
  const t = {
    wrap: "relative mx-auto max-w-[1200px] px-5 md:px-8",
    eyebrow: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-accent",
    rule: "h-px w-8 bg-gradient-to-r from-primary to-accent",
    h1: "text-[clamp(40px,7vw,76px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white",
    lead: "max-w-xl text-[17px] leading-[1.65] text-[#C9D8F2] md:text-[18px]",
    chip: "inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    card: "flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0C1F47] shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-accent",
    cardBar: "flex gap-1.5 border-b border-white/10 px-4 py-3",
    dot: "h-2 w-2 rounded-full bg-white/20",
    dotOn: "h-2 w-2 rounded-full bg-accent",
    label: "mb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent",
    body: "leading-[1.65] text-[#C9D8F2]",
    h3: "text-[clamp(24px,3vw,32px)] font-extrabold leading-tight tracking-[-0.02em] text-white",
    btn: "inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,143,240,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    skel: "animate-pulse rounded-2xl border border-white/10 bg-white/5",
    errBox: "flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-8",
    heroGrid: "pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]",
    heroArc: "pointer-events-none absolute -end-24 -top-24 h-[560px] w-[560px] text-accent opacity-30 rtl:-scale-x-100",
    heroBranch: "pointer-events-none absolute inset-x-0 bottom-10 h-36 w-full text-accent opacity-40",
    seamLine: "pointer-events-none absolute bottom-0 start-0 h-10 w-full text-accent",
    divider: "mx-auto h-14 w-full max-w-xl text-accent opacity-50",
    topSeam: "pointer-events-none absolute inset-x-0 top-0 h-12 w-full text-accent opacity-50"
  };

  const mocks = useMemo(() => {
    const g = (s) => "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" fill="#0E1729"/>' + s + "</svg>");
    const sched = g(
      '<rect x="24" y="20" width="592" height="1" fill="#fff" fill-opacity=".12"/>' +
      [0, 1, 2, 3, 4].map((i) =>
        '<rect x="24" y="' + (52 + i * 64) + '" width="64" height="10" rx="5" fill="#fff" fill-opacity=".3"/>' +
        '<rect x="' + (110 + (i * 57) % 120) + '" y="' + (40 + i * 64) + '" width="' + (120 + (i * 37) % 90) + '" height="34" rx="8" fill="' + (i % 2 ? "#1244AD" : "#008FF0") + '"/>' +
        '<rect x="' + (400 + (i * 43) % 100) + '" y="' + (40 + i * 64) + '" width="100" height="34" rx="8" fill="#fff" fill-opacity=".1"/>'
      ).join("") +
      '<rect x="340" y="16" width="2" height="368" fill="#008FF0"/><circle cx="341" cy="16" r="5" fill="#008FF0"/>'
    );
    const intake = g(
      '<rect x="228" y="24" width="184" height="352" rx="28" fill="#fff" fill-opacity=".05" stroke="#fff" stroke-opacity=".2"/>' +
      '<rect x="250" y="62" width="140" height="12" rx="6" fill="#fff" fill-opacity=".35"/>' +
      [0, 1, 2].map((i) =>
        '<rect x="250" y="' + (96 + i * 56) + '" width="140" height="40" rx="10" fill="#fff" fill-opacity=".08"/>' +
        '<rect x="262" y="' + (113 + i * 56) + '" width="' + (50 + i * 24) + '" height="6" rx="3" fill="#008FF0"/>'
      ).join("") +
      '<circle cx="320" cy="290" r="16" fill="#008FF0"/><path d="M312 290 l6 6 l11 -12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<rect x="250" y="326" width="140" height="30" rx="15" fill="#1244AD"/>' +
      '<rect x="56" y="120" width="130" height="70" rx="12" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".12"/><rect x="72" y="140" width="60" height="8" rx="4" fill="#008FF0"/><rect x="72" y="160" width="90" height="6" rx="3" fill="#fff" fill-opacity=".25"/>' +
      '<rect x="454" y="210" width="130" height="70" rx="12" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".12"/><rect x="470" y="230" width="60" height="8" rx="4" fill="#008FF0"/><rect x="470" y="250" width="90" height="6" rx="3" fill="#fff" fill-opacity=".25"/>' +
      '<path d="M186 155 C210 155 205 120 228 120 M454 245 C430 245 436 280 412 280" stroke="#008FF0" stroke-opacity=".6" stroke-width="2" fill="none"/>'
    );
    const triage = g(
      [0, 1, 2].map((i) =>
        '<rect x="40" y="' + (70 + i * 100) + '" width="120" height="70" rx="10" fill="#fff" fill-opacity=".07" stroke="#fff" stroke-opacity=".12"/>' +
        '<rect x="56" y="' + (88 + i * 100) + '" width="60" height="7" rx="3" fill="#fff" fill-opacity=".35"/><rect x="56" y="' + (106 + i * 100) + '" width="88" height="6" rx="3" fill="#fff" fill-opacity=".2"/>' +
        '<path d="M160 ' + (105 + i * 100) + ' C320 ' + (105 + i * 100) + ' 320 ' + (90 + i * 110) + ' 480 ' + (90 + i * 110) + '" stroke="#008FF0" stroke-opacity=".65" stroke-width="2" fill="none"/>' +
        '<rect x="480" y="' + (60 + i * 110) + '" width="130" height="60" rx="12" fill="' + (i === 0 ? "#1244AD" : "#fff") + '" fill-opacity="' + (i === 0 ? "1" : ".08") + '" stroke="#fff" stroke-opacity=".15"/>' +
        '<rect x="498" y="' + (84 + i * 110) + '" width="64" height="8" rx="4" fill="#fff" fill-opacity=".6"/><circle cx="480" cy="' + (90 + i * 110) + '" r="5" fill="#008FF0"/>'
      ).join("")
    );
    const dash = g(
      [0, 1, 2].map((i) => '<rect x="' + (32 + i * 196) + '" y="32" width="180" height="64" rx="12" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".12"/><rect x="48" y="48" width="50" height="6" rx="3" fill="#fff" fill-opacity=".3"/><rect x="48" y="66" width="86" height="12" rx="4" fill="#008FF0"/>').join("") +
      '<rect x="32" y="120" width="576" height="248" rx="14" fill="#fff" fill-opacity=".05" stroke="#fff" stroke-opacity=".12"/>' +
      [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => { const h = 50 + ((i * 53) % 110); return '<rect x="' + (64 + i * 60) + '" y="' + (340 - h) + '" width="34" height="' + h + '" rx="6" fill="' + (i % 3 === 0 ? "#008FF0" : "#1244AD") + '"/>'; }).join("")
    );
    return [sched, intake, triage, dash];
  }, []);

  const CONCEPTS = [
    { id: "c1", title: "Field Operations Scheduling App", industry: "Logistics", challenge: "Dispatchers juggle spreadsheets, calls and messages to assign crews, and last-minute changes rarely reach the field in time.", delivered: "A web app concept with a live schedule board, crew availability and job status updates that stay in sync between the office and the field.", isConcept: true },
    { id: "c2", title: "Patient Intake Mobile App", industry: "Healthcare", challenge: "Paper forms at the front desk slow down check-in, and the same details get re-typed into several systems.", delivered: "A mobile intake concept with guided questions, consent capture and a clean summary that is ready for staff to review.", isConcept: true },
    { id: "c3", title: "AI Document Triage Workflow", industry: "Professional services", challenge: "Incoming documents arrive in every format and wait in a shared inbox until someone has time to sort them.", delivered: "A workflow concept that reads, classifies and routes documents to the right team, with a person confirming the uncertain cases.", isConcept: true }
  ];

  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;
    const bySort = (a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
    setLoading(true);
    setErr("");
    (async () => {
      try {
        const res = await sdk.getPublicAll("Project", { limit: 50, sort: { field: "sortOrder", direction: "asc" } });
        if (alive) setProjects((res.data || []).slice().sort(bySort));
      } catch (e) {
        if (alive) setErr(e.message || "We couldn't load the projects. Please try again.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    (async () => {
      try {
        const res = await sdk.getPublicAll("Product", { limit: 50, sort: { field: "sortOrder", direction: "asc" } });
        if (alive) setProducts((res.data || []).slice().sort(bySort));
      } catch (e) {
        if (alive) setProducts([]);
      }
    })();
    return () => { alive = false; };
  }, [tick]);

  const list = projects.length ? projects : CONCEPTS;
  const actionLabels = { explore: "Explore product", demo: "Request a demo" };

  const Skeletons = () => (
    <div className="flex flex-col gap-16" aria-busy="true" aria-label="Loading projects">
      {[0, 1].map((i) => (
        <div key={i} className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className={t.skel + " aspect-[16/10]"} />
          <div className="flex flex-col gap-4 py-4">
            <div className={t.skel + " h-4 w-32"} />
            <div className={t.skel + " h-10 w-3/4"} />
            <div className={t.skel + " h-20 w-full"} />
            <div className={t.skel + " h-20 w-full"} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#060F26]">
      <section className="relative overflow-hidden bg-[#091A3A] pb-28 pt-20 md:pb-40 md:pt-28" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), 0 100%)" }}>
        <div className={t.heroGrid} aria-hidden="true" />
        <OakBranch variant="arc" className={t.heroArc} />
        <OakBranch variant="branch" className={t.heroBranch} fit="xMidYMax slice" />
        <div className={t.wrap}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex max-w-3xl flex-col items-start gap-6 text-start">
            <span className={t.eyebrow}><span className={t.rule} aria-hidden="true" />Work</span>
            <h1 className={t.h1}>Software with <span className="yb-gradient-text-light">a purpose.</span></h1>
            <p className={t.lead}>The examples below illustrate the kind of work BlueOak takes on: practical products shaped around real operations, real users and what comes next.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#projects" className={t.chip}>Selected work<ArrowRight size={16} className="rotate-90" aria-hidden="true" /></a>
              {products.length ? <a href="#products" className={t.chip}>Our products<ArrowRight size={16} className="rotate-90" aria-hidden="true" /></a> : null}
            </div>
          </motion.div>
        </div>
        <svg className={t.seamLine} viewBox="0 0 1000 40" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <line x1="0" y1="40" x2="1000" y2="0" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </section>

      <section id="projects" className="relative -mt-10 scroll-mt-24 bg-[#060F26] py-[72px] pt-20 md:py-32 md:pt-32">
        <div className={t.wrap}>
          <SectionHeading dark eyebrow="Selected work" title="Three directions we'd love to build." highlight="love to build." subtitle="Concept projects, drawn from scratch to show how we approach a problem. Real case studies will appear here as they are published." />
          <div className="mt-14 md:mt-20">
            {loading ? <Skeletons /> : err ? (
              <div className={t.errBox}>
                <AlertCircle size={28} className="text-accent" aria-hidden="true" />
                <h3 className="text-xl font-extrabold text-white">We couldn't load the projects</h3>
                <p className={t.body}>{err}</p>
                <button type="button" onClick={() => setTick(tick + 1)} className={t.btn}>Try again</button>
              </div>
            ) : (
              <div className="flex flex-col gap-14 md:gap-24">
                {list.map((p, i) => (
                  <React.Fragment key={p.id || p.title}>
                    {i > 0 ? <OakBranch variant="branch" pulse={false} className={t.divider} /> : null}
                    <ProjectRow
                      image={p.image || mocks[i % 3]}
                      title={p.title}
                      industry={p.industry}
                      challenge={p.challenge}
                      delivered={p.delivered}
                      outcome={p.outcome}
                      url={p.url}
                      isConcept={p.isConcept !== false}
                      reverse={i % 2 === 1}
                      conceptLabel="Concept project"
                      challengeLabel="Client challenge"
                      deliveredLabel="What BlueOak delivered"
                      outcomeLabel="Verified outcome"
                      viewLabel="View project"
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {products.length ? (
        <section id="products" className="relative scroll-mt-24 overflow-hidden bg-[#0A1D42] py-[72px] pt-24 md:py-32 md:pt-40">
          <OakBranch variant="seam" pulse={false} className={t.topSeam} />
          <div className={t.wrap}>
            <SectionHeading dark eyebrow="Products" title="Our products" subtitle="Software we build for specific people and the problems they face." />
            <div className={"mt-14 grid gap-8 md:mt-20 " + (products.length === 1 ? "" : "md:grid-cols-2")}>
              {products.map((p, i) => {
                const wide = products.length === 1;
                const label = actionLabels[p.actionLabel] || actionLabels.explore;
                return (
                  <motion.article key={p.id || p.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: (i % 2) * 0.1 }} className={t.card + (wide ? " lg:grid lg:grid-cols-2" : "")}>
                    <div>
                      <div className={t.cardBar} aria-hidden="true">
                        <span className={t.dot} /><span className={t.dot} /><span className={t.dotOn} />
                      </div>
                      <img src={p.screenshot || mocks[3]} alt={p.name} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col items-start gap-5 p-6 text-start md:p-8">
                      <h3 className={t.h3}>{p.name}</h3>
                      {p.audience ? <div><h4 className={t.label}>Who it serves</h4><p className={t.body}>{p.audience}</p></div> : null}
                      {p.problem ? <div><h4 className={t.label}>The problem it solves</h4><p className={t.body}>{p.problem}</p></div> : null}
                      {p.actionUrl ? (
                        <a href={p.actionUrl} className={t.btn + " mt-auto"}>{label}<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></a>
                      ) : (
                        <button type="button" onClick={() => navigateTo("Contact")} className={t.btn + " mt-auto"}>{label}<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Have a project in mind?"
        text="Tell us what you're planning and what you need your software to achieve. We'll take it from there."
        buttonLabel="Discuss your project"
        onClick={() => navigateTo("Contact")}
      />
    </div>
  );
}
