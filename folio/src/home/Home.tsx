import {
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  FolderOpen,
  LayoutTemplate,
  Menu,
  Moon,
  Plus,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Templates",
    icon: LayoutTemplate,
  },
  {
    label: "Resumes",
    icon: FileText,
  },
  {
    label: "Examples",
    icon: FolderOpen,
  },
  {
    label: "Community",
    icon: Users,
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Built to stand out",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Create a resume that feels distinctly yours.",
  },
  {
    icon: LayoutTemplate,
    title: "Beautiful templates",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Start with thoughtfully designed templates.",
  },
  {
    icon: FileText,
    title: "Simple resume builder",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Build, edit, and refine everything in one place.",
  },
  {
    icon: Users,
    title: "Made for people",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A calmer way to build your next opportunity.",
  },
];

const templates = [
  {
    name: "Executive",
    category: "Professional",
    color: "#0A2A1A",
  },
  {
    name: "Minimal",
    category: "Clean & Modern",
    color: "#7A9A82",
  },
  {
    name: "Classic",
    category: "Traditional",
    color: "#26352D",
  },
];

const faqs = [
  {
    question: "Is Folio free to use?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. More details about our free and Pro plans will be available soon.",
  },
  {
    question: "Can I customize my resume?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Folio will give you control over your content, layout, and visual style.",
  },
  {
    question: "Can I export my resume as a PDF?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. PDF export will be available as part of the resume builder.",
  },
  {
    question: "Can I submit my own template?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Community-created templates are planned for a future release.",
  },
];

