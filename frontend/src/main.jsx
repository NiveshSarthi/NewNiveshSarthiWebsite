import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./mirror.css";

const NAVBAR_LOGO = "/assets/images/nivesh-sarthi-full-navbar-logo.png";
const SITE_TITLE = "Nivesh Sarthi | Premium Real Estate Consultants";
const CONTACT_HQ_LABEL = "Corporate HQ";
const CONTACT_ADDRESS = "628-630, 6th Floor, Puri 81 Business Hub, Sector 81, Faridabad";
const CONTACT_PHONE_LABEL = "Phone";
const CONTACT_PHONE_DISPLAY = "+91 95600 31319";
const CONTACT_PHONE_TEL = "+919560031319";
const CONTACT_EMAIL = "info.niveshsarthi@gmail.com";
const CONTACT_WEBSITE = "www.niveshsarthi.com";
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/niveshsarthii",
  instagram: "https://www.instagram.com/niveshsarthi_/",
  linkedin: "https://www.linkedin.com/in/nivesh-sarthi",
};
const ADMIN_TOKEN_STORAGE_KEY = "nivesh-admin-token";
const resolveApiBaseUrl = () => {
  const configuredApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  if (configuredApiBaseUrl) return configuredApiBaseUrl;
  if (typeof window === "undefined") return "";
  const hostname = window.location.hostname;
  if (hostname === "new.niveshsarthi.com" || hostname === "www.niveshsarthi.com" || hostname === "niveshsarthi.com") {
    return "https://api.niveshsarthi.com";
  }
  return "";
};
const defaultApiBaseUrl = resolveApiBaseUrl();
const apiUrl = (path) => `${defaultApiBaseUrl}${path}`;
const getStoredAdminToken = () => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";
};
const HERO_IMAGES = [
  "/assets/images/hero section image 3.webp",
  "/assets/images/hero section real estate.jpeg",
];

const HERO_CONTENT = `
  <div class="nivesh-hero-content">
    <h1>Elevating Real Estate Beyond Expectations</h1>
    <p class="nivesh-hero-subtitle">Discover premium residences, commercial addresses, and investment-ready landmarks curated with transparent guidance and a private-client standard.</p>
    <p class="nivesh-hero-location">Focused across Golf Course Road, Cyber City, Sector 81 Faridabad, and NCR growth corridors.</p>
    <div class="nivesh-hero-stats" aria-label="Portfolio highlights">
      <div><strong>25+</strong><span>Landmarks</span></div>
      <div><strong>300+</strong><span>Families</span></div>
      <div><strong>15 Years</strong><span>Market Insight</span></div>
    </div>
    <div class="nivesh-hero-actions">
      <a class="nivesh-hero-primary" href="/properties">View Properties</a>
      <a class="nivesh-hero-secondary" href="/properties">Search Portfolio</a>
    </div>
  </div>
  <form class="nivesh-property-search" aria-label="Property search">
    <label>
      <span>Location</span>
      <select>
        <option>Faridabad</option>
        <option>Greater Faridabad</option>
      </select>
    </label>
    <label>
      <span>Asset Type</span>
      <select>
        <option>Luxury Residence</option>
        <option>Commercial Address</option>
        <option>SCO Plot</option>
        <option>Investment Landmark</option>
      </select>
    </label>
    <label>
      <span>Budget</span>
      <select>
        <option>Premium Portfolio</option>
        <option>1 Cr - 3 Cr</option>
        <option>3 Cr - 7 Cr</option>
        <option>7 Cr+</option>
      </select>
    </label>
    <a href="/properties">Explore</a>
  </form>
`;

const NIVESH_HOME_ABOUT_SECTION = `
  <section id="about" class="nivesh-home-about-section nivesh-home-pathways-section" aria-label="Property pathways">
    <div class="container">
      <div class="nivesh-home-about-layout">
        <div class="nivesh-home-pathways-media" data-aos="fade-right">
          <article>
            <img src="/assets/images/propertymaster/optimized/bptp-skynest-towers.jpg" alt="Residential property in Faridabad" loading="eager" decoding="async">
            <div><span>Residential</span><strong>Homes For End Use</strong></div>
          </article>
          <article>
            <img src="/assets/images/propertymaster/faridabad/adore-fantasy-street.webp" alt="Commercial property in Faridabad" loading="eager" decoding="async">
            <div><span>Commercial</span><strong>Retail And Office Assets</strong></div>
          </article>
        </div>
        <div class="nivesh-home-about-copy" data-aos="fade-left">
          <span>Property Pathways</span>
          <h2>Choose The Right Route For Your Faridabad Real Estate Goal</h2>
          <p>
            Every buyer arrives with a different objective. Some need a family home, some want rental income, some are comparing commercial visibility, and some are waiting for the right plotted opportunity.
          </p>
          <p class="nivesh-home-pathways-copy">
            We organize the market into clear pathways so you can compare options by purpose, location, budget, possession stage, and long-term usability.
          </p>
          <p class="nivesh-home-pathways-old-copy">
            Our approach is focused, not scattered. Every recommendation is shaped by location strength, builder credibility, pricing logic, future usability, and the client’s real objective.
          </p>
          <div class="nivesh-home-about-highlights">
            <div><strong>Buy</strong><small>Ready And Under-Construction Homes</small></div>
            <div><strong>Invest</strong><small>Growth Corridors And Rental Potential</small></div>
            <div><strong>Build</strong><small>SCO, Plotted And Land-Led Options</small></div>
          </div>
          <div class="nivesh-home-about-method" aria-label="Property pathway process">
            <div>
              <strong>Start With Your Objective</strong>
              <p>Tell us what the property needs to do for you. We convert that into a focused shortlist instead of sending random inventory.</p>
            </div>
            <ul>
              <li><span>01</span>End-Use Home</li>
              <li><span>02</span>Investment Asset</li>
              <li><span>03</span>Commercial Growth</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const NIVESH_HOME_MATCH_SECTION = `
  <section id="about" class="nivesh-home-about-section nivesh-home-match-section" aria-label="Find your property match">
    <div class="container">
      <div class="nivesh-home-match-head" data-aos="fade-up">
        <span>Find Your Property Match</span>
        <p>Instead of browsing everything at once, compare the market through the route that fits your purpose: living, investing, business visibility, or plotted growth.</p>
      </div>

      <div class="nivesh-home-match-layout">
        <div class="nivesh-home-match-feature" data-aos="fade-right">
          <img src="/assets/images/hero section real estate.jpeg" alt="Faridabad real estate advisory" loading="eager" decoding="async">
          <div class="nivesh-home-match-feature-copy">
            <span>Faridabad Advisory</span>
            <strong>Residential, commercial, SCO and plotted options curated around your real objective.</strong>
            <a href="/properties">Explore Properties</a>
          </div>
        </div>

        <div class="nivesh-home-match-grid" data-aos="fade-left">
          <article>
            <i class="fas fa-house-chimney"></i>
            <div>
              <span>Live</span>
              <h3>Family Homes</h3>
              <p>Ready and under-construction residences matched to lifestyle, connectivity, and possession comfort.</p>
            </div>
          </article>
          <article>
            <i class="fas fa-chart-line"></i>
            <div>
              <span>Invest</span>
              <h3>Growth Assets</h3>
              <p>Projects and pockets compared for appreciation logic, rental demand, and exit potential.</p>
            </div>
          </article>
          <article>
            <i class="fas fa-store"></i>
            <div>
              <span>Operate</span>
              <h3>Commercial Spaces</h3>
              <p>Retail, office, and high-street opportunities reviewed for visibility, access, and footfall.</p>
            </div>
          </article>
          <article>
            <i class="fas fa-map-location-dot"></i>
            <div>
              <span>Build</span>
              <h3>SCO And Plots</h3>
              <p>Land-led options screened for location strength, approvals, usability, and long-term value.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
`;

const FARIDABAD_EDITORIAL_SECTION = `
  <section class="nivesh-editorial-section" aria-label="Faridabad real estate insight">
    <div class="container">
      <div class="nivesh-editorial-layout">
        <div class="nivesh-editorial-copy" data-aos="fade-right">
          <span>Market Perspective</span>
          <h2>Faridabad Is Entering Its Next Premium Growth Cycle</h2>
          <p>
            Greater Faridabad, Sector 80-99A, NH-44, and the Delhi-Mumbai Expressway corridor are reshaping the way buyers evaluate NCR real estate. The market is moving beyond affordability alone toward plotted communities, larger residences, and infrastructure-led appreciation.
          </p>
          <p>
            Nivesh Sarthi curates opportunities with a private-client lens, balancing lifestyle, connectivity, developer credibility, and long-term exit value.
          </p>
        </div>
        <div class="nivesh-editorial-panel" data-aos="fade-left">
          <div>
            <strong>01</strong>
            <span>Corridor-Led Growth</span>
            <p>Expressway access, bypass movement, and NCR expansion are creating stronger demand pockets.</p>
          </div>
          <div>
            <strong>02</strong>
            <span>Land-Led Wealth</span>
            <p>Premium plots and independent floors offer flexibility for both end-use and portfolio strategy.</p>
          </div>
          <div>
            <strong>03</strong>
            <span>Curated Advisory</span>
            <p>Every shortlist is filtered through location strength, product quality, and investment clarity.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const EXPERTISE_SECTION = `
  <section id="services" class="nivesh-expertise-section" aria-label="Nivesh Sarthi expertise">
    <div class="container">
      <div class="nivesh-expertise-layout">
        <div class="nivesh-expertise-copy" data-aos="fade-right">
          <span>Our Expertise</span>
          <h2>Private-Client Real Estate Advisory For Every Move</h2>
          <p>
            From first shortlist to final possession, Nivesh Sarthi brings clarity to high-value decisions across residential, commercial, plotted, and investment-led real estate.
          </p>
          <p>
            We combine market intelligence, developer access, location research, and transaction discipline so every recommendation feels considered, transparent, and aligned with your long-term goals.
          </p>
          <a href="/contact">Schedule a Consultation</a>
        </div>
        <div class="nivesh-expertise-grid" data-aos="fade-left">
          <article>
            <i class="fas fa-home"></i>
            <h3>Luxury Residences</h3>
            <p>Curated homes and premium communities matched to lifestyle, location, and appreciation potential.</p>
          </article>
          <article>
            <i class="fas fa-chart-line"></i>
            <h3>Investment Strategy</h3>
            <p>Data-led guidance across growth corridors, launch opportunities, and portfolio diversification.</p>
          </article>
          <article>
            <i class="fas fa-city"></i>
            <h3>Commercial Addresses</h3>
            <p>Retail, office, and income-generating assets filtered for visibility, access, and business strength.</p>
          </article>
          <article>
            <i class="fas fa-file-signature"></i>
            <h3>Transaction Support</h3>
            <p>Due diligence, negotiation, documentation, and post-booking coordination handled with care.</p>
          </article>
          <article>
            <i class="fas fa-globe-asia"></i>
            <h3>NRI Advisory</h3>
            <p>Remote-friendly property discovery, documentation support, and portfolio monitoring for global clients.</p>
          </article>
          <article>
            <i class="fas fa-key"></i>
            <h3>Asset Management</h3>
            <p>Support for leasing, resale readiness, possession planning, and long-term property stewardship.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
`;

const WHY_NIVESH_SECTION = `
  <section class="nivesh-why-section" aria-label="Why choose Nivesh Sarthi">
    <div class="container">
      <div class="nivesh-why-heading" data-aos="fade-up">
        <span>Why Nivesh Sarthi</span>
        <h2>Guidance Built Around Trust, Timing, And Clarity</h2>
        <p>We turn complex real-estate decisions into confident moves through research, access, and calm advisory discipline.</p>
      </div>
      <div class="nivesh-why-layout">
        <article class="nivesh-why-feature" data-aos="fade-right">
          <div class="nivesh-why-logo-effect" aria-hidden="true">
            <img src="/assets/images/nivesh-sarthi-navbar-mark.png" alt="" loading="eager" decoding="sync" fetchpriority="high">
          </div>
          <div class="nivesh-why-feature-number">4</div>
          <h3>Focused Asset Classes</h3>
          <p>Residential homes, commercial spaces, SCO plots, and investment-ready assets curated around Faridabad's strongest growth pockets.</p>
        </article>
        <div class="nivesh-why-cards" data-aos="fade-left">
          <article>
            <i class="fas fa-compass"></i>
            <h3>Curated Shortlists</h3>
            <p>Only projects that match your intent, budget, location logic, and long-term portfolio direction.</p>
          </article>
          <article>
            <i class="fas fa-scale-balanced"></i>
            <h3>Transparent Evaluation</h3>
            <p>Clear comparisons on pricing, inventory, developer standing, possession timelines, and exit potential.</p>
          </article>
          <article>
            <i class="fas fa-gem"></i>
            <h3>Premium Access</h3>
            <p>Priority discovery across select residences, plotted developments, and commercial opportunities.</p>
          </article>
          <article>
            <i class="fas fa-handshake-angle"></i>
            <h3>End-To-End Support</h3>
            <p>From site visits and negotiation to paperwork, booking, possession, leasing, and resale readiness.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
`;

const FARIDABAD_PARTNERS = [
  { name: "Omaxe", logo: "/assets/images/faridabad-partners/omaxe.png" },
  { name: "BPTP", logo: "/assets/images/faridabad-partners/bptp.png" },
  { name: "Navraj", logo: "/assets/images/faridabad-partners/navraj.png" },
  { name: "Bhumika", logo: "/assets/images/faridabad-partners/bhumika.svg" },
  { name: "RPS", logo: "/assets/images/faridabad-partners/rps.png" },
  { name: "Adore", logo: "/assets/images/faridabad-partners/adore.png" },
  { name: "Amolik", logo: "/assets/images/faridabad-partners/amolik.png" },
  { name: "Neoliv", logo: "/assets/images/faridabad-partners/neoliv.webp" },
  { name: "Capital", logo: "/assets/images/faridabad-partners/capital.png" },
  { name: "Auric", logo: "/assets/images/faridabad-partners/auric.jpg" },
];

const FARIDABAD_PARTNERS_SECTION = `
  <section class="nivesh-partners-section" aria-label="Faridabad builder partners">
    <div class="container">
      <div class="nivesh-partners-heading" data-aos="fade-up">
        <span>Faridabad Builder Network</span>
        <h2>Channel Partner of Leading Builders</h2>
        <p>Focused relationships across Faridabad's active residential, plotted, and commercial development ecosystem.</p>
      </div>
      <div class="nivesh-partners-grid">
        ${FARIDABAD_PARTNERS.map((partner, index) => `
          <article class="nivesh-partner-card" data-partner="${partner.name}" data-aos="fade-up" data-aos-delay="${(index % 5) * 70}">
            <img src="${partner.logo}" alt="${partner.name} logo" loading="${partner.name === "RPS" ? "eager" : "lazy"}" decoding="${partner.name === "RPS" ? "sync" : "async"}"${partner.name === "RPS" ? " fetchpriority=\"high\"" : ""}>
            <span>${partner.name}</span>
          </article>
        `).join("")}
      </div>
    </div>
  </section>
`;

