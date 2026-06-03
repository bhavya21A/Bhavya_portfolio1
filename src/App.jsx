import {
  ArrowRight,
  Bot,
  Braces,
  CheckCircle2,
  ChevronUp,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Rocket,
  Award,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  achievements,
  certifications,
  education,
  experiences,
  navItems,
  philosophy,
  profile,
  projects,
  skillGroups,
} from "./data/portfolio.js";

const projectFilters = [
  ["all", "All"],
  ["full-stack", "Full Stack"],
  ["product", "Product"],
  ["security", "Security"],
  ["iot", "IoT"],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label="Go to top">
        <span className="brand-mark">BS</span>
        <span>{profile.name}</span>
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <div className="status-pill">
            <Sparkles size={16} />
            Open to full stack, AI, and product engineering roles
          </div>
          <h1>Full Stack Developer & AI-Native Builder</h1>
          <p>
            I am Bhavya Shukla, a Computer Science student specializing in IoT, with hands-on experience in full-stack web
            development, databases, CRUD systems, backend workflows, and live product deployment.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="btn btn-primary" href="#projects">
              View Projects <ArrowRight size={18} />
            </a>
            <a className="btn btn-secondary" href={profile.resume} download>
              Download Resume <Download size={18} />
            </a>
          </div>
          <div className="social-row" aria-label="Social links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} /> Email
            </a>
          </div>
        </div>
        <div className="hero-panel reveal" aria-label="Engineering profile snapshot">
          <div className="terminal-window">
            <div className="terminal-bar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <pre>{`const engineer = {
  name: "Bhavya Shukla",
  education: "B.Tech CSE - IoT, 2026",
  stack: ["JavaScript", "React.js", "SQL"],
  ships: ["CRUD systems", "REST APIs", "live websites"],
  mindset: "build, deploy, improve"
};`}</pre>
          </div>
          <div className="metric-strip">
            <div>
              <strong>4+</strong>
              <span>Featured builds</span>
            </div>
            <div>
            <strong>2026</strong>
            <span>Expected graduation</span>
            </div>
            <div>
            <strong>25%</strong>
            <span>Event participation growth</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <SectionHeading eyebrow="About" title="A builder who thinks in products, systems, and users.">
        I like turning broad ideas into clean interfaces, practical APIs, database-backed workflows, and deployed products.
      </SectionHeading>
      <div className="about-grid">
        <article className="panel">
          <Rocket />
          <h3>Professional Summary</h3>
          <p>
            Computer Science student with hands-on experience in full-stack web development, databases, and live product
            deployment. Skilled in JavaScript, React.js, SQL, CRUD systems, and backend workflows.
          </p>
        </article>
        <article className="panel">
          <Braces />
          <h3>Engineering Mindset</h3>
          <p>
            I care about readable code, resilient architecture, accessible UI, and the discipline to ship small improvements
            quickly without losing sight of the bigger system.
          </p>
        </article>
        <article className="panel">
          <Bot />
          <h3>AI-Native Development</h3>
          <p>
            I use AI tools as a thinking and execution layer for research, iteration, debugging, content systems, and faster
            product prototyping while keeping engineering judgment in the loop.
          </p>
        </article>
      </div>
      <div className="education-card">
        <div>
          <p className="eyebrow">Education</p>
          <h3>{education.degree}</h3>
          <p>{education.institution}</p>
        </div>
        <strong>{education.graduation}</strong>
      </div>
    </section>
  );
}

function Skills() {
  const icons = [Code2, Server, Database, Cloud, Bot];

  return (
    <section className="section" id="skills">
      <SectionHeading eyebrow="Skills" title="A practical stack for product teams and startups.">
        Organized around the way real products are built: interface, API, data, deployment, and AI-assisted delivery.
      </SectionHeading>
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index] || CheckCircle2;
          return (
            <article className="skill-card" key={group.title}>
              <div className="skill-card-header">
                <Icon size={22} />
                <h3>{group.title}</h3>
              </div>
              <div className="tag-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className={`project-visual project-visual--${project.accent}`} aria-label={`${project.title} screenshot preview`}>
      <div className="visual-sidebar">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="visual-main">
        <div className="visual-topline"></div>
        <div className="visual-chart">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="visual-rows">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => (filter === "all" ? projects : projects.filter((project) => project.category === filter)), [filter]);

  return (
    <section className="section" id="projects">
      <SectionHeading eyebrow="Featured Projects" title="Work that shows product range and technical ownership.">
        Each project card highlights the user problem, stack, deployment thinking, and architecture shape.
      </SectionHeading>
      <div className="filter-row" role="tablist" aria-label="Project filters">
        {projectFilters.map(([id, label]) => (
          <button key={id} className={filter === id ? "filter-button active" : "filter-button"} type="button" onClick={() => setFilter(id)}>
            {label}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filtered.map((project) => (
          <article className="project-card" key={project.title}>
            <ProjectVisual project={project} />
            <div className="project-content">
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <span className="project-period">{project.period}</span>
              <p>{project.summary}</p>
              <div className="tag-list compact">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="architecture">
                <ShieldCheck size={18} />
                <span>{project.architecture}</span>
              </div>
              <p className="impact">{project.impact}</p>
              <div className="project-links">
                <a href={project.live} target={project.live.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  Live Demo <ExternalLink size={16} />
                </a>
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub <Github size={16} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHeading eyebrow="Experience" title="Technical ownership with leadership context." />
      <div className="timeline">
        {experiences.map((item) => (
          <article className="timeline-item" key={`${item.role}-${item.org}`}>
            <div className="timeline-dot"></div>
            <div>
              <span>{item.period}</span>
              <h3>{item.role}</h3>
              <p>{item.org}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section className="section" id="credentials">
      <SectionHeading eyebrow="Credentials" title="Certifications and achievements from the resume." />
      <div className="credentials-grid">
        <article className="credential-panel">
          <div className="credential-heading">
            <Award size={22} />
            <h3>Certifications</h3>
          </div>
          <ul>
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="credential-panel">
          <div className="credential-heading">
            <CheckCircle2 size={22} />
            <h3>Achievement</h3>
          </div>
          <ul>
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="language-row">
            <span>English: Fluent</span>
            <span>Hindi: Fluent</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section philosophy" id="philosophy">
      <SectionHeading eyebrow="Engineering Philosophy" title="How I approach the work." />
      <div className="philosophy-grid">
        {philosophy.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function GithubActivity() {
  const [state, setState] = useState({ loading: true, repos: [] });

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=4`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("GitHub unavailable"))))
      .then((repos) => {
        if (!cancelled) setState({ loading: false, repos });
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, repos: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="github-panel" aria-label="GitHub activity">
      <div>
        <p className="eyebrow">GitHub Activity</p>
        <h3>Recent public repositories</h3>
      </div>
      {state.loading && <p className="muted">Loading GitHub activity...</p>}
      {!state.loading && state.repos.length === 0 && (
        <p className="muted">
          GitHub activity is available at <a href={profile.github}>{profile.githubUser}</a>.
        </p>
      )}
      <div className="repo-list">
        {state.repos.map((repo) => (
          <a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
            <strong>{repo.name}</strong>
            <span>{repo.language || "Repository"} / updated {new Date(repo.updated_at).toLocaleDateString()}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  setStatus("Sending...");

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/901bb776799c0eac60543d69db7e1068",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send");
    }

    event.currentTarget.reset();
    setStatus("Thanks! Your message was sent successfully.");
  } catch (error) {
    setStatus("Unable to send message. Please email me directly.");
  }
}

  return (
    <section className="section contact-section" id="contact">
      <SectionHeading eyebrow="Contact" title="Let's build something useful." />
      <div className="contact-grid">
        <div className="contact-card">
          <h3>Best fit opportunities</h3>
          <p>Full stack internships, AI-native product roles, product engineering teams, and early-stage startup builds.</p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} /> {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required placeholder="Tell me about the role, project, or collaboration." />
          </label>
          <button className="btn btn-primary" type="submit">
            Send Message <MessageSquare size={18} />
          </button>
          <p className="form-status" role="status">{status}</p>
        </form>
      </div>
    </section>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a className={visible ? "back-to-top visible" : "back-to-top"} href="#home" aria-label="Back to top">
      <ChevronUp size={20} />
    </a>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading && (
        <div className="loader" aria-label="Loading portfolio">
          <span></span>
          Loading portfolio
        </div>
      )}
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Credentials />
        <Philosophy />
        <GithubActivity />
        <Contact />
      </main>
      <footer className="footer">
        <span>(c) {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React, clean CSS, and startup energy.</span>
      </footer>
      <BackToTop />
    </>
  );
}

export default App;
