import { BACKGROUNDS } from "../data/visuals.js";
import React from "react";
const SectionBackdrop = ({ variant, hero = false, src, id }) => {
  if (!hero) {
    return (
      <div
        aria-hidden="true"
        data-testid={`background-${id || variant}`}
        className="section-ambient"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      data-testid={`background-${id || variant}`}
      className="section-backdrop section-backdrop--hero"
    >
      <img
        src={src || BACKGROUNDS[variant] || BACKGROUNDS.hero}
        alt=""
        loading="eager"
        fetchPriority="high"
        width="1264"
        height="848"
      />
      <div className="section-backdrop-shade" />
    </div>
  );
};
export { SectionBackdrop };
