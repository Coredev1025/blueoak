import { useParams, Link } from "react-router-dom";
import { SERVICES, CASE_STUDIES } from "../data/content.js";
import NotFound from "./NotFound.jsx";
import Nav from "../components/Nav.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { SERVICE_ART } from "../data/visuals.js";
import { ServiceSections, ProjectCTA } from "../components/ServiceSections.jsx";
import { SectionBackdrop } from "../components/SectionBackdrop.jsx";
import { SectionMotion } from "../components/SectionMotion.jsx";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Footer from "../components/Footer.jsx";
import React from "react";
function ServiceDetail() {
  const { serviceId } = useParams();
  const idx = SERVICES.findIndex((s) => s.id === serviceId);
  const s = SERVICES[idx];
  if (!s) return <NotFound />;
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const study = CASE_STUDIES.find((c) => c.service === s.id);
  return (
    <div data-testid="service-detail-page" key={s.id}>
      <Nav />
      <main>
        <PageHero
          id="service"
          eyebrow={`BlueOak / 0${idx + 1} / ${s.badge}`}
          title={s.title}
          description={s.tagline}
          art={SERVICE_ART[s.id]}
          backTo="/services"
          backLabel="All services"
          cta="Scope this project"
          ctaTo={`/?service=${s.id}#contact`}
        >
          <div className="mt-12 flex flex-wrap gap-3 border-t border-white/15 pt-6">
            {s.stack.slice(0, 4).map((tech, i) => (
              <span
                data-testid={`service-hero-stack-${i}`}
                className="font-mono text-xs text-slate-300"
                key={tech}
              >
                {tech}
                {i < 3 ? " /" : ""}
              </span>
            ))}
          </div>
        </PageHero>
        <ServiceSections service={s} />
        {study && (
          <section
            data-testid="service-case-section"
            className="cinematic-section section-space border-t border-white/10"
          >
            <SectionBackdrop variant="work" id="service-case" />
            <div className="section-content page-container grid items-center gap-10 lg:grid-cols-2">
              <SectionMotion kind="work" id="service-case-motion">
                <img
                  data-testid="service-case-image"
                  className="w-full rounded-lg"
                  src={study.image}
                  alt={`${study.name} generated concept visual`}
                  loading="lazy"
                  width="1264"
                  height="848"
                />
              </SectionMotion>
              <div>
                <p className="eyebrow">{"In perspective / Design study"}</p>
                <h2 className="mt-5 text-lg font-semibold">{study.name}</h2>
                <p className="mt-5 text-sm leading-relaxed text-slate-400">
                  {study.blurb}
                </p>
                <p
                  data-testid="service-case-sample-note"
                  className="sample-note mt-4"
                >
                  {
                    "Illustrative concept project, not a verified client engagement."
                  }
                </p>
                <Link
                  to={`/work/${study.id}`}
                  data-testid="service-case-link"
                  className="text-link mt-8"
                >
                  {"Explore the project "}
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        )}
        <ProjectCTA id="service" serviceId={s.id} />
        <Link
          to={`/services/${next.id}`}
          data-testid="next-service-link"
          className="next-page-link"
        >
          <div className="page-container flex items-center justify-between gap-8 py-12">
            <div>
              <p className="eyebrow">{"Next discipline"}</p>
              <p className="mt-4 text-xl font-semibold sm:text-2xl">
                {next.shortTitle}
              </p>
            </div>
            <ArrowRight className="shrink-0" size={26} />
          </div>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
export default ServiceDetail;
