// CR•ForgeSite — App shell
// Limpio, build-safe, con ErrorBoundary y UI refinada.

// antes:
import { useEffect, useMemo, useState } from "react"
import { Wand2, Github, Sun, Moon } from "lucide-react"
import CRSiteForge from "./components/CRSiteForge"
import ErrorBoundary from "./components/ErrorBoundary"

type Theme = "dark" | "light"

function useTheme(defaultTheme: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("cr-theme")) as Theme | null
    return saved ?? defaultTheme
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
    try { localStorage.setItem("cr-theme", theme) } catch {}
  }, [theme])
  return { theme, setTheme, toggle: () => setTheme(t => (t === "dark" ? "light" : "dark")) }
}

export default function App() {
  const { theme, toggle } = useTheme("dark")

  useEffect(() => {
    document.title = "CR•ForgeSite — Under Construction Generator"
  }, [])

  const bgClass = useMemo(
    () =>
      "min-h-dvh relative overflow-x-clip " +
      "bg-[radial-gradient(1000px_700px_at_12%_0%,#1a1029_0%,#0b0812_40%,#07060a_100%)] " +
      "dark:bg-[radial-gradient(1000px_700px_at_12%_0%,#1a1029_0%,#0b0812_40%,#07060a_100%)] " +
      "text-white",
    []
  )

  return (
    <div className={bgClass}>
      {/* sutil noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22 preserveAspectRatio=%22none%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
        }}
      />

      {/* skip link accesible */}
      <a
        href="#generator"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-lg border border-white/20 bg-black/60 px-3 py-2 text-sm"
      >
        Skip to generator
      </a>

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="group inline-flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <Wand2 className="h-4 w-4 text-white/90" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                CR<span className="opacity-70">•</span>ForgeSite
              </span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm backdrop-blur-md hover:bg-white/15 active:scale-[.98] transition"
                title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                aria-pressed={theme !== "dark"}
              >
                {theme === "dark" ? (
                  <span className="inline-flex items-center gap-2">
                    <Sun className="h-4 w-4" /> Light
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Moon className="h-4 w-4" /> Dark
                  </span>
                )}
              </button>

              <a
                href="https://github.com/christian-ruuiz"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm backdrop-blur-md hover:bg-white/15 active:scale-[.98] transition inline-flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 md:px-8 pt-10 md:pt-16 pb-6">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Under-construction pages,
                <br />
                <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                  fast to ship. easy to keep.
                </span>
              </h1>

              <p className="mt-3 md:mt-4 text-white/80 max-w-[68ch]">
                Build and ship a clean “Coming Soon”, “Maintenance”, or “Waitlist” page in minutes.
                Pick a template, tune the look, set a countdown, and export a single HTML file.
                Responsive, fast, and works anywhere.
              </p>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85 max-w-[70ch]">
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <strong>Founders & marketers:</strong> announce a launch and keep SEO alive.
                </li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <strong>Developers:</strong> drop a single HTML on any host. No runtime.
                </li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <strong>Designers:</strong> Liquid, Neon, Noir, Aurora… live preview.
                </li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <strong>Agencies:</strong> ready-to-brand templates for clients.
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#generator"
                  className="rounded-xl border border-white/20 bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur-md hover:bg-white/20 active:scale-[.98] transition inline-flex items-center gap-2"
                >
                  <Wand2 className="h-4 w-4" />
                  Open generator
                </a>
                <a
                  href="https://github.com/christian-ruuiz/cr-siteforge"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm backdrop-blur-md hover:bg-white/15 active:scale-[.98] transition inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-2 text-xs text-white/70">
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Liquid Glass</li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Neon Grid</li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Noir Minimal</li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Aurora Waves</li>
              </ul>
            </div>

            {/* Visual panel — refined */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 p-5 md:p-7 backdrop-blur-xl overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-20 -z-10 opacity-40 blur-3xl"
                style={{ background: "radial-gradient(60% 50% at 15% 10%, #7c3aed66, transparent 60%)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(600px 300px at 80% 20%, rgba(124,58,237,.20), transparent 60%), radial-gradient(400px 240px at 20% 80%, rgba(59,130,246,.18), transparent 60%)",
                }}
              />

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,.12) 0%, rgba(255,255,255,0) 60%),\
                       radial-gradient(circle at 50% 50%, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 40%)",
                  }}
                />
                <div className="absolute inset-0 grid place-items-center p-6">
                  <div className="w-full max-w-xl rounded-xl border border-white/15 bg-white/10 p-6 md:p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,.35)]">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-white/70">CR Signature Look</div>
                    <h3 className="mt-2 text-3xl md:text-4xl font-extrabold leading-[1.05] bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                      Liquid Glass, soft glow, clean edges
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-white/75 max-w-[48ch]">
                      “We&apos;re crafting something new. Stay tuned.” Minimal copy. Maximum polish.
                    </p>
                    <div
                      className="mt-4 h-px w-full"
                      style={{ background: "linear-gradient(90deg, rgba(124,58,237,.9), rgba(124,58,237,0))" }}
                    />
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/80">
                      <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1">Glassmorphism</span>
                      <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1">Neon soft-glow</span>
                      <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1">Responsive</span>
                    </div>
                  </div>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full opacity-25 blur-2xl"
                  style={{ background: "radial-gradient(closest-side, rgba(124,58,237,.45), transparent 70%)" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-7xl px-4 md:px-8 pb-4">
          <ol className="grid gap-3 sm:grid-cols-3 text-sm text-white/85">
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="block">1) Pick a template</strong>
              Liquid, Neon, Noir, Aurora, Terminal, Photo…
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="block">2) Tweak & preview</strong>
              Colors, fonts, layout, countdown, footer links.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="block">3) Export a single HTML</strong>
              Copy, open, or download. Host anywhere.
            </li>
          </ol>
        </section>

        {/* Generator */}
        <section id="generator" className="mx-auto max-w-7xl px-4 md:px-8 pb-16">
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold tracking-tight">Generator</h2>
              <span className="text-xs text-white/60">Design → Preview → Export .html</span>
            </div>

            {/* ErrorBoundary para evitar pantalla en blanco y mostrar el fallo en UI */}
            <ErrorBoundary>
              <CRSiteForge />
            </ErrorBoundary>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 text-xs text-white/70 flex items-center justify-between">
          <span>© {new Date().getFullYear()} CR•ForgeSite — fast “Coming Soon” pages for everyone</span>
          <a
            href="https://github.com/christian-ruuiz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-white/90"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
