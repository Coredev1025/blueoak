import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronUp, Menu, X } from "lucide-react";
import OakBranch from "./components/OakBranch.jsx";
import { navigation } from "./utils/navigation.js";

export default function AppShell({ children, navigateTo, currentPage, activeLang, langs, switchLang, dir, schema }) {
  const t = {
    root: "flex min-h-screen flex-col bg-background text-text",
    skip: "sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white",
    spacer: "h-[72px] md:h-[84px]",
    header: "fixed inset-x-0 top-0 z-50 border-b bg-background transition-all duration-300",
    headerTop: "h-[72px] border-transparent md:h-[84px]",
    headerScrolled: "h-16 border-border shadow-[0_6px_24px_rgba(9,26,58,0.08)]",
    wrap: "mx-auto flex h-full w-full max-w-[1200px] items-center px-5 md:px-8",
    brandBtn: "flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    logoTop: "h-[30px] w-auto transition-all duration-300 md:h-10",
    logoScrolled: "h-[30px] w-auto transition-all duration-300 md:h-8",
    brandText: "font-heading text-lg font-extrabold tracking-tight text-text md:text-xl",
    nav: "ms-12 hidden items-center gap-9 md:flex",
    link: "group relative px-0.5 py-2 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    linkOn: "text-text",
    linkOff: "text-text-secondary hover:text-text",
    lineOff: "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent opacity-60 transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right",
    lineOn: "absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent",
    cta: "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,143,240,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    ctaLg: "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-base font-bold text-white transition hover:shadow-[0_10px_28px_rgba(0,143,240,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    burger: "ms-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-text transition hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-accent md:hidden",
    langWrap: "flex items-center gap-1 rounded-full border border-border p-1",
    langOn: "rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white",
    langOff: "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-text-secondary transition hover:bg-primary-light hover:text-text",
    backdrop: "fixed inset-0 z-[55] bg-black/50 md:hidden",
    drawer: "fixed inset-y-0 end-0 z-[60] flex w-[88%] max-w-sm flex-col bg-background shadow-2xl md:hidden",
    drawerLink: "flex min-h-14 w-full items-center ps-6 text-start font-heading text-2xl font-extrabold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent",
    drawerOn: "text-primary",
    drawerOff: "text-text hover:text-primary",
    eyebrow: "text-xs font-bold uppercase tracking-[0.14em] text-accent",
    footer: "relative overflow-hidden bg-[#091A3A] text-[#C9D8F2]",
    foot: "relative mx-auto grid w-full max-w-[1200px] gap-12 px-5 pb-12 pt-24 md:grid-cols-12 md:gap-8 md:px-8 md:pb-16 md:pt-32",
    logoChip: "inline-flex items-center rounded-2xl bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
    footLogo: "h-9 w-auto",
    footTag: "font-heading text-xl font-extrabold leading-snug tracking-tight text-white",
    footLink: "group inline-flex min-h-10 items-center gap-2 text-[16px] text-[#C9D8F2] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
    footCta: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,143,240,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    bottom: "relative mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-4 border-t border-white/10 px-5 py-6 text-sm text-[#C9D8F2] md:flex-row md:items-center md:px-8",
    top: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-white"
  };

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const burgerRef = useRef(null);

  const pages = (schema && schema.pages) || [];
  const items = navigation(pages, activeLang);
  const home = items.find((i) => i.home) || items[0];
  const links = items.filter((i) => !i.home);
  const contact = items.find((i) => i.name === "Contact");
  const title = schema ? schema.title : "";
  const multiLang = langs && langs.length > 1;
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fromX = dir === "rtl" ? "-100%" : "100%";

  const go = (name) => { setOpen(false); navigateTo(name); };
  const closeMenu = () => { setOpen(false); if (burgerRef.current) burgerRef.current.focus(); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = drawerRef.current && drawerRef.current.querySelector("button");
    if (first) setTimeout(() => first.focus(), 60);
    const onKey = (e) => {
      if (e.key === "Escape") { closeMenu(); return; }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const f = drawerRef.current.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])");
      if (!f.length) return;
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const brand = (cls) => (
    <button type="button" onClick={() => go(home ? home.name : "Home")} className={t.brandBtn} aria-label={title}>
      {schema && schema.icon
        ? <img src={schema.icon} alt={title} className={cls} />
        : <span className={t.brandText}>{title}</span>}
    </button>
  );

  const langSwitch = () => multiLang ? (
    <div className={t.langWrap} role="group" aria-label="Language">
      {langs.map((l) => {
        const code = typeof l === "string" ? l : l.code;
        return (
          <button key={code} type="button" onClick={() => switchLang(code)} aria-pressed={code === activeLang}
            className={code === activeLang ? t.langOn : t.langOff}>{code}</button>
        );
      })}
    </div>
  ) : null;

  return (
    <div dir={dir} className={t.root}>
      <button type="button" className={t.skip} onClick={() => { const m = document.getElementById("main-content"); if (m) m.focus(); }}>
        Skip to content
      </button>

      <div className={t.spacer} aria-hidden="true" />
      <header className={t.header + " " + (scrolled ? t.headerScrolled : t.headerTop)}>
        <div className={t.wrap}>
          {brand(scrolled ? t.logoScrolled : t.logoTop)}
          <nav className={t.nav} aria-label="Main">
            {links.map((p) => {
              const on = p.name === currentPage;
              return (
                <button key={p.name} type="button" onClick={() => go(p.name)} aria-current={on ? "page" : undefined}
                  className={t.link + " " + (on ? t.linkOn : t.linkOff)}>
                  {p.label}
                  {on
                    ? <motion.span layoutId="nav-underline" className={t.lineOn} transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                    : <span className={t.lineOff} />}
                </button>
              );
            })}
          </nav>
          <div className="ms-auto hidden items-center gap-5 md:flex">
            {langSwitch()}
            {contact ? (
              <button type="button" onClick={() => go(contact.name)} className={t.cta}>
                Discuss your project
              </button>
            ) : null}
          </div>
          <button ref={burgerRef} type="button" className={t.burger} onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <React.Fragment key="menu">
            <motion.div className={t.backdrop} onClick={closeMenu}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            <motion.aside id="mobile-menu" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Menu" className={t.drawer}
              initial={{ x: fromX }} animate={{ x: 0 }} exit={{ x: fromX }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}>
              <div className="flex h-[72px] shrink-0 items-center justify-between px-6">
                <span className={t.eyebrow}>Menu</span>
                <button type="button" onClick={closeMenu} aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text transition hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-accent">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile">
                <ul className="ms-2 flex flex-col gap-1 border-s border-border">
                  {items.map((p, i) => {
                    const on = p.name === currentPage;
                    return (
                      <motion.li key={p.name} className="relative"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}>
                        {on ? <span className="absolute -start-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent" aria-hidden="true" /> : null}
                        <button type="button" onClick={() => go(p.name)} aria-current={on ? "page" : undefined}
                          className={t.drawerLink + " " + (on ? t.drawerOn : t.drawerOff)}>
                          {p.label}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <div className="flex shrink-0 flex-col gap-4 border-t border-border px-6 py-6">
                {multiLang ? <div className="self-start">{langSwitch()}</div> : null}
                {contact ? (
                  <button type="button" onClick={() => go(contact.name)} className={t.ctaLg}>
                    Discuss your project
                    <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </motion.aside>
          </React.Fragment>
        ) : null}
      </AnimatePresence>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>

      <footer className={t.footer}>
        <OakBranch variant="seam" className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-accent opacity-60" />
        <OakBranch variant="arc" pulse={false} className="pointer-events-none absolute -bottom-32 -end-32 h-[460px] w-[460px] text-accent opacity-20 rtl:-scale-x-100" />

        <div className={t.foot}>
          <div className="flex flex-col items-start gap-6 md:col-span-5">
            <button type="button" onClick={() => go(home ? home.name : "Home")} className={schema && schema.icon ? t.logoChip : "rounded-md text-start font-heading text-2xl font-extrabold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"} aria-label={title}>
              {schema && schema.icon
                ? <img src={schema.icon} alt={title} className={t.footLogo} />
                : title}
            </button>
            <p className={t.footTag}>Strong foundations.<br />Exceptional software.</p>
            <p className="max-w-sm text-[17px] leading-[1.65]">
              Digital products designed around your business, your users, and what comes next.
            </p>
          </div>

          <nav className="md:col-span-3 md:col-start-7" aria-label="Footer">
            <h2 className={t.eyebrow}>Explore</h2>
            <ul className="mt-4 flex flex-col">
              {items.map((p) => (
                <li key={p.name}>
                  <button type="button" onClick={() => go(p.name)} className={t.footLink}>
                    <span className="h-px w-3 bg-accent transition-all duration-200 group-hover:w-6" aria-hidden="true" />
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-5 md:col-span-3">
            <h2 className={t.eyebrow}>Start a conversation</h2>
            <p className="text-[17px] leading-[1.65]">Tell us what you're planning and what you need your software to achieve.</p>
            {contact ? (
              <button type="button" onClick={() => go(contact.name)} className={t.footCta}>
                Discuss your project
                <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        <div className={t.bottom}>
          <p>© {new Date().getFullYear()} {title}. All rights reserved.</p>
          <button type="button" className={t.top} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}>
            <ChevronUp size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
