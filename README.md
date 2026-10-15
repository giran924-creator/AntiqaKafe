# CAFÉ NAME — static café website

A responsive Uzbek-language café website. Plain HTML, CSS and vanilla JavaScript;
no framework, build tools, dependencies or server-side API. All business details,
menu prices and illustrations are explicitly **demonstration content**.

## Structure

- `index.html`: semantic sections, Uzbek editorial copy, SEO and gallery images.
- `css/style.css`: responsive layout, typography, colors and reduced-motion support.
- `js/app.js`: central `CAFE` business settings and `MENU` content; navigation,
  category filters, current year and progressive scroll reveals.
- `images/README.md`: local photograph names, sizes and replacement instructions.
- `favicon.svg`: editable brand symbol.

## Preview

Open `index.html` directly in a browser (no fetch/module imports), or run:

```sh
cd /workspace/AntiqaKafe
python3 -m http.server 8000 --bind 0.0.0.0
```

Open the local server in your own development browser. Only optional Google Fonts need Internet access. All illustration assets are local;
system fonts work offline.
No environment variables, API keys or installation are required.

## Edit content

The clearly marked configuration at the top of `js/app.js` is the main edit point:

| What | Setting |
|---|---|
| Café name | `CAFE.name` |
| Telephone label | `CAFE.phoneDisplay` |
| Telephone action | `CAFE.phone`, e.g. `tel:+998901234567` |
| Address | `CAFE.address` |
| Opening hours | `CAFE.hours` |
| Telegram | `CAFE.telegram`, a complete `https://t.me/...` URL |
| Instagram | `CAFE.instagram`, a complete HTTPS profile URL |
| Map | `CAFE.map`, a real Google Maps share URL |
| Website / canonical | `CAFE.website`, the final HTTPS site URL |
| Description | `CAFE.description` |
| Menu, categories, prices, photos | `MENU` array |

Empty contact URLs deliberately scroll to the clearly marked contact placeholders;
they do not call or link to invented businesses. The map is a stylized placeholder,
not an actual location or an embed. Set `CAFE.map` to enable its external link.
The contact notice disappears when all three contact actions have real URLs.

Long-form section text and navigation labels live directly in `index.html`, grouped
by named semantic sections. Colors/fonts are in `:root` in `css/style.css`.
For SEO and visitors without JavaScript, also update initial name/contact text,
`<title>`, meta description, canonical, Open Graph tags and JSON-LD in `index.html`.
JavaScript synchronizes live metadata with `CAFE`, but social crawlers often read
only the original HTML. Replace `https://example.com` everywhere, add your actual
`images/og-cover.jpg`, and supply truthful structured data before publishing.
No awards, history, working hours or exact location are claimed.

## Photographs

See `images/README.md`. Replace local SVG demonstration illustrations in HTML and MENU with
local `images/...` paths; all paths are relative to `index.html`. Replace sample
captions and alt descriptions after adding real images. Google Fonts are optional,
with Georgia and Arial fallbacks. No analytics, booking or form submission is included.

## GitHub and Cloudflare Pages

1. Review and commit the project files to your GitHub repository; push your branch.
2. In Cloudflare Pages, create a project and connect that repository.
3. Select the branch you published, framework preset **None**, leave the build
   command empty, and set output directory to `.` (repository root).
4. Deploy. Configure your custom domain if needed and update the SEO URLs to it.

There is no build step and no secret configuration. Do not publish before replacing
business and SEO placeholders. Deployment is not performed by this project.

## Checks

Check desktop/mobile widths, keyboard focus, mobile toggle/Escape/link dismissal,
all menu filters and full-menu reset, anchors, direct `file://` loading, reduced
motion and browser console. Local illustration assets work offline; Google Fonts gracefully fall back to system fonts.
