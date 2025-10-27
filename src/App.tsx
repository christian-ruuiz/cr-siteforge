import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type GeneratorCmp = React.ComponentType;

export default function Hero({ Generator }: { Generator: GeneratorCmp }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  // Spotlight (solo desktop)
  useEffect(() => {
    const el = rootRef.current;
    if (!el || isCoarse) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isCoarse]);

  return (
    <>
      <section
        ref={rootRef}
        role="banner"
        aria-label="CR•ForgeSite hero"
        className="relative overflow-hidden min-h-[92svh] grid place-items-center px-6 md:px-12 lg:px-16 bg-[#0b0812] text-white [padding-top:calc(env(safe-area-inset-top,0px)+2rem)] [padding-bottom:calc(env(safe-area-inset-bottom,0px)+2rem)]"
        style={{
          backgroundImage:
            "radial-gradient(520px 260px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08), transparent 60%)",
        }}
      >
        <BackgroundDecor />

        <div className="relative z-10 w-full max-w-7xl">
          <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-10 items-center">
            {/* Copy & CTAs */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs md:text-sm backdrop-blur-sm"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="opacity-80">
                  Exports a single, upload-ready HTML file
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="mt-5 text-[clamp(2rem,7vw,4.25rem)] md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
              >
                <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                  CR•ForgeSite
                </span>
                <br />
                <span className="bg-[conic-gradient(at_10%_10%,#e879f9_0deg,#22d3ee_120deg,#34d399_240deg,#e879f9_360deg)] bg-clip-text text-transparent">
                  Build stunning Coming Soon pages in minutes
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="mt-6 max-w-2xl mx-auto lg:mx-0 text-base md:text-lg text-white/80"
              >
                Pick a template, tune colors and type, drop in the countdown,
                and export. No odd dependencies. No build hoops. One file — done.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <a
                  href="#builder"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-semibold bg-white text-[#0b0812] hover:opacity-95 active:opacity-90 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-[#0b0812]"
                >
                  🚀 Start building
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <a
                  href="#templates"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-semibold border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60 focus-visible:ring-offset-[#0b0812]"
                >
                  🎨 Browse templates
                </a>
              </motion.div>

              {/* Value bullets con check SVG nítido */}
              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-white/80"
              >
                {[
                  "Responsive by default",
                  "Live preview & theming",
                  "Built-in countdown & mailing list",
                  "SEO & OpenGraph baked in",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          d="M5 10.5l3 3 7-7"
                          stroke="rgb(52 211 153)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </motion.ul>

              {/* Keyboard hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 inline-flex items-center gap-2 text-xs text-white/60"
              >
                <kbd className="rounded-md border border-white/15 bg-white/5 px-2 py-1">
                  /
                </kbd>
                <span>Quick search in templates</span>
              </motion.div>
            </div>

            {/* Preview panel con tilt (off en móvil) */}
            <TiltCard disabled={isCoarse}>
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-3 md:p-4 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
                <BrowserTopBar />
                <MockPreview />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="absolute -bottom-6 -right-2 md:-right-6"
              >
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
                  <p className="text-xs md:text-sm text-white/90 font-medium">
                    1-click export · No build step
                  </p>
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </div>

        {/* textura grain (reduce-motion => oculta) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay motion-reduce:hidden"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'4\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.3\\'/></svg>')",
          }}
        />
      </section>

      {/* BUILDER: usa TU generator sí o sí */}
      <section
        id="builder"
        className="relative px-6 md:px-12 lg:px-16 py-10 md:py-16 bg-[#0b0812]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl">
            <Generator />
          </div>
        </div>
      </section>
    </>
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
          maskImage:
            "radial-gradient(60% 60% at 50% 40%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 40%, black, transparent 70%)",
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
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          Nova Capsule
        </h3>
        <p className="mt-2 text-sm text-white/80">
          Minimal, bold, and centered. A clean hero with countdown and email
          capture.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 max-w-sm">
        {["12", "08", "35", "20"].map((v, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
          >
            <div className="text-2xl font-bold">{v}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/70">
              {["Days", "Hours", "Minutes", "Seconds"][i]}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          aria-label="Email"
          placeholder="Enter your email"
          className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm placeholder-white/60 outline-none ring-1 ring-inset ring-white/10 focus:ring-white/30"
        />
        <button className="rounded-xl bg-white px-4 text-sm font-semibold text-[#0b0812]">
          Notify me
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-white/80">
        {["Centered", "Split", "Fullscreen", "Gradient"].map((t) => (
          <span key={t} className="rounded-full bg-white/10 px-2 py-1">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function TiltCard({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const cx = useMotionValue(0.5);
  const cy = useMotionValue(0.5);
  const rotateX = useTransform(cy, [0, 1], [12, -12]);
  const rotateY = useTransform(cx, [0, 1], [-12, 12]);

  if (disabled) return <div className="relative">{children}</div>;

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        cx.set((e.clientX - r.left) / r.width);
        cy.set((e.clientY - r.top) / r.height);
      }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative motion-reduce:transform-none"
    >
      {children}
    </motion.div>
  );
}
