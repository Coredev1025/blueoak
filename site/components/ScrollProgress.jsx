import { useScroll, useSpring, motion } from "framer-motion";
import React from "react";
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });
  return (
    <motion.div
      data-testid="scroll-progress-bar"
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-oak-600 via-oak-300 to-oak-600"
      style={{
        scaleX,
      }}
    />
  );
}
export default ScrollProgress;
