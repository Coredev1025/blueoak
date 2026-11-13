# BlueOak Software LLC

React/Vite implementation of the supplied **BlueOak Software LLC — Software, engineered to outlast.html** reference. The saved bundle's application components and stylesheet sources have been recovered into editable modules; the preview host's recorder, overlays, telemetry, and development runtime are not included.

## Run and build

Use Node.js 22.12+ on the Node 22 release line, or Node.js 24+, with npm 10+.

```sh
npm ci
npm run dev
```

Vite prints the local preview URL, normally `http://localhost:5173`. `npm start` exposes development to the local network.

```sh
npm run build
npm run preview
```

Production hosting should serve `dist/` and rewrite application routes to `index.html`.

## Active source

- `main.jsx`: React entry point.
- `site/App.jsx`: routing, scroll management, motion preferences, and error boundary.
- `site/pages/`: homepage, services, work, detail pages, and 404.
- `site/components/`: reference sections, animation components, navigation, theme control, and contact form.
- `site/data/content.js`: service, project, team, testimonial, and career content from the reference.
- `site/data/visuals.js`: local image mapping.
- `site/index.css`, `site/cinematic.css`, `tailwind.config.js`: original stylesheet sources and matching utility tokens.
- `public/assets/`: images supplied in `/home/bee/Videos/BlueOak`.
- `public/brand/blueoak-logo.png`: supplied full BlueOak Software logo, used in the header, studio sign, and footer.
- `public/fonts/`: reference font CSS and font files.

The earlier root-level `pages/`, `components/`, `data/`, `runtime/`, `layout.jsx`, `styles.css`, and `theme.css` are retained to preserve the existing work. They are no longer imported by the active entry point.

## Reference behavior

The homepage includes the animated hero, film strip, industry marquee, studio, services, concept work, testimonials, team profiles, team moments, growth, careers, and contact sections. Smooth scrolling, progress indicator, custom pointer, section reveals, hover effects, and persistent light/dark themes follow the reference. Reduced-motion preferences disable continuous CSS animations, smooth scrolling, and the custom pointer.

Routes include `/services`, `/services/:serviceId`, `/work`, and `/work/:projectId`. Existing `/about` and `/contact` links redirect to the corresponding homepage sections. Team dialogs support Escape, focus containment, focus restoration, and scrolling on small screens.

The saved folder did not include `office-workspace.webp` or the secondary `blueoak-services/work/voices/team/contact.webp` backgrounds. Secondary pages reuse suitable supplied images through `site/data/visuals.js`. Homepage imagery uses the original supplied assets. The reference's concept-project and sample-testimonial labels are preserved.

## Contact delivery

Copy `.env.example` to `.env.local`, set `VITE_CONTACT_ENDPOINT` to a public JSON receiver, and restart development or rebuild. Without a receiver, submission is disabled and the form provides an email fallback. The old reference preview API is not used.

The endpoint receives `{ name, email, company, service, budget, message }`. Its 2xx response must confirm acceptance for delivery. A JSON `{ "id": "..." }` response optionally supplies a reference number; empty success responses also work. Failed or timed-out requests retain the entered brief and never show a success message. Cross-origin receivers must allow the website origin and `Content-Type` header through CORS.

All `VITE_` variables are public browser configuration. Keep private credentials on the receiving server.
