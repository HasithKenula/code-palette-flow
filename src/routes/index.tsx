import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Github, Linkedin, Facebook, Instagram, Mail, Phone, ArrowRight, ArrowUpRight,
  Code2, Palette, Layout, Layers, Database, Wrench, GraduationCap,
  Sun, Moon, Menu, X, Sparkles, CheckCircle2, Send,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hasith Kenula — Software Engineer & UI/UX Designer" },
      { name: "description", content: "Portfolio of A.A.D. Hasith Kenula Premarathna — aspiring software engineer, full-stack developer, and UI/UX designer." },
      { property: "og:title", content: "Hasith Kenula — Software Engineer & UI/UX Designer" },
      { property: "og:description", content: "Full-stack developer & UI/UX designer building modern web applications." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ROLES = ["Software Engineer", "Full-Stack Developer", "UI/UX Designer"];

function useTypewriter(words: string[]) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[idx];
    const speed = del ? 50 : 90;
    const t = setTimeout(() => {
      if (!del && text === current) {
        setTimeout(() => setDel(true), 1400);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setIdx((i) => (i + 1) % words.length);
        return;
      }
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);
  return text;
}

function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const role = useTypewriter(ROLES);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav theme={theme} setTheme={setTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero role={role} />
      <About />
      <Education />
      <Skills />
      <Services />
      <Projects filter={filter} setFilter={setFilter} />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ theme, setTheme, menuOpen, setMenuOpen }: any) {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-3">
        <div className="glass rounded-full flex items-center justify-between pl-5 pr-2 py-2">
          <a href="#top" className="flex items-center gap-2 font-display font-bold tracking-tight">
            <span className="h-7 w-7 rounded-full bg-primary grid place-items-center text-primary-foreground text-sm">H</span>
            <span className="hidden sm:inline">Hasith.dev</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#contact" className="hidden md:inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              Hire Me
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden h-9 w-9 grid place-items-center rounded-full hover:bg-secondary" aria-label="Menu">
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="glass rounded-2xl mt-2 p-3 md:hidden flex flex-col">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-1 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium text-center">Hire Me</a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero({ role }: { role: string }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Floating gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-primary/25 blur-3xl animate-float-blob" />
        <div className="absolute top-40 -right-20 w-[380px] h-[380px] rounded-full bg-primary/20 blur-3xl animate-float-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground mb-6 animate-fade-up">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Available for internships & collaborations
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <p className="font-display text-primary text-sm sm:text-base mb-3 tracking-wide">Hello, I'm</p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            A.A.D. Hasith <span className="text-primary">Kenula</span>
            <br />
            Premarathna
          </h1>
        </div>

        <div className="mt-6 flex flex-col items-center gap-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl" />
            <img
              src={profileImg}
              alt="Hasith Kenula Premarathna"
              width={140}
              height={140}
              className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover ring-4 ring-primary/40 ring-offset-4 ring-offset-background"
            />
          </div>
          <h2 className="text-lg sm:text-xl text-muted-foreground">
            Aspiring <span className="text-foreground font-medium caret">{role}</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Passionate about building modern web applications and innovative digital solutions.
            Undergraduate IT student at <span className="text-foreground">SLIIT</span> (2023–2027), exploring software engineering, full-stack systems and UI/UX design.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow">
            View Projects <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-secondary transition">
            Contact Me
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 max-w-xl mx-auto gap-3 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          {[
            { k: "5+", v: "Projects" },
            { k: "3+", v: "Tech Stacks" },
            { k: "2027", v: "Graduation" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl px-4 py-3">
              <div className="font-display text-xl sm:text-2xl text-primary font-bold">{s.k}</div>
              <div className="text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] mb-3">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="About Me" title="Designing with purpose, building for impact" />
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/15 blur-2xl" />
            <div className="relative glass rounded-3xl p-2">
              <img src={profileImg} alt="About Hasith" loading="lazy" width={832} height={1024} className="w-full h-[420px] sm:h-[500px] object-cover rounded-2xl" />
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
              Turning ideas into <span className="text-primary">production-ready</span> products.
            </h3>
            <p className="text-muted-foreground mb-4">
              I'm an undergraduate IT student at Sri Lanka Institute of Information Technology, deeply
              curious about how great software is engineered. I love the full journey — from sketching
              wireframes in Figma to shipping full-stack systems with React, Node and Java.
            </p>
            <p className="text-muted-foreground mb-6">
              My focus is continuous learning: studying clean architecture, REST APIs, and modern UI patterns,
              then applying them to real-world projects with measurable outcomes.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Clean, scalable code",
                "Pixel-perfect interfaces",
                "Agile collaboration",
                "User-first thinking",
              ].map((h) => (
                <div key={h} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {h}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold">
                Let's talk <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold">
                See my work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const items = [
    {
      year: "2023 — 2027",
      title: "BSc (Hons) in Information Technology",
      org: "Sri Lanka Institute of Information Technology (SLIIT)",
      desc: "Specializing in Information Technology. Coursework in software engineering, web development, databases, OOP, mobile app development, and HCI.",
    },
    {
      year: "Ongoing",
      title: "Self-directed Learning",
      org: "Online courses, open-source & side projects",
      desc: "Constantly exploring the MERN stack, Spring Boot, system design, and modern UI/UX patterns.",
    },
  ];
  return (
    <section id="education" className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Education" title="My academic journey" />
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-10">
            {items.map((it, i) => (
              <div key={it.title} className={`relative grid sm:grid-cols-2 gap-6 sm:gap-12 ${i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"}`}>
                <div className={`pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:pl-12"}`}>
                  <div className="text-primary text-sm font-medium mb-1">{it.year}</div>
                  <h3 className="font-display text-xl font-semibold">{it.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{it.org}</p>
                </div>
                <div className={`pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:pl-12" : "sm:text-right sm:pr-12"}`}>
                  <div className="glass rounded-2xl p-5 text-sm text-muted-foreground">{it.desc}</div>
                </div>
                <div className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 h-8 w-8 rounded-full bg-primary grid place-items-center glow">
                  <GraduationCap className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { icon: Code2, title: "Programming", items: [["Java", 88], ["JavaScript", 85], ["C++", 75], ["Kotlin", 70]] as [string, number][] },
    { icon: Layout, title: "Web Development", items: [["React", 88], ["Node.js / Express", 82], ["HTML / CSS", 92], ["REST APIs", 85]] as [string, number][] },
    { icon: Database, title: "Databases", items: [["MongoDB", 82], ["MySQL", 85]] as [string, number][] },
    { icon: Palette, title: "UI/UX Design", items: [["Figma", 88], ["Wireframing", 85], ["Prototyping", 82]] as [string, number][] },
    { icon: Wrench, title: "Tools", items: [["Git / GitHub", 90], ["VS Code", 95], ["Android Studio", 75]] as [string, number][] },
    { icon: Layers, title: "Other", items: [["Software Engineering", 85], ["Agile", 80], ["Problem Solving", 90]] as [string, number][] },
  ];
  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Skills" title="Tools I work with" sub="A snapshot of the technologies I use to design, build and ship modern products." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div key={g.title} className="glass rounded-3xl p-6 hover:border-primary/60 transition-colors group">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold">{g.title}</h3>
              </div>
              <div className="space-y-3">
                {g.items.map(([name, val]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span>{name}</span>
                      <span className="text-muted-foreground">{val}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Layers, title: "Full-Stack Web Development", desc: "End-to-end web apps with React, Node, Express, MongoDB / MySQL — built with clean architecture and REST APIs." },
    { icon: Layout, title: "Frontend Development", desc: "Fast, accessible, responsive interfaces using React and modern CSS — polished interactions and animations." },
    { icon: Palette, title: "UI / UX Design", desc: "Research-driven product design in Figma — wireframes, prototypes and design systems." },
    { icon: Code2, title: "Responsive Website Design", desc: "Mobile-first marketing sites and landing pages that look stunning on every screen." },
  ];
  return (
    <section id="services" className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Services" title="What I can do for you" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div key={s.title} className={`relative glass rounded-3xl p-6 group hover:-translate-y-1 transition-all overflow-hidden ${i === 1 ? "bg-primary text-primary-foreground" : ""}`}>
              <div className={`h-12 w-12 rounded-2xl grid place-items-center mb-5 ${i === 1 ? "bg-background/20 text-primary-foreground" : "bg-primary/15 text-primary"}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
              <p className={`text-sm ${i === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.desc}</p>
              <ArrowUpRight className="absolute top-5 right-5 h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = {
  title: string;
  tag: string;
  stack: string[];
  desc: string;
  bullets: string[];
  category: "Java" | "MERN" | "Spring Boot";
};
const PROJECTS: Project[] = [
  {
    title: "Photography & Event Management System",
    tag: "Web App",
    stack: ["Java", "JSP", "Servlets", "MySQL", "MVC"],
    desc: "Web-based booking platform for events, photographers and sponsors with payments and admin dashboard.",
    bullets: ["Event booking workflow", "Photographer profiles", "Sponsor & payment modules", "Admin dashboard"],
    category: "Java",
  },
  {
    title: "Online Help Desk System",
    tag: "Web App",
    stack: ["Java", "JSP", "Servlets", "MySQL"],
    desc: "Ticket management system with replies, knowledge base, notices and role-based dashboards.",
    bullets: ["Ticket lifecycle tracking", "Knowledge base", "Role-based dashboards", "Notice board"],
    category: "Java",
  },
  {
    title: "RentXpress — Vehicle Rental System",
    tag: "MERN",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    desc: "MERN platform for vehicle booking, driver assignment, invoices, inspections and multi-role access.",
    bullets: ["Vehicle & driver management", "Invoices & inspections", "Multi-role auth", "Booking workflow"],
    category: "MERN",
  },
  {
    title: "Accommodation & Booking System",
    tag: "MERN",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    desc: "Booking platform with room listings, payments, reviews, cancellations and admin reporting.",
    bullets: ["Room listings & filters", "Reservations & payments", "Reviews & cancellations", "Admin reporting"],
    category: "MERN",
  },
  {
    title: "Smart Campus Project",
    tag: "Spring Boot",
    stack: ["Spring Boot", "Java", "REST", "MySQL"],
    desc: "Academic management for students, staff, timetables, attendance, announcements & campus services.",
    bullets: ["Timetables & attendance", "Announcements", "Staff & student modules", "Campus services"],
    category: "Spring Boot",
  },
];
const FILTERS = ["All", "MERN", "Java", "Spring Boot"];

function Projects({ filter, setFilter }: { filter: string; setFilter: (s: string) => void }) {
  const [active, setActive] = useState<Project | null>(null);
  const list = useMemo(() => filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter), [filter]);
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Projects" title="Selected work" sub="A collection of real-world systems I've engineered end-to-end." />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm transition ${filter === f ? "bg-primary text-primary-foreground" : "glass hover:bg-secondary"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(p)}
              className="text-left glass rounded-3xl p-6 group hover:-translate-y-1 hover:border-primary/60 transition-all"
            >
              <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent mb-5 relative overflow-hidden">
                <div className="absolute inset-0 grid place-items-center font-display text-5xl font-bold text-primary/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full glass">{p.tag}</div>
                <ArrowUpRight className="absolute bottom-3 right-3 h-8 w-8 p-1.5 rounded-full bg-primary text-primary-foreground group-hover:rotate-45 transition" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{s}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 animate-fade-up" style={{ animationDuration: "0.25s" }}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass rounded-3xl max-w-2xl w-full p-8">
        <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full hover:bg-secondary">
          <X className="h-4 w-4" />
        </button>
        <div className="text-xs text-primary uppercase tracking-widest mb-2">{project.tag}</div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">{project.title}</h3>
        <p className="text-muted-foreground mb-5">{project.desc}</p>
        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {project.bullets.map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" />{b}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => <span key={s} className="text-xs px-3 py-1 rounded-full bg-secondary">{s}</span>)}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const items = [
    { title: "Full-Stack Systems", desc: "Engineered multiple production-style systems across Java, MERN and Spring Boot stacks." },
    { title: "MVC & REST APIs", desc: "Designed clean MVC architectures and well-structured REST APIs with role-based access control." },
    { title: "Agile Teamwork", desc: "Collaborated in small teams using agile practices, code reviews and Git-based workflows." },
  ];
  return (
    <section id="experience" className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Experience" title="University projects & practical experience" />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={it.title} className="glass rounded-3xl p-6">
              <div className="font-display text-5xl font-bold text-primary/40 mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-lg font-semibold mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (form.message.trim().length < 10) errs.message = "Message should be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Contact" title="Let's create something extraordinary" sub="Have a project in mind, an internship opportunity or just want to say hi? My inbox is open." />
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 glass rounded-3xl p-7 space-y-5">
            <div>
              <h3 className="font-display text-xl font-semibold mb-1">Get in touch</h3>
              <p className="text-sm text-muted-foreground">Reach out via any channel below.</p>
            </div>
            <a href="mailto:keyhasith800@gmail.com" className="flex items-center gap-3 group">
              <span className="h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition"><Mail className="h-4 w-4" /></span>
              <span className="text-sm">keyhasith800@gmail.com</span>
            </a>
            <a href="tel:+94772944349" className="flex items-center gap-3 group">
              <span className="h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition"><Phone className="h-4 w-4" /></span>
              <span className="text-sm">+94 77 294 4349</span>
            </a>
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Follow me</p>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Facebook, href: "https://facebook.com" },
                  { icon: Instagram, href: "https://instagram.com" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-xl glass grid place-items-center hover:bg-primary hover:text-primary-foreground transition">
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="lg:col-span-3 glass rounded-3xl p-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your name" error={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition" placeholder="John Doe" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition" placeholder="you@example.com" />
              </Field>
            </div>
            <Field label="Message" error={errors.message}>
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-transparent rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition resize-none" placeholder="Tell me about your project..." />
            </Field>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow">
              {sent ? (<><CheckCircle2 className="h-4 w-4" /> Message sent!</>) : (<><Send className="h-4 w-4" /> Send Message</>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive mt-1 animate-fade-up">{error}</span>}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-6 w-6 rounded-full bg-primary grid place-items-center text-primary-foreground text-xs font-bold">H</span>
          <span className="text-muted-foreground">© {new Date().getFullYear()} Hasith Kenula Premarathna. All rights reserved.</span>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-foreground transition">{n.label}</a>)}
        </nav>
        <div className="flex gap-2">
          {[Github, Linkedin, Facebook, Instagram].map((Ico, i) => (
            <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition">
              <Ico className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
