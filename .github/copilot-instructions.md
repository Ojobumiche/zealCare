<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this repo -->
# Copilot Instructions — my-app

This file contains concise, actionable guidance to help AI coding agents be productive in this Next.js project.

1. Project overview
- **Stack:** Next.js (app router, `app/`), React 19, TypeScript present, Tailwind CSS, PostCSS. See `package.json` for versions.
- **Layout & routing:** The app uses the Next `app/` directory. Root layout is `app/layout.tsx`; pages live under `app/*/page.tsx` (e.g. `app/page.tsx`).
- **Components:** UI components live in `src/components/`. Components may be `.jsx` or `.tsx`. Client components include a top-line `"use client"` (see `src/components/Navbar.jsx`).
- **Static assets:** `public/` holds images and static files. Example: logo at `public/images/logo.png` referenced in `Navbar.jsx`.

2. Developer workflows & commands
- **Dev server:** `npm run dev` (runs `next dev`). Use this to iterate locally on `http://localhost:3000`.
- **Build:** `npm run build` then `npm run start` to run the production build.
- **Lint:** `npm run lint` (configured to run `eslint`).
- **Package managers:** `npm` is primary here; `yarn`, `pnpm`, or `bun` may work but follow `package.json` scripts.

3. Repo-specific conventions
- **App dir first:** Prefer adding routes under `app/` rather than `pages/` (this project uses the new App Router).
- **Client components:** Any component that uses state, hooks, or browser-only APIs must declare `"use client"` at the top. Example: `src/components/Navbar.jsx`.
- **Styling:** Tailwind is used across the app (`app/globals.css`, `postcss.config.mjs`). Keep utility classes in components; avoid adding global rules unless necessary in `app/globals.css`.
- **Images:** Use `next/image` where appropriate for optimization (see `app/page.tsx` using `next/image`). Plain `<img />` is used in `Navbar.jsx` — acceptable for quick static assets, but prefer `next/image` for production images.
- **Routing links:** Use `Link` from `next/link` for internal navigation (the codebase follows this in `Navbar.jsx`).

4. Architecture notes & patterns
- **Fonts & global layout:** Fonts are loaded in `app/layout.tsx` using `next/font/google`. The layout applies CSS variables and antialiasing globally.
- **Component placement:** UI components go in `src/components/`. Route-specific UI should live near its route under `app/` if it is tightly coupled.
- **Mixed TS/JS:** The repo contains both `.tsx` and `.jsx` files; be careful with type imports and default exports when converting files.

5. Integration points & deployment
- **Vercel:** The README references Vercel; the default deploy target is Vercel. Build optimizations and image handling assume Next runtime.
- **No backend services detected:** There are no obvious external services (APIs) in the repo. If integrating APIs, place server code in `app/api/` or add environment variables in your deployment settings.

6. Guidance for making changes (practical examples)
- To add a new route `/about`: create `app/about/page.tsx` with a default export React component.
- To add a client component with state: create `src/components/MyWidget.jsx` with `"use client"` at the top, export default the component, and import into the page.
- To add a new global style: update `app/globals.css` and keep Tailwind utilities for small tweaks.

7. What to avoid / watchouts
- Do not move core layout from `app/layout.tsx` unless you update all routes; the layout controls fonts and global classes.
- When editing `Navbar.jsx`, preserve the `use client` behavior and Next `Link` usage. Converting to `next/image` requires updating imports and props (`width`, `height` or `fill`).
- Be mindful of mixing TypeScript and JS — when introducing types prefer `.tsx` files and update imports accordingly.

8. Files worth checking when unsure
- `package.json` — scripts and dependency versions.
- `app/layout.tsx`, `app/page.tsx` — global layout and the demo home page.
- `src/components/Navbar.jsx` — example client component and routing usage.
- `app/globals.css`, `postcss.config.mjs`, `tailwind.config.js` (if present) — styling setup.

If anything in this guidance is unclear or you want more examples (tests, CI, or conversion to TypeScript), tell me which area to expand and I will update this file.