const FARIDABAD_OPPORTUNITIES_SECTION = `
  <section id="global" class="nivesh-corridor-section" aria-label="Faridabad opportunities">
    <div class="container">
      <div class="nivesh-corridor-heading" data-aos="fade-up">
        <span>Faridabad Opportunities</span>
        <h2>Focused On Faridabad's Most Promising Growth Corridors</h2>
        <p>Instead of chasing distant markets, we concentrate on the local pockets where infrastructure, access, and builder activity are shaping the next phase of NCR value.</p>
      </div>
      <div class="nivesh-corridor-grid">
        <article data-aos="fade-up">
          <img src="/assets/images/propertymaster/optimized/neoliv-golf-one.jpg" alt="Greater Faridabad corridor" loading="lazy" decoding="async">
          <div>
            <span>01</span>
            <h3>Greater Faridabad</h3>
            <p>Sector 80-99A plotted and residential pockets with strong end-use and investment interest.</p>
          </div>
        </article>
        <article data-aos="fade-up" data-aos-delay="100">
          <img src="/assets/images/propertymaster/optimized/bptp-skynest-towers.jpg" alt="Delhi Mumbai Expressway corridor" loading="lazy" decoding="async">
          <div>
            <span>02</span>
            <h3>Expressway Connectivity</h3>
            <p>Projects benefiting from Delhi-Mumbai Expressway access, bypass movement, and regional mobility upgrades.</p>
          </div>
        </article>
        <article data-aos="fade-up" data-aos-delay="200">
          <img src="/assets/images/propertymaster/optimized/amolik-concordia-living.jpg" alt="NH-44 Faridabad corridor" loading="lazy" decoding="async">
          <div>
            <span>03</span>
            <h3>NH-44 & Bypass Road</h3>
            <p>Land-led opportunities and ready communities positioned around established Faridabad access routes.</p>
          </div>
        </article>
      </div>
    </div>
  </section>
`;

const FARIDABAD_PROCESS_SECTION = `
  <section id="awards" class="nivesh-process-section" aria-label="Faridabad advisory process">
    <div class="container">
      <div class="nivesh-process-heading" data-aos="fade-up">
        <span>How We Work</span>
        <h2>A Clear Faridabad Buying Journey, From Shortlist To Possession</h2>
        <p>We replaced generic recognitions with something more useful: the actual advisory path we follow for Faridabad buyers and investors.</p>
      </div>
      <div class="nivesh-process-timeline">
        <article data-aos="fade-up">
          <strong>01</strong>
          <h3>Intent Mapping</h3>
          <p>We define whether the priority is end-use, rental yield, capital growth, land ownership, or a balanced portfolio move.</p>
        </article>
        <article data-aos="fade-up" data-aos-delay="90">
          <strong>02</strong>
          <h3>Corridor Filter</h3>
          <p>Projects are compared across Greater Faridabad, Sector 80-99A, NH-44, bypass access, and expressway-led pockets.</p>
        </article>
        <article data-aos="fade-up" data-aos-delay="180">
          <strong>03</strong>
          <h3>Builder & Inventory Check</h3>
          <p>We review developer standing, available inventory, price logic, layout fit, and practical exit or possession considerations.</p>
        </article>
        <article data-aos="fade-up" data-aos-delay="270">
          <strong>04</strong>
          <h3>Closure Support</h3>
          <p>Site visits, negotiation, documentation, booking coordination, and post-booking follow-up stay structured and transparent.</p>
        </article>
      </div>
    </div>
  </section>
`;

const NIVESH_NRI_SECTION = `
  <section id="nri" class="nivesh-nri-section" aria-label="NRI Faridabad advisory">
    <div class="container">
      <div class="nivesh-nri-layout">
        <div class="nivesh-nri-copy" data-aos="fade-right">
          <span>NRI Faridabad Advisory</span>
          <h2>Remote Property Guidance For Faridabad Investments</h2>
          <p>For NRIs evaluating Faridabad from outside India, Nivesh Sarthi provides a focused, transparent advisory path across Greater Faridabad, NH-44, bypass corridors, and select plotted/residential communities.</p>
          <p>We help you compare location strength, builder credibility, inventory, pricing, paperwork readiness, and long-term usability before you commit.</p>
          <a href="/contact">Discuss NRI Requirement</a>
        </div>
        <div class="nivesh-nri-grid" data-aos="fade-left">
          <article>
            <i class="fas fa-map-location-dot"></i>
            <h3>Faridabad Shortlisting</h3>
            <p>Remote-ready project discovery across Sector 80-99A, Greater Faridabad, and expressway-linked pockets.</p>
          </article>
          <article>
            <i class="fas fa-file-shield"></i>
            <h3>Document Clarity</h3>
            <p>Guidance on booking documents, payment schedules, RERA checks, and practical due-diligence steps.</p>
          </article>
          <article>
            <i class="fas fa-video"></i>
            <h3>Virtual Assistance</h3>
            <p>Video walkthrough coordination, inventory comparisons, and decision support without repeated travel.</p>
          </article>
          <article>
            <i class="fas fa-key"></i>
            <h3>Post-Booking Support</h3>
            <p>Assistance around follow-ups, possession readiness, leasing, resale planning, and local coordination.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
`;

const NIVESH_FAQ_SECTION = `
  <section id="faq" class="nivesh-faq-section" aria-label="Faridabad property FAQs">
    <div class="container">
      <div class="nivesh-faq-heading" data-aos="fade-up">
        <span>Faridabad FAQs</span>
        <h2>Questions Buyers Ask Before Investing In Faridabad</h2>
        <p>Clear answers for local, NRI, and investor clients evaluating Faridabad opportunities with Nivesh Sarthi.</p>
      </div>
      <div class="nivesh-faq-list" data-aos="fade-up" data-aos-delay="100">
        <details>
          <summary>Why is Faridabad becoming attractive for real-estate buyers?</summary>
          <p>Greater Faridabad, NH-44, bypass access, and expressway-led connectivity are improving the area's long-term appeal for residential, plotted, and commercial investment.</p>
        </details>
        <details>
          <summary>Does Nivesh Sarthi only deal in Faridabad?</summary>
          <p>The current advisory focus is Faridabad and nearby NCR growth corridors, with emphasis on projects, builders, and locations where our local market understanding is strongest.</p>
        </details>
        <details>
          <summary>How do you help NRIs evaluate Faridabad properties remotely?</summary>
          <p>We support remote shortlisting, video walkthrough coordination, inventory comparisons, document review guidance, payment schedule clarity, and local follow-up with builders.</p>
        </details>
        <details>
          <summary>Which Faridabad pockets do you focus on?</summary>
          <p>We focus on Greater Faridabad, Sector 80-99A, NH-44, Faridabad Bypass Road, Delhi-Mumbai Expressway-linked areas, and builder-led plotted/residential communities.</p>
        </details>
        <details>
          <summary>Do you help with both residential and investment properties?</summary>
          <p>Yes. We assist with residential homes, plots, independent floors, commercial assets, and investment-oriented opportunities based on budget, horizon, and use case.</p>
        </details>
      </div>
    </div>
  </section>
`;

const FARIDABAD_PROJECTS = [
  {
    title: "BPTP SkyNest Towers",
    slug: "bptp-skynest-towers",
    categories: ["residential"],
    developer: "Bptp Group",
    location: "Sector 80, Greater Faridabad",
    corridor: "Near the Delhi-Mumbai Expressway",
    image: "/assets/images/propertymaster/optimized/bptp-skynest-towers.jpg",
    gallery: ["/assets/images/propertymaster/optimized/bptp-skynest-towers.jpg"],
    status: "Fresh Launch",
    type: "3 & 4 BHK Residences",
    area: "3,185 - 3,856 SQFT",
    price: "Rs 4 Cr - Rs 5.39 Cr",
    description: "A premium high-rise residential address in Greater Faridabad with spacious 3 and 4 BHK homes, strong expressway connectivity, and a private-community lifestyle.",
    highlights: ["Fresh launch opportunity", "Large-format residences", "Delhi-Mumbai Expressway corridor", "Greater Faridabad growth zone"],
  },
  {
    title: "Neoliv Golf One",
    slug: "neoliv-golf-one",
    categories: ["residential"],
    developer: "Amolik Group",
    location: "Sector 98 & 99A",
    corridor: "Greater Faridabad (Neharpar)",
    image: "/assets/images/propertymaster/optimized/neoliv-golf-one.jpg",
    gallery: ["/assets/images/propertymaster/optimized/neoliv-golf-one.jpg"],
    status: "Fresh Launch",
    type: "Residential Plots",
    area: "181 - 388 SQYRD",
    price: "Rs 2.89 Cr - Rs 6.2 Cr",
    description: "A plotted development positioned around the Neharpar growth belt, designed for buyers looking at land ownership with long-term Faridabad upside.",
    highlights: ["Residential plot inventory", "Multiple plot sizes", "Sector 98 and 99A access", "Greater Faridabad location"],
  },
  {
    title: "Amolik Concordia Living",
    slug: "amolik-concordia-living",
    categories: ["residential"],
    developer: "Amolik Group",
    location: "Sector 97 Faridabad",
    corridor: "Faridabad Bypass Road, NH-44",
    image: "/assets/images/propertymaster/optimized/amolik-concordia-living.jpg",
    gallery: ["/assets/images/propertymaster/optimized/amolik-concordia-living.jpg"],
    status: "Ready To Move In",
    type: "Residential Plots",
    area: "185.92 - 337.63 SQYRD",
    price: "Rs 2.4 Cr - Rs 4.38 Cr",
    description: "A ready-to-move plotted community on Faridabad's NH-44 and bypass corridor, suited for end-use planning and investment-led land acquisition.",
    highlights: ["Ready to move in", "NH-44 connectivity", "Bypass Road access", "Premium plotted community"],
  },
  {
    title: "BPTP Parklands Pride",
    slug: "bptp-parklands-pride",
    categories: ["residential"],
    developer: "Bptp Group",
    location: "Sector 77, Faridabad",
    corridor: "Delhi-Faridabad Expressway",
    image: "/assets/images/propertymaster/optimized/bptp-parklands-pride.jpg",
    gallery: ["/assets/images/propertymaster/optimized/bptp-parklands-pride.jpg"],
    status: "Ready To Move In",
    type: "Independent Floors",
    area: "1,103 - 1,803 SQFT",
    price: "Rs 1.1 Cr - Rs 1.35 Cr",
    description: "A ready independent-floor address in Sector 77, Faridabad, with practical layouts and established access to the Delhi-Faridabad Expressway.",
    highlights: ["Ready independent floors", "Established sector location", "Expressway connectivity", "Efficient residential layouts"],
  },
  {
    title: "Amolik Blossomwoods",
    slug: "amolik-blossomwoods",
    categories: ["residential"],
    developer: "Amolik Group",
    location: "Sector 97, Faridabad",
    corridor: "NH-44 Delhi-Mathura Road",
    image: "/assets/images/propertymaster/optimized/amolik-blossomwoods.jpg",
    gallery: ["/assets/images/propertymaster/optimized/amolik-blossomwoods.jpg"],
    status: "Under Construction",
    type: "Residential Plots",
    area: "107 - 180 SQYRD",
    price: "Rs 1.01 Cr - Rs 1.71 Cr",
    description: "An under-construction plotted development in Sector 97, offering accessible plot sizes along the Delhi-Mathura Road growth corridor.",
    highlights: ["Under-construction plotted project", "Compact to mid-size plots", "Sector 97 address", "NH-44 corridor"],
  },
  {
    title: "Amolik Asterwoods",
    slug: "amolik-asterwoods",
    categories: ["residential"],
    developer: "Amolik Group",
    location: "Sector 98, Faridabad",
    corridor: "Greater Faridabad (Neharpar)",
    image: "/assets/images/propertymaster/optimized/amolik-asterwoods.jpg",
    gallery: ["/assets/images/propertymaster/optimized/amolik-asterwoods.jpg"],
    status: "Under Construction",
    type: "Residential Plots",
    area: "106.15 - 179.34 SQYRD",
    price: "Rs 1.45 Cr - Rs 2.51 Cr",
    description: "A plotted residential community in Sector 98, Greater Faridabad, suited for buyers seeking land-based assets in an active NCR expansion pocket.",
    highlights: ["Residential plots", "Greater Faridabad pocket", "Sector 98 location", "Multiple plot configurations"],
  },
  {
    title: "Adore Fantasy Street",
    slug: "adore-fantasy-street",
    categories: ["commercial", "sco"],
    developer: "Adore Realtech Private Limited",
    location: "Sector 79, Faridabad",
    corridor: "Greater Faridabad",
    image: "/assets/images/propertymaster/faridabad/adore-fantasy-street.webp",
    gallery: [
      "/assets/images/propertymaster/faridabad/adore-fantasy-street.webp",
      "/assets/images/propertymaster/faridabad/adore-fantasy-street-gallery.png",
    ],
    status: "Under Construction",
    type: "SCO + Commercial Plots",
    area: "164 - 249 Sq. Yd",
    price: "Rs 1.1 Cr onwards",
    description: "A premium SCO and commercial destination in Greater Faridabad, planned for retail, offices, restaurants, cafes, branded showrooms, clinics, and high-street business use.",
    highlights: ["SCO plots with flexible construction", "Retail, food and office ecosystem", "Strong residential catchment", "Visitor parking and organized high-street planning"],
  },
  {
    title: "Amolik Vibrante 82",
    slug: "amolik-vibrante-82",
    categories: ["commercial", "sco"],
    developer: "Amolik Group",
    location: "Sector 82, Faridabad",
    corridor: "Greater Faridabad (Neharpar)",
    image: "/assets/images/propertymaster/faridabad/amolik-vibrante-82.png",
    gallery: [
      "/assets/images/propertymaster/faridabad/amolik-vibrante-82.png",
      "/assets/images/propertymaster/faridabad/amolik-vibrante-82-gallery.png",
    ],
    status: "Under Construction",
    type: "SCO",
    area: "254 - 396 Sq. Yd",
    price: "Rs 2.8 Cr onwards",
    description: "A high-street commercial project with SCO inventory, strong sector visibility, and access to Mathura Road, FNG Expressway, and Delhi-Mumbai Expressway corridors.",
    highlights: ["Modern high-street retail concept", "SCO sizes from 254 to 396 Sq. Yd", "Surrounded by residential societies", "Developed by Amolik Group"],
  },
  {
    title: "Amolik Plaza 88",
    slug: "amolik-plaza-88",
    categories: ["commercial"],
    developer: "Amolik Group",
    location: "Sector 88, Faridabad",
    corridor: "Greater Faridabad (Neharpar)",
    image: "/assets/images/propertymaster/faridabad/amolik-plaza-88.png",
    gallery: [
      "/assets/images/propertymaster/faridabad/amolik-plaza-88.png",
      "/assets/images/propertymaster/faridabad/amolik-plaza-88-gallery.png",
    ],
    status: "Under Construction",
    type: "Retail & Business Spaces",
    area: "664 - 1,248 Sq. Ft",
    price: "Rs 75 L onwards",
    description: "A modern commercial project in Sector 88, offering retail shops, showrooms, and business spaces in a fast-growing residential catchment.",
    highlights: ["High-street retail frontage", "Sector 88 growth pocket", "Power backup and security", "Retail spaces from 664 Sq. Ft"],
  },
  {
    title: "Anushree Greens",
    slug: "anushree-greens",
    categories: ["residential"],
    developer: "Anushree",
    location: "Sector 97, Faridabad",
    corridor: "Greater Faridabad",
    image: "/assets/images/propertymaster/faridabad/anushree-greens.jpg",
    gallery: [
      "/assets/images/propertymaster/faridabad/anushree-greens.jpg",
      "/assets/images/propertymaster/faridabad/anushree-greens-gallery.jpg",
      "/assets/images/propertymaster/faridabad/anushree-greens-site.jpg",
      "/assets/images/propertymaster/faridabad/anushree-greens-map.jpg",
    ],
    status: "Under Construction",
    type: "Residential Plots",
    area: "124 - 177 Sq. Yd",
    price: "Rs 1.2 Cr onwards",
    description: "A plotted residential community focused on privacy, green surroundings, long-term value, and convenient access to Faridabad's growing infrastructure corridors.",
    highlights: ["Residential plot inventory", "8-acre planned development", "Sector 97 address", "Basketball court, clubhouse, garden and security"],
  },
  {
    title: "BPTP Villa Q Block",
    slug: "bptp-villa-q-block",
    categories: ["residential"],
    developer: "Bptp Group",
    location: "Sector 75, Faridabad",
    corridor: "Greater Faridabad (Neharpar)",
    image: "/assets/images/propertymaster/optimized/bptp-parklands-pride.jpg",
    gallery: ["/assets/images/propertymaster/optimized/bptp-parklands-pride.jpg"],
    status: "On Request",
    type: "Independent Villas",
    area: "On Request",
    price: "On Request",
    description: "A premium independent villa address in BPTP's Greater Faridabad ecosystem, designed for privacy, larger living spaces, and established social infrastructure.",
    highlights: ["Independent villa format", "Sector 75 community setting", "BPTP developer ecosystem", "Close to schools, hospitals and retail conveniences"],
  },
  {
    title: "Adore Happy Homes",
    slug: "adore-happy-homes",
    categories: ["residential"],
    developer: "Adore Realtech Private Limited",
    location: "Sector 86, Faridabad",
    corridor: "Near NH-19 Delhi-Mathura Road",
    image: "/assets/images/hero section image 3.webp",
    gallery: ["/assets/images/hero section image 3.webp"],
    status: "Affordable Residential",
    type: "2 BHK Apartments",
    area: "2 BHK + 2 Bath + 1 Balcony",
    price: "Rs 34 L - Rs 44 L",
    description: "An accessible residential apartment option in Sector 86, positioned for buyers seeking compact homes with daily convenience and NH-19 connectivity.",
    highlights: ["2 BHK apartment layouts", "Sector 86 Faridabad", "Near NH-19", "Entry-level residential budget"],
  },
  {
    title: "Rise Clarks Residences",
    slug: "rise-clarks-residences",
    categories: ["residential"],
    developer: "Rise Projects",
    location: "Sector 41, Faridabad",
    corridor: "Mathura Road (NH-2)",
    image: "/assets/images/hero section real estate.jpeg",
    gallery: ["/assets/images/hero section real estate.jpeg"],
    status: "Residential",
    type: "1 BHK Apartment",
    area: "1 BHK + 1T",
    price: "Rs 49 L",
    description: "A compact residential option on the Mathura Road corridor, suited for buyers seeking a smaller apartment footprint within Faridabad.",
    highlights: ["1 BHK apartment", "Sector 41 Faridabad", "Mathura Road corridor", "Compact residential investment"],
  },
  {
    title: "Arihant South Winds",
    slug: "arihant-south-winds",
    categories: ["residential"],
    developer: "Arihant Buildcon Pvt. Ltd.",
    location: "Sector 41, Faridabad",
    corridor: "Delhi-Mathura Road, NH-19",
    image: "/assets/images/propertymaster/optimized/bptp-skynest-towers.jpg",
    gallery: ["/assets/images/propertymaster/optimized/bptp-skynest-towers.jpg"],
    status: "Residential",
    type: "3 & 4 BHK Apartments",
    area: "3 BHK - 4 BHK",
    price: "Rs 23.2 L - Rs 3.4 Cr",
    description: "A residential apartment project in Sector 41 with 3 and 4 BHK formats along the Delhi-Mathura Road and NH-19 access belt.",
    highlights: ["3 and 4 BHK apartment formats", "Sector 41 Faridabad", "NH-19 access", "Arihant developer inventory"],
  },
  {
    title: "Prosper Epic Homes",
    slug: "prosper-epic-homes",
    categories: ["residential"],
    developer: "Prosper Buildsquare LLP",
    location: "Sector 89, Faridabad",
    corridor: "Greater Faridabad (Neharpar)",
    image: "/assets/images/propertymaster/optimized/neoliv-golf-one.jpg",
    gallery: ["/assets/images/propertymaster/optimized/neoliv-golf-one.jpg"],
    status: "Residential",
    type: "3 & 4 BHK Apartments",
    area: "3 BHK + 3T, 4 BHK + 4T",
    price: "Rs 1.9 Cr - Rs 2.4 Cr",
    description: "A Greater Faridabad apartment project offering larger 3 and 4 BHK formats in Sector 89 for family-led residential planning.",
    highlights: ["3 and 4 BHK apartments", "Sector 89 Faridabad", "Greater Faridabad address", "Family-sized layouts"],
  },
];

