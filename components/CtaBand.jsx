import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import OakBranch from "./OakBranch.jsx";

/* CtaBand – closing navy call-to-action band with an oak branch and arc accent: { title, text, buttonLabel, href, onClick } – renders a link when href is given, otherwise a button */
export default function CtaBand({ title, text, buttonLabel, href, onClick }) {
  const t = {
    section: 'relative overflow-hidden bg-[#091A3A] px-6 py-20 md:py-32',
    arc: 'pointer-events-none absolute -end-24 -top-24 h-[520px] w-[520px] text-accent opacity-25 rtl:-scale-x-100',
    branch: 'pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-accent opacity-35',
    inner: 'relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center',
    h2: 'text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.06] tracking-[-0.02em] text-white',
    p: 'text-[17px] leading-[1.65] text-[#C9D8F2] md:text-[18px]',
    btn: 'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3.5 font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,143,240,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
  };
  const label = (<>{buttonLabel}<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" /></>);
  return (
    <section className={t.section}>
      <OakBranch variant="arc" className={t.arc} />
      <OakBranch variant="branch" className={t.branch} fit="xMidYMax slice" />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={t.inner}>
        {title ? <h2 className={t.h2}>{title}</h2> : null}
        {text ? <p className={t.p}>{text}</p> : null}
        {buttonLabel ? (href ? <a href={href} onClick={onClick} className={t.btn}>{label}</a> : <button type="button" onClick={onClick} className={t.btn}>{label}</button>) : null}
      </motion.div>
    </section>
  );
}
