// src/components/CRSiteForge.tsx — CR•ForgeSite
// UI refinada (inputs, toggles, paneles), templates mejorados, sin email forms.
// Marca de agua inamovible: Shadow DOM cerrado + auto-heal (CR).

import React, { useMemo, useState, useEffect, useCallback } from "react"

type Theme = "dark" | "light"
type TemplateKey =
  | "liquid"
  | "noir"
  | "neon"
  | "aurora"
  | "split"
  | "terminal"
  | "photo"
  | "poster"
  | "mesh"

type Toast = { id: number; text: string }

export default function CRSiteForge() {
  // Content
  const [brand, setBrand] = useState("CR SiteForge")
  const [headline, setHeadline] = useState("Building something new")
  const [sub, setSub] = useState("We move fast. Stay tuned.")
  const [website, setWebsite] = useState("#")
  const [repo, setRepo] = useState("#")

  // Style & layout
  const [accent, setAccent] = useState("#7c3aed")
  const [radius, setRadius] = useState(22)
  const [shadow, setShadow] = useState(42)
  const [maxWidth, setMaxWidth] = useState(980)
  const [align, setAlign] = useState<"center" | "left">("center")
  const [noise, setNoise] = useState(true)
  const [blob, setBlob] = useState(true)
  const [theme, setTheme] = useState<Theme>("dark")

  // Features
  const [showSocial, setShowSocial] = useState(true)
  const [timer, setTimer] = useState(true)
  const defaultTarget = new Date(Date.now() + 7 * 24 * 3600 * 1000)
  const [targetDate, setTargetDate] = useState(toLocalInputValue(defaultTarget))
  const [progressOn, setProgressOn] = useState(false)
  const [progress, setProgress] = useState(40)

  // Preview
  const [template, setTemplate] = useState<TemplateKey>("liquid")
  const [aspect, setAspect] = useState("16/10")
  const [showGrid, setShowGrid] = useState(false)

  // Typography
  const [fontName, setFontName] = useState("Inter")
  const [fontUrl, setFontUrl] = useState(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
  )

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([])
  const pushToast = useCallback((text: string) => {
    const t: Toast = { id: Date.now() + Math.random(), text }
    setToasts((q) => [...q, t])
    setTimeout(() => setToasts((q) => q.filter((x) => x.id !== t.id)), 1800)
  }, [])

  // Generate HTML
  const html = useMemo(() => {
    const targetIso = toIsoIfLocal(targetDate)
    const t = templates[template]
    return t.html({
      brand,
      headline,
      sub,
      website,
      repo,
      accent,
      radius,
      shadow,
      maxWidth,
      align,
      noise,
      blob,
      theme,
      showSocial,
      timer,
      targetIso,
      progressOn,
      progress,
      fontName,
      fontUrl,
    })
  }, [
    template,
    brand,
    headline,
    sub,
    website,
    repo,
    accent,
    radius,
    shadow,
    maxWidth,
    align,
    noise,
    blob,
    theme,
    showSocial,
    timer,
    targetDate,
    progressOn,
    progress,
    fontName,
    fontUrl,
  ])

  // Actions
  const copyHTML = async () => {
    await navigator.clipboard.writeText(html)
    pushToast("HTML copied")
  }
  const downloadHTML = () => {
    downloadBlob(html, slug(`${brand}-${template}.html`), "text/html")
    pushToast("HTML downloaded")
  }
  const openPreview = () => {
    const win = window.open("")
    const blobFile = new Blob([html], { type: "text/html" })
    if (win) win.location.href = URL.createObjectURL(blobFile)
    pushToast("Preview opened")
  }

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName.match(/INPUT|TEXTAREA|SELECT/)) return
      if (e.key === "c") copyHTML()
      if (e.key === "o") openPreview()
      if (e.key === "d") downloadHTML()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [copyHTML])

  // Smoke tests
  useEffect(() => {
    try {
      console.assert(/<!doctype html>/i.test(html), "doctype present")
      console.assert(/<h1>/.test(html), "headline present")
      console.assert(/data-theme=\"(dark|light)\"/.test(html), "theme attr present")
      console.assert(/CR•ForgeSite/.test(html) || /cr-stamp-host/.test(html), "CR watermark present")
    } catch (e) {
      console.warn("CR smoke test failed", e)
    }
  }, [html])

  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* Preview */}
      <section className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <header className="flex items-center justify-between gap-2 p-4 border-b border-white/10">
          <div className="text-base md:text-lg font-semibold tracking-tight">
            {brand}
            <span className="ml-2 rounded bg-white/10 px-2 py-0.5 text-xs">Generator</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button onClick={copyHTML} title="Copy HTML (c)">⧉ Copy</Button>
            <Button onClick={openPreview} title="Open (o)">👁️ Open</Button>
            <Button onClick={downloadHTML} title="Download .html (d)">⭳ Download</Button>
          </div>
        </header>

        <div className="p-4">
          <div className="relative">
            <Preview html={html} aspect={aspect} showGrid={showGrid} />
            <div className="pointer-events-auto absolute right-3 top-3 z-10 flex gap-2">
              <IconBtn onClick={copyHTML} label="Copy (c)">⧉</IconBtn>
              <IconBtn onClick={openPreview} label="Open (o)">👁️</IconBtn>
              <IconBtn onClick={downloadHTML} label="Download (d)">⭳</IconBtn>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="pointer-events-auto rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-md shadow"
            >
              {t.text}
            </div>
          ))}
        </div>
      </section>

      {/* Controls */}
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <div className="grid gap-4">
          <Panel title="Content" defaultOpen>
            <div className="grid gap-3">
              <Field label="Brand">
                <Input value={brand} onChange={setBrand} placeholder="Your brand" />
              </Field>

              <Field label="Headline">
                <Input value={headline} onChange={setHeadline} placeholder="Big bold headline" />
              </Field>

              <Field label="Subcopy">
                <Textarea value={sub} onChange={setSub} placeholder="Short description or promise" />
              </Field>

              <div className="grid grid-cols-2 gap-2">
                <Field label="Website URL">
                  <Input value={website} onChange={setWebsite} placeholder="https://yourdomain.com" />
                </Field>
                <Field label="GitHub URL">
                  <Input value={repo} onChange={setRepo} placeholder="https://github.com/you/repo" />
                </Field>
              </div>

              <Row>
                <Toggle label="Show footer links" value={showSocial} onChange={setShowSocial} />
                <Button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </Button>
              </Row>
            </div>
          </Panel>

          <Panel title="Style">
            <div className="grid gap-3">
              <Field label="Accent">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="h-9 w-12 rounded-md border border-white/15 bg-black/40"
                  />
                  <Input value={accent} onChange={setAccent} className="font-mono" />
                </div>
              </Field>

              <RangeRow label="Radius" value={radius} min={0} max={36} step={1} onChange={setRadius} />
              <RangeRow label="Shadow" value={shadow} min={0} max={80} step={1} onChange={setShadow} />

              <div className="grid grid-cols-2 gap-2">
                <Field label="Font family">
                  <Input value={fontName} onChange={setFontName} placeholder="Inter" />
                </Field>
                <Field label="Google Fonts URL">
                  <Input value={fontUrl} onChange={setFontUrl} placeholder="https://fonts.googleapis.com/..." />
                </Field>
              </div>

              <Row>
                <Toggle label="Liquid blob" value={blob} onChange={setBlob} />
                <Toggle label="Texture noise" value={noise} onChange={setNoise} />
              </Row>
            </div>
          </Panel>

          <Panel title="Layout">
            <div className="grid gap-3">
              <RangeRow label="Max width" value={maxWidth} min={640} max={1440} step={10} onChange={setMaxWidth} />

              <Field label="Align">
                <Segmented
                  value={align}
                  onChange={(v) => setAlign(v as any)}
                  options={[
                    { label: "Center", value: "center" },
                    { label: "Left", value: "left" },
                  ]}
                />
              </Field>

              <Field label="Preview">
                <div className="flex items-center gap-3">
                  <Segmented
                    value={aspect}
                    onChange={setAspect}
                    options={[
                      { label: "16:10", value: "16/10" },
                      { label: "16:9", value: "16/9" },
                      { label: "3:2", value: "3/2" },
                      { label: "4:3", value: "4/3" },
                      { label: "9:16", value: "9/16" },
                    ]}
                  />
                  <Toggle label="Grid" value={showGrid} onChange={setShowGrid} />
                </div>
              </Field>
            </div>
          </Panel>

          <Panel title="Timer">
            <div className="grid gap-3">
              <Toggle label="Enable countdown" value={timer} onChange={setTimer} />
              {timer && (
                <>
                  <Field label="Target">
                    <input
                      type="datetime-local"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-black/30 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </Field>
                  <Row>
                    <Button onClick={() => setTargetDate(toLocalInputValue(new Date(Date.now() + 3 * 864e5)))}>+3d</Button>
                    <Button onClick={() => setTargetDate(toLocalInputValue(new Date(Date.now() + 7 * 864e5)))}>+7d</Button>
                    <Button onClick={() => setTargetDate(toLocalInputValue(new Date(Date.now() + 30 * 864e5)))}>+30d</Button>
                  </Row>
                  <Row>
                    <Toggle label="Progress bar" value={progressOn} onChange={setProgressOn} />
                    {progressOn && (
                      <div className="flex items-center gap-2 flex-1">
                        <label className="text-sm w-24">Progress</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={progress}
                          onChange={(e) => setProgress(parseInt(e.target.value || "0", 10))}
                          className="flex-1"
                        />
                        <span className="text-xs w-10 text-right">{progress}%</span>
                      </div>
                    )}
                  </Row>
                </>
              )}
            </div>
          </Panel>

          <Panel title="Templates">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(templates).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setTemplate(k as TemplateKey)}
                  className={`group text-left rounded-xl border p-3 ${
                    template === k ? "border-white/60 bg-white/10" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="text-sm font-medium">{v.name}</div>
                  <div className="opacity-60 text-xs">{k}</div>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    </div>
  )
}

/* --------------------------- Small primitives --------------------------- */

function Panel({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details className="group rounded-xl border border-white/10 overflow-hidden" open={defaultOpen}>
      <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium bg-white/5 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-white/60 group-open:rotate-180 transition-transform">⌄</span>
      </summary>
      <div className="p-3">{children}</div>
    </details>
  )
}

function Button({
  onClick,
  children,
  title,
}: {
  onClick: () => void
  children: React.ReactNode
  title?: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm hover:bg-white/15 active:scale-[.98] transition"
    >
      {children}
    </button>
  )
}

function IconBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-md border border-white/20 bg-black/40 px-2 py-1 text-sm backdrop-blur-md hover:bg-black/50"
    >
      {children}
    </button>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>
}

/* Fielded inputs */

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs uppercase tracking-wide text-white/70">{label}</span>
      {children}
    </label>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 ${className}`}
    />
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="min-h-[80px] rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
    />
  )
}

