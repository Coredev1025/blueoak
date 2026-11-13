import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { Reveal, SectionHead } from "./Reveal.jsx";
import { SectionMotion } from "./SectionMotion.jsx";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { PROCESS } from "../data/content.js";
import { Link } from "react-router-dom";
import React from "react";
const ServiceSections = ({ service }) => (
  <>
    <section
      data-testid="service-overview"
      className="cinematic-section section-space"
    >
      <SectionBackdrop variant="voices" id="service-overview" />
      <div className="section-content page-container grid gap-10 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">{"01 / The bigger picture"}</p>
        <Reveal className="lg:col-span-8">
          <p className="text-xl leading-relaxed text-slate-200 sm:text-2xl">
            {service.overview}
          </p>
        </Reveal>
      </div>
    </section>
    <section
      data-testid="service-capabilities"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="services" id="service-capabilities" />
      <div className="section-content page-container">
        <SectionHead
          index="02"
          label="Capabilities"
          title="The details make the difference."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {service.capabilities.map((c, i) => (
            <SectionMotion
              kind="capabilities"
              index={i}
              id={`capability-motion-${i}`}
              key={c.t}
            >
              <article
                data-testid={`capability-card-${i}`}
                className="capability-card"
              >
                <span className="font-mono text-xs text-oak-300">
                  {"0"}
                  <span
                    style={{
                      display: "contents",
                    }}
                  >
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-8 text-xl font-semibold">{c.t}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  {c.d}
                </p>
              </article>
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
    <section
      data-testid="service-stack-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="work" id="service-stack" />
      <div className="section-content page-container grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{"03 / Under the surface"}</p>
          <h2 className="mt-4 text-lg font-semibold">
            {"Purpose-built. Never overbuilt."}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10">
            {service.stack.map((tech, i) => (
              <div
                data-testid={`stack-chip-${i}`}
                className="stack-cell"
                key={tech}
              >
                <span className="font-mono text-[10px] text-slate-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {tech}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">{"04 / Assurance"}</p>
          <h2 className="mt-4 text-lg font-semibold">
            {"Trust is an architecture decision."}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {
              "Security and compliance requirements are scoped with your team, then considered at every layer."
            }
          </p>
          <ul className="mt-8">
            {service.compliance.map((item, i) => (
              <li
                data-testid={`service-compliance-${i}`}
                className="flex items-center gap-4 border-b border-white/10 py-5 text-sm"
                key={item}
              >
                <ShieldCheck className="shrink-0 text-oak-300" size={20} />
                {item}
              </li>
            ))}
          </ul>
          <p data-testid="compliance-note" className="sample-note mt-5">
            {
              "Compliance is engagement-specific; these are supported requirements, not certifications."
            }
          </p>
        </div>
      </div>
    </section>
    <section
      data-testid="service-process"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="team" id="service-process" />
      <div className="section-content page-container">
        <SectionHead
          index="05"
          label="Our process"
          title="Clarity at every step."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <SectionMotion
              kind="process"
              index={i}
              id={`process-motion-${i}`}
              key={p.n}
            >
              <article
                data-testid={`process-step-${i}`}
                className="process-step"
              >
                <div className="flex items-center justify-between font-mono text-sm text-oak-300">
                  {p.n}
                  <ArrowRight size={16} />
                </div>
                <h3 className="mt-7 text-xl font-semibold">{p.t}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-400">
                  {p.d}
                </p>
              </article>
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
  </>
);
const ProjectCTA = ({ id, serviceId }) => (
  <section
    data-testid={`${id}-contact-band`}
    className="cinematic-section section-space border-t border-white/10"
  >
    <SectionBackdrop variant="contact" id={`${id}-contact`} />
    <div className="section-content page-container">
      <p className="eyebrow">{"The next chapter"}</p>
      <p className="cta-heading mt-5">
        {"Great software starts"}
        <br />
        {"with a "}
        <em className="font-serif font-medium text-oak-300">
          {"conversation."}
        </em>
      </p>
      <Link
        to={serviceId ? `/?service=${serviceId}#contact` : "/#contact"}
        data-testid={`${id}-bottom-cta`}
        className="primary-button mt-8"
      >
        {"Let's build something "}
        <ArrowRight size={17} />
      </Link>
    </div>
  </section>
);
export { ProjectCTA };
export { ServiceSections };
