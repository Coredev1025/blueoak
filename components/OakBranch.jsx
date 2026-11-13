import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* OakBranch – the brand ornament: a thin oak branch with small leaves, or a sweeping arc accent.
   { variant: 'branch' | 'arc' | 'seam' (default 'branch'), className, pulse (default true: a soft light travels along the branch), fit (SVG preserveAspectRatio, default 'xMidYMid meet') }
   The colour comes from the text colour of className (e.g. text-accent opacity-60). It is decorative (aria-hidden). */
export default function OakBranch({ variant = 'branch', className = '', pulse = true, fit }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draw = (delay, dur) => ({ initial: { pathLength: reduce ? 1 : 0 }, whileInView: { pathLength: 1 }, viewport: { once: true }, transition: { duration: dur || 1.6, delay: delay || 0, ease: 'easeOut' } });
  const leaf = (l, i, base) => (
    <path key={base + i} d="M0 0C5-9 17-9 24 0C17 9 5 9 0 0Z" transform={`translate(${l[0]} ${l[1]}) rotate(${l[2]}) scale(${l[3]})`} fill="currentColor" opacity="0.6" />
  );

  if (variant === 'arc') {
    return (
      <svg className={className} viewBox="0 0 800 800" fill="none" aria-hidden="true" preserveAspectRatio={fit || 'xMidYMid meet'}>
        <motion.path d="M30 740 C 30 340 340 50 770 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...draw(0, 2.2)} />
        <motion.path d="M90 760 C 110 420 380 150 780 150" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" {...draw(0.4, 2.2)} />
        <motion.path d="M0 790 C 200 740 420 770 800 730" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" {...draw(0.8, 2)} />
        {[[30, 740], [770, 70], [330, 240]].map((p) => <circle key={p.join()} cx={p[0]} cy={p[1]} r="4" fill="currentColor" />)}
        {[[330, 240, -40, 1], [210, 380, -70, 0.9], [120, 530, -85, 0.8], [520, 140, -10, 0.9]].map((l, i) => leaf(l, i, 'a'))}
      </svg>
    );
  }

  const main = 'M0 110 C 160 110 220 62 380 62 S 640 120 820 100 S 1060 40 1200 50';
  const twigs = [
    { d: 'M380 62 C 400 40 430 28 460 24', leaves: [[460, 24, -30, 1], [430, 34, -60, 0.8], [412, 46, -80, 0.7]] },
    { d: 'M820 100 C 840 128 870 140 905 144', leaves: [[905, 144, 25, 1], [868, 138, 50, 0.8], [842, 124, 70, 0.7]] },
    { d: 'M230 82 C 240 100 260 112 285 118', leaves: [[285, 118, 20, 0.9], [258, 108, 50, 0.7]] },
    { d: 'M1000 62 C 1020 40 1050 30 1085 30', leaves: [[1085, 30, -25, 1], [1050, 34, -50, 0.8]] }
  ];
  const isSeam = variant === 'seam';
  return (
    <svg className={className} viewBox="0 0 1200 160" fill="none" aria-hidden="true" preserveAspectRatio={fit || (isSeam ? 'none' : 'xMidYMid meet')}>
      <motion.path d={main} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" {...draw(0, 2)} />
      {twigs.map((tw, i) => (
        <g key={i}>
          <motion.path d={tw.d} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" {...draw(0.9 + i * 0.2, 1)} />
          {tw.leaves.map((l, j) => leaf(l, j, 't' + i))}
        </g>
      ))}
      <circle cx="380" cy="62" r="3.5" fill="currentColor" />
      <circle cx="820" cy="100" r="3.5" fill="currentColor" />
      {pulse && !reduce ? (
        <g>
          <circle r="8" fill="currentColor" opacity="0.25"><animateMotion dur="9s" repeatCount="indefinite" path={main} /></circle>
          <circle r="3" fill="#BFE6FF"><animateMotion dur="9s" repeatCount="indefinite" path={main} /></circle>
        </g>
      ) : null}
    </svg>
  );
}
