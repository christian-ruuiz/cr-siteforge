// src/App.tsx — CR•ForgeSite (web completa) sin <Hero/> externo ni props requeridas
// Secciones: Navbar, Hero inline, Logos, Features, Templates, HowItWorks, FAQ, Footer y al final el Generador (CRSiteForge)

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import CRSiteForge from "./components/CRSiteForge"; // <- tu generador (default export)

export default function App() {
  // Scroll suave (opcional)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "scrollBehavior" in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <div className="min-h-dvh bg-[#0b0812] text-white">
      <Navbar />
      <HeroSection />
      <LogosStrip />
      <Features />
      <TemplatesGallery />
      <HowItWorks />
      <FAQ />
      <SiteFooter />

      {/* Generador al final */}
      <section id="builder" className="relative px-6 md:px-12 lg:px-16 py-16">
        <div className="mx-auto max-w-7xl">
          <header className="mb-6 flex items-center justify-between gap-2">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Builder</h2>
            <a href="#top" className="text-sm text-white/70 hover:text-white">↑ Back to top</a>
          </header>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl">
            <CRSiteForge />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------ Navbar ------------------------------ */
function Navbar() {
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0812]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b0812]/60">
      <div className="mx-auto flex h-14 items-center justify-between px-4 md:px-8 lg:px-12 max-w-7xl">
        <a href="#top" className="inline-flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
          CR•ForgeSite
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#templates" className="hover:text-white">Templates</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#builder" className="rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Open Builder</a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ Hero inline ------------------------------ */
function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden min-h-[92svh] grid place-items-center px-6 md:px-12 lg:px-16 bg-[#0b0812] text-white"
      style={{ backgroundImage: "radial-gradient(600px 300px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08), transparent 60%)" }}
    >
      <BackgroundDecor />

      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs md:text-sm backdrop-blur-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="opacity-80">Exports a single, upload-ready HTML file</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="mt-5 text-[clamp(2rem,7vw,4.25rem)] md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">CR•ForgeSite</span>
              <br />
              <span className="bg-[conic-gradient(at_10%_10%,#e879f9_0deg,#22d3ee_120deg,#34d399_240deg,#e879f9_360deg)] bg-clip-text text-transparent">Build stunning Coming Soon pages in minutes</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 max-w-2xl mx-auto lg:mx-0 text-base md:text-lg text-white/80">
              Pick a template, tune colors and type, drop in the countdown, and export. No odd dependencies. No build hoops. One file — done.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="#builder" className="group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-semibold bg-white text-[#0b0812] hover:opacity-95 active:opacity-90 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)]">
                🚀 Start building <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a href="#templates" className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-semibold border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10">
                🎨 Browse templates
              </a>
            </motion.div>

            <motion.ul initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-white/80">
              {["Responsive by default", "Live preview & theming", "Built-in countdown & progress", "SEO & OpenGraph baked in"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20">
                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5"><path d="M5 10.5l3 3 7-7" stroke="rgb(52 211 153)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <TiltCard>
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-3 md:p-4 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
              <BrowserTopBar />
              <MockPreview />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="absolute -bottom-6 -right-2 md:-right-6">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
                <p className="text-xs md:text-sm text-white/90 font-medium">1-click export · No build step</p>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>

      {/* textura grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'4\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.3\\'/></svg>')" }}
      />
    </section>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 [mask-image:radial-gradient(closest-side,black,transparent)]" />
    </>
  );
}

function BrowserTopBar() {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <div className="ml-3 h-6 flex-1 rounded-lg bg-white/5" />
    </div>
  );
}

function MockPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-8">
      <div className="max-w-md">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">Nova Capsule</h3>
        <p className="mt-2 text-sm text-white/80">Minimal, bold, and centered. A clean hero with countdown.</p>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-2 max-w-sm">
        {["12", "08", "35", "20"].map((v, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
            <div className="text-2xl font-bold">{v}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/70">{["Days", "Hours", "Minutes", "Seconds"][i]}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-white/80">
        {["Centered", "Split", "Fullscreen", "Gradient"].map((t) => (
          <span key={t} className="rounded-full bg-white/10 px-2 py-1">{t}</span>
        ))}
      </div>
    </div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const cx = useMotionValue(0.5);
  const cy = useMotionValue(0.5);
  const rotateX = useTransform(cy, [0, 1], [12, -12]);
  const rotateY = useTransform(cx, [0, 1], [-12, 12]);
  return (
    <motion.div
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        cx.set((e.clientX - r.left) / r.width);
        cy.set((e.clientY - r.top) / r.height);
      }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ Logos ------------------------------ */
function LogosStrip() {
  const logos = ["Vercel", "Netlify", "Cloudflare", "GitHub", "Shopify", "WordPress"];
  return (
    <section aria-label="trusted" className="px-6 md:px-12 lg:px-16 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center text-white/60 text-xs uppercase tracking-widest mb-4">Export anywhere</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 place-items-center opacity-80">
          {logos.map((l) => (
            <div key={l} className="text-white/60 text-sm md:text-base">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Features ------------------------------ */
function Features() {
  const items = [
    { t: "One-file export", d: "Deploy a single HTML file. No build steps, no bundlers." },
    { t: "Live theming", d: "Tweak color, radius, shadow, and typography on the fly." },
    { t: "Countdown & progress", d: "Built-in timer and optional progress bar — zero libraries." },
    { t: "Watermark lock-in", d: "Closed Shadow DOM badge with self-heal. Your signature stays." },
  ];
  return (
    <section id="features" className="px-6 md:px-12 lg:px-16 py-16">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Why teams ship with CR•ForgeSite</h2>
          <p className="mt-2 text-white/80">All the essentials to spin up Coming Soon and maintenance pages in minutes — no framework lock-in.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="inline-grid place-items-center h-8 w-8 rounded-full bg-emerald-400/20">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M5 10.5l3 3 7-7" stroke="rgb(52 211 153)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div>
                  <div className="font-semibold">{it.t}</div>
                  <p className="text-sm text-white/80">{it.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Templates ------------------------------ */
function TemplatesGallery() {
  const templates = [
    { key: "liquid", name: "Liquid Glass", desc: "Frosted panel, blob accent." },
    { key: "noir", name: "Noir Minimal", desc: "Type-driven, clean line." },
    { key: "neon", name: "Neon Grid", desc: "Grid glow + panel." },
    { key: "aurora", name: "Aurora Waves", desc: "Soft gradients, depth." },
    { key: "split", name: "Split Hero", desc: "Media/Copy split layout." },
    { key: "terminal", name: "Terminal Pulse", desc: "Monospace, retro UI." },
    { key: "photo", name: "Photo Hero", desc: "Full-bleed background." },
    { key: "poster", name: "Poster Type", desc: "Huge display type." },
    { key: "mesh", name: "Gradient Mesh", desc: "Soft mesh aura." },
  ];
  function goBuilder() {
    const el = document.getElementById("builder");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <section id="templates" className="px-6 md:px-12 lg:px-16 py-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Templates</h2>
            <p className="text-white/80">Nine opinionated presets you can theme and export.</p>
          </div>
          <a href="#builder" className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm hover:bg-white/15">Open Builder →</a>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => (
            <motion.article
              key={t.key}
              onClick={goBuilder}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition"
              title={`Open ${t.name} in builder`}
            >
              <div className="aspect-[16/10] bg-white/5" />
              <div className="p-3">
                <div className="font-medium">{t.name}</div>
                <p className="text-sm text-white/70">{t.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="#builder" className="inline-flex items-center gap-2 rounded-2xl bg-white text-[#0b0812] px-4 py-2 text-sm font-semibold hover:opacity-95">Start with a template</a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ How It Works ------------------------------ */
function HowItWorks() {
  const steps = [
    { t: "Pick a template", d: "Choose from Liquid, Noir, Neon, Aurora, and more." },
    { t: "Tweak the look", d: "Accent color, radius, shadow, typography, layout." },
    { t: "Set countdown", d: "Choose a target date; optional progress bar." },
    { t: "Export .html", d: "Copy, download, or open preview. Deploy anywhere." },
  ];
  return (
    <section id="how" className="px-6 md:px-12 lg:px-16 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">How it works</h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/60">Step {i + 1}</div>
              <div className="font-semibold">{s.t}</div>
              <p className="text-sm text-white/80">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ FAQ ------------------------------ */
function FAQ() {
  const qas = [
    { q: "Can I host the export anywhere?", a: "Yes. It's a plain HTML file — drag to any host (Vercel/Netlify/GitHub Pages/Cloudflare/etc)." },
    { q: "Is there any tracking?", a: "No extra scripts. Only the CR watermark badge, locked via closed Shadow DOM." },
    { q: "Do templates support light/dark?", a: "Yes. Switch the theme and it adjusts variables instantly." },
    { q: "Any dependencies?", a: "Zero runtime deps in the export. The editor uses React/Tailwind." },
  ];
  return (
    <section id="faq" className="px-6 md:px-12 lg:px-16 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">FAQ</h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {qas.map((qa, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer select-none p-4 text-sm font-medium flex items-center justify-between">
                <span>{qa.q}</span>
                <span className="text-white/60 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="p-4 pt-0 text-white/80 text-sm">{qa.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Footer ------------------------------ */
function SiteFooter() {
  return (
    <footer className="px-6 md:px-12 lg:px-16 py-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
        <div>© {new Date().getFullYear()} CR•ForgeSite</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#builder" className="hover:text-white">Open Builder</a>
        </div>
      </div>
    </footer>
  );
}
