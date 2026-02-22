# 🌍 Mehrsprachige Website - Anleitung

## ✅ Was wurde gemacht?

Die Website ist jetzt **3-sprachig:**

- 🇩🇪 **Deutsch** (Standard, Root-Ordner)
- 🇹🇷 **Türkisch** (/tr/)
- 🇬🇧 **Englisch** (/en/)

## 📁 Ordnerstruktur

```
redesign/
├── index.html              🇩🇪 Deutsche Startseite
├── leistungen.html         🇩🇪 (noch zu übersetzen)
├── ueber-uns.html          🇩🇪 (noch zu übersetzen)
├── faq.html                🇩🇪 (noch zu übersetzen)
├── kontakt.html            🇩🇪 (noch zu übersetzen)
│
├── tr/                     🇹🇷 Türkische Seiten
│   └── index.html          ✅ Fertig übersetzt
│
├── en/                     🇬🇧 Englische Seiten
│   └── index.html          ✅ Fertig übersetzt
│
└── assets/                 (von allen Sprachen geteilt)
    ├── css/
    └── images/
```

## 🔧 Wie funktioniert der Sprachumschalter?

### Im Header jeder Seite:

```html
<div class="lang-switcher">
    <button class="lang-switcher__button">
        <span class="lang-flag">🇩🇪</span>
        <span>DE</span>
    </button>
    <div class="lang-switcher__dropdown">
        <a href="../index.html">🇩🇪 Deutsch</a>
        <a href="tr/index.html">🇹🇷 Türkçe</a>
        <a href="en/index.html">🇬🇧 English</a>
    </div>
</div>
```

- Klick auf Button → Dropdown öffnet sich
- Klick auf Sprache → Wechselt zur entsprechenden Version
- Aktuell ausgewählte Sprache ist markiert

## 📋 Was ist bereits übersetzt?

### ✅ FERTIG:

- **index.html** (Startseite) in allen 3 Sprachen
  - Hero-Section
  - Trust-Bar
  - Problem-Lösung-Boxen
  - Kernkompetenzen (6 Karten)
  - Prozess (3 Schritte)
  - CTA
  - Footer

### ⏳ NOCH ZU TUN:

Die folgenden Seiten müssen noch in TR und EN übersetzt werden:

1. **leistungen.html** (Services)
2. **ueber-uns.html** (About Us)
3. **faq.html** (FAQ)
4. **kontakt.html** (Contact)

## 🔄 Weitere Seiten übersetzen

### Schritt 1: Deutsche Seite kopieren

```bash
cp leistungen.html tr/leistungen.html
cp leistungen.html en/leistungen.html
```

### Schritt 2: Texteditor öffnen

Öffnen Sie z.B. `tr/leistungen.html`

### Schritt 3: HTML-Tag anpassen

```html
<!-- Vorher -->
<html lang="de">

<!-- Nachher -->
<html lang="tr">  (für Türkisch)
<html lang="en">  (für Englisch)
```

### Schritt 4: Pfade zu CSS/Bildern anpassen

```html
<!-- Vorher (Deutsche Version im Root) -->
<link rel="stylesheet" href="assets/css/styles.css">
<img src="assets/images/icon-globe.svg">

<!-- Nachher (TR/EN Version in Unterordner) -->
<link rel="stylesheet" href="../assets/css/styles.css">
<img src="../assets/images/icon-globe.svg">
```

**Wichtig:** `../` bedeutet "ein Ordner höher"

### Schritt 5: Sprachumschalter-Links anpassen

Für jede Seite müssen die Links korrekt sein:

**Beispiel für `/tr/leistungen.html`:**
```html
<a href="../leistungen.html">🇩🇪 Deutsch</a>
<a href="leistungen.html">🇹🇷 Türkçe</a> <!-- aktive Sprache -->
<a href="../en/leistungen.html">🇬🇧 English</a>
```

### Schritt 6: Inhalte übersetzen

Übersetzen Sie:
- Alle `<h1>`, `<h2>`, `<h3>` Überschriften
- Alle `<p>` Absätze
- Alle `<a>` Link-Texte
- Navigation (`<nav>`)
- Footer-Texte

**Beispiel:**

```html
<!-- Deutsch -->
<h2>Unsere Leistungen</h2>
<p>Wir begleiten Sie strategisch.</p>

<!-- Türkisch -->
<h2>Hizmetlerimiz</h2>
<p>Size stratejik olarak eşlik ediyoruz.</p>

<!-- Englisch -->
<h2>Our Services</h2>
<p>We accompany you strategically.</p>
```

## 🌐 Übersetzungs-Hilfen

### Kostenlose Online-Tools:

1. **DeepL.com** (Empfohlen!)
   - Beste Übersetzungsqualität
   - Deutsch ↔ Türkisch ↔ Englisch
   - Kostenlos bis 5.000 Zeichen

2. **Google Translate**
   - Schnell
   - Gut für erste Entwürfe
   - Sollte nachträglich geprüft werden

### Wichtig:

