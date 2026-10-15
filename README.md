# Scrapbook Developer Portfolio

A responsive portfolio starter inspired by the notebook / scrapbook style in the reference screenshots, including a bookish left sidebar with spiral binding. It uses plain HTML, CSS and JavaScript — no build tools or frameworks required.

## Run it
Open `index.html` in your browser. For best results, use VS Code with the Live Server extension.

## Personalise it first
1. In `index.html`, replace **Your Name**, the email address, social links, project names/descriptions, skills and certificate details.
2. Replace `href="#"` project links with your real URLs.
3. Put your CV at `assets/cv.pdf` (create the `assets` folder), or change the Download CV link.
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
