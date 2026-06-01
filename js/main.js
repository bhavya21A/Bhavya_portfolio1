// CHANGE HERE: Edit these words for the hero typing animation.
const typingRoles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Builder",
  "Chatbot Developer",
  "IoT Innovator",
];

const contactDetails = {
  email: "bhavyashukla759@gmail.com",
  phone: "+91 8797725155",
  whatsapp: "https://wa.me/918797725155",
  github: "https://github.com/bhavya21A",
  linkedin: "https://www.linkedin.com/in/thebhavyashukla/",
  creovis: "https://www.creovis.co/",
};

// CHANGE HERE: Update skill names, percentages, and icons for the Skills section.
const skillData = {
  frontend: [
    { name: "HTML5", level: 94, icon: "fa-brands fa-html5" },
    { name: "CSS3", level: 91, icon: "fa-brands fa-css3-alt" },
    { name: "JavaScript", level: 86, icon: "fa-brands fa-js" },
    { name: "React.js", level: 78, icon: "fa-brands fa-react" },
    { name: "Bootstrap", level: 80, icon: "fa-brands fa-bootstrap" },
    { name: "Tailwind CSS", level: 82, icon: "fa-solid fa-wind" },
  ],
  backend: [
    { name: "Node.js", level: 74, icon: "fa-brands fa-node-js" },
    { name: "Express.js", level: 72, icon: "fa-solid fa-server" },
    { name: "REST APIs", level: 76, icon: "fa-solid fa-plug" },
    { name: "CRUD Operations", level: 80, icon: "fa-solid fa-rotate" },
    { name: "MVC Concepts", level: 68, icon: "fa-solid fa-diagram-project" },
    { name: "SQL", level: 74, icon: "fa-solid fa-table" },
    { name: "MySQL", level: 72, icon: "fa-solid fa-database" },
    { name: "SQL Server", level: 70, icon: "fa-solid fa-server" },
    { name: "MongoDB", level: 68, icon: "fa-solid fa-leaf" },
    { name: "Supabase", level: 66, icon: "fa-solid fa-database" },
  ],
  tools: [
    { name: "Git", level: 82, icon: "fa-brands fa-git-alt" },
    { name: "GitHub", level: 80, icon: "fa-brands fa-github" },
    { name: "VS Code", level: 88, icon: "fa-solid fa-code" },
    { name: "Figma", level: 74, icon: "fa-brands fa-figma" },
    { name: "Docker", level: 62, icon: "fa-brands fa-docker" },
  ],
  other: [
    { name: "C++", level: 68, icon: "fa-solid fa-code" },
    { name: "AWS", level: 60, icon: "fa-brands fa-aws" },
    { name: "Microsoft Azure", level: 62, icon: "fa-brands fa-microsoft" },
    { name: "UI/UX Design", level: 78, icon: "fa-solid fa-pen-nib" },
    { name: "IoT", level: 74, icon: "fa-solid fa-microchip" },
    { name: "ESP32", level: 72, icon: "fa-solid fa-wifi" },
    { name: "Problem Solving", level: 86, icon: "fa-solid fa-brain" },
    { name: "Team Leadership", level: 84, icon: "fa-solid fa-people-group" },
  ],
};