function RangeRow({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
}) {
  return (
    <div className="grid gap-1.5">
      <span className="text-xs uppercase tracking-wide text-white/70">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs w-12 text-right">{value}</span>
      </div>
    </div>
  )
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: Array<{ label: string; value: string }>
}) {
  return (
    <div className="inline-flex rounded-lg border border-white/15 bg-black/30 p-1">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 text-sm rounded-md transition ${
              active ? "bg-white/15 border border-white/20" : "hover:bg-white/10"
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------ Preview ------------------------------ */

function Preview({ html, aspect, showGrid }: { html: string; aspect: string; showGrid: boolean }) {
  const ratioClass =
    {
      "16/10": "aspect-[16/10]",
      "16/9": "aspect-[16/9]",
      "3/2": "aspect-[3/2]",
      "9/16": "aspect-[9/16]",
      "4/3": "aspect-[4/3]",
    }[aspect] || "aspect-[16/10]"

  return (
    <div className={`relative w-full ${ratioClass} bg-black rounded-xl overflow-hidden`}>
      {showGrid && (
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(#ffffff16_1px,transparent_1px),linear-gradient(90deg,#ffffff16_1px,transparent_1px)] [background-size:40px_40px]" />
      )}
      <iframe title="preview" className="absolute inset-0 h-full w-full" srcDoc={html} />
    </div>
  )
}

/* ------------------------------ Templates ------------------------------ */

type TemplateCfg = {
  brand: string
  headline: string
  sub: string
  website: string
  repo: string
  accent: string
  radius: number
  shadow: number
  maxWidth: number
  align: "center" | "left"
  noise: boolean
  blob: boolean
  theme: Theme
  showSocial: boolean
  timer: boolean
  targetIso: string
  progressOn: boolean
  progress: number
  fontName: string
  fontUrl: string
}

const templates: Record<TemplateKey, { name: string; html: (cfg: TemplateCfg) => string }> = {
  liquid: {
    name: "Liquid Glass",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <div class="wrap ${cfg.align === "left" ? "left" : ""}">
          ${cfg.blob ? '<div class="blob"></div>' : ""}
          <div class="glass">
            <div class="logo">${cfg.brand}</div>
            <h1>${cfg.headline}</h1>
            <p class="sub">${cfg.sub}</p>
            ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
            ${cfg.showSocial ? `<footer><a href="${cfg.website}" aria-label="website">Website</a><a href="${cfg.repo}" aria-label="github">GitHub</a></footer>` : ""}
          </div>
        </div>`,
        css: `
        body{margin:0;background:radial-gradient(1000px 700px at 12% 8%, color-mix(in oklab,var(--bg) 85%, var(--ac) 15%) 0%, var(--bg) 36%, var(--bg) 100%); color:var(--fg)}
        .wrap{position:relative;min-height:100%;display:grid;place-items:center;padding:clamp(24px,4vw,64px)}
        .wrap.left{place-items:start center}
        .blob{position:absolute;inset:auto -12% -18% auto;width:60vmax;height:60vmax;background:radial-gradient(closest-side,var(--ac),transparent 70%);filter:blur(90px);opacity:.28;animation:float 14s ease-in-out infinite alternate}
        @keyframes float{to{transform:translate3d(-4%, -2%,0)}}
        .glass{position:relative;width:min(var(--max),92vw);backdrop-filter:saturate(150%) blur(18px);background:linear-gradient(120deg,rgba(255,255,255,.10),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.16);border-radius:var(--radius);box-shadow:0 22px calc(var(--shadow)*1px) rgba(0,0,0,.46);padding:clamp(20px,4vw,50px);${cfg.align === "left" ? "margin-inline:auto;" : ""}}
        .logo{font-weight:800;letter-spacing:.12em;text-transform:uppercase;opacity:.95;margin-bottom:10px;font-size:.9rem}
        h1{font-size:clamp(36px,6.2vw,68px);margin:.25em 0;color:var(--fg);text-shadow:0 1px 12px rgba(0,0,0,.35)}
        .sub{opacity:.92;margin:.6rem 0 1.4rem;max-width:60ch;text-shadow:0 1px 8px rgba(0,0,0,.28)}
        .timer{display:flex;gap:10px;margin:14px 0 22px;opacity:.98}
        .timer .box{padding:10px 14px;border-radius:14px;background:color-mix(in oklab, var(--fg), transparent 94%);border:1px solid color-mix(in oklab, var(--fg), transparent 88%);text-shadow:0 1px 6px rgba(0,0,0,.2)}
        footer{display:flex;gap:16px;margin-top:18px;opacity:.9}
        a{color:var(--fg);text-decoration:none}
        .wrap:before{content:"";position:fixed;inset:0;pointer-events:none;opacity:calc(.12*var(--noise));background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.22"/></svg>')}
        [data-theme="light"] .glass{background:linear-gradient(120deg,rgba(0,0,0,.04),rgba(0,0,0,.02));border-color:rgba(0,0,0,.12)}
        [data-theme="light"] .timer .box{background:color-mix(in oklab,#000,transparent 94%);border-color:color-mix(in oklab,#000,transparent 88%)}
        `,
        js: timerJS,
      }),
  },
  noir: {
    name: "Noir Minimal",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <main class="noir ${cfg.align === "left" ? "left" : ""}">
          <header><span>${cfg.brand}</span><span class="dot"></span></header>
          <h1>${cfg.headline}</h1>
          <p>${cfg.sub}</p>
          <div class="line"></div>
          ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
          ${cfg.progressOn ? `<div class="bar" style="--p:${cfg.progress}%"></div>` : ""}
        </main>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .noir{min-height:100%;padding:8vmin;display:grid;align-content:center;gap:2.2vmin;max-width:var(--max);margin-inline:auto}
        .noir.left{margin-left:clamp(16px,6vw,80px)}
        header{display:flex;justify-content:space-between;align-items:center;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
        .dot{width:10px;height:10px;border-radius:50%;background:var(--ac);display:inline-block;box-shadow:0 0 25px var(--ac)}
        h1{font-size:clamp(40px,8vw,96px);line-height:1.02;margin:0;text-shadow:0 1px 12px rgba(0,0,0,.35)}
        p{opacity:.9;max-width:60ch;text-shadow:0 1px 8px rgba(0,0,0,.2)}
        .line{height:1px;background:linear-gradient(90deg,var(--ac),transparent)}
        .timer{display:flex;gap:12px}
        .timer .box{padding:.6rem .9rem;border:1px solid color-mix(in oklab, var(--fg), transparent 88%);border-radius:12px;background:color-mix(in oklab, var(--bg), transparent 80%)}
        .bar{height:4px;background:linear-gradient(90deg,var(--ac),transparent);width:var(--p)}
        `,
        js: timerJS,
      }),
  },
  neon: {
    name: "Neon Grid",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <div class="grid">
          <div class="panel ${cfg.align === "left" ? "left" : ""}">
            <h1>${cfg.headline}</h1>
            <p>${cfg.sub}</p>
            ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
          </div>
        </div>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .grid{min-height:100%;display:grid;place-items:center;background-image:linear-gradient(color-mix(in oklab, var(--fg), transparent 95%) 1px,transparent 1px),linear-gradient(90deg,color-mix(in oklab, var(--fg), transparent 95%) 1px,transparent 1px);background-size:40px 40px}
        .panel{width:min(var(--max),92vw);padding:6vmin;border:1px solid color-mix(in oklab, var(--fg), transparent 85%);border-radius:var(--radius);background:radial-gradient(60% 80% at 20% 0%,color-mix(in oklab, var(--ac) 60%, transparent),transparent 60%),color-mix(in oklab, var(--bg), transparent 55%);backdrop-filter:blur(10px);margin-inline:auto}
        .panel.left{margin-left:clamp(16px,6vw,80px)}
        h1{font-size:clamp(36px,6vw,72px);margin:0 0 10px 0;text-shadow:0 1px 12px rgba(0,0,0,.35)}
        p{opacity:.9;margin:0 0 16px 0;max-width:60ch;text-shadow:0 1px 8px rgba(0,0,0,.2)}
        .timer{display:flex;gap:12px}
        .timer .box{padding:.6rem .9rem;border-radius:12px;background:color-mix(in oklab, var(--fg), transparent 94%);border:1px solid color-mix(in oklab, var(--fg), transparent 88%)}
        `,
        js: timerJS,
      }),
  },
  aurora: {
    name: "Aurora Waves",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <section class="aurora ${cfg.align === "left" ? "left" : ""}">
          <div class="fx"></div><div class="fx two"></div>
          <div class="card">
            <div class="logo">${cfg.brand}</div>
            <h1>${cfg.headline}</h1>
            <p>${cfg.sub}</p>
            ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
          </div>
        </section>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .aurora{min-height:100%;position:relative;display:grid;place-items:center;padding:8vmin}
        .aurora.left{place-items:start center}
        .fx,.fx.two{position:absolute;inset:-20% -10% auto;filter:blur(60px);opacity:.45;border-radius:50%}
        .fx{background:radial-gradient(circle at 30% 40%,var(--ac),transparent 60%)}
        .fx.two{background:radial-gradient(circle at 70% 30%,#4f46e5,transparent 60%)}
        .card{position:relative;width:min(var(--max),92vw);padding:clamp(24px,4vw,56px);background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.03));border:1px solid color-mix(in oklab, var(--fg), transparent 88%);border-radius:var(--radius);box-shadow:0 20px calc(var(--shadow)*1px) rgba(0,0,0,.55)}
        .logo{font-weight:800;text-transform:uppercase;letter-spacing:.14em;opacity:.95}
        h1{font-size:clamp(36px,7.5vw,84px);margin:.3em 0;text-shadow:0 1px 12px rgba(0,0,0,.35)}
        p{opacity:.94;max-width:62ch;text-shadow:0 1px 8px rgba(0,0,0,.2)}
        .timer{display:flex;gap:10px;margin-top:16px}
        .timer .box{padding:10px 14px;border-radius:12px;background:color-mix(in oklab, var(--fg), transparent 94%);border:1px solid color-mix(in oklab, var(--fg), transparent 88%)}
        `,
        js: timerJS,
      }),
  },
  split: {
    name: "Split Hero",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <div class="split">
          <aside></aside>
          <main>
            <div class="logo">${cfg.brand}</div>
            <h1>${cfg.headline}</h1>
            <p>${cfg.sub}</p>
            ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
          </main>
        </div>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .split{min-height:100%;display:grid;grid-template-columns:1.1fr 1.2fr}
        aside{background:radial-gradient(120% 120% at 20% 20%,var(--ac),transparent 60%),linear-gradient(180deg,color-mix(in oklab, var(--bg), transparent 10%),var(--bg));filter:saturate(120%)}
        main{display:grid;align-content:center;gap:18px;padding:clamp(24px,6vw,80px)}
        .logo{font-weight:800;text-transform:uppercase;letter-spacing:.14em;opacity:.95}
        h1{font-size:clamp(36px,7vw,84px);margin:0;text-shadow:0 1px 12px rgba(0,0,0,.35)}
        p{opacity:.94;max-width:60ch;text-shadow:0 1px 8px rgba(0,0,0,.2)}
        .timer{display:flex;gap:10px}
        .timer .box{padding:10px 14px;border-radius:12px;background:color-mix(in oklab, var(--fg), transparent 94%);border:1px solid color-mix(in oklab, var(--fg), transparent 88%)}
        @media (max-width:900px){.split{grid-template-columns:1fr}.timer{justify-content:flex-start}}
        `,
        js: timerJS,
      }),
  },
  terminal: {
    name: "Terminal Pulse",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <div class="term">
          <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
          <pre>$ init build\n> echo "${cfg.brand}"\n> status: shipping soon...\n</pre>
          ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
        </div>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .term{min-height:100%;display:grid;place-items:center;padding:10vmin}
        .bar{display:flex;gap:6px;position:relative;top:8px}
        .dot{width:10px;height:10px;border-radius:50%;background:var(--ac);box-shadow:0 0 18px var(--ac)}
        pre{width:min(var(--max),92vw);background:color-mix(in oklab, var(--bg), transparent 40%);backdrop-filter:blur(6px);border:1px solid color-mix(in oklab, var(--fg), transparent 86%);border-radius:var(--radius);padding:24px;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;font-size:clamp(12px,2.2vw,16px)}
        .timer{margin-top:14px;display:flex;gap:10px}
        .timer .box{padding:8px 10px;border-radius:10px;background:color-mix(in oklab, var(--fg), transparent 94%);border:1px solid color-mix(in oklab, var(--fg), transparent 88%)}
        `,
        js: timerJS,
      }),
  },
  photo: {
    name: "Photo Hero",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <section class="photo">
          <div class="layer"></div>
          <div class="content">
            <h1>${cfg.headline}</h1>
            <p>${cfg.sub}</p>
            ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
          </div>
        </section>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .photo{min-height:100%;position:relative;display:grid;place-items:center;background-image:url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop');background-size:cover;background-position:center}
        .layer{position:absolute;inset:0;background:linear-gradient(180deg, color-mix(in oklab, var(--bg), transparent 12%), color-mix(in oklab, var(--bg), transparent 22%))}
        .content{position:relative;width:min(var(--max),92vw);padding:clamp(24px,4vw,56px);backdrop-filter:blur(6px);background:color-mix(in oklab, var(--bg), transparent 58%);border:1px solid color-mix(in oklab, var(--fg), transparent 86%);border-radius:var(--radius)}
        h1{font-size:clamp(36px,7vw,84px);margin:0 0 6px 0;text-shadow:0 1px 12px rgba(0,0,0,.35)}
        p{opacity:.95;max-width:60ch;text-shadow:0 1px 8px rgba(0,0,0,.2)}
        .timer{display:flex;gap:10px;margin-top:12px}
        .timer .box{padding:10px 14px;border-radius:12px;background:color-mix(in oklab, var(--fg), transparent 94%);border:1px solid color-mix(in oklab, var(--fg), transparent 88%)}
        `,
        js: timerJS,
      }),
  },
  poster: {
    name: "Poster Type",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <section class="poster ${cfg.align === "left" ? "left" : ""}">
          <h1>${cfg.headline}</h1>
          <p>${cfg.sub}</p>
          ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
          ${cfg.showSocial ? `<div class="meta"><a href="${cfg.website}">Website</a> — <a href="${cfg.repo}">GitHub</a></div>` : ""}
        </section>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .poster{min-height:100%;display:grid;align-content:center;gap:18px;padding:10vmin;max-width:var(--max);margin-inline:auto}
        .poster.left{margin-left:clamp(16px,6vw,80px)}
        h1{font-size:clamp(44px,9vw,120px);line-height:.95;margin:0;background:linear-gradient(180deg,var(--fg),color-mix(in oklab,var(--fg),transparent 28%));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 1px 14px rgba(0,0,0,.35)}
        p{opacity:.95;max-width:62ch}
        .timer{display:flex;gap:12px}
        .timer .box{padding:.6rem .9rem;border-radius:12px;background:color-mix(in oklab,var(--fg),transparent 93%);border:1px solid color-mix(in oklab,var(--fg),transparent 86%)}
        .meta{opacity:.85}
        a{color:var(--fg);text-decoration:none}
        `,
        js: timerJS,
      }),
  },
  mesh: {
    name: "Gradient Mesh",
    html: (cfg) =>
      baseHTML({
        ...cfg,
        body: `
        <div class="mesh ${cfg.align === "left" ? "left" : ""}">
          <div class="card">
            <div class="logo">${cfg.brand}</div>
            <h1>${cfg.headline}</h1>
            <p>${cfg.sub}</p>
            ${cfg.timer ? `<div id="cr-timer" class="timer" data-target="${cfg.targetIso}"></div>` : ""}
            ${cfg.showSocial ? `<footer><a href="${cfg.website}">Website</a><a href="${cfg.repo}">GitHub</a></footer>` : ""}
          </div>
        </div>`,
        css: `
        body{margin:0;background:var(--bg);color:var(--fg)}
        .mesh{min-height:100%;position:relative;display:grid;place-items:center;padding:8vmin}
        .mesh.left{place-items:start center}
        .mesh:before,.mesh:after{content:"";position:absolute;inset:-20% -10% auto;filter:blur(80px);opacity:.4;border-radius:50%}
        .mesh:before{background:radial-gradient(closest-side,var(--ac),transparent 70%)}
        .mesh:after{background:radial-gradient(closest-side,#22d3ee,transparent 70%);transform:translate(30%,20%)}
        .card{position:relative;width:min(var(--max),92vw);padding:clamp(24px,4vw,56px);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02));border:1px solid color-mix(in oklab,var(--fg),transparent 86%);border-radius:var(--radius);box-shadow:0 22px calc(var(--shadow)*1px) rgba(0,0,0,.5)}
        .logo{font-weight:800;text-transform:uppercase;letter-spacing:.14em;opacity:.95}
        h1{font-size:clamp(38px,7vw,88px);margin:.3em 0;text-shadow:0 1px 12px rgba(0,0,0,.35)}
        p{opacity:.94;max-width:62ch;text-shadow:0 1px 8px rgba(0,0,0,.2)}
        .timer{display:flex;gap:10px;margin-top:14px}
        .timer .box{padding:10px 14px;border-radius:12px;background:color-mix(in oklab,var(--fg),transparent 94%);border:1px solid color-mix(in oklab,var(--fg),transparent 88%)}
        footer{display:flex;gap:16px;margin-top:18px;opacity:.9}
        a{color:var(--fg);text-decoration:none}
        `,
        js: timerJS,
      }),
  },
}

