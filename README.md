# ANTIQA — static café website

A responsive Uzbek-language café website. Plain HTML, CSS and vanilla JavaScript;
no framework, build tools, dependencies or server-side API. ANTIQA specializes
in fish dishes and has served guests since 2001. Contacts and coordinates are
confirmed; menu names/prices and illustrations remain **demonstration content**.
Opening hours are not yet supplied; no street address is claimed.

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
| Location label / coordinates | `CAFE.address`, `CAFE.latitude`, `CAFE.longitude` |
| Opening hours | `CAFE.hours` |
| Telegram | `CAFE.telegram`, a complete `https://t.me/...` URL |
| Instagram | `CAFE.instagram`, a complete HTTPS profile URL |
| Maps | `CAFE.googleMaps`, `CAFE.yandexMaps` |
| Website / canonical | `CAFE.website`, the final HTTPS site URL |
| Description / SEO | `CAFE.description`, `CAFE.seoDescription`, `CAFE.ogDescription` |
| Brand labels / history | `CAFE.shortDescription`, `CAFE.brandSubtitle`, `CAFE.footerSubtitle`, `CAFE.since` |
| Menu, categories, prices, photos | `MENU` array |

The phone, Telegram, Instagram, Google Maps and Yandex Maps links are real and
are also written into HTML so they work without JavaScript. HTTPS links open in
a new tab with `noopener noreferrer`. The map remains a stylized illustration,
not an embedded map, with real external map links and coordinates
(41.554582, 61.000446). Keep coordinates and the location label in sync.

Long-form section text and navigation labels live directly in `index.html`, grouped
by named semantic sections. Colors/fonts are in `:root` in `css/style.css`.
For SEO and visitors without JavaScript, also update initial name/contact text,
`<title>`, meta description, canonical, Open Graph tags and JSON-LD in `index.html`.
JavaScript synchronizes live metadata with `CAFE`, but social crawlers often read
only the original HTML. Current canonical/OG URL:
`https://antiqakafe.giran924.workers.dev/`. Update it in HTML and CAFE when a
custom domain is connected. The OG image currently uses the local SVG illustration;
replace it with a real JPG/PNG social image later for wider social-platform support.
The Restaurant schema includes the confirmed phone, history, cuisine, coordinates,
social profiles and both map links. Do not add a PostalAddress or opening hours
until confirmed.

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

There is no build step and no secret configuration. Menu examples and illustration
labels should remain until real dishes, prices and photography are supplied.
Deployment is not performed by this project.

## Checks

Check desktop/mobile widths, keyboard focus, mobile toggle/Escape/link dismissal,
all menu filters and full-menu reset, anchors, direct `file://` loading, reduced
motion and browser console. Local illustration assets work offline; Google Fonts gracefully fall back to system fonts.
