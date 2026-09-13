import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  BadgeCheck,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal } from "@/components/portfolio/Reveal";
import { TiltCard } from "@/components/portfolio/TiltCard";
import { SkillsOrbit } from "@/components/portfolio/SkillsOrbit";
import { CursorFX } from "@/components/portfolio/CursorFX";
import {sendContactEmail} from "@/lib/send-contact-email";
import { Hero3D } from "@/components/portfolio/Hero3D";
import portrait from "@/assets/rokith-pro.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rokith M — Full Stack & Python Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Rokith M, a fresher Full Stack and Python developer in Chennai building apps with FastAPI, MySQL and JavaScript.",
      },
      { property: "og:title", content: "Rokith M — Full Stack & Python Developer" },
      {
        property: "og:description",
        content:
          "Fresher developer with strong fundamentals in Python, FastAPI, REST APIs, MySQL and modern web technologies.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const SKILL_GROUPS = [
  { title: "Programming", items: ["Python", "JavaScript"] },
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
  { title: "Backend", items: ["FastAPI", "REST APIs"] },
  { title: "Database", items: ["MySQL", "SQL"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "MySQL Workbench", "Postman"] },
];

const PROJECTS = [
  {
    name: "SportsHub",
    status: "🚧 Ongoing",
    summary:
      "Full-stack sports e-commerce platform currently under development. Built so far: product listing, dynamic product selection, individual product details, user registration, password hashing, login, JWT authentication, protected user profile, protected purchase flow, stock validation, MySQL integration and frontend-backend integration.",
    note: "Order history and further e-commerce features are still in progress.",
    stack: ["Python", "FastAPI", "MySQL", "JavaScript", "HTML", "CSS", "JWT"],
  },
  {
    name: "Intelligent Agriculture Decision Support System",
    status: "Academic project",
    summary:
      "Final-year machine learning web application that supports agricultural decision-making from input data, combining a trained model with a web interface.",
    stack: ["Python", "Flask", "Machine Learning", "TensorFlow/Keras", "React", "SQL"],
  },
  {
    name: "Medicine Recommendation System",
    status: "Academic project",
    summary:
      "Machine learning system that generates medicine-related recommendations from input data, built as a study of data processing and model-driven suggestions.",
    stack: ["Python", "Machine Learning", "SQL"],
  },
];

const CERTIFICATIONS = ["Python Pandas Basics", "SQL for Data Analysis — Simplilearn"];

const MARQUEE = [
  "Python",
  "FastAPI",
  "MySQL",
  "JavaScript",
  "HTML",
  "CSS",
  "REST APIs",
  "Git",
  "Postman",
];

const PROCESS = [
  {
    step: "01",
    title: "Understand",
    body: "Break the requirement into data, endpoints and screens before writing a single line of code.",
  },
  {
    step: "02",
    title: "Build",
    body: "Implement the backend with Python and FastAPI, wire it to MySQL, then connect a clean, responsive frontend.",
  },
  {
    step: "03",
    title: "Refine",
    body: "Test the flows, handle auth and edge cases, and keep improving the project as I learn more.",
  },
];


function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-3 font-display text-xs tracking-[0.28em] text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
    </div>
  );
}

