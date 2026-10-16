# AMG Advisory M&A website V5: hosting

This is a static website: plain HTML, CSS and JavaScript, with no build step needed on the server.

## Structure

```
site/
  index.html          Language entry: sends visitors to /es/ or /en/ (saved choice or browser language)
  404.html            Not-found page
  es/                 Spanish pages
    index.html        Inicio
    firma/            La firma
    servicios/        Servicios
    sector/           Sector
    equipo/           Equipo
    contacto/         Contacto
  en/                 English pages
    index.html        Home
    firm/  services/  sector/  team/  contact/
  assets/
    css/styles.css    Shared stylesheet
    js/site.js        Mobile menu, language preference, header state
    fonts/            Self-hosted Archivo and JetBrains Mono (SIL Open Font License, licence files included)
    images/           Favicon, photos/ (licensed photography), team/ (portraits)
```

## Deploy

1. Upload the contents of `site/` to the web root, or to a subfolder such as `/ma/`.
2. Any standard static host works (Apache, Nginx, Netlify, Cloudflare Pages, GitHub Pages, S3 and similar). The server must serve `index.html` for directory URLs. All of these do this by default.
3. Every internal link is relative, so the site also works from a subfolder. The one exception is `404.html`, which uses root paths (`/es/`, `/assets/`). If you host in a subfolder, edit the links in `404.html` or set the host's custom 404 path.
4. No server-side code, database or form handling is required. Contact works through email links and the booking link.

## Preview locally

From the folder that contains `site/`:

```
cd site
python3 -m http.server 8000
```

Then open http://localhost:8000. On a Mac you can instead double-click `Preview V5.command`. Opening the HTML files directly from Finder will not follow the clean folder links. Use a local server, or open the `preview/` build, whose links end in `index.html`.

## Before going live

- Remove `noindex`: set `"pre_launch": False` in `build/content.py`.
- Add the final domain: set `"base_url"` so canonical and hreflang tags are generated.
- Rebuild with `python3 build/build.py`.
- See the internal review notes for the approvals that must be resolved first.
