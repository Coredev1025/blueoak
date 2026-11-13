import { SectionBackdrop } from "./SectionBackdrop.jsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { HERO_STATS } from "../data/content.js";
import React from "react";
function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="cinematic-section media-band home-hero"
    >
      <SectionBackdrop variant="hero" hero={true} />
      <div className="section-content page-container w-full">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="hero-copy"
        >
          <p data-testid="hero-brand" className="eyebrow mb-6">
            {"BlueOak Software LLC / Engineering studio"}
          </p>
          <h1 data-testid="hero-title" className="display-title">
            <span
              className="block hero-word"
              style={{
                "--wi": 0,
              }}
            >
              {"Deep roots."}
            </span>
            <span
              className="block hero-word"
              style={{
                "--wi": 1,
              }}
            >
              {"Bold software."}
            </span>
            <em className="block gold-text font-serif font-medium">
              {"Built to outlast."}
            </em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl lg:text-2xl">
            {
              "From a first idea to your next big leap. We engineer web platforms, mobile experiences and AI systems with the future built in."
            }
          </p>
          <div className="mt-11 flex flex-wrap gap-4">
            <Link
              to="/#contact"
              data-testid="hero-cta-button"
              className="primary-button"
            >
              {"Start a project "}
              <ArrowUpRight size={17} />
            </Link>
            <Link
              to="/work"
              data-testid="hero-secondary-button"
              className="outline-button"
            >
              {"Explore our work "}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
        <div className="hero-bottom">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-12">
            {HERO_STATS.map((stat, i) => (
              <motion.div
                data-testid={`hero-stat-${i}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35 + i * 0.1,
                }}
                key={stat.l}
              >
                <div className="font-mono text-4xl text-slate-50">
                  {stat.v.padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm text-slate-400">{stat.l}</div>
              </motion.div>
            ))}
          </div>
          <Link
            to="/#services"
            data-testid="hero-scroll-link"
            aria-label="Scroll to services"
            className="hero-scroll"
          >
            <ArrowDown size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Hero;