/* ------------------------------ HTML Builder ------------------------------ */

function baseHTML({
  // usados en <head> y variables CSS
  brand,
  sub,
  accent,
  radius,
  shadow,
  maxWidth,
  noise,
  theme,
  progressOn,
  progress,
  fontName,
  fontUrl,
  // payload renderizado por la plantilla
  body,
  css,
  js,
}: {
  brand: string
  sub: string
  accent: string
  radius: number
  shadow: number
  maxWidth: number
  noise: boolean
  theme: Theme
  progressOn: boolean
  progress: number
  fontName: string
  fontUrl: string
  body: string
  css: string
  js: string
}) {
  const safe = (s: string) => `${s}`.replace(/</g, "&lt;")
  const GH_URL = "https://github.com/christian-ruuiz/" // <-- pon tu URL exacta (perfil o repo)

  const stampJS = `
    (function(){
      try{setInterval(() => ensure(), 3000);

        var HOST_ID='cr-stamp-host'; var URL='${GH_URL.replace(/'/g, "%27")}';
        function ensure(){
          var host = document.getElementById(HOST_ID);
          if(!host){ host = document.createElement('div'); host.id=HOST_ID; document.body.appendChild(host); }
          if(!host.hasAttribute('data-cr-stamped')){
            host.style.position='fixed'; host.style.right='10px'; host.style.bottom='10px';
            host.style.zIndex='2147483647'; host.style.pointerEvents='auto'; host.style.userSelect='none';
            host.setAttribute('aria-hidden','false'); host.setAttribute('data-cr-stamped','1');
            var root = host.attachShadow({mode:'closed'});
            var style=document.createElement('style');
            style.textContent='.crwm{all:initial;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;font-size:10px;color:#fff;opacity:.45;background:rgba(0,0,0,.35);padding:6px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(6px);text-decoration:none;display:inline-flex;gap:6px;align-items:center} .crwm:hover{opacity:.75} @media print{.crwm{display:none}}';
            var a=document.createElement('a'); a.className='crwm'; a.href=URL; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='created by Christian Ruiz';
            root.appendChild(style); root.appendChild(a);
          }
        }
        ensure();
        new MutationObserver(function(){ if(!document.getElementById(HOST_ID)) ensure(); }).observe(document.documentElement,{childList:true,subtree:true});
        setInterval(() => ensure(), 3000);
      }catch(e){}
    })();
  `

  return `<!doctype html>
  <!-- CR watermark: generated with CR•ForgeSite -->
  <html lang="en" data-theme="${theme}">
  <head>
    <meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${safe(brand)} — Coming Soon</title>
    <meta name="description" content="${safe(sub)}"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${fontUrl}" rel="stylesheet">
    <style>
      :root{--ac:${accent};--radius:${radius}px;--shadow:${shadow};--max:${maxWidth}px;--noise:${noise ? 1 : 0};--bg:#000;--fg:#fff}
      [data-theme="light"]{--bg:#f7f7fb;--fg:#0b0b10}
      *{box-sizing:border-box} html,body{height:100%}
      @media (prefers-reduced-motion: reduce){*,*:before,*:after{animation-duration:0.001ms!important;animation-iteration-count:1!important;transition-duration:0.001ms!important;scroll-behavior:auto!important}}
      ${css}
    </style>
  </head>
  <body style="font-family:${fontName},ui-sans-serif,system-ui; background:var(--bg); color:var(--fg);">
    ${body}
    ${progressOn ? `<div aria-hidden="true" style="position:fixed;left:0;bottom:0;height:3px;width:${progress}%;background:var(--ac);box-shadow:0 0 calc(var(--shadow)*1px) color-mix(in oklab, var(--ac), transparent 60%);"></div>` : ""}
    <script>
      ${js}
    </script>
    <script>
      ${stampJS}
    </script>
  </body>
  </html>`
}