function Portfolio() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setSending(true);
    try {
      await sendContactEmail({
        data: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
      });
      setSent(true);
      toast.success("Thanks for reaching out — I'll reply by email soon.");
      form.reset();
    } catch {
      toast.error("Something went wrong sending your message — try again or email me directly.");
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <CursorFX />
      <Nav />
      <Toaster />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32">
          <div className="aurora pointer-events-none absolute inset-x-0 top-24 mx-auto h-[560px] max-w-5xl opacity-90" />
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
          <Hero3D />

          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <Reveal>
              <h1 className="text-center text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
                Hi, I&apos;m Rokith M
                <span className="mt-1 block hero-serif text-gradient text-5xl sm:text-7xl md:text-8xl">
                  Full Stack Developer
                </span>
              </h1>
            </Reveal>

            <div className="relative mt-6 grid items-end gap-8 md:mt-2 md:grid-cols-[1fr_auto_1fr]">
              <Reveal delay={120} className="order-2 md:order-1 md:pb-16">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-medium text-foreground backdrop-blur">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  Available for full-time developer roles
                </span>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    View Projects <ArrowRight size={16} />
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
                  >
                    <Download size={16} /> Resume
                  </a>
                </div>
              </Reveal>

              <Reveal delay={80} className="order-1 justify-self-center md:order-2">
                <TiltCard className="relative w-56 overflow-hidden rounded-[2rem] border border-border bg-card sm:w-64 md:w-80">
                  <img
                    src={portrait}
                    alt="Portrait of Rokith M, full stack and Python developer"
                    width={576}
                    height={720}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card to-transparent p-4">
                    <p className="font-display text-sm">Rokith M</p>
                    <p className="text-xs text-muted-foreground">Chennai, India</p>
                  </div>
                </TiltCard>
              </Reveal>

              <Reveal delay={160} className="order-3 md:pb-16 md:text-right">
                <p className="ml-auto max-w-xs text-base leading-relaxed text-muted-foreground">
                  Passionate about building practical, user-focused applications with Python,
                  FastAPI, JavaScript and SQL.
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ArrowRight size={16} /> Get in Touch
                </a>
              </Reveal>
            </div>
          </div>

          {/* Tech marquee */}
          <div className="relative mt-14 overflow-hidden border-y border-border bg-card/30 py-5">
            <div className="marquee-track gap-12 px-6">
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="font-display text-lg tracking-wide text-muted-foreground/70 md:text-xl"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How I work */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <p className="text-center hero-serif text-lg text-primary">/ How I work</p>
            <h2 className="mt-2 text-center text-3xl font-semibold md:text-5xl">
              Here&apos;s how it works
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 90} className={i === 1 ? "md:-translate-y-6" : ""}>
                <TiltCard className="h-full rounded-3xl border border-border bg-card p-6 md:p-7">
                  <p className="font-display text-4xl text-primary/60">{p.step}</p>
                  <h3 className="mt-6 font-display text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>


        {/* About */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="01 — ABOUT" title="A fresher developer with solid fundamentals" />
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m a recent B.Tech Information Technology graduate starting my career as a
                  fresher developer. My focus is on strong programming fundamentals and turning them
                  into working software.
                </p>
                <p>
                  I&apos;m comfortable with backend development, REST APIs, database integration,
                  frontend-backend integration and authentication/authorization — mostly with Python,
                  FastAPI and MySQL. I enjoy building practical projects and learning continuously
                  as I go.
                </p>
                <p>
                  I&apos;m a quick learner and adaptable, dedicated and disciplined about daily
                  practice, a clear communicator with teammates, and steady when working under
                  pressure.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Role", "Fresher Developer"],
                  ["Focus", "Python · FastAPI"],
                  ["Location", "Chennai, India"],
                  ["Education", "B.Tech IT"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{k}</p>
                    <p className="mt-1.5 font-display text-sm text-foreground">{v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24 border-y border-border bg-card/30">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <SectionHeading eyebrow="02 — SKILLS" title="Tools I work with" />
            </Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {SKILL_GROUPS.map((group, i) => (
                  <Reveal key={group.title} delay={i * 70}>
                    <TiltCard className="h-full rounded-2xl border border-border bg-card p-5">
                      <h3 className="font-display text-sm tracking-wide text-primary">{group.title}</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={120}>
                <SkillsOrbit />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="03 — PROJECTS" title="Things I've built" />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className={i === 0 ? "md:col-span-2" : ""}>
                <TiltCard className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl md:text-2xl">{p.name}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.status.includes("Ongoing")
                          ? "bg-warning/15 text-warning"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  {p.note && (
                    <p className="mt-3 rounded-xl border border-border bg-secondary/60 p-3 text-sm text-muted-foreground">
                      {p.note}
                    </p>
                  )}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience + Education + Certifications */}
        <section
          id="experience"
          className="scroll-mt-24 border-y border-border bg-card/30"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-3">
            <Reveal>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl">
                <BriefcaseBusiness size={18} className="text-primary" /> Experience
              </h2>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-base">AI Internship</h3>
                <p className="text-sm text-primary">Hacwit Technology</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Intern-level exposure to AI/ML concepts with hands-on Python work, contributing to
                  practical project tasks and applying what I learned alongside the team.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl">
                <GraduationCap size={18} className="text-primary" /> Education
              </h2>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-base">B.Tech — Information Technology</h3>
                <p className="mt-2 text-sm text-muted-foreground">Recently completed.</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <h2 className="mb-6 flex items-center gap-2 font-display text-xl">
                <BadgeCheck size={18} className="text-primary" /> Certifications
              </h2>
              <ul className="space-y-3">
                {CERTIFICATIONS.map((c) => (
                  <li key={c} className="rounded-2xl border border-border bg-card p-5 text-sm">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Resume */}
        <section id="resume" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="font-display text-2xl">Resume</h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  A one-page summary of my education, projects, internship and technical skills —
                  formatted for quick recruiter review.
                </p>
              </div>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 border-t border-border bg-card/30">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="04 — CONTACT" title="Let's build something" />
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="mailto:rokith1125@gmail.com"
                    className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail size={16} className="text-primary" /> rokith1125@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/rokith-m"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Linkedin size={16} className="text-primary" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/rokith-m"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github size={16} className="text-primary" /> GitHub
                  </a>
                </li>
                <li className="inline-flex items-center gap-3 text-muted-foreground">
                  <MapPin size={16} className="text-primary" /> Chennai, India
                </li>
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <form
                onSubmit={onSubmit}
                className="space-y-4 rounded-3xl border border-border bg-card p-6 md:p-8"
              >
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Send size={16} /> Send
                </button>
                {sent && (
                  <p className="text-xs text-muted-foreground">
                    Message noted — you can also email me directly at rokith1125@gmail.com.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Rokith M. Built with FastAPI curiosity and React.</p>
          <p>Chennai, India</p>
        </div>
      </footer>
    </div>
  );
}
