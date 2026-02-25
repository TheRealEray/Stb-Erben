# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Steuerkanzlei Ibrahim Erben** (tax law firm, Düren). Pure HTML5 + CSS3 + vanilla JavaScript — no framework, no bundler, no build step. All production code lives in `redesign/`.

- **Live site**: https://steuerkanzlei-erben-demo.netlify.app
- **Netlify Site ID**: `7005f2c7-f59c-4187-a53a-c0351375bd47`
- **Working directory**: `/Users/eray/Desktop/IE Steuerberatung/redesign`

## Commands

**Local development** (needed for i18n JSON to load correctly):
```bash
cd "/Users/eray/Desktop/IE Steuerberatung/redesign"
python3 -m http.server 8000
# → http://localhost:8000
```

**Deploy to production**:
```bash
cd "/Users/eray/Desktop/IE Steuerberatung/redesign"
netlify deploy --prod
```

**Verify deployment** (always do this after deploy — Netlify caches aggressively):
```bash
sleep 5 && curl -s https://steuerkanzlei-erben-demo.netlify.app/assets/css/styles.css | grep "expected-string"
```

**Force cache invalidation** (append a timestamp comment before deploying):
```bash
echo "<!-- Updated $(date +%s) -->" >> redesign/assets/css/styles.css
echo "<!-- Updated $(date +%s) -->" >> redesign/index.html
```

**Quality gate** (runs automatically on task completion via hook):
```bash
bash .claude/hooks/quality-gate.sh
```

**Check site structure** (validates all required files exist):
```bash
bash redesign/check_website.sh
```

## Architecture

### File Layout
```
redesign/
├── assets/css/styles.css          # All styles — single file, ~4700+ lines
├── assets/js/
│   ├── main.js                    # Mobile nav toggle, FAQ accordion — NOT loaded on all pages
│   ├── i18n.js                    # Multi-language system (DE/TR/EN)
│   ├── cookies.js                 # GDPR cookie consent banner
│   ├── navigation-helpers.js      # TOC sidebar, scroll-to-top, search modal, back button
│   ├── features.js                # Progress bar, dark mode, sticky CTA, reading mode, newsletter
│   └── tools.js                   # All calculator logic (Einkommensteuer, Brutto-Netto, Pflegegeld, etc.)
├── assets/translations/
│   ├── de.json / tr.json / en.json
└── [14 HTML pages]
```

### JavaScript Loading Pattern
Each HTML page has its own inline `<script>` block at the bottom for mobile nav, language switcher, and dropdown handling. External scripts load after: `cookies.js → navigation-helpers.js → i18n.js → features.js` (and `tools.js` on tools.html). **`main.js` is not included** in the script tags of most pages — its functionality is duplicated inline.

### CSS Architecture
Single `styles.css` file using **BEM naming** (`.hero__slide--active`, `.nav__item--has-dropdown`). CSS custom properties defined in `:root`:
- Colors: `--color-primary: #1e3a8a`, `--color-accent: #0066cc`, `--color-bg`, `--color-bg-light`, `--color-bg-dark`, `--color-border`
- Spacing: `--spacing-xs` (0.5rem) through `--spacing-2xl` (4rem)
- **`--header-height` is NOT defined** — use the hardcoded value `80px` if needed

Breakpoints: `768px` (mobile/tablet), `960px` (early hamburger), `1100px` (compact nav).

### i18n System
HTML elements use `data-i18n="key.path"` attributes. `i18n.js` loads the matching JSON file and replaces text content. Language priority: URL `?lang=xx` → `localStorage` → browser language → `de` (default). Input placeholders use `data-i18n-placeholder`.

### Pages with TOC Sidebar
Only the three `wissen-*.html` pages include `.toc-sidebar`, `.toc-toggle-btn`, and the TOC toggle logic. `wissen.html` is the overview page and does NOT have a TOC.

### Tools Calculator
All 14 interactive tools are defined as HTML template strings inside `getToolContent()` in `tools.js`, loaded into a modal on click. Calculation functions use 2025 official values (Grundfreibetrag 12.096 €, Minijob-Grenze 556 €, etc.).

## Deployment Rules

Netlify caches files based on content hashes. **Never assume a deploy succeeded** just because the CLI reports success — always `curl` to verify:

1. Append timestamp comment to modified files
2. `netlify deploy --prod`
3. `sleep 5 && curl -s https://... | grep "expected-content"`

## Key Patterns

**Active nav link**: Each page sets `nav__link--active` on its own nav item manually (no JS).

**Hero accordion** (`leistungen.html`): 8 panels in `.hero-accordion__panels`. First click activates panel, second click on the active panel smooth-scrolls to the matching `data-anchor` section ID. Mobile layout switches to vertical (`flex-direction: column`, `height` transitions) at ≤768px.

**Floating button stack** (desktop, right side, bottom-up): WhatsApp (1.5rem) → TOC toggle (5.5rem) → scroll-to-top (9.5rem), all at `right: 1.5rem`. On mobile, scroll-to-top moves to `left: 1.5rem` to avoid overlap.

**Dark mode**: Toggled via `[data-theme="dark"]` on `<body>` (set by `features.js`). Persisted in `localStorage`.

**Section anchors** on `leistungen.html`: `#steuerstrafrecht`, `#insolvenz`, `#wegzug`, `#ecommerce`, `#heilberufe`, `#immobilien`, `#nachfolge`, `#betreuung`.
