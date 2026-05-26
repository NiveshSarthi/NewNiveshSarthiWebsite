import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./mirror.css";

const NAVBAR_LOGO = "/assets/images/nivesh-sarthi-full-navbar-logo.png";
const SITE_TITLE = "Nivesh Sarthi | Premium Real Estate Consultants";
const CONTACT_HQ_LABEL = "Corporate HQ";
const CONTACT_ADDRESS = "628-630, 6th Floor, Puri 81 Business Hub, Sector 81, Faridabad";
const CONTACT_PHONE_LABEL = "Luxe Concierge";
const CONTACT_PHONE_DISPLAY = "+91 95600 31319";
const CONTACT_PHONE_TEL = "+919560031319";
const CONTACT_EMAIL = "info.niveshsarthi@gmail.com";
const CONTACT_WEBSITE = "www.niveshsarthi.com";
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/niveshsarthii",
  instagram: "https://www.instagram.com/niveshsarthi_/",
  linkedin: "https://www.linkedin.com/in/nivesh-sarthi",
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
        <option>Gurgaon</option>
        <option>Cyber City</option>
        <option>Sector 81 Faridabad</option>
        <option>NCR Corridors</option>
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
  <section id="about" class="nivesh-home-about-section" aria-label="Who we are">
    <div class="container">
      <div class="nivesh-home-about-layout">
        <div class="nivesh-home-about-media" data-aos="fade-right">
          <div class="nivesh-home-founder-card">
            <img src="/assets/images/founder.jpeg" alt="Nivesh Sarthi founder" loading="eager" decoding="async">
            <span><strong>Founder</strong><small>Nivesh Sarthi</small></span>
          </div>
          <div class="nivesh-home-founder-card">
            <img src="/assets/images/cofounder.jpeg" alt="Nivesh Sarthi co-founder" loading="eager" decoding="async">
            <span><strong>Co-Founder</strong><small>Nivesh Sarthi</small></span>
          </div>
        </div>
        <div class="nivesh-home-about-copy" data-aos="fade-left">
          <span>Who We Are</span>
          <h2>Started In 2024 To Bring Clearer Real Estate Guidance To Faridabad</h2>
          <p>
            Nivesh Sarthi was founded in 2024 with a simple belief: property decisions should feel transparent, well-researched, and personally guided. We help families, investors, entrepreneurs, and NRIs discover residential, commercial, SCO, and investment-ready opportunities across Faridabad.
          </p>
          <p>
            Our approach is focused, not scattered. Every recommendation is shaped by location strength, builder credibility, pricing logic, future usability, and the client’s real objective.
          </p>
          <div class="nivesh-home-about-highlights">
            <div><strong>2024</strong><small>Started With A Faridabad-First Vision</small></div>
            <div><strong>4</strong><small>Residential, Commercial, SCO, Investment</small></div>
            <div><strong>1:1</strong><small>Private-Client Advisory Process</small></div>
          </div>
          <div class="nivesh-home-about-method" aria-label="The Sarthi method">
            <div>
              <strong>The Sarthi Method</strong>
              <p>Listen deeply, shortlist selectively, compare honestly, and guide the decision only when the property truly fits.</p>
            </div>
            <ul>
              <li><span>01</span>Requirement Mapping</li>
              <li><span>02</span>Verified Project Match</li>
              <li><span>03</span>Closure With Clarity</li>
            </ul>
          </div>
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
          <div class="nivesh-why-feature-number">360°</div>
          <h3>Property Clarity</h3>
          <p>Across NCR growth corridors, luxury residences, plotted communities, and income-focused commercial assets.</p>
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
    fetch("/api/properties")
      .then((response) => response.ok ? response.json() : [])
      .then((items) => {
        if (Array.isArray(items) && items.length > 0) setProperties(items);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(normalizeRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (route !== "/properties/industrial" && route !== "/properties/category-4") return;
    history.replaceState({}, "", "/properties");
    setRoute("/properties");
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
        brandMirrorDocument(documentHtml);
        setHtml(documentHtml.body.innerHTML);
        setStatus("ready");
        document.title = SITE_TITLE;
      })
      .catch(() => setStatus("missing"));
  }, [pageUrl]);

  useEffect(() => {
    if (status !== "ready") return;

    const root = document.getElementById("mirrored-page");
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
    setupLeadCapture(root, route);

    root?.querySelectorAll("script").forEach((oldScript) => {
      const script = document.createElement("script");
      [...oldScript.attributes].forEach((attr) => script.setAttribute(attr.name, attr.value));
      script.textContent = oldScript.textContent;
      oldScript.replaceWith(script);
    });

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
    setupLeadCapture(root, route);
    window.AOS?.init?.({ duration: 800, once: true });
    wireLocalNavigation(root, setRoute);
  }, [html, properties, route, status]);

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

  if (propertyCategory) {
    return <PropertyListingPage category={propertyCategory} properties={properties} />;
  }

  if (route === "/career") {
    return <CareerPage />;
  }

  if (route === "/our-story") {
    return <AboutPage />;
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
          <span>Careers At Nivesh Sarthi</span>
          <h1>Build A Career In Faridabad Real Estate Advisory</h1>
          <p>Join a focused, premium property advisory team working across Sector 81, Greater Faridabad, SCO opportunities, residential investments, and NCR growth corridors.</p>
          <div className="nivesh-career-actions">
            <a href="#open-roles">View Open Roles</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Send Resume</a>
          </div>
        </div>
        <div className="nivesh-career-panel" aria-label="Career highlights">
          <div><strong>Sector 81</strong><span>Corporate HQ</span></div>
          <div><strong>Faridabad</strong><span>Focused Market</span></div>
          <div><strong>2 Roles</strong><span>Open Hiring</span></div>
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

  const loadAdminData = () => {
    fetch("/api/properties")
      .then((response) => response.json())
      .then((items) => Array.isArray(items) && items.length > 0 && setProperties(items))
      .catch(() => {});
    fetch("/api/leads")
      .then((response) => response.json())
      .then((items) => Array.isArray(items) && setLeads(items))
      .catch(() => {});
  };

  useEffect(loadAdminData, []);

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
    const url = editingSlug ? `/api/properties/${encodeURIComponent(editingSlug)}` : "/api/properties";
    const response = await fetch(url, {
      method: editingSlug ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const value = await response.json();
    if (!response.ok) {
      setMessage(value.error || "Could not save property.");
      return;
    }
    const nextResponse = await fetch("/api/properties");
    const nextProperties = await nextResponse.json();
    if (Array.isArray(nextProperties)) setProperties(nextProperties);
    resetForm();
    setMessage("Property saved.");
  };

  const deleteProperty = async (slug) => {
    if (!window.confirm("Delete this property from the website?")) return;
    await fetch(`/api/properties/${encodeURIComponent(slug)}`, { method: "DELETE" });
    const nextResponse = await fetch("/api/properties");
    const nextProperties = await nextResponse.json();
    if (Array.isArray(nextProperties)) setProperties(nextProperties);
    setMessage("Property deleted.");
  };

  const deleteLead = async (id) => {
    await fetch(`/api/leads/${encodeURIComponent(id)}`, { method: "DELETE" });
    setLeads((current) => current.filter((lead) => lead.id !== id));
  };

  return (
    <main className="nivesh-admin-page">
      <LocalNavbar />
      <section className="nivesh-admin-hero">
        <span>Admin Panel</span>
        <h1>Manage Leads And Properties</h1>
        <p>Add, edit, or delete Faridabad properties and review website enquiries from one local dashboard.</p>
      </section>

      <section className="nivesh-admin-shell">
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
      </section>
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
    </main>
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
                  <li className="nav-item"><a className="nav-link" href="/investment-sales-advisory" onClick={closeMenu}>Services</a></li>
                  <li className="nav-item"><a className="nav-link" href="/properties" onClick={closeMenu}>Properties</a></li>
                  <li className="nav-item"><a className="nav-link" href="/insight-blog" onClick={closeMenu}>Media & Insights</a></li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/investment-sales-advisory" id="servicesDropdown" role="button" aria-expanded="false">Services</a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="servicesDropdown">
                      <li><a className="dropdown-item" href="/investment-sales-advisory" onClick={closeMenu}>Investment Sales Advisory</a></li>
                      <li><a className="dropdown-item" href="/nri-advisory" onClick={closeMenu}>NRI Advisory</a></li>
                      <li><a className="dropdown-item" href="/property-management" onClick={closeMenu}>Property Management</a></li>
                      <li><a className="dropdown-item" href="/land-acquisition" onClick={closeMenu}>Land & Acquisition</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/properties" id="propertiesDropdown" role="button" aria-expanded="false">Properties</a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="propertiesDropdown">
                      <li><a className="dropdown-item" href="/properties" onClick={closeMenu}>All Properties</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="/properties/commercial" onClick={closeMenu}>Commercial</a></li>
                      <li><a className="dropdown-item" href="/properties/residential" onClick={closeMenu}>Residential</a></li>
                      <li><a className="dropdown-item" href="/properties/sco" onClick={closeMenu}>SCO Plots</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/insight-blog" id="insightsDropdown" role="button" aria-expanded="false">Media & Insights</a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="insightsDropdown">
                      <li><a className="dropdown-item" href="/pr-media" onClick={closeMenu}>Media & Press</a></li>
                      <li><a className="dropdown-item" href="/insight-blog" onClick={closeMenu}>Insights & Blogs</a></li>
                      <li><a className="dropdown-item" href="/news-update" onClick={closeMenu}>News & Updates</a></li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item"><a className="nav-link" href="/nri-corner" onClick={closeMenu}>NRI Corner</a></li>
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
    </main>
  );
}

function normalizeRoute(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return clean.endsWith(".php") ? clean.replace(/\.php$/, "") : clean;
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
      .replace(/Email Us/gi, "Email Concierge")
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
    contactCards[1].querySelector("h5") && (contactCards[1].querySelector("h5").textContent = "Email Concierge");
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
    officeCards[2].querySelector("h5") && (officeCards[2].querySelector("h5").innerHTML = `<i class="fas fa-envelope"></i> Email Concierge`);
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
  };
  root?.querySelectorAll(".navbar a[href^='/properties/category-']").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "/properties/category-4") {
      link.closest("li")?.remove();
      return;
    }
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
    if (carousel.dataset.niveshHeroReady === "true") return;
    carousel.dataset.niveshHeroReady = "true";
    carousel.setAttribute("data-bs-interval", "4800");
    carousel.setAttribute("data-bs-ride", "carousel");
    carousel.setAttribute("data-bs-pause", "false");

    const fixedCaption = document.createElement("div");
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
  section.innerHTML = NIVESH_HOME_ABOUT_SECTION.trim();
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
    if (/Call|Luxe Concierge/i.test(heading.textContent || "")) heading.textContent = CONTACT_PHONE_LABEL;
    if (/Email/i.test(heading.textContent || "")) heading.textContent = "Email Concierge";
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
        await fetch("/api/leads", {
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
        await fetch("/api/leads", {
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
