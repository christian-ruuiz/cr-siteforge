# ⚙️ CR•ForgeSite

**CR•ForgeSite** is a visual generator for *“Coming Soon”* and *“Under Construction”* pages — aesthetic, lightweight, and exportable as a single standalone HTML file ready to deploy anywhere.

Designed and developed by [Christian Ruiz](https://github.com/christian-ruuiz).

---

## 🚀 Key Features

* 🎨 **Live visual generator** for static launch pages (no backend, no dependencies).
* ⚡ **Instant export** – build a single `.html` file in seconds.
* 🌗 **Light/Dark themes** with multiple presets: Liquid Glass, Noir, Neon Grid, Aurora, Mesh, Terminal, and more.
* 🧩 **Refined UI/UX editor** – clean inputs, toggles, sliders, and segmented controls.
* 🦦 **Permanent CR watermark** – embedded with closed Shadow DOM + self-healing script.
* 🧠 **100% client-side** – no servers, no databases, no telemetry.
* 🛠️ **TypeScript + React + Vite** stack.

---

## 📦 Local Setup

```bash
git clone https://github.com/christian-ruuiz/cr-siteforge.git
cd cr-siteforge
pnpm install
pnpm dev
```

Then open in your browser:
🔗 `http://localhost:5173`

---

## 🧱 Production Build

```bash
pnpm build
```

This will generate an optimized static version inside the `dist/` folder.
You can preview it locally with:

```bash
pnpm preview
```

---

## 🌐 GitHub Pages Deployment

This project includes an automatic GitHub Actions workflow.

1. Ensure `.github/workflows/deploy.yml` exists.
2. On GitHub, go to **Settings → Pages → Source**, and select **GitHub Actions**.
3. Each push to `main` will trigger a new deployment at:

🔗 **[https://christian-ruuiz.github.io/cr-siteforge/](https://christian-ruuiz.github.io/cr-siteforge/)**

---

## 🧠 Project Structure

```
cr-siteforge/
│
├── public/
│   ├── logo.png           # Favicon / brand logo
│   ├── 404.html           # SPA redirect for GitHub Pages
│   └── .nojekyll          # Prevents Jekyll processing
│
├── src/
│   ├── App.tsx            # App shell & layout
│   ├── main.tsx           # React entrypoint
│   └── components/
│       └── CRSiteForge.tsx  # Main visual generator
│
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🧩 Customization

* **Default theme:** dark
* **Logo:** `public/logo.png`
* **Watermark:** automatically injected via CR self-healing script
* **Vite base path:** `/cr-siteforge/` (required for Pages compatibility)

---

## 🛠️ Tech Stack

| Technology                     | Purpose                       |
| ------------------------------ | ----------------------------- |
| **React 18**                   | Interactive UI                |
| **TypeScript**                 | Type safety                   |
| **Vite**                       | Lightning-fast bundling       |
| **Tailwind (utility classes)** | Clean, consistent styling     |
| **GitHub Actions**             | Automated deployment to Pages |

---

## 🪞 License

This project is intellectual property of **Christian Ruiz**.
Personal and educational use is permitted, but **commercial redistribution is prohibited** without explicit permission.

© 2025 — **CR•ForgeSite**

---

> *“Simplicity isn’t a limitation. It’s a declaration of power.”* — **CR**
