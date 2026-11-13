import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { SectionHead } from "./Reveal.jsx";
import { CASE_STUDIES } from "../data/content.js";
import { ProjectCard } from "./ProjectCard.jsx";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import React from "react";
function CaseStudies() {
  return (
    <section
      id="work"
      data-testid="work-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="work" />
      <div className="section-content page-container">
        <SectionHead
          index="02"
          label="Work / Design studies"
          title="Ambitious ideas. Tangible experiences."
          desc="A collection of illustrative projects across healthcare, finance, commerce and media."
        />
        <p data-testid="work-sample-notice" className="sample-note mb-8">
          {
            "Concept projects \xB7 Generated product visuals \xB7 Illustrative metrics"
          }
        </p>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {CASE_STUDIES.map((study, i) => (
            <ProjectCard study={study} index={i} offset={true} key={study.id} />
          ))}
        </div>
        <Link
          to="/work"
          data-testid="all-work-link"
          className="text-link mt-12"
        >
          {"Explore the collection "}
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
export default CaseStudies;