// CHANGE HERE: Edit chatbot answers here. This local bot works without any API key.
const chatbotIntents = [
  {
    keywords: ["chatbot", "bot", "ai", "assistant", "automate"],
    answer:
      "Yes. Bhavya can build chatbot experiences like this one: website chat widgets, FAQ bots, lead collection flows, and backend-ready chatbot interfaces. She can connect them with JavaScript, Node.js, APIs, and databases so the bot becomes useful, not just decorative.",
  },
  {
    keywords: ["who", "intro", "introduction", "about", "bhavya", "girl"],
    answer:
      "Bhavya Shukla is a Software Development student from Greater Noida, India, focused on full-stack development. She likes building polished websites, practical backend workflows, startup-style products, chatbots, and IoT projects that solve real problems.",
  },
  {
    keywords: ["college", "education", "course", "gniot", "cse", "iot"],
    answer:
      "Bhavya studies B.Tech CSE-IoT at GNIOT, Greater Noida Institute of Technology. Her background combines software development with IoT thinking, which helps her build both web products and hardware-connected ideas.",
  },
  {
    keywords: ["skill", "skills", "tech", "technology", "stack", "react", "node", "mongodb", "supabase", "javascript", "sql", "cloud"],
    answer:
      "Bhavya's core stack includes HTML5, CSS3, JavaScript, React.js, Bootstrap, Node.js, Express.js, REST APIs, CRUD systems, SQL, MySQL, SQL Server, MongoDB-ready flows, Supabase-ready flows, Git, GitHub, VS Code, and Figma. Her resume also includes AWS, Microsoft Azure, Docker, C++, IoT, and ESP32 exposure.",
  },
  {
    keywords: ["project", "projects", "work", "portfolio", "built", "campus", "voting", "finance", "power"],
    answer:
      "Bhavya's projects include Creovis.co, Campus Connect, Blockchain E-Voting System, IoT Power Failure Monitoring System, and Personal Finance Tracker. Her strongest real-world project is Creovis.co, where she worked on a live business website with frontend, backend, database, admin, hosting, and performance responsibilities.",
  },
  {
    keywords: ["creovis", "company", "founder", "co-founder", "startup"],
    answer:
      `At Creovis, Bhavya works as Co-Founder and Head of Technology. She built and manages the company website, technical systems, backend/admin workflows, branding support, deployment, updates, and client-facing digital work. Link: ${contactDetails.creovis}`,
  },
  {
    keywords: ["experience", "role", "roles", "leadership", "ambassador", "club"],
    answer:
      "Bhavya has experience as Co-Founder and Head of Technology at Creovis, Team Leader at Tech Dev Club, and Student Ambassador at Viral Fission. These roles show technical ownership, workshop/event coordination, student outreach, campaign work, teamwork, and leadership.",
  },
  {
    keywords: ["service", "services", "hire", "freelance", "client", "mvp", "website", "landing", "frontend", "full-stack", "build", "make", "do"],
    answer:
      "Bhavya is open to internships and freelance clients. She can help with full-stack website development, frontend UI, responsive websites, landing pages, backend setup, APIs, database-ready workflows, admin panels, startup MVPs, and chatbot widgets.",
  },
  {
    keywords: ["contact", "email", "message", "reach", "connect", "phone", "whatsapp", "mobile"],
    answer:
      `You can contact Bhavya by email at ${contactDetails.email}, WhatsApp her at ${contactDetails.phone}, or use the contact form on this portfolio. Her GitHub is ${contactDetails.github} and LinkedIn is ${contactDetails.linkedin}.`,
  },
  {
    keywords: ["location", "where", "city", "india"],
    answer:
      "Bhavya is based in Greater Noida, India, and she is open to internships, placements, freelance work, startup MVPs, and collaboration opportunities.",
  },
  {
    keywords: ["resume", "cv", "download"],
    answer:
      "Use the Download Resume button in the hero section to download Bhavya's PDF resume. It includes her full-stack development experience, Creovis work, technical skills, certifications, and project history.",
  },
  {
    keywords: ["certificate", "certification", "certifications", "azure", "google", "infosys", "cloud"],
    answer:
      "Bhavya's resume includes Google Cloud Arcade Facilitator Program, Microsoft Azure Fundamentals, Microsoft Security, Compliance, and Identity Fundamentals, and Infosys Springboard Virtual Internship 6.0.",
  },
  {
    keywords: ["achievement", "achievements", "hackathon", "sih", "smart india"],
    answer:
      "A nice extra from Bhavya's resume: she participated in Smart India Hackathon 2023 and qualified the first round with EquityPlus, a targeted dropout analysis idea for inclusive education.",
  },
  {
    keywords: ["language", "languages", "hobby", "hobbies", "personality", "interesting"],
    answer:
      "Bhavya is fluent in English and Hindi. Beyond project work, she enjoys web development, coding, programming, hackathons, and attending tech events. That is one reason her portfolio leans practical and startup-style rather than only academic.",
  },
  {
    keywords: ["why", "choose", "hire", "internship", "intern", "client", "freelancer"],
    answer:
      "Bhavya is a strong fit when someone needs a developer who can think beyond a single page. She understands frontend polish, backend workflows, databases, deployment, client needs, and startup execution. She is especially aligned with internships, freelance websites, full-stack builds, and early-stage product work.",
  },
];

