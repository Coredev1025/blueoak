import { SectionMotion } from "./SectionMotion.jsx";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import React from "react";
const ProjectCard = ({ study, index = 0, offset = false }) => (
  <SectionMotion
    kind="work"
    index={index % 2}
    id={`project-motion-${study.id}`}
    className={offset && index % 2 ? "md:mt-16" : ""}
  >
    <Link
      to={`/work/${study.id}`}
      data-testid={`case-study-${study.id}`}
      data-cursor="card"
      data-cursor-label="Open"
      className="project-card group block"
    >
      <div className="project-image">
        <img
          data-testid={`project-image-${study.id}`}
          src={study.image}
          alt={`${study.name} — generated concept product visual`}
          loading="lazy"
          width="1264"
          height="848"
        />
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-[11px]">
            <span
              style={{
                display: "contents",
              }}
            >
              {study.industry}
            </span>
            {" / Concept"}
          </p>
          <h3
            data-testid={`project-name-${study.id}`}
            className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
          >
            {study.name}
          </h3>
        </div>
        <span className="project-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
        {study.blurb}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {study.tags.map((tag, i) => (
          <span
            data-testid={`project-tag-${study.id}-${i}`}
            className="font-mono text-[11px] text-slate-400"
            key={tag}
          >
            {tag}
            {i === 0 ? " /" : ""}
          </span>
        ))}
      </div>
    </Link>
  </SectionMotion>
);
export { ProjectCard };
