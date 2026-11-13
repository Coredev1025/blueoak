import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal.jsx";
import React from "react";
const PageHero = ({
  id,
  eyebrow,
  title,
  description,
  art,
  backTo = "/",
  backLabel = "Back to studio",
  cta,
  ctaTo,
  children,
}) => (
  <section
    data-testid={`${id}-hero`}
    className="cinematic-section media-band page-hero"
  >
    <SectionBackdrop
      src={art}
      variant="services"
      id={`${id}-hero`}
      hero={true}
    />
    <div className="section-content page-container w-full">
      <Link
        to={backTo}
        data-testid={`${id}-back-link`}
        className="text-link text-slate-400"
      >
        <ArrowLeft size={15} />
        {backLabel}
      </Link>
      <Reveal className="mt-12 max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 data-testid={`${id}-title`} className="display-title mt-5">
          {title}
        </h1>
        <p className="lede mt-7 max-w-xl">{description}</p>
        {cta && (
          <Link
            to={ctaTo}
            data-testid={`${id}-cta-button`}
            className="primary-button mt-10"
          >
            {cta}
            <ArrowUpRight size={18} />
          </Link>
        )}
      </Reveal>
      {children}
    </div>
  </section>
);
export { PageHero };