const chatbotFallback =
  "I can answer questions about Bhavya's intro, college, skills, projects, Creovis work, certifications, achievements, services, chatbot work, resume, and contact details. Try asking: Why should I hire her?";

const dom = {
  body: document.body,
  preloader: document.getElementById("preloader"),
  header: document.getElementById("siteHeader"),
  navToggle: document.getElementById("navToggle"),
  navLinks: document.getElementById("navLinks"),
  navItems: document.querySelectorAll(".nav-link"),
  typingText: document.getElementById("typingText"),
  cursorGlow: document.getElementById("cursorGlow"),
  particleCanvas: document.getElementById("particleCanvas"),
  skillList: document.getElementById("skillList"),
  skillTabs: document.querySelectorAll("[data-skill-tab]"),
  filterButtons: document.querySelectorAll("[data-filter]"),
  projectCards: document.querySelectorAll(".project-card"),
  counters: document.querySelectorAll(".counter"),
  contactForm: document.getElementById("contactForm"),
  submitButton: document.getElementById("submitButton"),
  formStatus: document.getElementById("formStatus"),
  toast: document.getElementById("toast"),
  resumeDownload: document.getElementById("resumeDownload"),
  chatbotWidget: document.getElementById("chatbotWidget"),
  chatbotToggle: document.getElementById("chatbotToggle"),
  chatbotPanel: document.getElementById("chatbotPanel"),
  chatbotClose: document.getElementById("chatbotClose"),
  chatbotMessages: document.getElementById("chatbotMessages"),
  chatbotForm: document.getElementById("chatbotForm"),
  chatbotInput: document.getElementById("chatbotInput"),
  chatPromptButtons: document.querySelectorAll("[data-chat-prompt]"),
  year: document.getElementById("year"),
};

let skillBarsActivated = false;
let counterActivated = false;
let toastTimer;

function init() {
  dom.year.textContent = new Date().getFullYear();
  initLoader();
  initNavigation();
  initTyping();
  initReveal();
  initSkills();
  initProjectFilters();
  initContactForm();
  initChatbot();
  initResumeDownload();
  initCursorGlow();
  initParticles();
  initParallax();
}

function initLoader() {
  window.addEventListener("load", () => {
    setTimeout(() => dom.body.classList.add("loaded"), 380);
  });
}

function initNavigation() {
  const closeMenu = () => {
    dom.navToggle.classList.remove("active");
    dom.navLinks.classList.remove("open");
    dom.body.classList.remove("nav-open");
    dom.navToggle.setAttribute("aria-expanded", "false");
  };

  dom.navToggle.addEventListener("click", () => {
    const isOpen = dom.navLinks.classList.toggle("open");
    dom.navToggle.classList.toggle("active", isOpen);
    dom.body.classList.toggle("nav-open", isOpen);
    dom.navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  dom.navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", () => {
    dom.header.classList.toggle("scrolled", window.scrollY > 30);
  });

  const sections = document.querySelectorAll("main section[id]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        dom.navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 }
  );

  sections.forEach((section) => navObserver.observe(section));
}

function initTyping() {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const currentRole = typingRoles[roleIndex];

    if (deleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    dom.typingText.textContent = currentRole.slice(0, charIndex);

    let delay = deleting ? 42 : 72;

    if (!deleting && charIndex === currentRole.length) {
      delay = 1400;
      deleting = true;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % typingRoles.length;
      delay = 260;
    }

    window.setTimeout(type, delay);
  };

  type();
}

function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        if (entry.target.classList.contains("counter-grid") && !counterActivated) {
          counterActivated = true;
          animateCounters();
        }

        if (entry.target.id === "skillList" && !skillBarsActivated) {
          skillBarsActivated = true;
          animateSkillBars();
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function initSkills() {
  renderSkills("frontend");

  dom.skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.skillTab;

      dom.skillTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderSkills(category);
      window.requestAnimationFrame(animateSkillBars);
    });
  });
}

