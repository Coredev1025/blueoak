import { useLocation, Link } from "react-router-dom";
import { scrollToHash } from "./Nav.jsx";
import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { LogoMark } from "./Logo.jsx";
import { COMPANY, SERVICES } from "../data/content.js";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import React from "react";
function Footer() {
  const { pathname } = useLocation();
  const goHash = (hash) => {
    if (pathname !== "/") {
      window.location.href = `/#${hash}`;
    } else {
      scrollToHash(hash);
    }
  };
  return (
    <footer
      data-testid="footer"
      className="cinematic-section border-t border-white/10"
    >
      <SectionBackdrop variant="work" id="footer" />
      <div className="section-content page-container pt-20 sm:pt-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <LogoMark size={44} />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              <span
                style={{
                  display: "contents",
                }}
              >
                {COMPANY.name}
              </span>
              {
                " is a software architecture studio. Web platforms, mobile apps and AI systems \u2014 designed, built and operated by senior engineers."
              }
            </p>
            <a
              href={`mailto:${COMPANY.email}`}
              data-testid="footer-email-link"
              className="mt-6 flex items-center gap-2 font-mono text-sm text-oak-300 transition-colors hover:text-white"
            >
              {COMPANY.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}
              data-testid="footer-phone-link"
              className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-oak-400 transition-colors hover:text-oak-300"
            >
              <Phone className="h-3.5 w-3.5" />
              {COMPANY.phone}
            </a>
            <p
              data-testid="footer-address"
              className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-slate-400"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-oak-500" />
              {COMPANY.address}
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
              {"Services"}
            </div>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    data-testid={`footer-service-${s.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-oak-400"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
              {"Company"}
            </div>
            <ul className="mt-5 space-y-2.5">
              {[
                ["Company", "company"],
                ["Work", "work"],
                ["Team", "team"],
                ["Contact", "contact"],
              ].map(([label, hash]) => (
                <li key={hash}>
                  <button
                    data-testid={`footer-link-${hash}`}
                    onClick={() =>
                      hash === "work"
                        ? window.location.assign("/work")
                        : goHash(hash)
                    }
                    className="text-sm text-slate-400 transition-colors hover:text-oak-400"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
              {"Studios"}
            </div>
            <ul className="mt-5 space-y-2.5">
              {COMPANY.locations.map((l) => (
                <li className="text-sm text-slate-400" key={l}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 select-none" aria-hidden="true">
          <div
            className="footer-wordmark font-display font-extrabold leading-none text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(46,134,255,0.25)",
            }}
          >
            {"BLUEOAK"}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/5 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-600">
            {"\xA9 "}
            <span
              style={{
                display: "contents",
              }}
            >
              {new Date().getFullYear()}
            </span>{" "}
            <span
              style={{
                display: "contents",
              }}
            >
              {COMPANY.name}
            </span>
            {". All rights reserved."}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            {"Engineered like architecture"}
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
