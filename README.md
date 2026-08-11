# Metzler Set-PDP – Türklingel „Stella" + Briefkasten „Siebert"

Standalone prototype of Metzler's **matching-set product page**: two products
(Türklingel Stella + Briefkasten Siebert) configured and bought together, with a
shared finish that instantiates both, a „bricht das Set" divergence path, and one
combined summary with a 10% set discount.

- `index.html` – the set PDP (reuses the Metzler PDP shell/design system)
- `set.css` / `set.js` – the set-specific configuration flow
- `pdp-b.css`, `pdp.css`, `chrome.css/js`, `Home/styles-v2.css` – shared design system (self-contained copy)

Split off from the single-product PDP prototype so it can evolve independently.
Local preview: `npx http-server -c-1 .`
