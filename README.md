# Portfolio 2026

A clean, minimal Apple-inspired dark-mode portfolio built with React, Tailwind CSS, and GSAP.

## Stack

- **React 18** + Vite
- **Tailwind CSS** for styling
- **GSAP** (with ScrollTrigger) for smooth scroll and entrance animations
- **React Router** (optional, single-page layout)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Customize

- **Content:** Edit `src/data/content.js` — profile, skills, projects, nav links, social URLs.
- **Sections:** Add or remove components in `src/App.jsx`.
- **Theme:** Accent color and surfaces are in `tailwind.config.js` and `src/index.css`.

## Structure

- `src/components/` — Navbar, Hero, About, Skills, Projects, Contact, Footer
- `src/data/content.js` — All copy and links in one place
- GSAP animations on Hero (entrance) and on scroll for About, Skills, Projects, Contact
