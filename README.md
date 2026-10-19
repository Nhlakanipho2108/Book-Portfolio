# Scrapbook Developer Portfolio

A responsive scrapbook-style developer portfolio built with Vue 3 and Vue Router. The design, copy, and page URLs are preserved while shared navigation and page interactions are now Vue components.

## Run it

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Create and preview a production build with `npm run build` and `npm run preview`.

## Pages and source

The existing HTML page URLs remain available as Vite entry points: `index.html`, `projects.html`, `skills.html`, `about.html`, `certificates.html`, and `contact.html`. Page content lives in `src/pages/`; shared navigation and footer live in `src/components/`. `style.css` contains the site-wide scrapbook design.

## Personalise it

- Update page copy and project details in the relevant Vue page under `src/pages/`.
- Change shared navigation, email, or social links in `src/components/Sidebar.vue`.
- Replace public files in `public/` to update the portrait, project previews, certificates, or CV.
- Set the contact email and Formspree endpoint in `src/pages/ContactPage.vue`.
- Edit the theme variables at the start of `style.css` to change the colors.

## Interactions

- Responsive slide-in navigation with keyboard Escape support
- Project cards expand on click and keyboard activation
- Certificate cards flip on click or tap
- Contact form submits to Formspree
- Scroll, touch, and keyboard page-turn navigation
- Reduced-motion accessibility support

Google Fonts are loaded from the web; the site falls back to system fonts if offline.
