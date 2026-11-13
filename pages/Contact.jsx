import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import OakBranch from "../components/OakBranch.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function Contact({ navigateTo }) {
  const t = {
    section: "relative grid lg:grid-cols-2",
    left: "relative overflow-hidden bg-[#091A3A] px-5 pb-28 pt-16 md:px-12 md:pb-36 md:pt-24 lg:min-h-[calc(100svh-84px)] lg:px-16 lg:pt-28",
    grid: "pointer-events-none absolute inset-0 opacity-[0.07]",
    branch: "pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full text-accent opacity-80",
    arc: "pointer-events-none absolute -end-40 -top-40 h-[480px] w-[480px] text-accent opacity-20 rtl:-scale-x-100",
    seam: "pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-accent opacity-60 lg:hidden",
    leftInner: "relative z-10 ms-auto flex max-w-xl flex-col gap-6 lg:me-0",
    eyebrow: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-accent",
    h1: "text-[clamp(40px,6vw,68px)] font-extrabold leading-[1.04] tracking-[-0.02em] text-white",
    lead: "text-[17px] leading-[1.65] text-[#C9D8F2] md:text-[19px]",
    hintTitle: "text-xs font-bold uppercase tracking-[0.14em] text-white/60",
    hint: "flex items-start gap-3 text-[16px] leading-[1.6] text-[#C9D8F2]",
    hintIcon: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent",
    right: "relative bg-surface px-5 py-20 md:px-12 md:py-28 lg:px-16",
    rightInner: "me-auto flex w-full max-w-xl flex-col gap-8",
    card: "w-full rounded-card-radius border border-card-border bg-card-bg p-6 shadow-card-shadow transition duration-300 hover:shadow-card-hover-shadow md:p-10",
    cardEyebrow: "mb-2 text-xs font-bold uppercase tracking-[0.14em] text-primary",
    cardNote: "mt-5 flex items-center gap-2 text-sm text-text-muted",
    nextBox: "relative overflow-hidden rounded-card-radius border border-border bg-background p-6 md:p-8",
    nextEyebrow: "text-xs font-bold uppercase tracking-[0.14em] text-accent",
    nextTitle: "mt-2 text-2xl font-extrabold tracking-tight text-text",
    steps: "relative mt-6 flex flex-col gap-6 border-s border-border ps-7",
    step: "relative",
    stepDot: "absolute -start-[37px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white",
    stepTitle: "font-heading text-base font-extrabold text-text",
    stepText: "mt-1 text-[15px] leading-relaxed text-text-secondary"
  };

  const hints = [
    "The problem you want to solve",
    "Who will use the software",
    "What success looks like for you"
  ];

  const next = [
    { title: "We read your summary", text: "A person on the BlueOak team reviews what you've shared about your project." },
    { title: "We reply by email", text: "We write to the work email you gave us, with questions or a suggested next step." },
    { title: "We shape the plan together", text: "If it's a fit, we talk through the problem, the users and what success should look like." }
  ];

  return (
    <div>
      <section className={t.section}>
        <div className={t.left}>
          <div
            className={t.grid}
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(#8FB8FF 1px, transparent 1px), linear-gradient(90deg, #8FB8FF 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }}
          />
          <OakBranch variant="arc" pulse={false} className={t.arc} />
          <OakBranch variant="branch" className={t.branch} />
          <OakBranch variant="seam" pulse={false} className={t.seam} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={t.leftInner}
          >
            <span className={t.eyebrow}>
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Contact
            </span>
            <h1 className={t.h1}>
              Let's build your <span className="yb-gradient-text-light">next chapter.</span>
            </h1>
            <p className={t.lead}>
              Tell us what you're planning and what you need your software to achieve.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <h2 className={t.hintTitle}>A good place to start</h2>
              <ul className="flex flex-col gap-3">
                {hints.map((h) => (
                  <li key={h} className={t.hint}>
                    <span className={t.hintIcon}>
                      <Check size={14} aria-hidden="true" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className={t.right}>
          <div className={t.rightInner}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className={t.card}
            >
              <p className={t.cardEyebrow}>Project inquiry</p>
              <ContactForm
                collection="ContactMessage"
                layout="stacked"
                publicSave={true}
                fields={[
                  { key: "name", label: "Name", required: true },
                  { key: "email", label: "Work email", type: "email", required: true },
                  { key: "company", label: "Company (optional)" },
                  { key: "message", label: "Project summary", type: "textarea", required: true, minLength: 20 }
                ]}
                labels={{
                  title: "Tell us about your project",
                  subtitle: "Share a few details and we'll take it from there.",
                  name: "Name",
                  email: "Work email",
                  message: "Project summary",
                  messagePh: "What are you building, who is it for, and what should it achieve?",
                  send: "Send inquiry",
                  sending: "Sending…",
                  required: "This field is required",
                  badEmail: "Please enter a valid work email address",
                  tooShort: "Please write at least 20 characters so we understand your project",
                  optional: "optional",
                  select: "Select",
                  failed: "We couldn't send your inquiry. Please check your details and try again.",
                  done: "Thanks — your inquiry has been received.",
                  doneSub: "We'll review what you've shared.",
                  another: "Send another inquiry"
                }}
              />
              <p className={t.cardNote}>
                <Lock size={14} aria-hidden="true" />
                Only the details you enter above are sent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={t.nextBox}
            >
              <p className={t.nextEyebrow}>After you hit send</p>
              <h2 className={t.nextTitle}>What happens after you send an inquiry</h2>
              <ol className={t.steps}>
                {next.map((s, i) => (
                  <li key={s.title} className={t.step}>
                    <span className={t.stepDot} aria-hidden="true">{i + 1}</span>
                    <h3 className={t.stepTitle}>{s.title}</h3>
                    <p className={t.stepText}>{s.text}</p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
