export const profile = {
  name: "Bhavya Shukla",
  role: "Full Stack Developer & AI-Native Builder",
  location: "Greater Noida, India",
  email: "bhavyashukla759@gmail.com",
  phone: "+91 8797725155",
  githubUser: "bhavya21A",
  github: "https://github.com/bhavya21A",
  linkedin: "https://www.linkedin.com/in/thebhavyashukla/",
  resume: "/assets/resume/Bhavya-Shukla-Resume-April-2026.pdf",
  creovis: "https://www.creovis.co/",
};

export const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Credentials", "credentials"],
  ["Philosophy", "philosophy"],
  ["Contact", "contact"],
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Responsive UI", "Accessibility"],
  },
  {
    title: "Backend",
    skills: ["CRUD Operations", "REST APIs", "MVC Concepts", "Backend Workflows", "Custom Backend", "Admin Modules"],
  },
  {
    title: "Databases",
    skills: ["SQL", "SQL Server", "MySQL", "Database Integration", "Data Modeling", "Query Design"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Git", "GitHub", "AWS", "Azure", "Docker", "Vercel"],
  },
  {
    title: "AI Tools",
    skills: ["AI-assisted development", "Prompting", "Chatbot UX", "Automation", "Rapid Prototyping"],
  },
];

export const projects = [
  {
    title: "Creovis.co",
    type: "Production Business Platform",
    category: "full-stack",
    summary:
      "Developed and deployed a live business website with React.js, custom backend workflows, database integration, admin-side CRUD modules, hosting, updates, and performance ownership.",
    stack: ["HTML", "CSS", "JavaScript", "React.js", "Custom Backend", "Database"],
    architecture: "React.js UI -> custom backend -> database integration -> admin CRUD modules -> live hosting",
    impact: "Built the technical foundation for a real business website and ongoing operational updates.",
    period: "Mar 2025 - Present",
    live: "https://www.creovis.co/",
    github: "https://github.com/bhavya21A",
    accent: "cyan",
  },
  {
    title: "Campus Connect",
    type: "Student Collaboration App",
    category: "product",
    summary:
      "Built a React.js student collaboration platform for networking, profiles, study groups, messaging, responsive UI, and location-based collaboration features.",
    stack: ["React.js", "Profiles", "Messaging", "Study Groups", "Responsive UI"],
    architecture: "React.js views -> profile modules -> study groups -> messaging surface -> location-based collaboration",
    impact: "Designed around real campus workflows for finding peers, joining groups, and collaborating faster.",
    period: "Oct 2024 - Dec 2024",
    live: "#contact",
    github: "https://github.com/bhavya21A",
    accent: "green",
  },
  {
    title: "Blockchain E-Voting System",
    type: "Secure Workflow Prototype",
    category: "security",
    summary:
      "Developed a secure digital voting platform using Ethereum Blockchain concepts with focus on transparency, vote integrity, and tamper-resistant processes.",
    stack: ["Ethereum Concepts", "Blockchain", "Security", "Workflow Design"],
    architecture: "Voter flow -> secure ballot process -> blockchain-backed record concept -> transparent result trail",
    impact: "Explores trust, auditability, and correctness in secure digital voting workflows.",
    period: "Feb 2024 - Apr 2024",
    live: "#contact",
    github: "https://github.com/bhavya21A",
    accent: "violet",
  },
  {
    title: "IoT Power Failure Monitoring System",
    type: "IoT Alert Dashboard",
    category: "iot",
    summary:
      "Created an IoT-based power monitoring system with website notifications, real-time alerts, and remote tracking for faster response.",
    stack: ["IoT", "Realtime Alerts", "Website Notifications", "Remote Tracking", "Web UI"],
    architecture: "Power event signal -> IoT monitoring layer -> website notification -> remote status tracking",
    impact: "Connects hardware events to fast software visibility for operational response.",
    period: "Aug 2023 - Nov 2023",
    live: "#contact",
    github: "https://github.com/bhavya21A",
    accent: "amber",
  },
];

export const experiences = [
  {
    role: "Co-Founder & Head of Technology",
    org: "Creovis",
    period: "Mar 2025 - Present",
    points: [
      "Led technology strategy and developed the official company website using React.js, custom backend, and database systems.",
      "Managed deployment, updates, admin modules, and technical operations.",
      "Translated company needs into practical product features and maintainable technical workflows.",
    ],
  },
  {
    role: "Team Leader",
    org: "Tech Dev Club",
    period: "Jun 2025 - Present",
    points: [
      "Coordinate events, organize workshops, and manage communication for club initiatives.",
      "Foster student growth through mentorship, hackathons, and networking opportunities.",
    ],
  },
  {
    role: "Student Ambassador",
    org: "Viral Fission (Remote)",
    period: "May 2023 - Sep 2024",
    points: [
      "Promoted brand campaigns and increased event participation by 25%.",
      "Improved brand visibility through student outreach and campus communication.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Technology (B.Tech) in Computer Science with Specialization in IoT",
  institution: "Greater Noida Institute of Technology, Greater Noida",
  graduation: "Expected Graduation: July 2026",
};

export const certifications = [
  "Google Cloud Arcade Facilitator Program (July 2024)",
  "Microsoft Azure Fundamentals (October 2024)",
  "Microsoft Security, Compliance, and Identity Fundamentals (September 2024)",
  "Infosys Springboard Virtual Internship 6.0 (June 2025)",
];

export const achievements = [
  "Participated in Smart India Hackathon 2023 and qualified the first round with EquityPlus: Targeted Dropout Analysis for Inclusive Education.",
];

export const philosophy = [
  "Build products that are useful before they are flashy.",
  "Use AI as an engineering multiplier for research, iteration, testing, and speed.",
  "Design systems that can scale from prototype to production without becoming brittle.",
  "Keep learning in public through real deployments, feedback loops, and shipped work.",
];
