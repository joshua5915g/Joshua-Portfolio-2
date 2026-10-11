# Joshua Jose — Portfolio

Personal portfolio of **Joshua Jose**, a developer-designer and computer science student from Kerala, India. It showcases selected projects, a resume, and short notes, built by hand with plain HTML, CSS and JavaScript. There is no framework and no build step.

**Live site:** https://my-portfolio-mu-coral-54.vercel.app/

---

## Features

- **Hero, About, Work, Skills, Resume, Notes and Contact** sections in one page
- **Stacking project cards** that pin and layer as you scroll
- **Case-study overlays** for each project, and **reader overlays** for blog notes
- **Scroll-driven motion:** masked heading reveals, word-by-word text highlight, animated counters, magnetic buttons, cursor ring and a cursor-following glow
- **Smooth scrolling** with Lenis
- **Resume section** with education, languages, certifications and a PDF download
- **Contact form** that opens the visitor's email app with the message filled in
- **Responsive** from phones to large desktops
- **Accessible:** keyboard-navigable overlays, visible focus states, and a static fallback for visitors who prefer reduced motion

## Design

| | |
|---|---|
| Palette | Ember `#ff5a1f` and Amethyst `#a78bfa` on near-black `#0b0a0c` |
| Text | `#ede7e1` (muted `#9a938d`) |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (labels) |
| Motion rule | Animate `transform` and `opacity` only, for smooth frame rates |

## Tech stack

- HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript (ES6+)
- [GSAP](https://gsap.com/) 3.12.5 and ScrollTrigger for scroll animation
- [Lenis](https://lenis.darkroom.engineering/) 1.1.20 for smooth scrolling
- Google Fonts

GSAP, Lenis and the fonts load from CDNs, so an internet connection is needed. If they fail to load, the page still works as a normal static page.

## Project structure

```
.
├── index.html     # the whole site: markup, styles, scripts and content
├── resume.pdf     # linked from the Resume section
└── README.md
```

## Run locally

No install is needed. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 4173
```

Then visit http://localhost:4173.

## Customise

All editable text for projects, experiments and notes lives in the `window.SITE` object inside `index.html`. Search for `window.SITE`.

- **Add a project:** copy an entry in `projects` and change its fields.
- **Add a screenshot:** put the image in an `assets/` folder and set `img: "assets/name.jpg"` on that project. Without it, a designed placeholder is shown.
- **Add a note:** copy an entry in `posts`.
- **Change colours:** edit the variables at the top of the `<style>` block (`--ember`, `--amethyst`, `--bg`).
- **Update the resume:** replace `resume.pdf`.

## Deploy

The site is static, so any static host works.

- **Vercel or Netlify:** import the repository. There is no build command, so publish the root folder.
- **GitHub Pages:** go to Settings → Pages, choose "Deploy from a branch", then `main` and `/ (root)`.

## Contact

- Email: joshua5915g@gmail.com
- LinkedIn: https://www.linkedin.com/in/joshua-jose-466975371/
- GitHub: https://github.com/joshua5915g

---

© 2026 Joshua Jose. All rights reserved.
