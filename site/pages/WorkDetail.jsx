import { useParams, Link } from "react-router-dom";
import { CASE_STUDIES, SERVICES } from "../data/content.js";
import NotFound from "./NotFound.jsx";
import Nav from "../components/Nav.jsx";
import { SectionBackdrop } from "../components/SectionBackdrop.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal.jsx";
import { SectionMotion } from "../components/SectionMotion.jsx";
import { ProjectCTA } from "../components/ServiceSections.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";
function WorkDetail() {
  const { projectId } = useParams();
  const index = CASE_STUDIES.findIndex((s) => s.id === projectId);
  const study = CASE_STUDIES[index];
  if (!study) return <NotFound />;
  const service = SERVICES.find((s) => s.id === study.service);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  return (
    <div data-testid="work-detail-page" key={study.id}>
      <Nav />
      <main>
        <section className="cinematic-section work-detail-intro">
          <SectionBackdrop variant="work" id="work-detail-hero" />
          <div className="section-content page-container">
            <Link
              to="/work"
              data-testid="work-detail-back-link"
              className="text-link"
            >
              <ArrowLeft size={15} />
              {"The collection"}
            </Link>
            <Reveal className="mt-10">
              <p className="eyebrow">
                <span
                  style={{
                    display: "contents",
                  }}
                >
                  {study.industry}
                </span>
                {" / Concept project 0"}
                <span
                  style={{
                    display: "contents",
                  }}
                >
                  {index + 1}
                </span>
              </p>
              <h1
                data-testid="work-detail-title"
                className="display-title mt-5"
              >
                {study.name}
                <span className="text-oak-300">{"."}</span>
              </h1>
              <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row">
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {study.blurb}
                </p>
                <div className="flex shrink-0 flex-col gap-2 font-mono text-xs text-slate-400">
                  {study.tags.map((tag, i) => (
                    <span data-testid={`work-detail-tag-${i}`} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p
                data-testid="work-detail-sample-notice"
                className="sample-note mt-6"
              >
                {
                  "Design study \xB7 Generated visual \xB7 Metrics below are illustrative, not verified outcomes"
                }
              </p>
            </Reveal>
          </div>
        </section>
        <SectionMotion
          kind="work"
          id="work-detail-image-motion"
          className="page-container"
        >
          <img
            data-testid="work-detail-image"
            className="w-full rounded-lg"
            src={study.image}
            alt={`${study.name} generated product design study`}
            width="1264"
            height="848"
            fetchPriority="high"
          />
        </SectionMotion>
        <section
          data-testid="work-detail-overview"
          className="cinematic-section section-space"
        >
          <SectionBackdrop variant="voices" id="work-detail-overview" />
          <div className="section-content page-container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{"The engineering perspective"}</p>
              <Link
                to={`/services/${service.id}`}
                data-testid="work-related-service"
                className="text-link mt-6"
              >
                {service.shortTitle}
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="lg:col-span-8">
              <p className="text-base leading-loose text-slate-300">
                {service.overview}
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 border-y border-white/15 py-8">
                {study.metrics.map(([value, label], i) => (
                  <div data-testid={`work-metric-${i}`} key={label}>
                    <p className="font-mono text-2xl text-oak-300 sm:text-3xl">
                      {value}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      <span
                        style={{
                          display: "contents",
                        }}
                      >
                        {label}
                      </span>
                      {" / illustrative"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          data-testid="work-detail-approach"
          className="cinematic-section section-space border-t border-white/10"
        >
          <SectionBackdrop variant="services" id="work-detail-approach" />
          <div className="section-content page-container">
            <p className="eyebrow mb-10">{"The building blocks"}</p>
            <div className="grid gap-6 md:grid-cols-3">
              {service.capabilities.map((c, i) => (
                <SectionMotion
                  kind="capabilities"
                  index={i}
                  id={`work-approach-motion-${i}`}
                  key={c.t}
                >
                  <article
                    className="capability-card"
                    data-testid={`work-approach-${i}`}
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
                    <h2 className="mt-6 text-lg font-semibold">{c.t}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                      {c.d}
                    </p>
                  </article>
                </SectionMotion>
              ))}
            </div>
          </div>
        </section>
        <ProjectCTA id="work-detail" serviceId={service.id} />
        <Link
          to={`/work/${next.id}`}
          data-testid="next-work-link"
          className="next-page-link"
        >
          <div className="page-container flex items-center justify-between py-12">
            <div>
              <p className="eyebrow">{"Next in the collection"}</p>
              <p className="mt-3 text-2xl font-semibold">{next.name}</p>
            </div>
            <ArrowRight size={26} />
          </div>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
export default WorkDetail;
