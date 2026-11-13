import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { OFFICE } from "../data/visuals.js";
import { Reveal } from "./Reveal.jsx";
import { LogoMark } from "./Logo.jsx";
import { COMPANY } from "../data/content.js";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import React from "react";
function Office() {
  return (
    <section
      id="company"
      data-testid="office-section"
      className="cinematic-section media-band office-band section-space border-t border-white/10"
    >
      <SectionBackdrop
        variant="office"
        src={OFFICE.lobby}
        id="office"
        hero={true}
      />
      <div className="section-content page-container w-full">
        <Reveal>
          <div data-testid="office-sign" className="office-sign">
            <LogoMark size={44} />
          </div>
        </Reveal>
        <Reveal delay={0.12} className="mt-10 max-w-4xl">
          <p className="eyebrow">{"Inside the studio"}</p>
          <h2
            data-testid="office-title"
            className="section-title mt-5 text-slate-50"
          >
            {"One building. One standard of craft."}
          </h2>
          <p className="lede mt-7 max-w-2xl">
            {"Our studios in "}
            <span
              style={{
                display: "contents",
              }}
            >
              {COMPANY.locations.slice(0, -1).join(", ")}
            </span>
            {" and "}
            <span
              style={{
                display: "contents",
              }}
            >
              {COMPANY.locations.slice(-1)}
            </span>
            {
              " run as a single engineering floor \u2014 architects, designers and engineers in the same review, every week."
            }
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/#contact"
              data-testid="office-cta"
              className="primary-button"
            >
              {"Visit the studio "}
              <ArrowUpRight size={18} />
            </Link>
            <Link
              to="/services"
              data-testid="office-services-link"
              className="outline-button"
            >
              {"What we build "}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export default Office;