/* ------------------------------ Utils ------------------------------ */

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
function downloadBlob(text: string, filename: string, mime: string) {
  const a = document.createElement("a")
  const file = new Blob([text], { type: mime })
  a.href = URL.createObjectURL(file)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
function toLocalInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
function toIsoIfLocal(v: string) {
  const d = new Date(v)
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
}

/* ------------------------------ Timer JS ------------------------------ */
// Cuenta atrás sencilla (sin dependencias), selecciona #cr-timer[data-target]
const timerJS = `
  (function(){
    var el = document.getElementById('cr-timer'); if(!el) return;
    var iso = el.getAttribute('data-target'); var target = iso ? new Date(iso) : new Date(Date.now()+7*24*3600*1000);
    var fmt = function(n){ return String(n).padStart(2,'0'); };
    function box(v, l){return '<div class="box">'+fmt(v)+l+'</div>'}
    function tick(){ var d = target - new Date();
      var days = Math.max(0, Math.floor(d/86400000));
      var hours = Math.max(0, Math.floor((d%86400000)/3600000));
      var mins = Math.max(0, Math.floor((d%3600000)/60000));
      var secs = Math.max(0, Math.floor((d%60000)/1000));
      el.innerHTML = box(days,'d')+box(hours,'h')+box(mins,'m')+box(secs,'s'); }
    tick(); setInterval(tick,1000);
  })();
`
/* Toggle (switch) */
function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="inline-flex items-center justify-between gap-3 select-none">
      <span className="text-sm text-white/90">{label}</span>
      <span className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className="block h-5 w-9 rounded-full border border-white/20 bg-white/20 peer-checked:bg-white/60 transition-colors"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4"
          aria-hidden="true"
        />
      </span>
    </label>
  )
}
