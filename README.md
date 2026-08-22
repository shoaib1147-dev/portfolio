# Shoaib Khan — Portfolio Website

A modern, high-performance developer portfolio built with semantic HTML5, modern CSS3 (Custom Properties & Glassmorphism), and vanilla JavaScript.

## 🚀 Features

- **Sleek Dark / Light Theme:** Supports instant theme toggling with `localStorage` memory and system color scheme detection.
- **Hero & Developer Profile Card:** Features an animated live availability status badge, syntax-highlighted developer profile card, and dual CTAs.
- **Categorized Skills Matrix:** Interactive badges with icons covering Backend & APIs, AI / ML & Agents, Databases, Frontend & Mobile, and DevOps.
- **Featured Projects Showcase:** Detailed project cards with gradient badges, feature bullets, tech stack pills, and GitHub / Live Demo action buttons (*NeuroMCQ*, *AI Coding Agent*, and *AI Content Generation System*).
- **Certifications & Achievements Showcase:** Dedicated credentials section featuring verified course certificates with full-screen lightbox preview modals.
- **Background & Journey Timeline:** Highlights the academic foundation in Electrical Engineering (Computing & AI) and backend engineering milestones.
- **Interactive Contact Section:** Modern input styling with validation and non-blocking toast notifications.
- **Performance & UX:** IntersectionObserver scroll reveal animations, active ScrollSpy navigation indicator, and fully responsive mobile drawer navigation.

## 📁 File Structure

```
/portfolio
├── index.html       # Semantic HTML5 structure with OpenGraph meta tags & sections
├── style.css        # CSS Custom Properties, Dark/Light theme system & glassmorphism
├── script.js        # Theme toggling, ScrollSpy, certificate modal, toast alerts
├── images/          # Certificate images and asset files
│   └── certificate-flutter.jpg
└── README.md        # Documentation & customization guide
```

## 🛠️ Customization

1. **Personal Information & Links:**
   - Update your email address and social profile URLs (GitHub, LinkedIn) in `index.html`.
2. **Projects:**
   - Add new projects or update existing ones by editing the `.project-card` containers in `#projects`.
3. **Form Integration (Optional):**
   - In `index.html`, connect the `<form id="contact-form">` to a backend API (FastAPI) or services like [Formspree](https://formspree.io) / [EmailJS](https://www.emailjs.com).
4. **Theme Colors:**
   - Customize accent colors and glow gradients in `:root` inside `style.css`.

---

Crafted for **Shoaib Khan** — Python Developer & AI/ML Engineer.