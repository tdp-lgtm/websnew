# Academic website template

A clean, fast, data-driven personal website for academics — built as plain
HTML/CSS/JS and hosted free on GitHub Pages. All content is edited through a
visual CMS (no coding), and the design is print-ready so your CV doubles as a
downloadable PDF.

## What's here

- `*.html` — the pages (home, research, talks, teaching, workshops, CV). Generic; you rarely need to touch these.
- `style.css`, `boot.js`, `render.js`, `nav.js` — the design and logic. You never need to edit these.
- `data/*.json` — **all your content lives here.** Edit these (directly, or via the CMS).
- `.pages.yml` — config for the Pages CMS editing interface.
- `assets/` — images (favicon, portrait, etc.).

## Setup (about 15 minutes)

1. **Create the repo.** On GitHub, click **Use this template → Create a new repository**. Name it (e.g. `yourname.github.io` for a clean URL, or anything).
2. **Enable GitHub Pages.** Repo → Settings → Pages → Source: `main` branch, `/root`. Your site goes live at `https://<username>.github.io/<repo>`.
3. **Personalise.**
   - Replace `Your Name` in the `.html` files (site title, footer, page `<title>`s).
   - Replace `assets/portrait.jpg` with your own photo.
   - Edit the `data/*.json` files — each currently holds one example entry showing the structure.
4. **(Optional) Set up the CMS.** Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, and point it at this repo. You then edit all content through forms — no JSON, no code.
5. **(Optional) Custom domain.** Buy a domain, add a `CNAME` file with your domain, and point DNS at GitHub Pages.

## Editing content

Each section is one JSON file in `data/`. Lists (publications, talks, etc.)
are arrays — copy an entry to add more. Most items have `published` (show on
site) and `cv` (show on CV) toggles so you can hide things without deleting
them. The CMS exposes all of this as friendly forms.
