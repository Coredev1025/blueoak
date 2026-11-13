import { GROWTH, CAREERS } from "../data/content.js";
import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { SectionHead } from "./Reveal.jsx";
import { SectionMotion } from "./SectionMotion.jsx";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import React from "react";
function Careers() {
  const target = GROWTH[GROWTH.length - 1].people + CAREERS.length;
  return (
    <section
      id="careers"
      data-testid="careers-section"
      className="cinematic-section section-space border-t border-white/10"
    >
      <SectionBackdrop variant="careers" id="careers" />
      <div className="section-content page-container">
        <SectionHead
          index="07"
          label="Open roles"
          title="The next chapter needs people."
          desc={`We grew from two to ${GROWTH[GROWTH.length - 1].people}. These ${CAREERS.length} roles take us to ${target}.`}
        />
        <div>
          {CAREERS.map((role, i) => (
            <SectionMotion
              kind="process"
              index={i}
              id={`role-motion-${role.id}`}
              key={role.id}
            >
              <article data-testid={`role-${role.id}`} className="role-row">
                <div>
                  <h3
                    data-testid={`role-title-${role.id}`}
                    className="role-title"
                  >
                    {role.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400">
                    {role.blurb}
                  </p>
                </div>
                <p className="role-meta">
                  {role.location}
                  <span className="mx-2">{"/"}</span>
                  {role.type}
                </p>
                <Link
                  to={`/?role=${role.id}#contact`}
                  data-testid={`role-apply-${role.id}`}
                  data-cursor="link"
                  className="role-apply"
                >
                  {"Apply "}
                  <ArrowUpRight size={17} />
                </Link>
              </article>
            </SectionMotion>
          ))}
        </div>
        <p data-testid="careers-note" className="sample-note mt-8">
          {
            "Don't see your discipline? Send a brief anyway \u2014 we read everything."
          }
        </p>
      </div>
    </section>
  );
}
export default Careers;