const PROPERTY_CATEGORY_META = {
  all: {
    label: "All",
    title: "Faridabad Property Portfolio",
    eyebrow: "Curated Faridabad Inventory",
    description: "Residential, commercial, SCO, and advisory-led Faridabad opportunities collected into one local Nivesh Sarthi portfolio.",
  },
  residential: {
    label: "Residential",
    title: "Residential Properties In Faridabad",
    eyebrow: "Homes, Plots & Floors",
    description: "Apartments, independent floors, villas, and plotted communities across Greater Faridabad and established residential sectors.",
  },
  commercial: {
    label: "Commercial",
    title: "Commercial Properties In Faridabad",
    eyebrow: "Retail & Business Addresses",
    description: "High-street retail, business spaces, showrooms, and commercial investment options in active Faridabad catchments.",
  },
  sco: {
    label: "SCO",
    title: "SCO Properties In Faridabad",
    eyebrow: "Shop-Cum-Office Assets",
    description: "Flexible SCO formats for showrooms, restaurants, clinics, offices, cafes, and rental-yield focused ownership.",
  },
};

const SERVICE_PAGE_ITEMS = [
  {
    title: "Investment Advisory",
    icon: "fa-chart-line",
    text: "Shortlists shaped around budget, location logic, launch timing, rental potential, and long-term exit value.",
    points: ["Project comparison", "Pricing logic", "Portfolio fit"],
  },
  {
    title: "NRI Advisory",
    icon: "fa-globe-asia",
    text: "Remote-friendly discovery and coordination for clients evaluating Faridabad opportunities from outside India.",
    points: ["Video walkthroughs", "Document clarity", "Local coordination"],
  },
  {
    title: "Property Management",
    icon: "fa-key",
    text: "Post-purchase support for possession planning, leasing readiness, resale preparation, and asset upkeep.",
    points: ["Possession support", "Leasing readiness", "Asset monitoring"],
  },
  {
    title: "Land & Acquisition",
    icon: "fa-map-location-dot",
    text: "Guidance across plotted communities, SCO opportunities, and land-led assets in active Faridabad growth pockets.",
    points: ["Location screening", "Use-case mapping", "Due diligence flow"],
  },
];

