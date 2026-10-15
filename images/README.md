# Local photographs

Current images are original local SVG illustration placeholders, not photographs of the café.
`atmosphere.svg` and `coffee.svg` illustrate the space; `menu-1.svg` to `menu-6.svg`
illustrate sample dishes. They load offline and can be replaced independently.
Replace them with your own licensed photographs before launch.

Suggested files: `hero.webp` (2200×1467), `about.webp` (900×1100),
`gallery-1.webp` (900×1100), `gallery-2.webp`, `gallery-3.webp` (900×600),
`menu-1.webp` through `menu-6.webp` (800×600), and `og-cover.jpg` (1200×630).

Replace image `src` attributes in `index.html` with `images/filename.webp` and
MENU image values in `js/app.js` with the same relative paths. These paths work
when opening index.html directly. Keep width/height attributes; adjust alt text
and remove sample-image captions once authentic images are supplied. Optimize
WebP/AVIF images before uploading. Hero loads eagerly; other photographs load lazily.
For multiple image sizes you can add srcset and sizes to the HTML images.

## Official logo (not a placeholder)

`antiqa-logo.jpg` is the official, unmodified logo source (640×640). Header and
footer use it directly without cropping. `favicon-antiqa.png` is a full-image
64×64 resize; the root `favicon.ico` contains 16/32/48/64px sizes. `og-cover.jpg`
is a 1200×630 black social canvas with the full logo centered at 500×500.
These are deterministic resized derivatives; the artwork is not recreated.