- ⚠️ **Automatische Übersetzungen immer prüfen!**
- Fachbegriffe korrekt übersetzen
- Tonalität beibehalten (professionell, klar)
- Türkische Sonderzeichen: ç, ğ, ı, ö, ş, ü, İ

## 📝 Wichtige Übersetzungen (Glossar)

| Deutsch | Türkisch | English |
|---------|----------|---------|
| Steuerberatung | Vergi Danışmanlığı | Tax Consulting |
| Wegzugssteuer | Yurtdışı Çıkış Vergisi | Exit Tax |
| E-Commerce | E-Ticaret | E-Commerce |
| Heilberufe | Sağlık Meslekleri | Healthcare Professions |
| Immobilien | Gayrimenkul | Real Estate |
| Nachfolge | Veraset | Succession |
| Laufende Betreuung | Sürekli Destek | Ongoing Support |
| Erstgespräch | İlk Görüşme | Initial Consultation |
| Kontakt | İletişim | Contact |
| Über uns | Hakkımızda | About Us |
| Leistungen | Hizmetler | Services |
| FAQ | SSS (Sıkça Sorulan Sorular) | FAQ |
| Impressum | Künye | Imprint |
| Datenschutz | Gizlilik Politikası | Privacy Policy |

## 🎯 SEO für mehrsprachige Websites

### Title-Tags anpassen:

**Deutsch:**
```html
<title>Steuerberater Düren | Steuerkanzlei Ibrahim Erben</title>
```

**Türkisch:**
```html
<title>Vergi Danışmanı Düren | Steuerkanzlei Ibrahim Erben</title>
```

**Englisch:**
```html
<title>Tax Advisor Düren | Steuerkanzlei Ibrahim Erben</title>
```

### Hreflang-Tags (optional, für besseres SEO):

Fügen Sie im `<head>` jeder Seite ein:

```html
<link rel="alternate" hreflang="de" href="https://ihr-domain.de/index.html" />
<link rel="alternate" hreflang="tr" href="https://ihr-domain.de/tr/index.html" />
<link rel="alternate" hreflang="en" href="https://ihr-domain.de/en/index.html" />
```

## 🔍 Checkliste für neue Sprachversionen

Bevor Sie eine übersetzte Seite veröffentlichen:

- [ ] HTML `lang` Attribut geändert
- [ ] CSS/Bild-Pfade angepasst (`../` hinzugefügt)
- [ ] Sprachumschalter-Links korrekt
- [ ] Alle Texte übersetzt (auch Alt-Texte!)
- [ ] Navigation übersetzt
- [ ] Footer übersetzt
- [ ] Title & Meta-Description übersetzt
- [ ] Im Browser getestet
- [ ] Mobile Version getestet
- [ ] Sprachumschalter funktioniert

## 💡 Tipps

### 1. Konsistente Übersetzung

Nutzen Sie immer die gleichen Übersetzungen für wiederkehrende Begriffe:
- "Erstgespräch" → immer "İlk Görüşme" (nicht mal "İlk Randevu")
- "Kontakt" → immer "Contact" (nicht mal "Get in touch")

### 2. Kulturelle Anpassungen

Manche Inhalte müssen kulturell angepasst werden:
- **Anrede:** Deutsch "Sie" → Türkisch formell, Englisch "you" (neutral)
- **Beispiele:** Deutsche Beispiele ggf. durch internationale ersetzen
- **Öffnungszeiten:** Bleiben gleich, nur Beschriftung ändern

### 3. Rechtliche Seiten

**Impressum & Datenschutz** bleiben auf Deutsch (rechtlich erforderlich).
Verlinken Sie in TR/EN-Versionen auf die deutschen Seiten:

```html
<a href="../impressum.html">Impressum</a>
<a href="../datenschutz.html">Privacy Policy (German)</a>
```

## 🚀 Veröffentlichung

### Alle Dateien hochladen:

```
/index.html           (Deutsch)
/tr/index.html        (Türkisch)
/en/index.html        (Englisch)
/assets/              (gemeinsam genutzt)
```

### Standard-Sprache:

Die deutsche Version (`/index.html`) ist die Standard-Startseite.

## 📞 Bei Problemen

### Sprachumschalter funktioniert nicht?

1. JavaScript am Ende der Seite prüfen
2. Browser-Cache leeren (Strg+Shift+R)
3. Browser-Konsole prüfen (F12 → Console)

### Bilder/CSS werden nicht geladen?

- Pfade prüfen: `../assets/` (nicht `assets/`)
- Groß-/Kleinschreibung beachten

### Übersetzung unsicher?

- DeepL verwenden
- Von Muttersprachler prüfen lassen
- Fachbegriffe im Kontext recherchieren

## 🎉 Fertig!

Ihre Website ist jetzt mehrsprachig!

**Nächste Schritte:**
1. Weitere Seiten übersetzen (leistungen, ueber-uns, etc.)
2. Übersetzungen von Muttersprachlern prüfen lassen
3. Website veröffentlichen

**Tipp:** Beginnen Sie mit den wichtigsten Seiten (Home, Leistungen, Kontakt).