function App() {
  const [routes, setRoutes] = useState(null);
  const [route, setRoute] = useState(normalizeRoute(window.location.pathname));
  const [properties, setProperties] = useState(FARIDABAD_PROJECTS);
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("loading");
  const project = useMemo(() => {
    const slug = route.match(/^\/project\/([^/]+)$/)?.[1];
    return properties.find((item) => item.slug === slug) || null;
  }, [properties, route]);
  const propertyCategory = useMemo(() => {
    const match = route.match(/^\/properties(?:\/([^/]+))?$/);
    if (!match) return null;
    const legacyCategoryMap = {
      "category-1": "commercial",
      "category-2": "residential",
      "category-3": "sco",
      "category-4": "all",
    };
    const category = legacyCategoryMap[match[1]] || match[1] || "all";
    return PROPERTY_CATEGORY_META[category] ? category : "all";
  }, [route]);

  useEffect(() => {
    document.title = SITE_TITLE;
    fetch("/mirror/routes.json")
      .then((response) => response.json())
      .then(setRoutes)
      .catch(() => setStatus("missing"));
  }, []);

  useEffect(() => {
    fetch(apiUrl("/api/properties"))
      .then((response) => response.ok ? response.json() : [])
      .then((items) => {
        if (Array.isArray(items)) setProperties(items);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(normalizeRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (route !== "/properties/industrial") return;
    history.replaceState({}, "", "/properties");
    setRoute("/properties");
  }, [route]);

  useEffect(() => {
    if (route !== "/nri-corner") return;
    history.replaceState({}, "", "/");
    setRoute("/");
  }, [route]);

  useEffect(() => {
    if (!isMediaRoute(route)) return;
    history.replaceState({}, "", "/");
    setRoute("/");
  }, [route]);

  useEffect(() => {
    if (!isLegacyServiceRoute(route)) return;
    history.replaceState({}, "", "/services");
    setRoute("/services");
  }, [route]);

  const pageUrl = useMemo(() => {
    if (!routes) return null;
    return routes.routes[route] || routes.routes[route.replace(/\/$/, "")] || routes.routes["/"];
  }, [route, routes]);

  useEffect(() => {
    if (!pageUrl) return;
    setStatus("loading");
    fetch(pageUrl)
      .then((response) => response.text())
      .then((text) => {
        const documentHtml = new DOMParser().parseFromString(text, "text/html");
        prepareMirrorDocument(documentHtml, route, properties);
        setHtml(documentHtml.body.innerHTML);
        setStatus("ready");
        document.title = SITE_TITLE;
      })
      .catch(() => setStatus("missing"));
  }, [pageUrl, route]);

  useEffect(() => {
    if (status !== "ready" || route !== "/") return;
    setupFaridabadProjects(document.getElementById("mirrored-page"), properties);
  }, [properties, route, status]);

  useEffect(() => {
    if (status !== "ready") return;

    const root = document.getElementById("mirrored-page");

    root?.querySelectorAll("script").forEach((oldScript) => {
      const script = document.createElement("script");
      [...oldScript.attributes].forEach((attr) => script.setAttribute(attr.name, attr.value));
      script.textContent = oldScript.textContent;
      oldScript.replaceWith(script);
    });

    setupHeroShowcase(root);
    window.AOS?.init?.({ duration: 800, once: true });
    wireLocalNavigation(root, setRoute);
  }, [html, status]);

  if (status === "missing") {
    return (
      <main className="mirror-error">
        <h1>Mirrored content is not ready</h1>
        <p>Run <code>npm run mirror</code> to download the mirrored pages and assets.</p>
      </main>
    );
  }

  if (project) {
    return <ProjectDetail project={project} onBack={() => setRoute(normalizeRoute("/"))} />;
  }

  if (route === "/services") {
    return <ServicesPage />;
  }

  if (route === "/consulting" || route === "/properties/category-4") {
    return <ConsultingPage />;
  }

  if (propertyCategory) {
    return <PropertyListingPage category={propertyCategory} properties={properties} />;
  }

  if (route === "/career") {
    return <CareerPage />;
  }

  if (route === "/our-story") {
    return <AboutPage />;
  }

  if (route === "/contact") {
    return <ContactPage />;
  }

  if (route === "/admin") {
    return <AdminPanel properties={properties} setProperties={setProperties} />;
  }

  return <div id="mirrored-page" dangerouslySetInnerHTML={{ __html: html }} />;
}

function AboutPage() {
  const founders = [
    {
      role: "Founder",
      image: "/assets/images/founder.jpeg",
      text: "Guides client conversations, investment intent, and project selection with a strong focus on trust, suitability, and long-term value.",
    },
    {
      role: "Co-Founder",
      image: "/assets/images/cofounder.jpeg",
      text: "Drives market research, builder coordination, and site-visit planning so every shortlist is practical, verified, and easy to compare.",
    },
  ];
  const values = [
    { title: "Started With Purpose", text: "Founded in 2024, Nivesh Sarthi was created to make Faridabad real estate decisions simpler, sharper, and more transparent." },
    { title: "Advice Before Inventory", text: "We first understand the person, budget, purpose, and risk comfort, then curate properties that actually make sense." },
    { title: "Faridabad First", text: "Our attention stays on Sector 81, Greater Faridabad, SCO zones, and nearby corridors where local knowledge matters most." },
  ];
  const stats = [
    { value: "Faridabad", label: "Core Market" },
    { value: "300+", label: "Families Guided" },
    { value: "4", label: "Asset Classes" },
  ];
  const focusAreas = [
    { title: "Residential Decisions", text: "Apartments, independent floors, villas, and plotted communities compared for family use, possession comfort, connectivity, and resale logic." },
    { title: "Commercial Growth", text: "Retail shops, office spaces, and high-street assets reviewed through visibility, catchment, rental potential, and business usability." },
    { title: "SCO And Land-Led Assets", text: "SCO plots, residential plots, and land opportunities evaluated for approvals, frontage, flexibility, and long-term value creation." },
    { title: "Investment Shortlists", text: "Growth corridors, under-construction launches, and ready assets filtered for entry price, demand depth, payment plan, and exit clarity." },
  ];
  const process = [
    { title: "Requirement Mapping", text: "We document budget, purpose, timeline, preferred location, family needs, and investment expectations before suggesting any project." },
    { title: "Project Comparison", text: "Options are compared on builder credibility, pricing, inventory, layout, possession stage, approvals, and corridor strength." },
    { title: "Site Visit Planning", text: "Shortlists are converted into practical site visits with clear talking points, questions to ask, and side-by-side observations." },
    { title: "Closure Support", text: "From negotiation to documentation and follow-up, our team stays involved so the final decision remains informed and organized." },
  ];
  const promises = [
    "No forced urgency or random inventory dumping.",
    "Clear explanation of pros, cons, price logic, and location tradeoffs.",
    "Faridabad-first advisory backed by local project familiarity.",
    "Founder-led attention for high-value residential and commercial decisions.",
  ];

  return (
    <main className="nivesh-about-page">
      <LocalNavbar flat />
      <section className="nivesh-about-signature" id="about">
        <div className="nivesh-about-signature-copy">
          <span>About Nivesh Sarthi</span>
          <h1>A New-Age Real Estate Sarthi For Faridabad Buyers And Investors</h1>
          <p>
            Started in 2024, Nivesh Sarthi was built for people who want more than property options. We help clients understand location, pricing, builder credibility, future usability, and the real reason a project deserves attention.
          </p>
          <p>
            Our work is personal and focused: residential homes, commercial spaces, SCO opportunities, and investment-ready assets across Faridabad's most active growth pockets.
          </p>
          <div className="nivesh-about-brand-card" aria-label="Nivesh Sarthi positioning">
            <img src="/assets/images/nivesh-sarthi-navbar-mark.png" alt="" loading="eager" decoding="async" />
            <div>
              <strong>Local Focus. Premium Process.</strong>
              <p>Founder-led guidance for clients who want clarity, verified options, and a calm decision-making experience.</p>
            </div>
          </div>
        </div>
        <div className="nivesh-about-founder-stack" aria-label="Founder and co-founder">
          {founders.map((person) => (
            <article key={person.role}>
              <img src={person.image} alt={`Nivesh Sarthi ${person.role}`} loading="eager" decoding="async" />
              <div>
                <span>{person.role}</span>
                <p>{person.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-about-storyline">
        <div className="nivesh-about-story-copy">
          <span>Our Foundation</span>
          <h2>Young In Years, Serious In Process</h2>
          <p>
            Real estate is often presented with noise, urgency, and too many choices. Nivesh Sarthi was created to slow that process down and make every recommendation easier to understand.
          </p>
          <p>
            We compare projects with a practical lens: connectivity, possession plans, payment structure, developer record, end-use value, and resale potential. The result is a sharper shortlist and a more confident client.
          </p>
        </div>
        <div className="nivesh-about-stats">
          {stats.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="nivesh-about-values">
        {values.map((item, index) => (
          <article key={item.title}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="nivesh-about-focus">
        <div className="nivesh-about-section-head">
          <span>What We Help With</span>
          <h2>Real Estate Guidance Across The Decisions That Matter Most</h2>
          <p>Our work is not limited to showing properties. We help clients understand the role each asset can play in their life, business, or portfolio.</p>
        </div>
        <div className="nivesh-about-focus-grid">
          {focusAreas.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-about-method">
        <div className="nivesh-about-method-copy">
          <span>Our Advisory Method</span>
          <h2>A Calm Process For A High-Value Decision</h2>
          <p>
            We keep the journey structured so clients can compare fewer, better options instead of getting lost in scattered listings and sales pressure.
          </p>
        </div>
        <div className="nivesh-about-method-steps">
          {process.map((item, index) => (
            <article key={item.title}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-about-promise">
        <div>
          <span>Client Standard</span>
          <h2>What You Can Expect From Nivesh Sarthi</h2>
        </div>
        <ul>
          {promises.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="nivesh-about-founder-note">
        <div>
          <span>Leadership Lens</span>
          <h2>Guided By A Simple Principle: No Client Should Feel Rushed</h2>
        </div>
        <div>
          <p>
            Our founders bring a relationship-first advisory approach to Faridabad real estate. The goal is to listen before suggesting, compare before recommending, and explain clearly before any decision is made.
          </p>
          <p>
            From premium residences to SCO assets and commercial addresses, the process stays structured, informed, and personal from first enquiry to final documentation.
          </p>
        </div>
      </section>

      <section className="nivesh-about-cta">
        <div>
          <span>Start With Clarity</span>
          <h2>Planning A Property Decision In Faridabad?</h2>
          <p>Speak with Nivesh Sarthi for a focused shortlist and practical market guidance at Sector 81, Faridabad.</p>
        </div>
        <div className="nivesh-about-cta-contact">
          <strong>+91 95600 31319</strong>
          <span>info.niveshsarthi@gmail.com</span>
        </div>
      </section>
      <RedesignedFooter />
    </main>
  );
}

function CareerPage() {
  const jobs = [
    {
      title: "Sales Executive",
      department: "Real Estate Advisory",
      type: "Full Time",
      location: "Sector 81, Faridabad",
      experience: "0-3 Years",
      description: "Work with buyers, investors, and families across Faridabad residential, SCO, and commercial projects. The role is built for confident communicators who can handle site visits, follow-ups, project explanation, and relationship-led closing.",
      responsibilities: ["Generate and qualify property leads", "Coordinate site visits across Faridabad projects", "Explain pricing, inventory, location, and payment plans", "Maintain CRM follow-ups and client updates", "Support closures with transparent advisory"],
    },
    {
      title: "HR Executive",
      department: "People & Operations",
      type: "Full Time",
      location: "Sector 81, Faridabad",
      experience: "1-3 Years",
      description: "Own day-to-day hiring, onboarding, coordination, and team support for a growing Faridabad-focused real estate advisory office. The role suits someone organized, warm, and process-driven.",
      responsibilities: ["Shortlist and coordinate interviews", "Manage joining documentation and onboarding", "Track attendance, records, and HR communication", "Support hiring for sales and operations roles", "Maintain a polished candidate experience"],
    },
  ];

  return (
    <main className="nivesh-career-page">
      <LocalNavbar />
      <section className="nivesh-career-hero">
        <div className="nivesh-career-copy">
          <span>Careers</span>
          <h1>Build Your Career With A Faridabad Real Estate Team.</h1>
          <p>Join our advisory office in Sector 81 and work closely with clients, projects, site visits, operations, and local market conversations.</p>
          <div className="nivesh-career-actions">
            <a href="#open-roles">View Open Roles</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Send Resume</a>
          </div>
        </div>
        <div className="nivesh-career-panel" aria-label="Career highlights">
          <span>Hiring Desk</span>
          <h2>Open roles for sales and people operations.</h2>
          <p>We are looking for organized, confident people who can communicate clearly and handle real estate clients with care.</p>
          <div>
            <strong>2</strong>
            <small>Open Roles</small>
          </div>
        </div>
      </section>

      <section className="nivesh-career-culture">
        <div>
          <span>What We Value</span>
          <h2>Sharp Market Work, Clear Communication, Premium Client Handling</h2>
        </div>
        <div className="nivesh-career-culture-grid">
          <article><strong>01</strong><h3>Local Expertise</h3><p>Learn the real Faridabad market through active projects, site visits, and live client conversations.</p></article>
          <article><strong>02</strong><h3>Client Trust</h3><p>Work with transparent guidance, patient follow-up, and a private-client standard of service.</p></article>
          <article><strong>03</strong><h3>Growth Path</h3><p>Build practical skills in advisory, operations, negotiation, coordination, and relationship management.</p></article>
        </div>
      </section>

      <section id="open-roles" className="nivesh-career-jobs">
        <div className="nivesh-career-section-head">
          <span>Open Positions</span>
          <h2>Choose Your Role</h2>
          <p>Apply for the role that matches your strengths. Both positions are based at our Faridabad office.</p>
        </div>
        <div className="nivesh-career-job-grid">
          {jobs.map((job) => (
            <article className="nivesh-career-job-card" key={job.title}>
              <div className="nivesh-career-job-top">
                <span>{job.department}</span>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
              </div>
              <div className="nivesh-career-job-meta">
                <div><span>Location</span><strong>{job.location}</strong></div>
                <div><span>Type</span><strong>{job.type}</strong></div>
                <div><span>Experience</span><strong>{job.experience}</strong></div>
              </div>
              <ul>
                {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Application for ${encodeURIComponent(job.title)} - Nivesh Sarthi`}>Apply For {job.title}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-career-apply">
        <div>
          <span>Apply Directly</span>
          <h2>Send Your Resume To Our Team</h2>
          <p>Email your resume with the job title in the subject line. Our team will review and connect for the next step.</p>
        </div>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </section>
      <RedesignedFooter />
    </main>
  );
}

function ServicesPage() {
  const processSteps = [
    { step: "01", title: "Map The Requirement", text: "We clarify purpose, budget, timeline, risk comfort, and preferred Faridabad pockets before discussing inventory." },
    { step: "02", title: "Curate The Shortlist", text: "Projects are compared on location strength, builder credibility, pricing logic, payment structure, and usability." },
    { step: "03", title: "Guide The Decision", text: "You get a clear recommendation path with site visits, documentation support, and closure coordination." },
  ];
  const assetTypes = [
    {
      title: "Residential Homes",
      text: "Apartments, independent floors, villas, and ready-to-move options matched to family needs, lifestyle, and resale strength.",
      image: "/assets/images/propertymaster/optimized/bptp-skynest-towers.jpg",
    },
    {
      title: "Commercial Assets",
      text: "Retail shops, office spaces, high-street developments, and rental-focused assets reviewed for footfall, access, and yield logic.",
      image: "/assets/images/propertymaster/faridabad/adore-fantasy-street.webp",
    },
    {
      title: "SCO & Plotted Property",
      text: "SCO plots, residential plots, and land-led opportunities evaluated for location visibility, approvals, and long-term utility.",
      image: "/assets/images/propertymaster/optimized/neoliv-golf-one.jpg",
    },
  ];
  const marketPockets = ["Faridabad", "Greater Faridabad", "Sector 80-99A", "Neharpar", "Delhi-Mumbai Expressway Belt", "Commercial High Streets"];
  const journeyItems = [
    { title: "Requirement Brief", text: "Budget, purpose, family size, preferred possession stage, and investment horizon are documented first." },
    { title: "Market Comparison", text: "We compare real options across price, location, builder track record, amenities, and future demand." },
    { title: "Site Visit Plan", text: "Shortlisted properties are arranged into efficient visits with clear pros, cons, and negotiation notes." },
    { title: "Closure Support", text: "Our team coordinates documentation, booking steps, payment milestones, and handover follow-up." },
  ];

  return (
    <main className="nivesh-services-page">
      <LocalNavbar />

      <section className="nivesh-services-hero">
        <div className="nivesh-services-hero-inner">
          <div className="nivesh-services-hero-copy">
            <span>Services</span>
            <h1>Real Estate Advisory For Every Property Decision.</h1>
            <p>Compare residential, commercial, SCO, plotted, and investment opportunities across Faridabad with clear shortlists and guided support.</p>
            <div className="nivesh-services-actions">
              <a href="/contact">Book Consultation</a>
              <a href="/properties">View Properties</a>
            </div>
          </div>

          <aside className="nivesh-services-hero-card" aria-label="Service overview">
            <span>Advisory Desk</span>
            <h2>Residential, commercial, SCO and land-led opportunities.</h2>
            <p>One guided process for discovery, comparison, site visits, documentation, and closure.</p>
          </aside>
        </div>
      </section>

      <section id="services-list" className="nivesh-services-grid" aria-label="Nivesh Sarthi services">
        {SERVICE_PAGE_ITEMS.map((service) => (
          <article key={service.title}>
            <i className={`fas ${service.icon}`}></i>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
            <ul>
              {service.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="nivesh-services-assets" aria-label="Real estate asset coverage">
        <div className="nivesh-services-section-head">
          <span>Real Estate Coverage</span>
          <h2>Property Advice Across The Segments Clients Actually Buy.</h2>
          <p>From end-use homes to rental assets and plotted opportunities, our recommendations stay grounded in local demand, practical use, and exit potential.</p>
        </div>
        <div className="nivesh-services-assets-grid">
          {assetTypes.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-services-market" aria-label="Market focus">
        <div>
          <span>Market Focus</span>
          <h2>Built Around Faridabad And Greater Faridabad Micro-Markets.</h2>
          <p>We track residential corridors, commercial activity zones, infrastructure movement, and project-level inventory so clients can compare opportunities with local context.</p>
        </div>
        <ul>
          {marketPockets.map((pocket) => <li key={pocket}>{pocket}</li>)}
        </ul>
      </section>

      <section className="nivesh-services-journey" aria-label="Client journey">
        <div className="nivesh-services-section-head">
          <span>Advisory Journey</span>
          <h2>From First Call To Final Decision, The Process Stays Organized.</h2>
        </div>
        <div className="nivesh-services-journey-grid">
          {journeyItems.map((item, index) => (
            <article key={item.title}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-services-process">
        <div className="nivesh-services-process-head">
          <span>How We Work</span>
          <h2>Structured Enough To Be Clear, Personal Enough To Be Useful</h2>
        </div>
        <div className="nivesh-services-process-grid">
          {processSteps.map((item) => (
            <article key={item.step}>
              <strong>{item.step}</strong>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-services-cta">
        <div>
          <span>Start With A Better Shortlist</span>
          <h2>Tell Us What You Want To Achieve With The Property.</h2>
          <p>We will help you compare the right Faridabad and Greater Faridabad options with practical market context.</p>
        </div>
        <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
      </section>

      <RedesignedFooter />
    </main>
  );
}

function AdminPanel({ properties, setProperties }) {
  const blankProperty = {
    title: "",
    slug: "",
    categories: ["residential"],
    developer: "",
    location: "",
    corridor: "",
    image: "/assets/images/hero section real estate.jpeg",
    gallery: [],
    status: "Available",
    type: "",
    area: "",
    price: "",
    description: "",
    highlights: [],
  };
  const [activeTab, setActiveTab] = useState("properties");
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(blankProperty);
  const [editingSlug, setEditingSlug] = useState("");
  const [message, setMessage] = useState("");
  const [adminToken, setAdminToken] = useState(() => getStoredAdminToken());
  const [adminLogin, setAdminLogin] = useState({ username: "admin", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getStoredAdminToken()));
  const [apiStatus, setApiStatus] = useState(() => getStoredAdminToken() ? "Checking admin API..." : "Enter admin password to continue.");

  const readJson = async (response) => {
    const contentType = response.headers.get("content-type") || "";
    let value = null;
    if (contentType.includes("application/json")) value = await response.json();
    if (!response.ok) {
      const error = new Error(value?.error || `API returned ${response.status}.`);
      error.status = response.status;
      error.url = response.url;
      throw error;
    }
    if (!contentType.includes("application/json")) {
      const error = new Error("API did not return JSON. Check the backend URL.");
      error.status = response.status;
      error.url = response.url;
      throw error;
    }
    return value;
  };

  const adminHeaders = (extraHeaders = {}, token = adminToken) => {
    if (!token) return extraHeaders;
    return { ...extraHeaders, "x-admin-token": token };
  };

  const loadAdminData = async (token = adminToken) => {
    if (!token) {
      setIsAuthenticated(false);
      setApiStatus("Enter admin password to continue.");
      return;
    }
    setApiStatus("Checking admin API...");
    try {
      const [propertyItems, leadItems] = await Promise.all([
        fetch(apiUrl("/api/properties")).then(readJson),
        fetch(apiUrl("/api/leads"), { headers: adminHeaders({}, token) }).then(readJson),
      ]);
      if (Array.isArray(propertyItems)) setProperties(propertyItems);
      if (Array.isArray(leadItems)) setLeads(leadItems);
      setIsAuthenticated(true);
      setApiStatus(`Connected to ${defaultApiBaseUrl || "local /api"}`);
    } catch (error) {
      if (/auth|401/i.test(error.message)) setIsAuthenticated(false);
      setApiStatus(error.message || "Admin API is not reachable.");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const loginAdmin = async (event) => {
    event.preventDefault();
    const username = adminLogin.username.trim();
    const password = adminLogin.password.trim();
    if (!username || !password) {
      setApiStatus("Enter admin password to continue.");
      return;
    }
    const loginUrl = apiUrl("/api/admin/login");
    setApiStatus(`Checking password at ${loginUrl}...`);
    try {
      const session = await fetch(loginUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      }).then(readJson);
      const token = session.token;
      if (!token) throw new Error("Admin login did not return a session token.");
      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
      setAdminToken(token);
      setAdminLogin((current) => ({ ...current, password: "" }));
      setIsAuthenticated(true);
      await loadAdminData(token);
    } catch (error) {
      window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      setAdminToken("");
      setIsAuthenticated(false);
      const statusDetails = error.status ? ` (${error.status})` : "";
      const urlDetails = error.url || loginUrl;
      setApiStatus(`${error.message || "Admin login failed."}${statusDetails} - ${urlDetails}`);
    }
  };

  const logoutAdmin = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    setAdminToken("");
    setIsAuthenticated(false);
    setLeads([]);
    setApiStatus("Logged out.");
  };

  const updateField = (field, value) => {
    const listFields = ["categories", "gallery", "highlights"];
    setForm((current) => ({
      ...current,
      [field]: listFields.includes(field)
        ? value.split(",").map((item) => item.trim()).filter(Boolean)
        : value,
    }));
  };

  const resetForm = () => {
    setForm(blankProperty);
    setEditingSlug("");
  };

  const editProperty = (property) => {
    setForm({
      ...blankProperty,
      ...property,
      categories: property.categories || [],
      gallery: property.gallery || [],
      highlights: property.highlights || [],
    });
    setEditingSlug(property.slug);
    setActiveTab("properties");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveProperty = async (event) => {
    event.preventDefault();
    setMessage("Saving property...");
    try {
      const url = editingSlug ? apiUrl(`/api/properties/${encodeURIComponent(editingSlug)}`) : apiUrl("/api/properties");
      const response = await fetch(url, {
        method: editingSlug ? "PUT" : "POST",
        headers: adminHeaders({ "content-type": "application/json" }),
        body: JSON.stringify(form),
      });
      const value = await readJson(response);
      if (!value) return;
      const nextResponse = await fetch(apiUrl("/api/properties"));
      const nextProperties = await readJson(nextResponse);
      if (Array.isArray(nextProperties)) setProperties(nextProperties);
      resetForm();
      setMessage("Property saved.");
    } catch (error) {
      setMessage(error.message || "Could not save property.");
    }
  };

  const deleteProperty = async (slug) => {
    if (!window.confirm("Delete this property from the website?")) return;
    try {
      await fetch(apiUrl(`/api/properties/${encodeURIComponent(slug)}`), {
        method: "DELETE",
        headers: adminHeaders(),
      }).then(readJson);
      const nextResponse = await fetch(apiUrl("/api/properties"));
      const nextProperties = await readJson(nextResponse);
      if (Array.isArray(nextProperties)) setProperties(nextProperties);
      setMessage("Property deleted.");
    } catch (error) {
      setMessage(error.message || "Could not delete property.");
    }
  };

  const deleteLead = async (id) => {
    try {
      await fetch(apiUrl(`/api/leads/${encodeURIComponent(id)}`), {
        method: "DELETE",
        headers: adminHeaders(),
      }).then(readJson);
      setLeads((current) => current.filter((lead) => lead.id !== id));
    } catch (error) {
      setMessage(error.message || "Could not delete lead.");
    }
  };

  return (
    <main className="nivesh-admin-page">
      <LocalNavbar />
      <section className={`nivesh-admin-shell${isAuthenticated ? "" : " is-login"}`}>
        <div className="nivesh-admin-heading">
          <div>
            <h1>Admin Panel</h1>
            <p>Manage properties and leads.</p>
          </div>
          {isAuthenticated && <button type="button" onClick={logoutAdmin}>Logout</button>}
        </div>

        <div className="nivesh-admin-api">
          <span>{apiStatus}</span>
        </div>

        {!isAuthenticated ? (
          <form className="nivesh-admin-login" onSubmit={loginAdmin}>
            <h2>Admin Login</h2>
            <p>Enter the backend admin password to manage properties and leads.</p>
            <label>
              Username
              <input
                value={adminLogin.username}
                onChange={(event) => setAdminLogin((current) => ({ ...current, username: event.target.value }))}
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={adminLogin.password}
                onChange={(event) => setAdminLogin((current) => ({ ...current, password: event.target.value }))}
                autoComplete="current-password"
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
        ) : (
          <>
        <div className="nivesh-admin-tabs">
          <button className={activeTab === "properties" ? "active" : ""} onClick={() => setActiveTab("properties")}>Properties</button>
          <button className={activeTab === "leads" ? "active" : ""} onClick={() => setActiveTab("leads")}>Leads</button>
        </div>

        {message && <div className="nivesh-admin-message">{message}</div>}

        {activeTab === "properties" ? (
          <div className="nivesh-admin-grid">
            <form className="nivesh-admin-form" onSubmit={saveProperty}>
              <h2>{editingSlug ? "Edit Property" : "Add Property"}</h2>
              <label>Title<input value={form.title} onChange={(event) => updateField("title", event.target.value)} required /></label>
              <label>Slug<input value={form.slug} onChange={(event) => updateField("slug", event.target.value)} placeholder="auto-from-title if blank" /></label>
              <label>Categories<input value={form.categories.join(", ")} onChange={(event) => updateField("categories", event.target.value)} placeholder="residential, commercial, sco" /></label>
              <label>Developer<input value={form.developer} onChange={(event) => updateField("developer", event.target.value)} /></label>
              <label>Location<input value={form.location} onChange={(event) => updateField("location", event.target.value)} /></label>
              <label>Corridor<input value={form.corridor} onChange={(event) => updateField("corridor", event.target.value)} /></label>
              <label>Image URL<input value={form.image} onChange={(event) => updateField("image", event.target.value)} /></label>
              <label>Gallery URLs<input value={form.gallery.join(", ")} onChange={(event) => updateField("gallery", event.target.value)} /></label>
              <label>Status<input value={form.status} onChange={(event) => updateField("status", event.target.value)} /></label>
              <label>Type<input value={form.type} onChange={(event) => updateField("type", event.target.value)} /></label>
              <label>Area<input value={form.area} onChange={(event) => updateField("area", event.target.value)} /></label>
              <label>Price<input value={form.price} onChange={(event) => updateField("price", event.target.value)} /></label>
              <label>Description<textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} rows="4" /></label>
              <label>Highlights<input value={form.highlights.join(", ")} onChange={(event) => updateField("highlights", event.target.value)} /></label>
              <div className="nivesh-admin-form-actions">
                <button type="submit">{editingSlug ? "Update Property" : "Add Property"}</button>
                <button type="button" onClick={resetForm}>Clear</button>
              </div>
            </form>

            <div className="nivesh-admin-list">
              <h2>Properties ({properties.length})</h2>
              {properties.map((property) => (
                <article key={property.slug}>
                  <img src={property.image} alt={property.title} />
                  <div>
                    <strong>{property.title}</strong>
                    <span>{property.location} | {property.price}</span>
                    <em>{property.categories?.join(", ")}</em>
                  </div>
                  <button onClick={() => editProperty(property)}>Edit</button>
                  <button onClick={() => deleteProperty(property.slug)}>Delete</button>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="nivesh-admin-leads">
            <h2>Leads ({leads.length})</h2>
            {leads.length === 0 ? <p>No leads yet.</p> : leads.map((lead) => (
              <article key={lead.id}>
                <div>
                  <strong>{lead.name || "Unnamed Lead"}</strong>
                  <span>{lead.phone || "No phone"} | {lead.email || "No email"}</span>
                  <p>{lead.requirement || "No requirement"} {lead.message ? `- ${lead.message}` : ""}</p>
                  <em>{new Date(lead.createdAt).toLocaleString()}</em>
                </div>
                <button onClick={() => deleteLead(lead.id)}>Delete</button>
              </article>
            ))}
          </div>
        )}
          </>
        )}
      </section>
      <RedesignedFooter />
    </main>
  );
}

function PropertyListingPage({ category, properties }) {
  const meta = PROPERTY_CATEGORY_META[category] || PROPERTY_CATEGORY_META.all;
  const projects = category === "all"
    ? properties
    : properties.filter((project) => project.categories?.includes(category));
  const categories = ["all", "residential", "commercial", "sco"];

  return (
    <main className="nivesh-property-index">
      <LocalNavbar />

      <section className="nivesh-property-index-hero">
        <div>
          <span>{meta.eyebrow}</span>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>
        <div className="nivesh-property-index-stats">
          <div><strong>{properties.length}</strong><span>Total Listings</span></div>
          <div><strong>{projects.length}</strong><span>{meta.label} Matches</span></div>
          <div><strong>0</strong><span>External Redirects</span></div>
        </div>
      </section>

      <section className="nivesh-property-index-content">
        <div className="nivesh-property-tabs" aria-label="Property categories">
          {categories.map((item) => (
            <a key={item} className={item === category ? "active" : ""} href={item === "all" ? "/properties" : `/properties/${item}`}>
              {PROPERTY_CATEGORY_META[item].label}
            </a>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="nivesh-property-index-grid">
            {projects.map((project, index) => (
              <article className="nivesh-project-card" key={project.slug}>
                <a className="nivesh-project-media" href={`/project/${project.slug}`}>
                  <img src={project.image} alt={project.title} loading="eager" decoding="async" fetchPriority={index < 6 ? "high" : "auto"} />
                  <span>{project.status}</span>
                  <em>{project.categories?.map((item) => PROPERTY_CATEGORY_META[item]?.label).filter(Boolean).join(" / ")}</em>
                </a>
                <div className="nivesh-project-body">
                  <p className="nivesh-project-developer">{project.developer}</p>
                  <h3>{project.title}</h3>
                  <p className="nivesh-project-location">{project.location}<br /><em>{project.corridor}</em></p>
                  <div className="nivesh-project-details" aria-label={`${project.title} highlights`}>
                    <div><span>Type</span><strong>{project.type}</strong></div>
                    <div><span>Area</span><strong>{project.area}</strong></div>
                    <div><span>Price</span><strong>{project.price}</strong></div>
                  </div>
                  <a className="nivesh-project-link" href={`/project/${project.slug}`}>View Project</a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="nivesh-property-empty">
            <span>Verified Inventory Pending</span>
            <h2>No projects are available in this category yet.</h2>
            <p>This page is ready for verified listings once project names, locations, sizes, and pricing are provided.</p>
            <a href="/contact">Share Requirement</a>
          </div>
        )}
      </section>
      <RedesignedFooter />
    </main>
  );
}

function ConsultingPage() {
  const pillars = [
    {
      title: "Buyer Advisory",
      text: "Requirement mapping, budget clarity, location comparison, and a focused shortlist for end-use residential decisions.",
      icon: "fa-house-chimney-user",
    },
    {
      title: "Investment Planning",
      text: "Project selection through entry price, payment plan, rental demand, resale depth, and corridor growth logic.",
      icon: "fa-chart-line",
    },
    {
      title: "Commercial Strategy",
      text: "Guidance for SCO plots, shops, office spaces, and business addresses based on frontage, catchment, and usability.",
      icon: "fa-building",
    },
  ];
  const process = [
    "Understand your purpose, budget, timeline, and risk comfort.",
    "Compare locations, builders, inventory, pricing, and future usability.",
    "Plan site visits with clear questions and side-by-side observations.",
    "Support negotiation, documentation, and final decision clarity.",
  ];
  const outcomes = [
    "A sharper shortlist instead of scattered options.",
    "Clear explanation of pros, cons, and price logic.",
    "Faridabad and Greater Faridabad market context.",
    "Founder-led guidance for high-value decisions.",
  ];

  return (
    <main className="nivesh-consulting-page">
      <LocalNavbar flat />

      <section className="nivesh-consulting-hero">
        <div className="nivesh-consulting-hero-copy">
          <span>Real Estate Consulting</span>
          <h1>Clarity Before You Commit To A Property Decision</h1>
          <p>
            Nivesh Sarthi helps buyers and investors compare Faridabad opportunities with structure, local market context, and calm advisory support.
          </p>
          <div className="nivesh-consulting-actions">
            <a href="/contact">Book Consultation</a>
            <a href="/properties">View Properties</a>
          </div>
        </div>
        <div className="nivesh-consulting-hero-media" aria-label="Consulting highlights">
          <img src="/assets/images/hero section real estate.jpeg" alt="Faridabad real estate consulting" loading="eager" decoding="async" />
          <div>
            <strong>Faridabad First</strong>
            <span>Residential, commercial, SCO and investment advisory</span>
          </div>
        </div>
      </section>

      <section className="nivesh-consulting-pulse">
        <div>
          <span>01</span>
          <strong>Requirement-Led</strong>
          <p>We begin with your purpose, not with available inventory.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Comparison-Ready</strong>
          <p>Options are filtered through price, location, builder, and usability.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Decision Support</strong>
          <p>From shortlist to closure, the process stays organized.</p>
        </div>
      </section>

      <section className="nivesh-consulting-pillars">
        <div className="nivesh-consulting-section-head">
          <span>Where We Help</span>
          <h2>Consulting That Matches The Way Real Estate Decisions Actually Happen</h2>
          <p>Every client arrives with a different goal. We shape the process around that goal before recommending any property.</p>
        </div>
        <div className="nivesh-consulting-pillar-grid">
          {pillars.map((item) => (
            <article key={item.title}>
              <i className={`fas ${item.icon}`}></i>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-consulting-process">
        <div>
          <span>Advisory Flow</span>
          <h2>A Calm Process For A High-Value Decision</h2>
          <p>We keep the journey practical so you can move from confusion to comparison to confidence.</p>
        </div>
        <ol>
          {process.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="nivesh-consulting-outcomes">
        <div className="nivesh-consulting-section-head">
          <span>What You Receive</span>
          <h2>Guidance Built Around Clarity, Not Pressure</h2>
        </div>
        <div>
          {outcomes.map((item) => (
            <article key={item}>
              <i className="fas fa-check"></i>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nivesh-consulting-cta">
        <div>
          <span>Start With A Clear Brief</span>
          <h2>Planning A Faridabad Property Move?</h2>
          <p>Share your requirement and we will help you compare the right residential, commercial, SCO, or investment options.</p>
        </div>
        <a href="/contact">Start A Consultation</a>
      </section>

      <RedesignedFooter />
    </main>
  );
}

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "Residential",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const contactCards = [
    {
      label: "Call",
      value: CONTACT_PHONE_DISPLAY,
      href: `tel:${CONTACT_PHONE_TEL}`,
      icon: "fa-phone",
      text: "Speak with the Faridabad advisory desk.",
    },
    {
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      icon: "fa-envelope",
      text: "Send your requirement and preferred timeline.",
    },
    {
      label: "Office",
      value: "Sector 81, Faridabad",
      href: "https://maps.google.com/?q=Puri%2081%20Business%20Hub%20Sector%2081%20Faridabad",
      icon: "fa-location-dot",
      text: CONTACT_ADDRESS,
    },
  ];

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await fetch(apiUrl("/api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" }),
      });
      setForm({ name: "", phone: "", email: "", requirement: "Residential", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      window.setTimeout(() => setStatus("idle"), 2600);
    }
  };

  return (
    <main className="nivesh-contact-page">
      <LocalNavbar flat />

      <section className="nivesh-contact-hero">
        <div className="nivesh-contact-copy">
          <span>Contact Nivesh Sarthi</span>
          <h1>Start With A Clear Property Conversation</h1>
          <p>
            Share what you are planning in Faridabad or Greater Faridabad. We will help you compare the right residential, commercial, SCO, or investment options with a calm advisory process.
          </p>
          <div className="nivesh-contact-quick">
            <a href={`tel:${CONTACT_PHONE_TEL}`}>Call Now</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Send Email</a>
          </div>
        </div>
        <form className="nivesh-contact-form-native" onSubmit={submitLead}>
          <span>Send Requirement</span>
          <h2>Tell Us What You Need</h2>
          <label>
            Name
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" required />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+91" required />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Requirement
            <select value={form.requirement} onChange={(event) => updateField("requirement", event.target.value)}>
              <option>Residential</option>
              <option>Commercial</option>
              <option>SCO / Plot</option>
              <option>Investment Advisory</option>
              <option>Property Management</option>
            </select>
          </label>
          <label>
            Message
            <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Budget, location preference, timeline, or project name" rows="4"></textarea>
          </label>
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : status === "sent" ? "Enquiry Sent" : status === "error" ? "Try Again" : "Submit Enquiry"}
          </button>
        </form>
      </section>

      <section className="nivesh-contact-cards">
        {contactCards.map((card) => (
          <a key={card.label} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}>
            <i className={`fas ${card.icon}`}></i>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.text}</p>
          </a>
        ))}
      </section>

      <section className="nivesh-contact-visit">
        <div>
          <span>Visit The Advisory Desk</span>
          <h2>Meet Us At Puri 81 Business Hub</h2>
          <p>Our Faridabad office supports property discovery, site-visit planning, project comparison, documentation coordination, and post-purchase guidance.</p>
        </div>
        <div className="nivesh-contact-map-card">
          <strong>{CONTACT_HQ_LABEL}</strong>
          <p>{CONTACT_ADDRESS}</p>
          <a href="https://maps.google.com/?q=Puri%2081%20Business%20Hub%20Sector%2081%20Faridabad" target="_blank" rel="noopener noreferrer">Open Map</a>
        </div>
      </section>

      <section className="nivesh-contact-map-embed" aria-label="Nivesh Sarthi office map">
        <iframe
          title="Nivesh Sarthi office location"
          src="https://www.google.com/maps?q=Puri%2081%20Business%20Hub%20Sector%2081%20Faridabad&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <RedesignedFooter />
    </main>
  );
}

function LocalFooter() {
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/our-story" },
    { label: "Properties", href: "/properties" },
    { label: "Careers", href: "/career" },
    { label: "Contact", href: "/contact" },
  ];
  const serviceLinks = [
    { label: "Services Overview", href: "/services" },
  ];

  return (
    <footer className="position-relative pt-5 pb-0 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)" }}>
      <div className="position-absolute top-0 start-0 w-100" style={{ height: "2px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}></div>
      <div className="container position-relative z-1 py-5">
        <div className="row gy-5 justify-content-between">
          <div className="col-lg-4 col-md-12">
            <img src={NAVBAR_LOGO} alt="Nivesh Sarthi" className="mb-4" style={{ maxWidth: "210px", height: "auto" }} />
            <p className="text-white mb-4" style={{ lineHeight: 1.8, fontSize: "0.95rem" }}>
              Nivesh Sarthi brings focused real estate guidance across Faridabad, combining local market knowledge with a calm, transparent advisory process.
            </p>
            <div className="d-flex gap-2">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi Facebook" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center border-secondary text-white hover-gold" style={{ width: "40px", height: "40px" }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi Instagram" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center border-secondary text-white hover-gold" style={{ width: "40px", height: "40px" }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi LinkedIn" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center border-secondary text-white hover-gold" style={{ width: "40px", height: "40px" }}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6">
            <h6 className="text-white text-uppercase fw-bold mb-4" style={{ fontSize: "0.85rem", letterSpacing: "2px" }}>Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}><a href={link.href} className="text-white text-decoration-none hover-white transition-all">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 col-6">
            <h6 className="text-white text-uppercase fw-bold mb-4" style={{ fontSize: "0.85rem", letterSpacing: "2px" }}>Our Services</h6>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {serviceLinks.map((link) => (
                <li key={link.href}><a href={link.href} className="text-white text-decoration-none hover-white transition-all">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <h6 className="text-white text-uppercase fw-bold mb-4" style={{ fontSize: "0.85rem", letterSpacing: "2px" }}>Get In Touch</h6>
            <ul className="list-unstyled d-flex flex-column gap-4">
              <li><a href="https://maps.google.com/?q=Puri%2081%20Business%20Hub%20Sector%2081%20Faridabad" className="text-decoration-none footer-link"><i className="fas fa-map-marker-alt text-gold mt-1 me-3"></i><span className="text-white" style={{ fontSize: "0.9rem" }}>{CONTACT_ADDRESS}</span></a></li>
              <li><a href={`tel:${CONTACT_PHONE_TEL}`} className="text-decoration-none footer-link"><i className="fas fa-phone text-gold me-3"></i><span className="text-white" style={{ fontSize: "0.9rem" }}>{CONTACT_PHONE_DISPLAY}</span></a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="text-decoration-none footer-link"><i className="fas fa-envelope text-gold me-3"></i><span className="text-white" style={{ fontSize: "0.9rem" }}>{CONTACT_EMAIL}</span></a></li>
              <li><a href="/" className="text-decoration-none footer-link"><i className="fas fa-globe text-gold me-3"></i><span className="text-white" style={{ fontSize: "0.9rem" }}>{CONTACT_WEBSITE}</span></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-top border-secondary border-opacity-10 bg-black py-4 position-relative z-1 footer-copyright">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-white small">&copy; 2026 Nivesh Sarthi. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4"><a href="/privacy-policy" className="text-white text-decoration-none small hover-white">Privacy Policy</a></li>
                <li className="list-inline-item"><a href="/terms-conditions" className="text-white text-decoration-none small hover-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RedesignedFooter() {
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/our-story" },
    { label: "Properties", href: "/properties" },
    { label: "Careers", href: "/career" },
    { label: "Contact", href: "/contact" },
  ];
  const serviceLinks = [
    { label: "Services Overview", href: "/services" },
  ];

  return (
    <footer className="nivesh-site-footer">
      <div className="nivesh-footer-cta">
        <div>
          <span>Faridabad Advisory Desk</span>
          <h2>Ready To Compare The Right Property Options?</h2>
        </div>
        <a href="/contact">Start A Consultation</a>
      </div>

      <div className="nivesh-footer-main">
        <div className="nivesh-footer-brand">
          <img src={NAVBAR_LOGO} alt="Nivesh Sarthi" />
          <p>Nivesh Sarthi brings focused real estate guidance across Faridabad and Greater Faridabad with a calm, transparent advisory process.</p>
          <div className="nivesh-footer-socials">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi Instagram"><i className="fab fa-instagram"></i></a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="nivesh-footer-links">
          <div>
            <h3>Explore</h3>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {serviceLinks.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <address className="nivesh-footer-contact">
          <span>Contact</span>
          <a href={`tel:${CONTACT_PHONE_TEL}`}><i className="fas fa-phone"></i>{CONTACT_PHONE_DISPLAY}</a>
          <a href={`mailto:${CONTACT_EMAIL}`}><i className="fas fa-envelope"></i>{CONTACT_EMAIL}</a>
          <a href="https://maps.google.com/?q=Puri%2081%20Business%20Hub%20Sector%2081%20Faridabad" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-location-dot"></i>{CONTACT_ADDRESS}
          </a>
        </address>
      </div>

      <div className="nivesh-footer-bottom">
        <p>&copy; 2026 Nivesh Sarthi. All Rights Reserved.</p>
        <div>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-conditions">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

function LocalNavbar({ flat = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <div id="mirrored-page" className="nivesh-native-nav-host">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/" onClick={closeMenu}>
            <img src={NAVBAR_LOGO} data-default-logo={NAVBAR_LOGO} data-scrolled-logo={NAVBAR_LOGO} alt="Nivesh Sarthi" />
          </a>
          <button
            className="navbar-toggler mobile-nav-toggle"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <i className={`fas ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
          <div className={`collapse navbar-collapse justify-content-end${isOpen ? " show" : ""}`} id="navbarNav">
            <div className="mobile-nav-head d-lg-none">
              <div className="mobile-nav-brand">
                <img src={NAVBAR_LOGO} alt="Nivesh Sarthi" />
                <div className="mobile-nav-brand-text">
                  <div className="mobile-nav-brand-title">Nivesh Sarthi</div>
                  <div className="mobile-nav-brand-subtitle">Premium Real Estate Consultants</div>
                </div>
              </div>
              <button type="button" className="mobile-nav-close" onClick={closeMenu} aria-label="Close menu">
                <i className="fas fa-xmark"></i>
              </button>
            </div>
            <ul className="navbar-nav align-items-center">
              <li className="nav-item"><a className="nav-link" href="/" onClick={closeMenu}>Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/our-story" onClick={closeMenu}>About</a></li>
              {flat ? (
                <>
                  <li className="nav-item"><a className="nav-link" href="/services" onClick={closeMenu}>Services</a></li>
                  <li className="nav-item"><a className="nav-link" href="/properties" onClick={closeMenu}>Properties</a></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><a className="nav-link" href="/services" onClick={closeMenu}>Services</a></li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/properties" id="propertiesDropdown" role="button" aria-expanded="false">Properties</a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="propertiesDropdown">
                      <li><a className="dropdown-item" href="/properties" onClick={closeMenu}>All Properties</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="/properties/commercial" onClick={closeMenu}>Commercial</a></li>
                      <li><a className="dropdown-item" href="/properties/residential" onClick={closeMenu}>Residential</a></li>
                      <li><a className="dropdown-item" href="/properties/sco" onClick={closeMenu}>SCO Plots</a></li>
                      <li><a className="dropdown-item" href="/consulting" onClick={closeMenu}>Consulting</a></li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item"><a className="nav-link" href="/career" onClick={closeMenu}>Careers</a></li>
              <li className="nav-item ms-lg-3"><a href="/contact" className="btn btn-gold" onClick={closeMenu}>CONSULT</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav-backdrop d-lg-none${isOpen ? " show" : ""}`} onClick={closeMenu}></div>
    </div>
  );
}

function ProjectDetail({ project, onBack }) {
  return (
    <main className="nivesh-project-page">
      <LocalNavbar />

      <section className="nivesh-project-detail-hero">
        <img src={project.image} alt={project.title} />
        <div className="nivesh-project-detail-copy">
          <span>{project.status}</span>
          <p>{project.developer}</p>
          <h1>{project.title}</h1>
          <div className="nivesh-project-detail-location">
            {project.location}<br />
            <em>{project.corridor}</em>
          </div>
        </div>
      </section>

      <section className="nivesh-project-detail-content">
        <div className="nivesh-project-detail-overview">
          <span>Project Overview</span>
          <h2>Curated Information</h2>
          <p>{project.description}</p>
        </div>
        <div className="nivesh-project-detail-specs">
          <div><span>Developer</span><strong>{project.developer}</strong></div>
          <div><span>Project Type</span><strong>{project.type}</strong></div>
          <div><span>Area Range</span><strong>{project.area}</strong></div>
          <div><span>Price Range</span><strong>{project.price}</strong></div>
          <div><span>Status</span><strong>{project.status}</strong></div>
          <div><span>Location</span><strong>{project.location}</strong></div>
        </div>
        {project.gallery?.length > 0 && (
          <div className="nivesh-project-detail-gallery">
            <span>Project Images</span>
            <h2>Local Gallery</h2>
            <div>
              {project.gallery.map((image) => (
                <img key={image} src={image} alt={`${project.title} visual`} loading="eager" decoding="async" />
              ))}
            </div>
          </div>
        )}
        <div className="nivesh-project-detail-highlights">
          <h2>Highlights</h2>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <a className="nivesh-project-detail-cta" href="/contact">Consult About This Property</a>
      </section>
      <RedesignedFooter />
    </main>
  );
}

function normalizeRoute(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return clean.endsWith(".php") ? clean.replace(/\.php$/, "") : clean;
}

function isMediaRoute(route) {
  return [
    "/pr-media",
    "/insight-blog",
    "/news-update",
  ].some((prefix) => route === prefix || route.startsWith(`${prefix}/`)) ||
    route.startsWith("/pr-media-detail/") ||
    route.startsWith("/insight-blog-detail/") ||
    route.startsWith("/news-updates-detail/");
}

function isLegacyServiceRoute(route) {
  return [
    "/investment-sales-advisory",
    "/nri-advisory",
    "/property-management",
    "/land-acquisition",
  ].includes(route);
}

function wireLocalNavigation(root, setRoute) {
  root?.querySelectorAll("a[href^='/']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      history.pushState({}, "", url.pathname + url.search + url.hash);
      window.scrollTo({ top: 0, behavior: "instant" });
      setRoute(normalizeRoute(url.pathname));
    });
  });
}

function brandMirrorDocument(documentHtml) {
  documentHtml.title = SITE_TITLE;
  documentHtml.querySelectorAll("img").forEach((image) => {
    const src = image.getAttribute("src") || "";
    const defaultLogo = image.getAttribute("data-default-logo") || "";
    const scrolledLogo = image.getAttribute("data-scrolled-logo") || "";
    const alt = image.getAttribute("alt") || "";
    const isEliteLogo =
      /elite-pro-logo|dark-logo/i.test(src) ||
      /elite-pro-logo|dark-logo/i.test(defaultLogo) ||
      /elite-pro-logo|dark-logo/i.test(scrolledLogo) ||
      /Elite Pro/i.test(alt);

    if (!isEliteLogo) return;

    image.setAttribute("src", NAVBAR_LOGO);
    image.setAttribute("alt", "Nivesh Sarthi");
    image.setAttribute("data-default-logo", NAVBAR_LOGO);
    image.setAttribute("data-scrolled-logo", NAVBAR_LOGO);
  });

  documentHtml.querySelectorAll(".mobile-nav-brand-title").forEach((title) => {
    title.textContent = "Nivesh Sarthi";
  });

  applyContactDetails(documentHtml);
  applySocialLinks(documentHtml);
}

function prepareMirrorDocument(documentHtml, route, properties) {
  const root = documentHtml.body;
  brandMirrorDocument(documentHtml);
  applyNavbarBranding(root);
  setupHeroShowcase(root);
  setupHomepageWhoWeAre(root, route);
  setupFaridabadProjects(root, properties);
  setupFaridabadEditorial(root, route);
  removeHomepageInsightHub(root, route);
  setupExpertiseRedesign(root, route);
  setupWhyNiveshRedesign(root, route);
  setupFaridabadPartners(root, route);
  removeHomepageScaleSections(root, route);
  setupFaridabadOpportunities(root, route);
  setupFaridabadProcess(root, route);
  setupNriFaqAndReviews(root, route);
  setupContactRedesign(root, route);
  revealHomePageImmediately(root, route);
  setupLeadCapture(root, route);
  removePremiumFooterLinks(root);
  applyRedesignedFooter(root);
}

function revealHomePageImmediately(root, route) {
  if (!root || route !== "/") return;
  root.querySelectorAll("[data-aos], [data-aos-delay], [data-aos-duration]").forEach((element) => {
    element.removeAttribute("data-aos");
    element.removeAttribute("data-aos-delay");
    element.removeAttribute("data-aos-duration");
    element.classList.remove("aos-init", "aos-animate");
  });
}

function applyContactDetails(root) {
  if (!root) return;
  const textNodeFilter = root.ownerDocument?.defaultView?.NodeFilter?.SHOW_TEXT || 4;
  const addressPatterns = [
    /3rd Floor,\s*Golf View Corporate Tower A,\s*Golf Course Road,\s*Sector 42,\s*Gurgaon\s*-?\s*122002/gi,
    /3rd Floor,\s*Golf View Corporate Tower A,\s*Golf Course Road,\s*Sector 42,\s*Gurgaon/gi,
    /Business Bay,\s*Dubai,\s*UAE/gi,
    /Sector 18,\s*Noida,\s*Uttar Pradesh/gi,
  ];

  const replaceContactText = (value) => {
    let nextValue = value
      .replace(/\+91\s*9968686868/g, CONTACT_PHONE_DISPLAY)
      .replace(/9968686868/g, "9560031319")
      .replace(/info@eliteproinfra\.com/gi, CONTACT_EMAIL)
      .replace(/dubai@eliteproinfra\.com/gi, CONTACT_EMAIL)
      .replace(/www\.eliteproinfra\.com/gi, CONTACT_WEBSITE)
      .replace(/Elite Pro Infra/g, "Nivesh Sarthi")
      .replace(/Elite Pro/g, "Nivesh Sarthi")
      .replace(/Gurgaon \(HQ\)/gi, CONTACT_HQ_LABEL)
      .replace(/Head Office/gi, CONTACT_HQ_LABEL)
      .replace(/Call Us/gi, CONTACT_PHONE_LABEL)
      .replace(/Email Us/gi, "Email")
      .replace(/Visit Website/gi, "Digital Desk");

    addressPatterns.forEach((pattern) => {
      nextValue = nextValue.replace(pattern, CONTACT_ADDRESS);
    });
    return nextValue;
  };

  const walker = (root.ownerDocument || document).createTreeWalker(root, textNodeFilter);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    node.nodeValue = replaceContactText(node.nodeValue || "");
  }

  root.querySelectorAll("a[href^='tel:'], a[href*='9968686868']").forEach((link) => {
    link.setAttribute("href", `tel:${CONTACT_PHONE_TEL}`);
  });

  root.querySelectorAll("a[href^='mailto:'], a[href*='@eliteproinfra.com']").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (/mailto:|eliteproinfra\.com/i.test(href)) {
      link.setAttribute("href", `mailto:${CONTACT_EMAIL}`);
    }
  });

  root.querySelectorAll("iframe[src*='Golf%20View%20Corporate%20Tower']").forEach((frame) => {
    frame.setAttribute(
      "src",
      "https://www.google.com/maps?q=Puri%2081%20Business%20Hub%20Sector%2081%20Faridabad&output=embed"
    );
  });

  const contactCards = root.querySelectorAll(".contact-card");
  if (contactCards.length >= 4) {
    contactCards[0].querySelector("h5") && (contactCards[0].querySelector("h5").textContent = CONTACT_PHONE_LABEL);
    contactCards[0].querySelector("p") && (contactCards[0].querySelector("p").textContent = CONTACT_PHONE_DISPLAY);
    contactCards[1].querySelector("h5") && (contactCards[1].querySelector("h5").textContent = "Email");
    contactCards[1].querySelector("p") && (contactCards[1].querySelector("p").textContent = CONTACT_EMAIL);
    contactCards[2].querySelector("h5") && (contactCards[2].querySelector("h5").textContent = "Digital Desk");
    contactCards[2].querySelector("p") && (contactCards[2].querySelector("p").textContent = CONTACT_WEBSITE);
    contactCards[3].querySelector("h5") && (contactCards[3].querySelector("h5").textContent = CONTACT_HQ_LABEL);
    contactCards[3].querySelector("p") && (contactCards[3].querySelector("p").innerHTML = "628-630, 6th Floor, Puri 81 Business Hub,<br>Sector 81, Faridabad");
  }

  const officeCards = root.querySelectorAll(".office-card");
  if (officeCards.length >= 3) {
    const firstOfficeText = officeCards[0].querySelectorAll("p");
    const secondOfficeText = officeCards[1].querySelectorAll("p");
    const thirdOfficeText = officeCards[2].querySelectorAll("p");
    officeCards[0].querySelector("h5") && (officeCards[0].querySelector("h5").innerHTML = `<i class="fas fa-building"></i> ${CONTACT_HQ_LABEL}`);
    firstOfficeText[0] && (firstOfficeText[0].innerHTML = `<strong>Address:</strong> ${CONTACT_ADDRESS}`);
    firstOfficeText[1] && (firstOfficeText[1].innerHTML = `<strong>Phone:</strong> ${CONTACT_PHONE_DISPLAY}`);
    officeCards[1].querySelector("h5") && (officeCards[1].querySelector("h5").innerHTML = `<i class="fas fa-phone"></i> ${CONTACT_PHONE_LABEL}`);
    secondOfficeText[0] && (secondOfficeText[0].innerHTML = `<strong>Phone:</strong> ${CONTACT_PHONE_DISPLAY}`);
    secondOfficeText[1] && (secondOfficeText[1].innerHTML = `<strong>Email:</strong> ${CONTACT_EMAIL}`);
    officeCards[2].querySelector("h5") && (officeCards[2].querySelector("h5").innerHTML = `<i class="fas fa-envelope"></i> Email`);
    thirdOfficeText[0] && (thirdOfficeText[0].innerHTML = `<strong>Email:</strong> ${CONTACT_EMAIL}`);
    thirdOfficeText[1] && (thirdOfficeText[1].innerHTML = `<strong>Address:</strong> Sector 81, Faridabad`);
  }
}

function applySocialLinks(root) {
  if (!root) return;

  const socialRules = [
    { key: "facebook", label: "Facebook", hrefPattern: /facebook\.com/i, iconPattern: /fa-facebook/i },
    { key: "instagram", label: "Instagram", hrefPattern: /instagram\.com/i, iconPattern: /fa-instagram/i },
    { key: "linkedin", label: "LinkedIn", hrefPattern: /linkedin\.com\/company\/eliteproinfra/i, iconPattern: /fa-linkedin/i },
  ];

  root.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const iconClass = link.querySelector("i")?.className || "";
    const isBrandSocialArea = Boolean(
      link.closest("footer, #contact, .social-links, .nivesh-contact-info, .contact-info, .top-header")
    );
    const rule = socialRules.find((item) => (
      item.hrefPattern.test(href) ||
      (isBrandSocialArea && item.iconPattern.test(iconClass))
    ));

    if (!rule) return;

    link.setAttribute("href", SOCIAL_LINKS[rule.key]);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("aria-label", `Nivesh Sarthi ${rule.label}`);
    link.setAttribute("title", `Nivesh Sarthi ${rule.label}`);
  });
}

function removePremiumFooterLinks(root) {
  const footerLinkHeadings = [
    "Property in India",
    "Residential Properties",
    "Commercial Properties",
    "SCO Plots",
  ];

  root?.querySelectorAll("section").forEach((section) => {
    const headings = [...section.querySelectorAll("h6")].map((heading) => heading.textContent?.trim());
    const hasPremiumFooterLinks = footerLinkHeadings.every((label) => headings.includes(label));
    if (hasPremiumFooterLinks) section.remove();
  });
}

function getRedesignedFooterHtml() {
  return `
    <footer class="nivesh-site-footer">
      <div class="nivesh-footer-cta">
        <div>
          <span>Faridabad Advisory Desk</span>
          <h2>Ready To Compare The Right Property Options?</h2>
        </div>
        <a href="/contact">Start A Consultation</a>
      </div>

      <div class="nivesh-footer-main">
        <div class="nivesh-footer-brand">
          <img src="${NAVBAR_LOGO}" alt="Nivesh Sarthi">
          <p>Nivesh Sarthi brings focused real estate guidance across Faridabad and Greater Faridabad with a calm, transparent advisory process.</p>
          <div class="nivesh-footer-socials">
            <a href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi Instagram"><i class="fab fa-instagram"></i></a>
            <a href="${SOCIAL_LINKS.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="Nivesh Sarthi LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div class="nivesh-footer-links">
          <div>
            <h3>Explore</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/our-story">About Us</a></li>
              <li><a href="/properties">Properties</a></li>
              <li><a href="/career">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              <li><a href="/services">Services Overview</a></li>
            </ul>
          </div>
        </div>

        <address class="nivesh-footer-contact">
          <span>Contact</span>
          <a href="tel:${CONTACT_PHONE_TEL}"><i class="fas fa-phone"></i>${CONTACT_PHONE_DISPLAY}</a>
          <a href="mailto:${CONTACT_EMAIL}"><i class="fas fa-envelope"></i>${CONTACT_EMAIL}</a>
          <a href="https://maps.google.com/?q=Puri%2081%20Business%20Hub%20Sector%2081%20Faridabad" target="_blank" rel="noopener noreferrer"><i class="fas fa-location-dot"></i>${CONTACT_ADDRESS}</a>
        </address>
      </div>

      <div class="nivesh-footer-bottom">
        <p>&copy; 2026 Nivesh Sarthi. All Rights Reserved.</p>
        <div>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-conditions">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  `;
}

function applyRedesignedFooter(root) {
  const existingFooter = root?.querySelector("footer");
  if (!existingFooter) return;

  const template = (root.ownerDocument || document).createElement("template");
  template.innerHTML = getRedesignedFooterHtml().trim();
  existingFooter.replaceWith(template.content.firstElementChild);
}

function applyNavbarBranding(root) {
  const navLogoSelectors = [
    ".navbar .navbar-brand img",
    ".navbar .mobile-nav-brand img",
  ];
  const footerLogoSelectors = [
    "footer img[src*='Elite-pro-logo']",
    "footer img[alt*='Elite']",
  ];

  root?.querySelectorAll(navLogoSelectors.join(",")).forEach((logo) => {
    logo.src = NAVBAR_LOGO;
    logo.alt = "Nivesh Sarthi";
    logo.setAttribute("data-default-logo", NAVBAR_LOGO);
    logo.setAttribute("data-scrolled-logo", NAVBAR_LOGO);
  });

  root?.querySelectorAll(footerLogoSelectors.join(",")).forEach((logo) => {
    logo.src = NAVBAR_LOGO;
    logo.alt = "Nivesh Sarthi";
    logo.removeAttribute("height");
    logo.style.maxWidth = "210px";
    logo.style.height = "auto";
    logo.style.opacity = "1";
    logo.style.background = "transparent";
    logo.style.padding = "0";
  });

  root?.querySelectorAll(".mobile-nav-brand-title").forEach((title) => {
    title.textContent = "Nivesh Sarthi";
  });

  applyContactDetails(root);
  applySocialLinks(root);

  root?.querySelectorAll("footer p, footer span, footer a, footer small").forEach((node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType !== Node.TEXT_NODE) return;
      child.textContent = child.textContent
        .replace(/Elite Pro Infra/g, "Nivesh Sarthi")
        .replace(/Elite Pro/g, "Nivesh Sarthi");
    });
  });

  root?.querySelectorAll("footer a[href*='eliteproinfra.com']").forEach((link) => {
    link.setAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  root?.querySelectorAll(".navbar a.btn-gold[href='/contact']").forEach((button) => {
    button.textContent = "CONSULT";
    button.setAttribute("aria-label", "Consult with Nivesh Sarthi");
  });

  root?.querySelectorAll(".navbar a[href='/nri-corner']").forEach((link) => {
    link.closest("li")?.remove();
  });

  root?.querySelectorAll(".navbar #insightsDropdown, .navbar a[href='/pr-media'], .navbar a[href='/insight-blog'], .navbar a[href='/news-update']").forEach((link) => {
    link.closest("li")?.remove();
  });

  root?.querySelectorAll(".navbar #servicesDropdown").forEach((servicesLink) => {
    const navItem = servicesLink.closest(".nav-item");
    navItem?.classList.remove("dropdown");
    servicesLink.classList.remove("dropdown-toggle");
    servicesLink.setAttribute("href", "/services");
    servicesLink.removeAttribute("data-bs-toggle");
    servicesLink.removeAttribute("aria-expanded");
    servicesLink.removeAttribute("role");
    servicesLink.textContent = "Services";
    navItem?.querySelector(".dropdown-menu")?.remove();
  });

  root?.querySelectorAll(".navbar #aboutDropdown").forEach((aboutLink) => {
    const navItem = aboutLink.closest(".nav-item");
    navItem?.classList.remove("dropdown");
    aboutLink.classList.remove("dropdown-toggle");
    aboutLink.setAttribute("href", "/our-story");
    aboutLink.removeAttribute("data-bs-toggle");
    aboutLink.removeAttribute("aria-expanded");
    aboutLink.removeAttribute("role");
    aboutLink.textContent = "About";
    navItem?.querySelector(".dropdown-menu")?.remove();
  });

  const propertyCategoryLinks = {
    "/properties/category-1": "/properties/commercial",
    "/properties/category-2": "/properties/residential",
    "/properties/category-3": "/properties/sco",
    "/properties/category-4": "/consulting",
  };
  root?.querySelectorAll(".navbar a[href^='/properties/category-']").forEach((link) => {
    const href = link.getAttribute("href");
    if (propertyCategoryLinks[href]) link.setAttribute("href", propertyCategoryLinks[href]);
  });

  root?.querySelectorAll(".navbar a").forEach((link) => {
    link.childNodes.forEach((child) => {
      if (child.nodeType !== Node.TEXT_NODE) return;
      child.textContent = child.textContent
        .replace(/Life at Elite Pro Infra/g, "Life at Nivesh Sarthi")
        .replace(/Contact Us/g, "CONSULT");
    });
  });
}

function setupHeroShowcase(root) {
  root?.querySelectorAll("#heroCarouselDesktop, #heroCarouselMobile").forEach((carousel) => {
    const isReady = carousel.dataset.niveshHeroReady === "true";

    if (!isReady) {
      carousel.dataset.niveshHeroReady = "true";
      carousel.setAttribute("data-bs-interval", "4800");
      carousel.setAttribute("data-bs-ride", "carousel");
      carousel.setAttribute("data-bs-pause", "false");

      const fixedCaption = (carousel.ownerDocument || document).createElement("div");
      fixedCaption.className = "carousel-caption nivesh-hero-fixed-copy";
      fixedCaption.innerHTML = HERO_CONTENT;
      carousel.appendChild(fixedCaption);

      carousel.querySelectorAll(".carousel-caption:not(.nivesh-hero-fixed-copy)").forEach((caption) => {
        caption.setAttribute("aria-hidden", "true");
        caption.classList.add("nivesh-hero-hidden-caption");
      });

      const inner = carousel.querySelector(".carousel-inner");
      if (inner) {
        inner.innerHTML = HERO_IMAGES.map((src, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}" style="height: 90vh;" data-bs-interval="4800">
            <img src="${src}" class="d-block w-100 h-100 object-fit-cover nivesh-hero-image" alt="Premium real estate ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}">
          </div>
        `).join("");
      }

      const indicators = carousel.querySelector(".carousel-indicators");
      if (indicators) {
        indicators.innerHTML = HERO_IMAGES.map((_, index) => `
          <button type="button" data-bs-target="#${carousel.id}" data-bs-slide-to="${index}" class="${index === 0 ? "active" : ""}" ${index === 0 ? 'aria-current="true"' : ""} aria-label="Slide ${index + 1}"></button>
        `).join("");
      }
    }

    if (!carousel.isConnected) return;
    window.bootstrap?.Carousel?.getOrCreateInstance(carousel, {
      interval: 4800,
      ride: "carousel",
      pause: false,
      touch: true,
      wrap: true,
    });
  });
}

function setupHomepageWhoWeAre(root, route) {
  if (!root || route !== "/") return;
  const about = root.querySelector("#about");
  if (!about || about.classList.contains("nivesh-home-about-section")) return;

  const section = document.createElement("div");
  section.innerHTML = NIVESH_HOME_MATCH_SECTION.trim();
  about.replaceWith(section.firstElementChild);
}

function setupFaridabadProjects(root) {
  const section = root?.querySelector("#projects");
  if (!section || section.dataset.niveshFaridabadReady === "true") return;
  section.dataset.niveshFaridabadReady = "true";
  section.classList.add("nivesh-faridabad-projects");

  section.innerHTML = `
    <div class="container">
      <div class="nivesh-projects-heading">
        <span>Faridabad Portfolio</span>
        <h2>Featured Faridabad Properties</h2>
        <p>Premium residences, plots, and ready addresses curated from Property Master's Faridabad project portfolio.</p>
      </div>
      <div class="row g-4 nivesh-project-grid">
        ${FARIDABAD_PROJECTS.map((project, index) => `
          <div class="col-12 col-md-6 col-xl-4" data-aos="fade-up" data-aos-delay="${(index % 3) * 90}">
            <article class="nivesh-project-card">
                <a class="nivesh-project-media" href="/project/${project.slug}">
                  <img src="${project.image}" alt="${project.title}" loading="eager" decoding="async" fetchpriority="${index < 6 ? "high" : "auto"}">
                  <span>${project.status}</span>
                  <em>${project.categories?.map((item) => PROPERTY_CATEGORY_META[item]?.label).filter(Boolean).join(" / ")}</em>
                </a>
              <div class="nivesh-project-body">
                <p class="nivesh-project-developer">${project.developer}</p>
                <h3>${project.title}</h3>
                <p class="nivesh-project-location">${project.location}<br><em>${project.corridor}</em></p>
                <div class="nivesh-project-details" aria-label="${project.title} highlights">
                  <div><span>Type</span><strong>${project.type}</strong></div>
                  <div><span>Area</span><strong>${project.area}</strong></div>
                  <div><span>Price</span><strong>${project.price}</strong></div>
                </div>
                <a class="nivesh-project-link" href="/project/${project.slug}">View Project</a>
              </div>
            </article>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function setupFaridabadEditorial(root, route) {
  if (!root || route !== "/" || root.querySelector(".nivesh-editorial-section")) return;

  const projects = root.querySelector("#projects");
  if (!projects) return;

  const section = document.createElement("div");
  section.innerHTML = FARIDABAD_EDITORIAL_SECTION.trim();
  projects.insertAdjacentElement("afterend", section.firstElementChild);
}

function removeHomepageInsightHub(root, route) {
  if (!root || route !== "/") return;
  root.querySelector("#insights")?.remove();
}

function setupExpertiseRedesign(root, route) {
  if (!root || route !== "/") return;
  const services = root.querySelector("#services");
  if (!services || services.classList.contains("nivesh-expertise-section")) return;

  const section = document.createElement("div");
  section.innerHTML = EXPERTISE_SECTION.trim();
  services.replaceWith(section.firstElementChild);
}

function setupWhyNiveshRedesign(root, route) {
  if (!root || route !== "/" || root.querySelector(".nivesh-why-section")) return;
  const oldSection = root.querySelector(".why-choose");
  if (!oldSection) return;

  const section = document.createElement("div");
  section.innerHTML = WHY_NIVESH_SECTION.trim();
  oldSection.replaceWith(section.firstElementChild);
}

function setupFaridabadPartners(root, route) {
  if (!root || route !== "/" || root.querySelector(".nivesh-partners-section")) return;
  const partnerHeading = [...root.querySelectorAll(".marquee-section h2")]
    .find((heading) => /Developer Partners/i.test(heading.textContent || ""));
  const oldSection = partnerHeading?.closest(".marquee-section");
  if (!oldSection) return;

  const section = document.createElement("div");
  section.innerHTML = FARIDABAD_PARTNERS_SECTION.trim();
  oldSection.replaceWith(section.firstElementChild);
}

function removeHomepageScaleSections(root, route) {
  if (!root || route !== "/") return;
  root.querySelector(".stats-section")?.remove();
  [...root.querySelectorAll("section")].forEach((section) => {
    if (/Nationwide\s*&\s*Global Reach/i.test(section.textContent || "")) {
      section.remove();
    }
  });
}

function setupFaridabadOpportunities(root, route) {
  if (!root || route !== "/") return;
  const globalSection = root.querySelector("#global");
  if (!globalSection || globalSection.classList.contains("nivesh-corridor-section")) return;

  const section = document.createElement("div");
  section.innerHTML = FARIDABAD_OPPORTUNITIES_SECTION.trim();
  globalSection.replaceWith(section.firstElementChild);
}

function setupFaridabadProcess(root, route) {
  if (!root || route !== "/") return;
  const awards = root.querySelector("#awards");
  if (!awards || awards.classList.contains("nivesh-process-section")) return;

  const section = document.createElement("div");
  section.innerHTML = FARIDABAD_PROCESS_SECTION.trim();
  awards.replaceWith(section.firstElementChild);
}

function setupNriFaqAndReviews(root, route) {
  if (!root || route !== "/") return;

  const nri = root.querySelector("#nri");
  if (nri && !nri.classList.contains("nivesh-nri-section")) {
    const section = document.createElement("div");
    section.innerHTML = NIVESH_NRI_SECTION.trim();
    nri.replaceWith(section.firstElementChild);
  }

  const faq = root.querySelector("#faq");
  if (faq && !faq.classList.contains("nivesh-faq-section")) {
    const section = document.createElement("div");
    section.innerHTML = NIVESH_FAQ_SECTION.trim();
    faq.replaceWith(section.firstElementChild);
  }

  root.querySelector(".google-reviews-section")?.remove();
}

function setupContactRedesign(root, route) {
  if (!root || route !== "/") return;
  const contact = root.querySelector("#contact");
  if (!contact || contact.classList.contains("nivesh-contact-section")) return;

  contact.classList.add("nivesh-contact-section");
  contact.removeAttribute("style");

  const shell = contact.querySelector(".row.align-items-stretch");
  shell?.classList.add("nivesh-contact-shell");
  shell?.removeAttribute("style");

  const infoSide = contact.querySelector(".col-lg-5");
  infoSide?.classList.add("nivesh-contact-info");
  infoSide?.classList.remove("bg-gold");

  const formSide = contact.querySelector(".col-lg-7");
  formSide?.classList.add("nivesh-contact-form");
  formSide?.classList.remove("bg-white");

  const infoTitle = infoSide?.querySelector("h3");
  if (infoTitle) infoTitle.textContent = "Get in Touch";

  const infoText = infoSide?.querySelector("p.mb-5");
  if (infoText) {
    infoText.textContent = "Planning a Faridabad property decision? Speak with Nivesh Sarthi for curated guidance across residences, plots, and investment-ready addresses.";
  }

  const emailLink = infoSide?.querySelector("a[href^='mailto:']");
  if (emailLink) {
    emailLink.href = `mailto:${CONTACT_EMAIL}`;
    emailLink.textContent = CONTACT_EMAIL;
  }

  const phoneLink = infoSide?.querySelector("a[href^='tel:']");
  if (phoneLink) {
    phoneLink.href = `tel:${CONTACT_PHONE_TEL}`;
    phoneLink.textContent = CONTACT_PHONE_DISPLAY;
  }

  infoSide?.querySelectorAll("h6").forEach((heading) => {
    if (/Call/i.test(heading.textContent || "")) heading.textContent = CONTACT_PHONE_LABEL;
    if (/Email/i.test(heading.textContent || "")) heading.textContent = "Email";
    if (/Visit|Corporate HQ|Head Office/i.test(heading.textContent || "")) heading.textContent = CONTACT_HQ_LABEL;
  }
  );

  const visitText = [...(infoSide?.querySelectorAll("h6") || [])]
    .find((heading) => /Corporate HQ/i.test(heading.textContent || ""))
    ?.parentElement?.querySelector("p");
  if (visitText) {
    visitText.textContent = CONTACT_ADDRESS;
  }

  const formTitle = formSide?.querySelector("h3");
  if (formTitle) formTitle.textContent = "Send a Private Enquiry";

  const formText = formSide?.querySelector("p");
  if (formText) {
    formText.textContent = "Share your requirement and our advisory team will respond with a focused Faridabad property shortlist.";
  }

  const interest = formSide?.querySelector("#interest");
  if (interest) {
    interest.innerHTML = `
      <option selected>Select Requirement</option>
      <option value="residential">Faridabad Residence</option>
      <option value="plots">Residential Plot</option>
      <option value="commercial">Commercial Investment</option>
      <option value="nri">NRI Advisory</option>
    `;
  }

  const form = formSide?.querySelector("form");
  if (form && form.dataset.niveshLeadReady !== "true") {
    form.dataset.niveshLeadReady = "true";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector("button[type='submit'], .btn");
      const originalText = submit?.textContent;
      if (submit) submit.textContent = "Sending...";
      const formData = new FormData(form);
      const lead = {
        source: "homepage-contact",
        name: formData.get("name") || form.querySelector("#name")?.value,
        phone: formData.get("phone") || form.querySelector("#phone")?.value,
        email: formData.get("email") || form.querySelector("#email")?.value,
        requirement: formData.get("interest") || form.querySelector("#interest")?.value,
        message: formData.get("message") || form.querySelector("#message")?.value,
      };
      try {
        await fetch(apiUrl("/api/leads"), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(lead),
        });
        form.reset();
        if (submit) submit.textContent = "Enquiry Sent";
      } catch {
        if (submit) submit.textContent = "Try Again";
      }
      window.setTimeout(() => {
        if (submit) submit.textContent = originalText || "Send Enquiry";
      }, 2200);
    });
  }
}

function setupLeadCapture(root, route) {
  if (!root || route === "/admin") return;
  root.querySelectorAll("form").forEach((form) => {
    if (form.dataset.niveshLeadReady === "true") return;
    const hasLeadFields = form.querySelector("input[type='tel'], input[type='email'], textarea");
    if (!hasLeadFields) return;
    form.dataset.niveshLeadReady = "true";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const fields = [...form.querySelectorAll("input, select, textarea")];
      const pick = (patterns) => {
        const field = fields.find((item) => {
          const haystack = `${item.name || ""} ${item.id || ""} ${item.placeholder || ""} ${item.getAttribute("aria-label") || ""}`.toLowerCase();
          return patterns.some((pattern) => haystack.includes(pattern));
        });
        return field?.value || "";
      };
      const submit = form.querySelector("button[type='submit'], input[type='submit'], .btn");
      const originalText = submit?.value || submit?.textContent;
      if (submit) {
        if ("value" in submit) submit.value = "Sending...";
        else submit.textContent = "Sending...";
      }
      try {
        await fetch(apiUrl("/api/leads"), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            source: route,
            name: pick(["name"]),
            phone: pick(["phone", "mobile", "tel"]),
            email: pick(["email"]),
            requirement: pick(["interest", "requirement", "subject", "type"]),
            message: pick(["message", "detail", "cover"]),
          }),
        });
        form.reset();
        if (submit) {
          if ("value" in submit) submit.value = "Sent";
          else submit.textContent = "Sent";
        }
      } catch {
        if (submit) {
          if ("value" in submit) submit.value = "Try Again";
          else submit.textContent = "Try Again";
        }
      }
      window.setTimeout(() => {
        if (!submit) return;
        if ("value" in submit) submit.value = originalText || "Submit";
        else submit.textContent = originalText || "Submit";
      }, 2200);
    });
  });
}

createRoot(document.getElementById("root")).render(<App />);
