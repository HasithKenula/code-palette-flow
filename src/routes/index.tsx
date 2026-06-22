import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import {
  Github, Linkedin, Facebook, Instagram, Mail, Phone, ArrowRight, ArrowUpRight,
  Code2, Palette, Layout, Layers, Database, Wrench, GraduationCap,
  Sun, Moon, Menu, X, Sparkles, CheckCircle2, Send, Loader2,
} from "lucide-react";
import profileAsset from "@/assets/profile.png.asset.json";
import serviceFullstack from "@/assets/service-fullstack.jpg";
import serviceFrontend from "@/assets/service-frontend.jpg";
import serviceUiux from "@/assets/service-uiux.jpg";
import serviceResponsive from "@/assets/service-responsive.jpg";
const profileImg = (() => {
  // Prefer the project's asset URL when available (deployed asset pipeline).
  if (profileAsset && profileAsset.url) return profileAsset.url;
  // Prefer a shipped static asset in `public/` so it's included in the repo and Pages build.
  // This file is added at `public/profile.svg` by the CI patch.
  if (typeof window !== "undefined") {
    // runtime can't check file existence reliably here; we still return the path
    // and the browser will request it. We included `public/profile.svg` in the repo.
    return "/profile.svg";
  }
  // Fallback: inline SVG avatar as data URL so the image always renders.
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1.5'><rect width='100%' height='100%' rx='8' fill='%23f3f4f6'/><circle cx='12' cy='9' r='3' fill='%23c7d2fe'/><path d='M4 20c0-4 4-6 8-6s8 2 8 6' stroke='%238b5cf6' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
})();

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
  const [theme, setTheme] = useState<"dark" | "light">("light");
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
  const badges = [
    { label: "React", icon: Code2, pos: "top-4 -left-4 sm:-left-10", delay: "0s" },
    { label: "Node.js", icon: Layers, pos: "top-1/3 -right-4 sm:-right-12", delay: "1.2s" },
    { label: "Figma", icon: Palette, pos: "bottom-24 -left-6 sm:-left-14", delay: "2.4s" },
    { label: "Java", icon: Database, pos: "bottom-6 right-2 sm:-right-8", delay: "0.6s" },
  ];
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Background: grid + gradient blobs + radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
          }}
        />
        <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-primary/25 blur-3xl animate-float-blob" />
        <div className="absolute top-1/3 -right-24 w-[440px] h-[440px] rounded-full bg-primary/20 blur-3xl animate-float-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground mb-6 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for internships & collaborations
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
              <p className="font-display text-primary text-sm sm:text-base mb-3 tracking-wide">Hello, I'm</p>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
                Hasith{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary-foreground px-3 py-0.5 rounded-2xl bg-primary inline-block -rotate-2">
                    Kenula
                  </span>
                </span>
                <br />
                Premarathna<span className="text-primary">.</span>
              </h1>
            </div>

            <h2 className="mt-5 text-lg sm:text-2xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Aspiring <span className="text-foreground font-semibold caret">{role}</span>
            </h2>

            <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Passionate about crafting modern web applications and innovative digital solutions.
              Undergraduate IT student at <span className="text-foreground font-medium">SLIIT</span> (2023–2027) —
              exploring software engineering, full-stack systems and UI/UX design.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 animate-fade-up" style={{ animationDelay: "0.25s" }}>
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow">
                View Projects <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-secondary transition">
                Contact Me
              </a>
              <div className="flex items-center gap-1.5 ml-1">
                {[
                  { Ico: Github, href: "https://github.com" },
                  { Ico: Linkedin, href: "https://linkedin.com" },
                  { Ico: Instagram, href: "https://instagram.com" },
                ].map(({ Ico, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition">
                    <Ico className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 max-w-md mx-auto lg:mx-0 gap-3 animate-fade-up" style={{ animationDelay: "0.35s" }}>
              {[
                { k: "5+", v: "Projects shipped" },
                { k: "8+", v: "Technologies" },
                { k: "2027", v: "Graduation" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl px-4 py-3">
                  <div className="font-display text-xl sm:text-2xl text-primary font-bold">{s.k}</div>
                  <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — portrait with floating tech badges */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative mx-auto w-[280px] sm:w-[360px] lg:w-full max-w-md aspect-[4/5]">
              {/* glow */}
              <div className="absolute inset-6 rounded-[2.5rem] bg-primary/40 blur-3xl" />
              {/* dotted ring decoration */}
              <div className="absolute -inset-3 rounded-[3rem] border border-dashed border-primary/40 animate-[spin_30s_linear_infinite]" />
              {/* portrait card */}
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden glass p-2">
                <img
                  src={profileImg}
                  alt="Hasith Kenula Premarathna — Software Engineer & UI/UX Designer"
                  width={832}
                  height={1024}
                  className="h-full w-full object-cover rounded-[2rem]"
                />
                {/* bottom gradient + name chip */}
                <div className="absolute inset-x-2 bottom-2 rounded-b-[2rem] p-4 bg-gradient-to-t from-background via-background/80 to-transparent">
                  <div className="glass rounded-2xl px-3 py-2 flex items-center gap-2 w-fit">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs">Currently building <span className="text-foreground font-semibold">RentXpress</span></span>
                  </div>
                </div>
              </div>

              {/* floating badges */}
              {badges.map((b) => (
                <div
                  key={b.label}
                  className={`absolute ${b.pos} glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-lg animate-float-blob`}
                  style={{ animationDelay: b.delay, animationDuration: "6s" }}
                >
                  <span className="h-7 w-7 rounded-lg bg-primary/15 text-primary grid place-items-center">
                    <b.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-medium">{b.label}</span>
                </div>
              ))}

              {/* corner stat card */}
              <div className="absolute -bottom-4 -right-2 sm:-right-6 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-7 w-7 rounded-full bg-primary border-2 border-background" style={{ opacity: 1 - i * 0.2 }} />
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold">Open to work</div>
                  <div className="text-[10px] text-muted-foreground">Internships · Freelance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee tech strip */}
        <div className="mt-16 sm:mt-20 relative overflow-hidden glass rounded-2xl py-4">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-12 shrink-0">
                {["React", "Node.js", "TypeScript", "MongoDB", "Java", "Spring Boot", "Figma", "MySQL", "Express", "Tailwind"].map((t) => (
                  <span key={t} className="text-sm text-muted-foreground font-display tracking-wide hover:text-primary transition">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
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
  const [form, setForm] = useState({ from_name: "", reply_to: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    emailjs.init("EDcyXeixPsTfW1UWW");
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.from_name.trim()) errs.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.reply_to)) errs.email = "Enter a valid email";
    if (form.message.trim().length < 10) errs.message = "Message should be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      await emailjs.send("service_xom8nkp", "template_5lvmcb5", {
        from_name: form.from_name,
        reply_to: form.reply_to,
        message: form.message,
      });
      setStatus("success");
      setForm({ from_name: "", reply_to: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
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
                <input name="from_name" value={form.from_name} onChange={(e) => setForm({ ...form, from_name: e.target.value })} className="w-full bg-transparent rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition" placeholder="John Doe" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input name="reply_to" type="email" value={form.reply_to} onChange={(e) => setForm({ ...form, reply_to: e.target.value })} className="w-full bg-transparent rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition" placeholder="you@example.com" />
              </Field>
            </div>
            <Field label="Message" error={errors.message}>
              <textarea name="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-transparent rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition resize-none" placeholder="Tell me about your project..." />
            </Field>
            <button type="submit" disabled={status === "loading"} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow disabled:opacity-60">
              {status === "loading" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>) :
               status === "success" ? (<><CheckCircle2 className="h-4 w-4" /> Message sent!</>) :
               status === "error" ? (<>Failed — try again</>) :
               (<><Send className="h-4 w-4" /> Send Message</>)}
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
