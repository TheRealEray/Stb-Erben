# Steuerkanzlei Ibrahim Erben Steuerberatung – Website Redesign

## Übersicht

Dies ist die neu gestaltete Website für **Steuerkanzlei Ibrahim Erben Steuerberatung** aus Düren. Die Website wurde komplett neu konzipiert mit Fokus auf:

- **Vertrauen & Klarheit**: Seriöses Kanzlei-Design, klare Positionierung
- **Mandantengewinnung**: Klare CTAs, strukturierte Leistungsdarstellung
- **Mobile UX**: Responsive Design, mobile-first
- **Barrierearmut**: Semantisches HTML, Kontraste, Fokus-Stile
- **Performance**: Reines HTML + CSS, keine Build-Tools, schnelle Ladezeiten

---

## Dateien & Struktur

```
redesign/
├── index.html              # Startseite
├── leistungen.html         # Leistungen im Detail
├── ueber-uns.html          # Über uns / Kanzleiprofil
├── faq.html                # Häufige Fragen
├── kontakt.html            # Kontaktformular & Kontaktdaten
├── impressum.html          # Impressum (PLATZHALTER – muss ergänzt werden!)
├── datenschutz.html        # Datenschutz (PLATZHALTER – muss ergänzt werden!)
├── assets/
│   ├── css/
│   │   └── styles.css      # Alle Styles
│   └── images/             # Bilder (noch leer, bitte ergänzen)
└── README.md               # Diese Datei
```

---

## Lokal öffnen & testen

Die Website ist eine reine **statische Website** (kein Backend erforderlich).

### So öffnen Sie die Website lokal:

1. Öffnen Sie den Ordner `redesign` im Finder
2. Doppelklick auf `index.html` – die Seite öffnet sich im Browser
3. Navigieren Sie durch die Website

**Oder:** Öffnen Sie die Website in einem lokalen Webserver:

```bash
cd /Users/eray/Desktop/IE\ Steuerberatung/redesign
python3 -m http.server 8000
```

Dann im Browser: `http://localhost:8000`

---

## Was ist neu?

### Inhaltlich:
- ✅ **Klare Positionierung**: Wegzug, E-Commerce, Heilberufe, Immobilien als Schwerpunkte
- ✅ **Transparenz**: FAQ, Ablauf, Kosten offen kommuniziert
- ✅ **Trust-Elemente**: Persönlicher Ansprechpartner, digitale Zusammenarbeit
- ✅ **Problem-Lösung-Struktur**: "Kennen Sie das?" statt nur Leistungslisten
- ✅ **Klare CTAs**: "Erstgespräch vereinbaren" als Hauptziel

### Design:
- ✅ **Modern & seriös**: Kanzlei-Look, keine "Startup-Spielerei"
- ✅ **Responsive**: Funktioniert auf allen Geräten (Desktop, Tablet, Mobile)
- ✅ **Schnell**: Keine externen Abhängigkeiten, System-Fonts
- ✅ **Barrierearme Umsetzung**: Kontraste, Fokus-Stile, semantisches HTML

### Technik:
- ✅ **Reines HTML + CSS + minimal JS**: Kein Framework, kein Build-Tool
- ✅ **SEO-Basics**: Title, Meta-Descriptions, semantische Headings
- ✅ **Mobile-first**: Optimiert für mobile Nutzung
- ✅ **Keine Tracker**: Datenschutzfreundlich, kein Google Analytics o.ä.

---

## Was müssen Sie noch anpassen?

### 🔴 KRITISCH (rechtlich erforderlich):

1. **Impressum** (`impressum.html`):
   - Vollständiger Name des Steuerberaters eintragen
   - Steuerberaterkammer eintragen (vermutlich Steuerberaterkammer Nordrhein-Westfalen)
   - Umsatzsteuer-ID eintragen
   - Berufshaftpflichtversicherung eintragen
   - Verantwortlicher nach RStV eintragen
   - **→ Bitte von einem Rechtsanwalt prüfen lassen!**

2. **Datenschutzerklärung** (`datenschutz.html`):
   - Vollständige DSGVO-konforme Datenschutzerklärung erstellen
   - Hosting-Anbieter nennen
   - Ggf. weitere externe Dienste ergänzen
   - **→ Nutzen Sie einen Datenschutz-Generator (z.B. eRecht24) oder lassen Sie die Erklärung von einem Fachanwalt erstellen!**

### 🟡 WICHTIG (inhaltlich):

