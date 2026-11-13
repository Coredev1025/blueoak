import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { SectionHead } from "./Reveal.jsx";
import { SERVICES } from "../data/content.js";
import { ICONS } from "../data/icons.js";
import { SectionMotion } from "./SectionMotion.jsx";
import Tilt from "./Tilt.jsx";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import React from "react";
function ServicesBento({ standalone = false }) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="cinematic-section section-space"
    >
      <SectionBackdrop variant="services" />
      <div className="section-content page-container">
        <SectionHead
          index="01"
          label="Our expertise"
          title="Seven disciplines. One standard."
          desc="Architecture-first thinking. Meticulous execution. Software that earns its place in your business."
        />
        <div className="services-grid">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <SectionMotion
                kind="services"
                index={i % 3}
                id={`service-motion-${service.id}`}
                className={i === 0 ? "service-featured" : ""}
                key={service.id}
              >
                <Tilt
                  max={3}
                  id={`service-tilt-${service.id}`}
                  className="relative h-full"
                >
                  <Link
                    to={`/services/${service.id}`}
                    data-testid={`service-card-${service.id}`}
                    data-cursor="card"
                    data-cursor-label="Explore"
                    className="service-card trace group"
                  >
                    <div className="flex items-start justify-between">
                      <Icon
                        size={26}
                        strokeWidth={1.25}
                        className="text-oak-300"
                      />
                      <span className="font-mono text-xs text-slate-500">
                        {"/ 0"}
                        <span
                          style={{
                            display: "contents",
                          }}
                        >
                          {i + 1}
                        </span>
                      </span>
                    </div>
                    <div className="mt-auto pt-12">
                      <p className="eyebrow text-[11px]">{service.badge}</p>
                      <h3
                        data-testid={`service-title-${service.id}`}
                        className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
                      >
                        {service.shortTitle}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                        {service.tagline}
                      </p>
                    </div>
                    <span className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-slate-300">
                      {"Explore discipline "}
                      <ArrowUpRight
                        size={20}
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Tilt>
              </SectionMotion>
            );
          })}
        </div>
        {!standalone && (
          <Link
            to="/services"
            data-testid="all-services-link"
            className="text-link mt-9"
          >
            {"Explore all services "}
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
    </section>
  );
}
export default ServicesBento;
