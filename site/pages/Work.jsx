import { CASE_STUDIES } from "../data/content.js";
import React, { useState } from "react";
import Nav from "../components/Nav.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { BACKGROUNDS } from "../data/visuals.js";
import { SectionBackdrop } from "../components/SectionBackdrop.jsx";
import { ProjectCard } from "../components/ProjectCard.jsx";
import { ProjectCTA } from "../components/ServiceSections.jsx";
import Footer from "../components/Footer.jsx";
const filters = ["All", ...new Set(CASE_STUDIES.map((s) => s.industry))];
function Work() {
  const [filter, setFilter] = useState("All");
  const studies = CASE_STUDIES.filter(
    (s) => filter === "All" || s.industry === filter,
  );
  return (
    <div data-testid="work-page">
      <Nav />
      <main>
        <PageHero
          id="work"
          eyebrow="BlueOak / The collection"
          title={
            <>
              {"Ideas, made"}
              <br />
              <em className="font-serif font-medium text-oak-300">
                {"remarkable."}
              </em>
            </>
          }
          description="A closer look at the experiences and systems we imagine. Four concept projects. Four very different challenges."
          art={BACKGROUNDS.work}
          cta="Explore the collection"
          ctaTo="/work#collection"
        />
        <section
          id="collection"
          data-testid="work-collection"
          className="cinematic-section section-space"
        >
          <SectionBackdrop variant="voices" id="work-collection" />
          <div className="section-content page-container">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
              <div
                className="work-filters"
                aria-label="Filter projects by industry"
              >
                {filters.map((f) => (
                  <button
                    data-testid={`work-filter-${f.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={filter === f ? "active" : ""}
                    key={f}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <p
                data-testid="work-result-count"
                aria-live="polite"
                className="font-mono text-xs text-slate-400"
              >
                <span
                  style={{
                    display: "contents",
                  }}
                >
                  {String(studies.length).padStart(2, "0")}
                </span>
                {" projects"}
              </p>
            </div>
            <p
              data-testid="work-page-sample-notice"
              className="sample-note mb-8"
            >
              {
                "Concept projects \xB7 Generated product visuals \xB7 Illustrative metrics, not verified client results"
              }
            </p>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
              {studies.map((s, i) => (
                <ProjectCard study={s} index={i} key={s.id} />
              ))}
            </div>
          </div>
        </section>
        <ProjectCTA id="work" />
      </main>
      <Footer />
    </div>
  );
}
export default Work;