3. **Kontaktformular** (`kontakt.html`):
   - Aktuell ist das Formular ein Platzhalter (nur clientseitige Validierung)
   - Sie brauchen ein Backend (PHP-Script, FormSpree, Newsletter-Tool etc.)
   - Alternativ: Mailto-Link oder externes Tool wie Typeform, Google Forms, etc.

4. **Team-Fotos** (`ueber-uns.html`):
   - Platzhalter für Teamfotos ist vorhanden
   - Bitte professionelle Fotos der Steuerberater einfügen
   - Format: z.B. 400x400px, quadratisch, professionell

5. **Annahmen prüfen** (siehe unten):
   - Gründungsjahr: "Seit 1998" – bitte korrigieren
   - Team-Größe: "X Steuerberater, Y Fachangestellte" – bitte konkrete Zahlen
   - Erstgespräch kostenlos? – bitte bestätigen
   - Digitale Tools: Welche konkret? (DATEV, Zoom, etc.)

### 🟢 OPTIONAL (Verbesserungen):

6. **Bilder**:
   - `assets/images/` ist noch leer
   - Bilder für Hero-Section, Team, Standort optional einfügbar
   - Tipp: Nutzen Sie lizenzfreie Business-Bilder (Unsplash, Pexels) oder eigene Fotos

7. **Termin-Tool**:
   - Falls Sie Calendly, YouCanBook.me oder MS Bookings nutzen: Embed-Code in `kontakt.html` einfügen

8. **Google Maps**:
   - Aktuell ist ein Platzhalter-Embed vorhanden
   - Bitte durch korrekten Google Maps Embed-Code ersetzen (Google Maps → "Teilen" → "Karte einbetten")

---

## Gemachte Annahmen

Folgende Annahmen wurden während der Erstellung getroffen. **Bitte prüfen und korrigieren:**

1. **Kanzlei-Geschichte**: "Seit 1998" – bitte korrektes Gründungsjahr eintragen
2. **Team-Größe**: "X Steuerberater, Y Fachangestellte" – bitte konkrete Zahlen einfügen
3. **Erstgespräch kostenlos**: Wird als kostenfrei (30 Min) angenommen – bitte bestätigen
4. **Parkplätze**: "Parkplätze vor Ort" – bitte prüfen
5. **Digitale Tools**: DATEV, Cloud-Buchhaltung, Video-Calls – bitte konkrete Tools nennen
6. **Telefonnummer**: +49 2421 99 848 10 ist korrekt (die Nummer 0221 999 832-0 aus der alten Website wurde als Fehler identifiziert)
7. **Email**: info@stberben.com ist korrekt (info@juhn.com war ein Template-Rest)
8. **Trust-Elemente**: "Persönlicher Ansprechpartner", "Digitale Zusammenarbeit" – bitte verifizieren
9. **Spezialisierungen**: Wegzug, E-Commerce, Heilberufe, Immobilien, Nachfolge – aus alter Website abgeleitet
10. **Standort**: Düren, Weierstraße 43 – verifiziert

---

## Texte anpassen

### Wo finde ich welche Texte?

Alle Texte sind direkt in den HTML-Dateien:

- **Startseite**: `index.html` – Hero, Kernkompetenzen, FAQ
- **Leistungen**: `leistungen.html` – Detaillierte Leistungsbeschreibungen
- **Über uns**: `ueber-uns.html` – Kanzlei-Story, Team, Philosophie
- **FAQ**: `faq.html` – Häufige Fragen & Antworten
- **Kontakt**: `kontakt.html` – Kontaktformular, Kontaktdaten

### Texte ändern:

1. Öffnen Sie die jeweilige HTML-Datei in einem Texteditor (z.B. VS Code, Sublime Text, Notepad++)
2. Suchen Sie den Text, den Sie ändern möchten (Strg+F / Cmd+F)
3. Ändern Sie den Text direkt im HTML
4. Speichern und im Browser aktualisieren (F5)

**Beispiel:**

```html
<!-- Vorher -->
<h1 class="hero__title">Steuerberatung für Unternehmer mit Weitblick</h1>

<!-- Nachher -->
<h1 class="hero__title">Ihr Partner für steuerliche Klarheit</h1>
```

---

## Design anpassen

### Farben ändern:

Alle Farben sind in `assets/css/styles.css` ganz oben als CSS-Variablen definiert:

```css
:root {
  --color-primary: #1e3a8a;      /* Dunkelblau */
  --color-accent: #0066cc;        /* CTA-Blau */
  --color-text: #1f2937;          /* Fast Schwarz */
  --color-bg: #ffffff;            /* Weiß */
}
```

Ändern Sie die Werte nach Ihren Wünschen, z.B.:

