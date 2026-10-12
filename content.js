/* ============================================================
   ALL copy that changes lives here. Edit text freely; the
   animation code in script.js never needs to be touched.
   Static sections (hero, about, resume, contact) are in index.html.
   ============================================================ */
window.SITE = {
  email: "joshua5915g@gmail.com",

  /* Add a screenshot per project: put it in assets/ and set img: "assets/name.jpg".
     Without img, a designed placeholder panel is shown. */
  projects: [
    {
      id: "wattwise", no: "01", name: "WattWise", sub: "Solar Intelligence", year: "2026",
      kind: "Web app · Energy analytics", url: "https://wattwise-energy.vercel.app/", host: "wattwise-energy.vercel.app",
      tagline: "Solar analytics dashboard built for Indian installations, to optimise consumption, battery storage and bills.",
      summary: "A production-ready dashboard that helps households and installers understand how much solar energy they generate and use, and when to store or draw from a battery.",
      metrics: [
        { label: "Backend size reduction", val: "973 MB → <10 KB" },
        { label: "Monitored cities", val: "70+" },
        { label: "API response time", val: "<50ms" }
      ],
      highlights: [
        "Refactored heavy Python ML endpoints into native TypeScript / Next.js API routes, cutting the backend from 973 MB to under 10 KB.",
        "Fixed Plotly.js server-side rendering hydration failures with a custom Next.js transpilation setup.",
        "Polls live weather for 70+ cities and turns it into AI battery-schedule advice."
      ],
      stack: ["Next.js", "TypeScript", "Serverless API", "Plotly.js"],
      img: null, a: "#ff5a1f", b: "#a78bfa", angle: 135
    },
    {
      id: "nutrigrade", no: "02", name: "NutriGrade AI", sub: "Food label analysis", year: "2026",
      kind: "Web app · AI", url: "https://nutrition-food-grader.vercel.app/", host: "nutrition-food-grader.vercel.app",
      tagline: "A nutritional truth engine that cuts through marketing labels using deterministic food science and Gemini Vision.",
      summary: "Point it at a food package and it reads the ingredients, grades the product and flags what the front of the box does not tell you.",
      metrics: [
        { label: "Hidden additives flagged", val: "60+" },
        { label: "Privacy standard", val: "100% Client-Side" },
        { label: "OCR Engine", val: "Gemini Vision" }
      ],
      highlights: [
        "Gemini Vision OCR reads ingredients straight from packaging photos when barcodes fail.",
        "Cross-checks claims against NOVA standards and flags 60+ hidden additives.",
        "Personalised health overlays are computed on the client, so nothing about the user leaves the device."
      ],
      stack: ["Next.js 15", "React 19", "TypeScript", "Gemini Vision", "Tailwind CSS"],
      img: null, a: "#ff8a3d", b: "#6d5bd0", angle: 200
    },
    {
      id: "neurospec", no: "03", name: "NeuroSpec IIoT", sub: "Telemetry & digital twin", year: "2026",
      kind: "Platform · Industrial IoT", url: "https://neurospeciiot.vercel.app/", host: "neurospeciiot.vercel.app",
      tagline: "An industrial telemetry and digital-twin platform that watches vibration and acoustic data to predict machine faults.",
      summary: "Monitors high-frequency acoustic emissions and kinematic spectrum harmonics, and uses real-time AI prognostics to catch bearing faults before they become failures.",
      metrics: [
        { label: "Acoustic sampling rate", val: "10 kHz" },
        { label: "Simulated edge nodes", val: "455+" },
        { label: "Defect detection", val: "Real-time FFT" }
      ],
      highlights: [
        "FFT telemetry on 10 kHz acoustic waveforms isolates bearing defect harmonics (BPFO / BPFI / BSF).",
        "A 3D WebGL digital twin simulates bearing and drive behaviour with automated anomaly remediation.",
        "A fleet view orchestrates 455+ simulated edge nodes with a generative stress-testing lab."
      ],
      stack: ["React 19", "Three.js / WebGL", "Vite", "FFT signal processing", "Tailwind CSS"],
      img: null, a: "#ff5a1f", b: "#7c5cff", angle: 160
    },
    {
      id: "pdfzero", no: "04", name: "PDFZero", sub: "Serverless PDF suite", year: "2026",
      kind: "Web app · Privacy-first tools", url: "https://pdfzero-eight.vercel.app/", host: "pdfzero-eight.vercel.app",
      tagline: "A 100% client-side PDF toolkit with 160+ utilities and zero data leaving the browser.",
      summary: "Document processing that runs entirely in memory through WebAssembly, so files are never uploaded anywhere.",
      metrics: [
        { label: "Built-in utilities", val: "160+" },
        { label: "Data sent to server", val: "0 Bytes" },
        { label: "Execution engine", val: "WebAssembly" }
      ],
      highlights: [
        "WebAssembly runs binary document processing locally with no outbound network transfer.",
        "Local AI features for natural-language automation, PII redaction and OCR, with no cloud dependency.",
        "One dashboard for conversion between DOCX, XLSX, PPTX, HEIC and AVIF, plus signatures and developer utilities."
      ],
      stack: ["WebAssembly", "Next.js", "TypeScript", "PDF.js / pdf-lib", "Tailwind CSS"],
      img: null, a: "#ff7a2f", b: "#a78bfa", angle: 120
    },
    {
      id: "finance", no: "05", name: "Finance Tracker", sub: "Personal budgeting", year: "2026",
      kind: "Full-stack web app", url: "https://finance-monitor.lovable.app/", host: "finance-monitor.lovable.app",
      tagline: "Track income, daily expenses and savings goals with interactive dashboards.",
      summary: "A full-stack budgeting app with a React front end and a Node and Express API for transaction records.",
      metrics: [
        { label: "Architecture", val: "Full-stack REST" },
        { label: "Hosting", val: "Lovable Cloud" }
      ],
      highlights: [
        "Responsive React interface with charts for spending and savings.",
        "Node.js and Express REST API for transaction data.",
        "Deployed live on the Lovable cloud platform."
      ],
      stack: ["React", "Node.js", "Express", "Charts"],
      img: null, a: "#ff5a1f", b: "#8b7cf6", angle: 215
    }
  ],

  /* Certificates shown as a gallery in the Resume section. Images live in assets/. */
  certificates: [
    { id: "ibm-ai", issuer: "IBM SkillsBuild", title: "Artificial Intelligence Fundamentals", date: "Sep 22, 2025",
      img: "assets/cert-ibm-ai-fundamentals.jpg", verify: "https://www.credly.com/badges/10536706-a71d-4019-b458-26b02570461a", kind: "Credential" },
    { id: "ibm-se", issuer: "IBM · Coursera", title: "Introduction to Software Engineering", date: "Oct 9, 2025",
      img: "assets/cert-ibm-software-engineering.jpg", verify: "https://coursera.org/verify/56BLJ53GJQHZ", kind: "Course certificate" },
    { id: "outskill", issuer: "Outskill", title: "Generative AI Mastermind", date: "2025",
      img: "assets/cert-outskill-genai.jpg", verify: null, kind: "Certificate of completion" },
    { id: "guvi", issuer: "GUVI × HCL", title: "Generative AI & Deep Learning webinar", date: "Sep 20, 2025",
      img: "assets/cert-guvi-hcl.jpg", verify: null, kind: "Certificate of participation" }
  ],

  experiments: [
    {
      name: "The Walls Will Fall", year: "2025", url: "https://youtu.be/NmYFRIhBb7E",
      text: "An experimental cinematic short made with a fully generative pipeline: Veo 3 for visuals, Suno AI for the score, Microsoft 365 Editor for the cut."
    },
    {
      name: "The True Red Sea Miracle", year: "2026", url: "https://youtu.be/_piSgBh-5T8",
      text: "A study in keeping generated environments visually consistent across long scenes, through multi-stage prompt design."
    }
  ],

  /* Drafts based on your projects. Edit the wording so it matches your own experience. */
  posts: [
    {
      id: "wattwise-973mb", tag: "Engineering", date: "Oct 2026", read: "3 min",
      title: "How WattWise's backend went from 973 MB to under 10 KB",
      excerpt: "Heavy Python ML endpoints were the obstacle to going serverless. Rewriting them in TypeScript fixed it.",
      body: [
        "WattWise began with Python machine-learning endpoints. They worked, but they were heavy, and heavy code is awkward to deploy on serverless platforms where every function has to start quickly.",
        "The fix was to look at what the endpoints actually computed and rewrite that logic as native TypeScript Next.js API routes. The backend went from 973 MB to under 10 KB.",
        "A second problem followed: Plotly.js charts failed to hydrate during server-side rendering. Custom transpilation in the Next.js config sorted it out.",
        "The lesson I took away: before reaching for a bigger machine, check whether the work needs the tool you started with."
      ]
    },
    {
      id: "under-the-abstractions", tag: "Learning", date: "Oct 2026", read: "2 min",
      title: "Why I want to learn what is under the abstractions",
      excerpt: "Using APIs and cloud tools got me started. Understanding them is what I am after now.",
      body: [
        "I started with cloud tools and generative AI, and I earned certifications from IBM and Oracle along the way.",
        "Using APIs taught me a lot, but it also showed me a gap. I did not want to only use high-level tools. I wanted to understand the data structures, architecture and logic that make them work.",
        "That is why I am heading into a computer science degree, and why my projects lean toward things where the engineering is the interesting part: signal processing, WebAssembly, serverless design.",
        "I build to learn, then keep the parts that taught me something."
      ]
    },
    {
      id: "making-films-with-ai", tag: "Experiments", date: "Oct 2026", read: "3 min",
      title: "What making two films with generative AI taught me",
      excerpt: "Prompting is closer to directing than to typing. Continuity is the hard part.",
      body: [
        "For The Walls Will Fall I used Veo 3 for visuals, Suno AI for the score and Microsoft 365 Editor to assemble it. For The True Red Sea Miracle I tried to keep a generated environment consistent across longer scenes.",
        "The main thing I learned is that continuity is the real challenge. A single striking shot is easy. Making ten shots feel like the same world takes iterative, multi-stage prompts.",
        "These experiments are what made me curious about the software underneath the models, which led to the projects above."
      ]
    }
  ]
};