function renderSkills(category) {
  const skills = skillData[category] || skillData.frontend;

  dom.skillList.innerHTML = skills
    .map(
      (skill) => `
        <div class="skill-item">
          <div class="skill-top">
            <span class="skill-name">
              <i class="${skill.icon}" aria-hidden="true"></i>
              ${skill.name}
            </span>
            <span class="skill-percent">${skill.level}%</span>
          </div>
          <div class="skill-bar" aria-hidden="true">
            <span class="skill-progress" data-level="${skill.level}"></span>
          </div>
        </div>
      `
    )
    .join("");

  dom.skillList.classList.add("visible");
}

function animateSkillBars() {
  const bars = dom.skillList.querySelectorAll(".skill-progress");
  bars.forEach((bar) => {
    bar.style.width = "0%";
    window.setTimeout(() => {
      bar.style.width = `${bar.dataset.level}%`;
    }, 90);
  });
}

function animateCounters() {
  dom.counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    const duration = 1300;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);

      if (progress < 1) {
        window.requestAnimationFrame(update);
      } else {
        counter.textContent = `${target}+`;
      }
    };

    window.requestAnimationFrame(update);
  });
}

function initProjectFilters() {
  dom.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      dom.filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      dom.projectCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !visible);
      });
    });
  });

  document.querySelectorAll(".placeholder-link").forEach((link) => {
    link.addEventListener("click", () => {
      showToast("Project preview link is ready to connect when the live demo is deployed.");
    });
  });
}

function initContactForm() {
  dom.contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(dom.contactForm);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      source: "portfolio-static",
    };

    const errors = validateContact(payload);
    setFormErrors(errors);

    if (Object.keys(errors).length) {
      setFormStatus("Please fix the highlighted fields.", "error");
      return;
    }

    setSubmitting(true);
    setFormStatus("Sending your message...", "");

    try {
      // CHANGE HERE: Update this URL if your backend is deployed somewhere else.
      const apiUrl = window.PORTFOLIO_API_URL || "http://localhost:5000/api/contact";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || "The API could not accept the message.");
      }

      dom.contactForm.reset();
      setFormStatus("Message sent successfully. I will get back to you soon.", "success");
      showToast("Message sent and saved through the backend API.");
    } catch (error) {
      saveDemoMessage(payload);
      dom.contactForm.reset();
      setFormStatus("Message saved in demo mode. Start the backend API to persist it on the server.", "success");
      showToast("Backend not running, so the message was saved in browser demo storage.");
    } finally {
      setSubmitting(false);
    }
  });
}

function initChatbot() {
  if (!dom.chatbotWidget || !dom.chatbotToggle || !dom.chatbotForm) return;

  const setChatOpen = (isOpen) => {
    dom.chatbotWidget.classList.toggle("open", isOpen);
    dom.chatbotToggle.setAttribute("aria-expanded", String(isOpen));
    dom.chatbotToggle.setAttribute("aria-label", isOpen ? "Close chatbot" : "Open chatbot");
    dom.chatbotPanel.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
      window.setTimeout(() => dom.chatbotInput.focus(), 120);
    }
  };

  dom.chatbotToggle.addEventListener("click", () => {
    setChatOpen(!dom.chatbotWidget.classList.contains("open"));
  });

  dom.chatbotClose.addEventListener("click", () => setChatOpen(false));

  dom.chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChatMessage(dom.chatbotInput.value);
  });

  dom.chatPromptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setChatOpen(true);
      sendChatMessage(button.dataset.chatPrompt || button.textContent);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setChatOpen(false);
    }
  });
}

function sendChatMessage(message) {
  const cleanMessage = String(message || "").trim();
  if (!cleanMessage) return;

  addChatMessage(cleanMessage, "user");
  dom.chatbotInput.value = "";

  const typingMessage = addChatMessage("Typing...", "bot");
  scrollChatToBottom();

  window.setTimeout(() => {
    typingMessage.querySelector("p").textContent = getChatbotAnswer(cleanMessage);
    scrollChatToBottom();
  }, 420);
}

