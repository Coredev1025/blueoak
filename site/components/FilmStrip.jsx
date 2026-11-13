import { MOMENTS } from "../data/content.js";
import React from "react";
function FilmStrip() {
  const row = (hidden) => (
    <>
      {MOMENTS.map((m, i) => (
        <figure
          data-testid={hidden ? undefined : `film-cell-${m.id}`}
          aria-hidden={hidden || undefined}
          className="film-cell"
          key={`${m.id}-${hidden ? "b" : "a"}`}
        >
          <img
            src={m.img}
            alt={hidden ? "" : m.alt}
            loading={i === 0 ? "eager" : "lazy"}
            width="1264"
            height="848"
          />
          <figcaption>{m.kicker}</figcaption>
        </figure>
      ))}
    </>
  );
  return (
    <section
      data-testid="film-strip"
      aria-label="Life inside the BlueOak studio"
      className="film-strip"
    >
      <div className="film-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
export default FilmStrip;
