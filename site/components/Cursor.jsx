import React, { useRef, useState, useEffect } from "react";
const LEAF_PATH =
  "M12 1C16.2 5.2 14.2 8.2 17.6 9.8C14.1 11.2 15.1 12.8 18 14.3C14.6 16.2 15.5 18.2 16 20.3C13.6 19.8 12.9 21.7 12 25.5C11.1 21.7 10.4 19.8 8 20.3C8.5 18.2 9.4 16.2 6 14.3C8.9 12.8 9.9 11.2 6.4 9.8C9.8 8.2 7.8 5.2 12 1Z";
function Cursor() {
  const rootRef = useRef(null);
  const [mode, setMode] = useState("default");
  const [label, setLabel] = useState("View");
  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    document.documentElement.classList.add("oak-cursor");
    const root = rootRef.current;
    const leaf = root.querySelector(".oak-cursor-leaf");
    const ring = root.querySelector(".oak-cursor-ring");
    const dot = root.querySelector(".oak-cursor-dot");
    const target = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const pos = {
      ...target,
    };
    const slow = {
      ...target,
    };
    let angle = 0;
    let raf;
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el =
        e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      if (el) {
        setMode(el.getAttribute("data-cursor"));
        setLabel(el.getAttribute("data-cursor-label") || "View");
      } else {
        setMode("default");
      }
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      slow.x += (target.x - slow.x) * 0.1;
      slow.y += (target.y - slow.y) * 0.1;
      angle +=
        (Math.max(-28, Math.min(28, (target.x - pos.x) * 1.6)) - angle) * 0.12;
      leaf.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${-18 + angle}deg)`;
      ring.style.transform = `translate(${slow.x}px, ${slow.y}px)`;
      dot.style.transform = `translate(${target.x}px, ${target.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, {
      passive: true,
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("oak-cursor");
    };
  }, []);
  return (
    <div
      ref={rootRef}
      data-testid="oak-cursor"
      data-mode={mode}
      aria-hidden="true"
      className="oak-cursor-root"
    >
      <div className="oak-cursor-leaf">
        <svg width="34" height="38" viewBox="0 0 24 27" fill="none">
          <path d={LEAF_PATH} fill="var(--accent)" />
          <path
            d="M12 3.5V24"
            stroke="var(--bg)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      </div>
      <div className="oak-cursor-ring">
        <span>{label}</span>
      </div>
      <div className="oak-cursor-dot" />
    </div>
  );
}
export default Cursor;