function addChatMessage(message, type) {
  const wrapper = document.createElement("div");
  const paragraph = document.createElement("p");

  wrapper.className = `chat-message ${type === "user" ? "user-message" : "bot-message"}`;
  paragraph.textContent = message;
  wrapper.appendChild(paragraph);
  dom.chatbotMessages.appendChild(wrapper);

  return wrapper;
}

function getChatbotAnswer(question) {
  const normalized = question.toLowerCase();

  if (["hi", "hello", "hey", "hii", "namaste"].some((word) => normalized.includes(word))) {
    return "Hi. I am Bhavya's portfolio guide. You can ask me about her skills, projects, Creovis work, certifications, internship/freelance availability, or chatbot development work.";
  }

  let bestIntent = null;
  let bestScore = 0;

  chatbotIntents.forEach((intent) => {
    const score = intent.keywords.reduce((total, keyword) => {
      return normalized.includes(keyword) ? total + 1 : total;
    }, 0);

    if (score > bestScore) {
      bestIntent = intent;
      bestScore = score;
    }
  });

  return bestIntent ? bestIntent.answer : chatbotFallback;
}

function scrollChatToBottom() {
  dom.chatbotMessages.scrollTop = dom.chatbotMessages.scrollHeight;
}

function validateContact(payload) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (payload.name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!emailPattern.test(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (payload.subject.length < 4) {
    errors.subject = "Please enter a clear subject.";
  }

  if (payload.message.length < 12) {
    errors.message = "Please write a little more detail.";
  }

  return errors;
}

function setFormErrors(errors) {
  dom.contactForm.querySelectorAll(".form-row").forEach((row) => {
    const input = row.querySelector("input, textarea");
    const errorNode = row.querySelector(".field-error");
    const message = errors[input.name] || "";

    row.classList.toggle("invalid", Boolean(message));
    errorNode.textContent = message;
  });
}

function setSubmitting(isSubmitting) {
  dom.submitButton.disabled = isSubmitting;
  dom.submitButton.innerHTML = isSubmitting
    ? '<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Sending'
    : '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send Message';
}

function setFormStatus(message, type) {
  dom.formStatus.textContent = message;
  dom.formStatus.className = `form-status ${type}`;
}

function saveDemoMessage(payload) {
  const key = "bhavya-portfolio-demo-messages";
  const previous = JSON.parse(localStorage.getItem(key) || "[]");
  previous.push({ ...payload, createdAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(previous.slice(-20)));
}

// CHANGE HERE: Replace this path when you update the resume PDF file.
function initResumeDownload() {
  dom.resumeDownload.addEventListener("click", () => {
    const link = document.createElement("a");

    link.href = "assets/resume/Bhavya-Shukla-Resume-April-2026.pdf";
    link.download = "Bhavya-Shukla-Resume-April-2026.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    showToast("Bhavya's resume PDF is downloading.");
  });
}

function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("pointermove", (event) => {
    dom.cursorGlow.style.opacity = "1";
    dom.cursorGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  });

  window.addEventListener("pointerleave", () => {
    dom.cursorGlow.style.opacity = "0";
  });
}

function initParticles() {
  const canvas = dom.particleCanvas;
  const ctx = canvas.getContext("2d");
  const particles = [];
  const colors = ["#31f6ff", "#63ffa7", "#ff4ecd", "#ffd166"];
  let width = 0;
  let height = 0;
  let animationId;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(90, Math.max(42, Math.floor(width / 18)));
    particles.length = 0;

    for (let index = 0; index < count; index += 1) {
      particles.push(createParticle(width, height, colors));
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20 || particle.x > width + 20) particle.vx *= -1;
      if (particle.y < -20 || particle.y > height + 20) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.fill();

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        const other = particles[nextIndex];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 118) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = (1 - distance / 118) * 0.16;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    ctx.globalAlpha = 1;
    animationId = window.requestAnimationFrame(draw);
  };

  resize();
  draw();

  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationId));
}

function createParticle(width, height, colors) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    size: Math.random() * 2 + 0.8,
    alpha: Math.random() * 0.46 + 0.12,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

function initParallax() {
  const hero = document.querySelector(".hero");

  window.addEventListener(
    "scroll",
    () => {
      const offset = Math.min(window.scrollY * 0.16, 90);
      hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    },
    { passive: true }
  );
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 3600);
}

init();
