import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LogoMark } from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { X, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
const LINKS = [
  {
    label: "Services",
    hash: "services",
  },
  {
    label: "Work",
    hash: "work",
  },
  {
    label: "Company",
    hash: "company",
  },
  {
    label: "Team",
    hash: "team",
  },
  {
    label: "Careers",
    hash: "careers",
  },
  {
    label: "Contact",
    hash: "contact",
  },
];
const scrollToHash = (hash) => {
  const el = document.getElementById(hash);
  if (!el) return;
  if (window.__lenis)
    window.__lenis.scrollTo(el, {
      offset: -72,
    });
  else
    el.scrollIntoView({
      behavior: "smooth",
    });
};
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.querySelector('[data-testid="nav-mobile-toggle"]')?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  const go = (hash) => {
    setOpen(false);
    if (hash === "work" || hash === "services") navigate(`/${hash}`);
    else navigate(`/#${hash}`);
  };
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "nav-bar border-b border-white/5 backdrop-blur-xl" : "nav-light border-b border-transparent bg-transparent"}`}
    >
      <div className="page-container flex items-center justify-between py-5">
        <Link
          to="/"
          data-testid="nav-logo-link"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <LogoMark size={44} />
        </Link>
        <nav className="hidden items-center gap-8 xl:flex">
          {LINKS.map((l) => (
            <button
              data-testid={`nav-link-${l.hash}`}
              data-cursor="link"
              onClick={() => go(l.hash)}
              aria-current={
                pathname.startsWith(`/${l.hash}`) ? "page" : undefined
              }
              className="group relative text-base text-slate-300 transition-colors hover:text-oak-500"
              key={l.hash}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-oak-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <ThemeToggle />
          <button
            data-testid="nav-cta-button"
            data-cursor="link"
            onClick={() => go("contact")}
            className="btn-shine rounded-full bg-oak-500 px-7 py-3 text-base font-semibold text-ink-900 transition-all hover:bg-oak-600"
          >
            {"Start a project"}
          </button>
        </nav>
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle compact={true} />
          <button
            className="rounded-md p-2 text-slate-200"
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            data-testid="nav-mobile-menu"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="nav-bar overflow-hidden border-b border-white/5 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {LINKS.map((l) => (
                <button
                  data-testid={`nav-mobile-link-${l.hash}`}
                  onClick={() => go(l.hash)}
                  className="border-b border-white/5 py-3.5 text-left text-lg text-slate-200"
                  key={l.hash}
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="nav-mobile-cta"
                onClick={() => go("contact")}
                className="my-4 rounded-full bg-oak-500 px-5 py-3 font-semibold text-ink-900"
              >
                {"Start a project"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Nav;
export { scrollToHash };
