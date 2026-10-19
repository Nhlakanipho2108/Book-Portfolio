# Scrapbook Developer Portfolio

A responsive portfolio inspired by a notebook / scrapbook, including a bookish sidebar with spiral binding. It uses plain HTML, CSS and JavaScript — no build tools or frameworks required. Layouts adapt across desktop, tablet and mobile, with a scrollable mobile navigation and touch-friendly project and certificate interactions.

## Run it
Open `index.html` in your browser. For best results, use VS Code with the Live Server extension.

## Personalise it first
1. Update the name, email address, social links, project names/descriptions, skills and certificate details in the HTML pages and `script.js`.
2. Update project links in `projects.html` when your project URLs change.
3. The Download CV link currently uses `Nhlakanipho Luthuli Cv (3).pdf` in the project root; update the link if you move or rename the file.
4. Replace the portrait (`linked2.jpg`) in `about.html` with your own photo if you like.
5. Replace sample certificate cards with your actual qualifications and credential verification links.
6. In `contact.html` / `script.js`, set your real email (`CONTACT_EMAIL`) and social links.
7. In `style.css`, edit the colour variables at the top (`--paper`, `--ink`, `--orange`, etc.) to re-theme the site.

## Pages
`index.html` (home) · `projects.html` · `skills.html` · `about.html` · `certificates.html` · `contact.html`. All share `style.css` and `script.js`; the sidebar is repeated in each page, so update the nav in every file when adding a page (and mark that page's link `active`).

## Interactions included
- Responsive slide-in navigation on mobile
- Active navigation state while scrolling
- Project cards expand on click / keyboard
- Certificate cards flip on click / tap
- Reduced-motion accessibility support

Google Fonts are loaded from the web; the site falls back to system fonts if offline.
