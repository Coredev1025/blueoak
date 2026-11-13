import { SERVICE_ART } from "./visuals.js";
import React from "react";
const COMPANY = {
  name: "BlueOak Software LLC",
  short: "BlueOak",
  tagline: "Software, engineered to outlast",
  email: "contact@blueoaksoftware.cloud",
  phone: "+1 (904) 364-5132",
  address: "651 N Broad Street, Middletown, Delaware, US",
  locations: ["Austin", "San Francisco", "Zurich", "Stockholm"],
};
const HERO_STATS = [
  {
    v: "7",
    l: "Core disciplines",
  },
  {
    v: "11",
    l: "People. One team.",
  },
  {
    v: "4",
    l: "Studios worldwide",
  },
  {
    v: "1",
    l: "Engineering partner",
  },
];
const MARQUEE_ITEMS = [
  "Distributed systems",
  "Zero-trust architecture",
  "Cloud native",
  "Agentic AI",
  "HIPAA & PCI ready",
  "Edge-first delivery",
  "99.99% uptime",
];
const SERVICES = [
  {
    id: "web-apps",
    icon: "Globe",
    shortTitle: "Web Apps",
    title: "Scalable Web Applications",
    badge: "Platform Engineering",
    tagline:
      "High-throughput web platforms with sub-100ms interactions, edge routing and micro-frontend architecture.",
    overview:
      "We design and build web platforms that stay fast under real-world load — dashboards, marketplaces, portals and SaaS products. Every screen is engineered against a latency budget, every service is deployable on its own, and nothing ships without a load test behind it.",
    capabilities: [
      {
        t: "Micro-frontend architecture",
        d: "Independently deployable frontends that let product teams ship without cross-team lockstep.",
      },
      {
        t: "Real-time everywhere",
        d: "WebSockets, live collaboration and streaming dashboards as first-class citizens, not afterthoughts.",
      },
      {
        t: "Edge-first delivery",
        d: "CDN-backed rendering and smart caching that keep first paint under a second, worldwide.",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Go",
      "GraphQL",
      "Kubernetes",
      "PostgreSQL",
    ],
    compliance: ["SOC 2 aligned", "Zero-trust auth", "GDPR ready"],
    stats: [
      {
        v: "<1s",
        l: "First paint worldwide",
      },
      {
        v: "100ms",
        l: "Interaction budget",
      },
    ],
    image: SERVICE_ART["web-apps"],
  },
  {
    id: "healthcare-apps",
    icon: "HeartPulse",
    shortTitle: "Healthcare Apps",
    title: "Healthcare & MedTech Platforms",
    badge: "MedTech & Security",
    tagline:
      "HIPAA-grade telehealth, EHR integration, remote vital monitoring and medical imaging pipelines.",
    overview:
      "Healthcare software has no tolerance for ambiguity. We build clinical platforms with audited data flows, FHIR-native integrations and monitoring engines that surface deterioration before a human would — while passing the compliance reviews your legal team dreads.",
    capabilities: [
      {
        t: "Telehealth engines",
        d: "Scheduled and on-demand video consults with e-prescriptions, charting and follow-up flows.",
      },
      {
        t: "EHR integration",
        d: "FHIR and HL7 interfaces that read and write into Epic, Cerner and custom hospital systems.",
      },
      {
        t: "Remote vital monitoring",
        d: "Streaming telemetry from connected devices with threshold alerts and clinician dashboards.",
      },
    ],
    stack: [
      "FHIR",
      "HL7",
      "WebRTC",
      "React Native",
      "Node.js",
      "Kafka",
      "PostgreSQL",
      "AWS",
    ],
    compliance: ["HIPAA", "SOC 2", "HITRUST aligned"],
    stats: [
      {
        v: "250k",
        l: "Patients monitored",
      },
      {
        v: "AES-256",
        l: "End-to-end encryption",
      },
    ],
    image: SERVICE_ART["healthcare-apps"],
  },
  {
    id: "fintech-apps",
    icon: "Landmark",
    shortTitle: "Fintech Apps",
    title: "Fintech & Payment Engines",
    badge: "Ledgers & Rails",
    tagline:
      "Payment orchestration, ledger databases, fraud detection and multi-currency banking rails.",
    overview:
      "Money software is accounting software wearing a nice interface. We build double-entry ledger systems, settlement engines and fraud models where every cent reconciles, every state transition is replayable, and audits are a formality instead of a fire drill.",
    capabilities: [
      {
        t: "Double-entry ledgers",
        d: "Immutable, replayable ledger cores with p99 writes measured in single-digit milliseconds.",
      },
      {
        t: "Fraud detection",
        d: "Real-time scoring pipelines that flag anomalies in-flight, before a transaction settles.",
      },
      {
        t: "Payment orchestration",
        d: "Multi-PSP routing with automatic failover, reconciliation and multi-currency support.",
      },
    ],
    stack: ["Go", "Rust", "Kafka", "PostgreSQL", "Redis", "Terraform", "gRPC"],
    compliance: ["PCI DSS", "SOC 2", "PSD2 ready"],
    stats: [
      {
        v: "12ms",
        l: "Ledger writes p99",
      },
      {
        v: "$2.1B",
        l: "Processed annually",
      },
    ],
    image: SERVICE_ART["fintech-apps"],
  },
  {
    id: "shopping-ecommerce-apps",
    icon: "ShoppingBag",
    shortTitle: "E-Commerce Apps",
    title: "E-Commerce & Shopping Experiences",
    badge: "Headless Commerce",
    tagline:
      "Headless storefronts, real-time inventory sync, dynamic pricing and 3D product visualizers.",
    overview:
      "Storefronts that convert are engineered, not themed. We build headless commerce ecosystems where the catalog, inventory and pricing engines are services of their own — so a flash sale is an ordinary Tuesday instead of an outage.",
    capabilities: [
      {
        t: "Headless storefronts",
        d: "Framework-rendered storefronts with 180ms product pages and instant search-as-you-type.",
      },
      {
        t: "Real-time inventory",
        d: "Stock levels synced across warehouses and channels the moment a unit moves.",
      },
      {
        t: "Dynamic pricing & 3D",
        d: "Rule-driven pricing engines and interactive product visualizers that lift conversion.",
      },
    ],
    stack: [
      "React",
      "Node.js",
      "Elasticsearch",
      "Stripe",
      "Redis",
      "Kafka",
      "GraphQL",
    ],
    compliance: ["PCI DSS", "GDPR", "WCAG 2.2 AA"],
    stats: [
      {
        v: "+38%",
        l: "Conversion lift",
      },
      {
        v: "180ms",
        l: "Product page render",
      },
    ],
    image: SERVICE_ART["shopping-ecommerce-apps"],
  },
  {
    id: "education-apps",
    icon: "GraduationCap",
    shortTitle: "Education Apps",
    title: "Education & Learning Platforms",
    badge: "EdTech & Analytics",
    tagline:
      "Adaptive learning engines, virtual classrooms, progress telemetry and gamified skill paths.",
    overview:
      "Learning platforms live or die on engagement telemetry. We build adaptive systems that reshape the curriculum per learner, virtual classrooms that don't freeze at roll call, and analytics that show educators what actually worked.",
    capabilities: [
      {
        t: "Adaptive learning paths",
        d: "Engines that re-sequence content per learner based on mastery signals, not seat time.",
      },
      {
        t: "Live virtual classrooms",
        d: "Low-latency audio/video rooms with breakout groups, whiteboards and attendance tracking.",
      },
      {
        t: "Progress telemetry",
        d: "xAPI-based event streams that turn every click into an honest progress picture.",
      },
    ],
    stack: ["React Native", "WebRTC", "Python", "PostgreSQL", "Redis", "xAPI"],
    compliance: ["FERPA", "COPPA", "GDPR"],
    stats: [
      {
        v: "92%",
        l: "Course completion",
      },
      {
        v: "40+",
        l: "Schools onboard",
      },
    ],
    image: SERVICE_ART["education-apps"],
  },
  {
    id: "video-streaming-apps",
    icon: "Clapperboard",
    shortTitle: "Streaming Apps",
    title: "Video Streaming Platforms",
    badge: "Media & HLS",
    tagline:
      "HLS and WebRTC streaming meshes, DRM protection, live transcoding and edge CDN distribution.",
    overview:
      "Streaming is a systems problem disguised as a player. We build delivery meshes with adaptive bitrate, multi-DRM and transcoding pipelines that hold sub-3-second latency when the stadium scores — because that's the moment that pays for the platform.",
    capabilities: [
      {
        t: "Ultra-low latency delivery",
        d: "WebRTC and LL-HLS meshes holding sub-3s glass-to-glass latency at massive concurrency.",
      },
      {
        t: "Multi-DRM protection",
        d: "Widevine, FairPlay and PlayReady entitlement systems wired into your subscription logic.",
      },
      {
        t: "Live transcoding pipelines",
        d: "Adaptive ladder generation on the fly, from phone cameras to broadcast feeds.",
      },
    ],
    stack: [
      "WebRTC",
      "HLS",
      "FFmpeg",
      "Widevine",
      "Go",
      "Kubernetes",
      "CDN Edge",
    ],
    compliance: ["Multi-DRM", "DMCA safe harbor", "SOC 2"],
    stats: [
      {
        v: "<3s",
        l: "Glass-to-glass latency",
      },
      {
        v: "4.8M",
        l: "Concurrent viewers",
      },
    ],
    image: SERVICE_ART["video-streaming-apps"],
  },
  {
    id: "ai-scratch",
    icon: "Cpu",
    shortTitle: "AI From Scratch",
    title: "Custom Enterprise AI, Built From Scratch",
    badge: "Agentic AI",
    tagline:
      "Proprietary LLM fine-tuning, RAG context graphs, agentic workflow orchestration and on-prem deployment.",
    overview:
      "We build AI systems the way we build everything else — architecture first. Domain-tuned models, retrieval grounded in your own corpus, and agent orchestration with real guardrails. Deployed in your VPC or your basement; the model never has to leave.",
    capabilities: [
      {
        t: "Domain-tuned models",
        d: "Fine-tuned and evaluated models that speak your industry's language, not the average web's.",
      },
      {
        t: "RAG context graphs",
        d: "Retrieval grounded in your documents with citation-grade traceability for every answer.",
      },
      {
        t: "Agentic orchestration",
        d: "Tool-using agents with human approval gates, budgets and full audit trails.",
      },
    ],
    stack: [
      "Python",
      "PyTorch",
      "LangGraph",
      "vLLM",
      "pgvector",
      "Ray",
      "Docker",
    ],
    compliance: ["EU AI Act aware", "On-prem / VPC options", "SOC 2"],
    stats: [
      {
        v: "4 mo",
        l: "Whiteboard to production",
      },
      {
        v: "78%",
        l: "Manual workload cut",
      },
    ],
    image: SERVICE_ART["ai-scratch"],
  },
];
const CASE_STUDIES = [
  {
    id: "pulsegrid",
    name: "PulseGrid",
    industry: "Healthcare",
    service: "healthcare-apps",
    image: "/assets/pulsegrid-concept.webp",
    blurb:
      "Remote patient monitoring platform streaming vitals from a clinical device fleet in real time, with threshold alerts routed to the right clinician in seconds.",
    metrics: [
      ["250k", "patients monitored"],
      ["99.99%", "platform uptime"],
    ],
    tags: ["Telehealth", "Real-time vitals"],
  },
  {
    id: "ledgerline",
    name: "Ledgerline",
    industry: "Fintech",
    service: "fintech-apps",
    image: "/assets/ledgerline-concept.webp",
    blurb:
      "Treasury and settlement engine moving multi-currency ledgers with 12ms p99 writes and fully replayable state transitions.",
    metrics: [
      ["12ms", "ledger writes p99"],
      ["$2.1B", "processed annually"],
    ],
    tags: ["Payments", "Double-entry ledger"],
  },
  {
    id: "aislemet",
    name: "Aislemet",
    industry: "E-Commerce",
    service: "shopping-ecommerce-apps",
    image: "/assets/aislemet-concept.webp",
    blurb:
      "Headless commerce replatform with live inventory sync across warehouses and a dynamic pricing engine that survived its first flash sale untouched.",
    metrics: [
      ["+38%", "conversion lift"],
      ["180ms", "page render"],
    ],
    tags: ["Headless", "3D commerce"],
  },
  {
    id: "streamhouse",
    name: "Streamhouse",
    industry: "Media",
    service: "video-streaming-apps",
    image: "/assets/streamhouse-concept.webp",
    blurb:
      "Live sports streaming mesh delivering sub-3-second glass-to-glass latency to millions of concurrent viewers on match day.",
    metrics: [
      ["<3s", "latency"],
      ["4.8M", "concurrent viewers"],
    ],
    tags: ["WebRTC", "Multi-DRM"],
  },
];
const TESTIMONIALS = [
  {
    quote:
      "BlueOak rebuilt our monitoring platform without a single minute of downtime. The architecture decisions still hold up two years later.",
    name: "Sarah Whitfield",
    role: "CTO, Meridian Health",
    initials: "SW",
  },
  {
    quote:
      "They think like owners. Every sprint ended with something we could ship, and the code quality made onboarding trivial.",
    name: "Daniel Reyes",
    role: "VP Engineering, Loop Payments",
    initials: "DR",
  },
  {
    quote:
      "Our AI copilot went from a whiteboard sketch to production in four months. Their team wrote the playbook we now hire against.",
    name: "Priya Raman",
    role: "Head of Product, Scholarly",
    initials: "PR",
  },
  {
    quote:
      "The most senior team we have worked with. No hand-waving, no bloat — just systems that survive real traffic.",
    name: "Tomás Berger",
    role: "Founder, Northbeam Media",
    initials: "TB",
  },
];
const TEAM = [
  {
    id: "luan-le",
    name: "Luan Le",
    role: "Founder & Principal Engineer",
    base: "Austin",
    img: "/assets/luan-le.webp",
    focus: ["Architecture", "Platform strategy", "Client partnership"],
    bio: "Luan founded BlueOak after a decade of building high-throughput platforms. He sits in the first architecture review of every engagement and stays on the hook until the system is live and boring.",
  },
  {
    id: "vu-dat",
    name: "Vu Dat",
    role: "Platform Architect",
    base: "Austin",
    img: "/assets/vu-dat.webp",
    focus: ["Distributed systems", "Kubernetes", "Latency budgets"],
    bio: "Dat designs the backbone — service boundaries, data flow and the latency budget every feature has to live inside. He would rather delete a service than add one.",
  },
  {
    id: "luan-nguyen",
    name: "Luan Nguyen",
    role: "Mobile Engineering Lead",
    base: "San Francisco",
    img: "/assets/luan-nguyen.webp",
    focus: ["iOS & Android", "Offline-first", "Release engineering"],
    bio: "Nguyen builds the mobile side: offline-first data layers, native performance and release pipelines that ship weekly without drama.",
  },
  {
    id: "dai-xing",
    name: "Dai Xing",
    role: "AI Systems Engineer",
    base: "San Francisco",
    img: "/assets/dai-xing.webp",
    focus: ["RAG pipelines", "Evaluation", "Inference cost"],
    bio: "Xing turns model demos into production systems — retrieval that stays grounded, evaluation suites that catch regressions, and inference costs that survive scale.",
  },
  {
    id: "emma-lindqvist",
    name: "Emma Lindqvist",
    role: "Design Director",
    base: "Stockholm",
    img: "/assets/emma-lindqvist.webp",
    focus: ["Product design", "Design systems", "Accessibility"],
    bio: "Emma leads design from Stockholm. She prototypes in the browser, keeps the design system honest, and argues for the user in every scoping call.",
  },
  {
    id: "lukas-weber",
    name: "Lukas Weber",
    role: "Cloud Architect",
    base: "Zurich",
    img: "/assets/lukas-weber.webp",
    focus: ["Zero-trust", "IaC", "Cost engineering"],
    bio: "Lukas owns the cloud layer — zero-trust networking, infrastructure as code and the cost model that keeps a growing platform affordable.",
  },
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Product Strategy Lead",
    base: "Austin",
    img: "/assets/sarah-mitchell.webp",
    focus: ["Discovery", "Roadmapping", "Metrics"],
    bio: "Sarah runs discovery: what to build, what to cut and which metric proves it worked. She writes the roadmap the engineering team actually follows.",
  },
  {
    id: "marcus-reed",
    name: "Marcus Reed",
    role: "Head of AI Research",
    base: "Austin",
    img: "/assets/marcus-reed.webp",
    focus: ["Agentic workflows", "Fine-tuning", "Model safety"],
    bio: "Marcus leads applied research — agentic workflows, fine-tuning strategy and the guardrails that keep autonomous systems inside their lane.",
  },
  {
    id: "james-carter",
    name: "James Carter",
    role: "Engineering Manager",
    base: "San Francisco",
    img: "/assets/james-carter.webp",
    focus: ["Delivery", "Code quality", "Mentoring"],
    bio: "James keeps delivery predictable. He protects review standards, unblocks the team daily and makes sure the sprint ends with something shippable.",
  },
  {
    id: "nora-keller",
    name: "Nora Keller",
    role: "Quality & Reliability Lead",
    base: "Zurich",
    img: "/assets/nora-keller.webp",
    focus: ["Test strategy", "Observability", "Incident response"],
    bio: "Nora owns reliability — test strategy, observability and the incident playbooks. If it can fail at 3am, she has already written the runbook.",
  },
  {
    id: "thomas-novak",
    name: "Thomas Novak",
    role: "Data Platform Engineer",
    base: "Stockholm",
    img: "/assets/thomas-novak.webp",
    focus: ["Streaming", "Warehousing", "Data contracts"],
    bio: "Thomas builds the data platform: streaming pipelines, warehouse models and the data contracts that stop dashboards from quietly lying.",
  },
];
const CAREERS = [
  {
    id: "senior-platform-engineer",
    title: "Senior Platform Engineer",
    location: "Austin or remote (US)",
    type: "Full time",
    blurb:
      "Own service boundaries and latency budgets on platforms that carry real traffic from day one.",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    location: "Stockholm or remote (EU)",
    type: "Full time",
    blurb:
      "Work beside Emma on design systems and interfaces for healthcare, fintech and AI products.",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    location: "San Francisco or remote",
    type: "Full time",
    blurb:
      "Take retrieval and agentic workflows from prototype to production, with evaluation built in.",
  },
  {
    id: "engineering-intern",
    title: "Engineering Internship",
    location: "Any BlueOak studio",
    type: "6 months",
    blurb:
      "Pair with senior engineers on a live engagement. We hire interns we would hire again.",
  },
];
const MOMENTS = [
  {
    id: "whiteboard",
    img: "/assets/moment-whiteboard.webp",
    kicker: "Architecture review",
    caption: "Every system gets drawn before it gets written.",
    alt: "BlueOak engineers discussing a system architecture diagram on a glass whiteboard",
  },
  {
    id: "standup",
    img: "/assets/moment-standup.webp",
    kicker: "Daily standup",
    caption: "Fifteen minutes. Four time zones. One plan.",
    alt: "The BlueOak team at a daily standup in front of a kanban board",
  },
  {
    id: "table",
    img: "/assets/moment-table.webp",
    kicker: "Product working session",
    caption: "Ideas are pressure-tested with the people who will build them.",
    alt: "BlueOak team collaborating around a conference table with laptops and sketches",
  },
];
const GROWTH = [
  {
    year: "2019",
    people: 2,
    note: "Two engineers, one rented room in Austin, and a first platform client.",
  },
  {
    year: "2021",
    people: 5,
    note: "Mobile and AI disciplines join; the studio ships its first enterprise system.",
  },
  {
    year: "2023",
    people: 8,
    note: "Zurich and Stockholm studios open; European delivery begins across time zones.",
  },
  {
    year: "2026",
    people: 11,
    note: "Eleven specialists across four studios — design, cloud, product, data and AI research.",
  },
];
const PROCESS = [
  {
    n: "01",
    t: "Discover",
    d: "We map the domain, the constraints and the real users before a line of code.",
  },
  {
    n: "02",
    t: "Architect",
    d: "System design, latency budgets and failure modes — written down and reviewed together.",
  },
  {
    n: "03",
    t: "Build",
    d: "Two-week increments, demoable from week two, measured against the plan.",
  },
  {
    n: "04",
    t: "Scale",
    d: "Observability, load tests and cost tuning as the traffic graph gets serious.",
  },
];
export { CAREERS };
export { CASE_STUDIES };
export { COMPANY };
export { GROWTH };
export { HERO_STATS };
export { MARQUEE_ITEMS };
export { MOMENTS };
export { PROCESS };
export { SERVICES };
export { TEAM };
export { TESTIMONIALS };
