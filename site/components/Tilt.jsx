import React, { useRef } from "react";
import {
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  motion,
} from "framer-motion";
function Tilt({ children, className = "", max = 6, id }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, {
    stiffness: 160,
    damping: 18,
  });
  const sry = useSpring(ry, {
    stiffness: 160,
    damping: 18,
  });
  const spot = useMotionTemplate`radial-gradient(560px circle at ${mx}% ${my}%, rgba(77,157,255,0.10), transparent 45%)`;
  const onMove = (e) => {
    if (reduced || !window.matchMedia("(hover: hover)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / Math.max(r.width, 1);
    const py = (e.clientY - r.top) / Math.max(r.height, 1);
    ry.set((0.5 - px) * max * 2);
    rx.set((py - 0.5) * max * 2);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };
  return (
    <motion.div
      ref={ref}
      data-testid={id}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
      }}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
        style={{
          background: spot,
        }}
      />
    </motion.div>
  );
}
export default Tilt;