```css
--color-primary: #003366;  /* Anderes Blau */
--color-accent: #ff6600;   /* Orange statt Blau */
```

### Abstände / Größen ändern:

Auch die Abstände sind als Variablen definiert:

```css
:root {
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
}
```

---

## Bilder einfügen

### So fügen Sie Bilder ein:

1. Speichern Sie Ihre Bilder im Ordner `assets/images/`
2. Öffnen Sie die HTML-Datei, wo das Bild erscheinen soll
3. Fügen Sie ein `<img>`-Tag ein:

```html
<img src="assets/images/team.jpg" alt="Unser Team" style="width: 100%; border-radius: 8px;">
```

**Wichtig:** Immer einen `alt`-Text für Barrierefreiheit!

### Empfohlene Bildgrößen:

- **Hero-Hintergrund**: 1920x1080px (optional)
- **Team-Fotos**: 400x400px (quadratisch)
- **Leistungs-Icons**: 100x100px oder SVG
- **Standort-Foto**: 800x600px

---

## Website veröffentlichen

### Variante 1: Bei Ihrem aktuellen Hoster (Hostinger)

1. Loggen Sie sich in Ihr Hostinger-Konto ein
2. Gehen Sie zu "File Manager" oder nutzen Sie FTP (FileZilla)
3. Laden Sie alle Dateien aus dem `redesign/`-Ordner in das Root-Verzeichnis (meist `public_html/`)
4. Fertig! Die Website ist live.

### Variante 2: Neuer Hoster

Falls Sie zu einem anderen Hoster wechseln möchten:

- **Empfohlene Hoster**: Hetzner, All-Inkl, IONOS, Strato, Hostinger
- Alle bieten einfaches Webhosting für statische Websites
- Kosten: ca. 5–15 € / Monat

### Domainumzug (falls gewünscht):

Aktuell: `limegreen-monkey-750690.hostingersite.com`

Falls Sie eine eigene Domain wollen (z.B. `www.byerben.de` oder `www.stb-erben.de`):

1. Domain registrieren (bei Hoster oder Domain-Anbieter)
2. DNS auf Ihren Webspace zeigen lassen
3. Fertig!

---

## Technische Details

### Browser-Support:

- ✅ Chrome/Edge (ab Version 90)
- ✅ Firefox (ab Version 88)
- ✅ Safari (ab Version 14)
- ✅ Mobile Browser (iOS Safari, Chrome Android)

### Performance:

- HTML-Dateien: ~10–30 KB (unkomprimiert)
- CSS-Datei: ~15 KB (unkomprimiert)
- Keine externen Abhängigkeiten (Fonts, Libraries)
- **Ladezeit**: < 1 Sekunde (bei gutem Hosting)

### SEO:

- Title & Meta-Descriptions pro Seite vorhanden
- Semantische Headings (H1, H2, H3)
- Alt-Texte für Bilder
- Interne Verlinkung
- **Noch zu tun**: robots.txt, sitemap.xml (optional)

---

## Support & Kontakt

Falls Sie Fragen zur Website haben:

- **Technische Fragen**: Wenden Sie sich an einen Webentwickler Ihres Vertrauens
- **Rechtliche Fragen** (Impressum, Datenschutz): Wenden Sie sich an einen Fachanwalt für IT-Recht
- **Design-Änderungen**: Die CSS-Datei ist gut strukturiert und kommentiert

---

## Checkliste vor Go-Live

- [ ] Impressum vollständig ausgefüllt (inkl. USt-ID, Kammer, Versicherung)
- [ ] Datenschutzerklärung DSGVO-konform (Generator oder Anwalt)
- [ ] Kontaktformular mit Backend verbunden (oder Alternative)
- [ ] Team-Fotos eingefügt
- [ ] Alle Annahmen geprüft und korrigiert
- [ ] Google Maps Embed korrigiert
- [ ] Telefonnummer, Email, Adresse geprüft
- [ ] Texte Korrektur gelesen
- [ ] Alle Seiten im Browser getestet (Desktop + Mobile)
- [ ] Links auf tote Links geprüft

---

## Lizenz & Credits

- **Design & Code**: Custom erstellt für Steuerkanzlei Ibrahim Erben Steuerberatung
- **Fonts**: System-Fonts (keine externe Lizenz erforderlich)
- **Icons**: Unicode-Emojis (keine Lizenz erforderlich)
- **Bilder**: Noch nicht vorhanden – bitte eigene oder lizenzfreie Bilder verwenden

---

**Viel Erfolg mit Ihrer neuen Website! 🎉**
