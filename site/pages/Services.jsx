import Nav from "../components/Nav.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { BACKGROUNDS } from "../data/visuals.js";
import ServicesBento from "../components/ServicesBento.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";
function Services() {
  return (
    <div data-testid="services-page">
      <Nav />
      <main>
        <PageHero
          id="services"
          eyebrow="BlueOak / Expertise"
          title={
            <>
              {"Your ambition."}
              <br />
              <em className="font-serif font-medium text-oak-300">
                {"Our engineering."}
              </em>
            </>
          }
          description="Seven connected disciplines. One team to take your product from the first conversation to its next chapter."
          art={BACKGROUNDS.services}
          cta="Find your discipline"
          ctaTo="/services#services"
        />
        <ServicesBento standalone={true} />
      </main>
      <Footer />
    </div>
  );
}
export default Services;
