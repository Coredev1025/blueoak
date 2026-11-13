import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import FilmStrip from "../components/FilmStrip.jsx";
import Marquee from "../components/Marquee.jsx";
import Office from "../components/Office.jsx";
import ServicesBento from "../components/ServicesBento.jsx";
import CaseStudies from "../components/CaseStudies.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Team from "../components/Team.jsx";
import TeamMoments from "../components/TeamMoments.jsx";
import Growth from "../components/Growth.jsx";
import Careers from "../components/Careers.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";
function Home() {
  return (
    <div
      data-testid="home-page"
      className="relative min-h-screen bg-ink-900 text-slate-100"
    >
      <Nav />
      <main>
        <Hero />
        <FilmStrip />
        <Marquee />
        <Office />
        <ServicesBento />
        <CaseStudies />
        <Testimonials />
        <Team />
        <TeamMoments />
        <Growth />
        <Careers />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
export default Home;