function Logo() {
  return (
    <a
      href="#"
      className="group flex items-center gap-2.5 text-primary"
      aria-label="Folio home"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-lg text-white shadow-soft transition-transform group-hover:-rotate-3">
        ✦
      </span>

      <span className="text-xl font-bold tracking-tight">folio</span>
    </a>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      className={[
        "min-h-screen overflow-x-hidden transition-colors duration-300",
        darkMode
          ? "bg-[#08150e] text-[#f4f7f5]"
          : "bg-background text-foreground",
      ].join(" ")}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          className={[
            "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-4 shadow-soft backdrop-blur-xl sm:px-5",
            darkMode
              ? "border-white/10 bg-[#0d2016]/90"
              : "border-border/80 bg-surface/90",
          ].join(" ")}
        >
          <Logo />

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className={[
                  "flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                  darkMode
                    ? "text-white/60 hover:bg-white/5 hover:text-white"
                    : "text-muted hover:bg-primary-soft hover:text-primary",
                ].join(" ")}
              >
                <Icon size={15} strokeWidth={1.8} />
                {label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode((value) => !value)}
              aria-label="Toggle dark mode"
              className={[
                "flex size-9 items-center justify-center rounded-full border transition-all",
                darkMode
                  ? "border-white/10 text-white hover:bg-white/10"
                  : "border-border text-primary hover:bg-primary-soft",
              ].join(" ")}
            >
              {darkMode ? (
                <Sun size={16} strokeWidth={1.8} />
              ) : (
                <Moon size={16} strokeWidth={1.8} />
              )}
            </button>

            <button className="hidden rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white transition-all hover:bg-secondary-hover sm:block">
              Pro
            </button>

            <button
              aria-label="Profile"
              className={[
                "flex size-9 items-center justify-center rounded-full text-xs font-bold transition-all",
                darkMode
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-primary text-white hover:bg-primary-hover",
              ].join(" ")}
            >
              AM
            </button>

            <button
              onClick={() => setMobileMenu((value) => !value)}
              className="flex size-9 items-center justify-center rounded-full border border-border lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={17} />
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {mobileMenu && (
          <div
            className={[
              "mx-auto mt-2 max-w-7xl rounded-2xl border p-2 shadow-card lg:hidden",
              darkMode
                ? "border-white/10 bg-[#0d2016]"
                : "border-border bg-surface",
            ].join(" ")}
          >
            {navItems.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-primary-soft hover:text-primary"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-24 pt-24 sm:pb-32 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-16 -z-0 size-[500px] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div
            className={[
              "mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
              darkMode
                ? "border-white/10 bg-white/5 text-white/70"
                : "border-border bg-surface text-muted",
            ].join(" ")}
          >
            <Sparkles size={13} className="text-secondary" />
            Your next opportunity starts here
          </div>

          <h1
            className={[
              "mx-auto max-w-4xl text-5xl font-bold tracking-[-0.045em] sm:text-6xl lg:text-7xl",
              darkMode ? "text-white" : "text-primary",
            ].join(" ")}
          >
            Build a resume that{" "}
            <span className="text-secondary">feels like you.</span>
          </h1>

          <p
            className={[
              "mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg",
              darkMode ? "text-white/55" : "text-muted",
            ].join(" ")}
          >
            Create a thoughtful, professional resume without fighting with
            complicated editors. Choose a template, tell your story, and let
            your work speak for itself.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              className={[
                "group flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-card transition-all",
                darkMode
                  ? "bg-secondary hover:bg-secondary-hover"
                  : "bg-primary hover:bg-primary-hover",
              ].join(" ")}
            >
              Get started
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>

            <a
              href="#templates"
              className={[
                "flex h-12 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-all",
                darkMode
                  ? "border-white/10 text-white hover:bg-white/5"
                  : "border-border bg-surface text-primary hover:bg-primary-soft",
              ].join(" ")}
            >
              Explore templates
            </a>
          </div>

          {/* Demo placeholder */}
          <div
            className={[
              "mx-auto mt-16 max-w-4xl rounded-3xl border p-2 shadow-resume sm:mt-20",
              darkMode
                ? "border-white/10 bg-white/[0.03]"
                : "border-border bg-surface",
            ].join(" ")}
          >
            <div
              className={[
                "relative aspect-[16/8] overflow-hidden rounded-2xl",
                darkMode ? "bg-[#102219]" : "bg-background",
              ].join(" ")}
            >
              <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-1.5 border-b border-border/50 px-4">
                <span className="size-2 rounded-full bg-danger/60" />
                <span className="size-2 rounded-full bg-warning/60" />
                <span className="size-2 rounded-full bg-success/60" />
              </div>

              <div className="flex h-full items-center justify-center pt-10">
                <div className="w-44 rounded-md bg-white p-4 text-left shadow-xl sm:w-56">
                  <div className="h-2.5 w-24 rounded bg-primary" />
                  <div className="mt-2 h-1.5 w-16 rounded bg-secondary/60" />

                  <div className="mt-5 space-y-2">
                    <div className="h-1 w-full rounded bg-primary/10" />
                    <div className="h-1 w-11/12 rounded bg-primary/10" />
                    <div className="h-1 w-9/12 rounded bg-primary/10" />
                  </div>

                  <div className="mt-5 h-1.5 w-20 rounded bg-primary/70" />

                  <div className="mt-2 space-y-1.5">
                    <div className="h-1 w-full rounded bg-primary/10" />
                    <div className="h-1 w-10/12 rounded bg-primary/10" />
                    <div className="h-1 w-8/12 rounded bg-primary/10" />
                  </div>
                </div>

                <div className="absolute right-[18%] top-1/2 hidden -translate-y-1/2 rounded-xl border border-secondary/20 bg-white p-3 shadow-lg sm:block">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-primary-soft text-primary">
                      <Check size={13} />
                    </span>
                    <span className="text-[9px] font-semibold text-primary">
                      Looking good
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section
        className={[
          "border-y px-5 py-8",
          darkMode
            ? "border-white/10 bg-white/[0.02]"
            : "border-border/70 bg-surface/50",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Built for ambitious candidates
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["LinkedIn", "Peerlist", "X", "Student community"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              Why Folio
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Everything you need. Nothing you don't.
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted sm:text-base">
              A focused resume experience designed around your story instead
              of getting in the way of it.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-card"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-sm font-bold text-primary">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistance */}
      <section className="px-5 pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl bg-primary px-7 py-10 text-white sm:px-12 sm:py-14">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white/10">
                  <Sparkles size={18} />
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Not sure where to start?
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  We'll help you figure out what belongs on your resume.
                </p>
              </div>

              <button className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-primary transition-colors hover:bg-primary-soft">
                Get assistance
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="bg-primary-soft/40 px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                Templates
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Start with something beautiful.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                Carefully designed starting points that keep your content
                front and center.
              </p>
            </div>

            <button className="flex items-center gap-2 text-sm font-semibold text-primary">
              View all
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {templates.map((template) => (
              <div key={template.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-soft transition-all group-hover:-translate-y-1 group-hover:shadow-resume">
                  <div
                    className="h-12 rounded-lg p-3"
                    style={{ backgroundColor: template.color }}
                  >
                    <div className="h-2 w-24 rounded bg-white/90" />
                    <div className="mt-1.5 h-1 w-14 rounded bg-white/40" />
                  </div>

                  <div className="mt-5 space-y-3 px-2">
                    <div className="h-1.5 w-20 rounded bg-primary/70" />

                    {[1, 2, 3, 4].map((line) => (
                      <div key={line} className="space-y-1.5">
                        <div className="h-1 w-full rounded bg-primary/10" />
                        <div className="h-1 w-11/12 rounded bg-primary/10" />
                        <div className="h-1 w-8/12 rounded bg-primary/10" />
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-primary/90 py-4 transition-transform group-hover:translate-y-0">
                    <span className="text-xs font-bold text-white">
                      Use this template
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-bold text-primary">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {template.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <button className="flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft">
              <Plus size={14} />
              Submit your template
            </button>
          </div>
        </div>
      </section>

      {/* Bento */}
      <section className="px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              The Folio experience
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              A better way to present yourself.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-primary p-7 text-white md:col-span-2">
              <Sparkles size={20} />

              <h3 className="mt-16 max-w-md text-2xl font-bold tracking-tight">
                Your story deserves more than a generic document.
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-7 shadow-soft">
              <FileText size={20} className="text-secondary" />

              <h3 className="mt-10 text-lg font-bold text-primary">
                One place for everything
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-primary-soft p-7">
              <LayoutTemplate size={20} className="text-primary" />

              <h3 className="mt-10 text-lg font-bold text-primary">
                Designed with intention
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-7 shadow-soft md:col-span-2">
              <Users size={20} className="text-secondary" />

              <h3 className="mt-10 text-lg font-bold text-primary">
                Join a community of builders
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Discover inspiration, share your work, and help others along
                the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background-subtle px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              FAQ
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Questions, answered.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-surface px-5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-primary">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={16}
                      className={[
                        "shrink-0 text-muted transition-transform",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  {isOpen && (
                    <p className="pb-5 pr-8 text-xs leading-6 text-muted">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl rounded-3xl bg-secondary-soft px-6 py-12 text-center sm:px-12 sm:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Stay in the loop
          </span>

          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Be there when Folio launches.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted">
            Join the waitlist for product updates, new templates, and early
            access.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="h-11 min-w-0 flex-1 rounded-full border border-border bg-surface px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/10"
            />

            <button
              type="submit"
              className="h-11 rounded-full bg-primary px-5 text-xs font-bold text-white transition-colors hover:bg-primary-hover"
            >
              Join waitlist
            </button>
          </form>

          <p className="mt-3 text-[10px] text-muted">
            No spam. Just useful updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo />

            <p className="mt-3 max-w-xs text-xs leading-5 text-muted">
              A calmer, better way to build your next resume.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted">
            <a href="#templates" className="hover:text-primary">
              Templates
            </a>
            <a href="#benefits" className="hover:text-primary">
              Benefits
            </a>
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl border-t border-border pt-6 text-[10px] text-muted">
          © {new Date().getFullYear()} Folio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}