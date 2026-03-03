/**
 * news.js — Steuer-Aktuell News Feed
 * Fetches live RSS feeds from official German tax news sources
 * and renders them as a filterable editorial article layout.
 *
 * Sources: BMF, BFH, BGBl, Haufe (Steuern/Immobilien/Recht/Personal/Finance), Bundesrat
 * Static: Türkische Steuerquellen, Branchennews (Gastro, E-Commerce, Heilberufe, Juweliere, Handwerk)
 * Proxy: Netlify Function (primary), allorigins.win, rss2json.com (fallbacks)
 * Cache: localStorage (24h TTL) — only cached when articles > 0
 */

const NEWS_CACHE_KEY = 'news_cache_v4';
const NEWS_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 Stunden
const ARTICLES_PER_PAGE = 12;

// ────────────────────────────────────────────────────────────────
// RSS Feed Sources
// ────────────────────────────────────────────────────────────────

const FEEDS = [
  // — Steuerpolitik —
  {
    url: 'https://www.bundesfinanzministerium.de/SiteGlobals/Functions/RSSFeed/DE/Pressemitteilungen/RSSPressemitteilungen.xml',
    source: 'Bundesfinanzministerium',
    category: 'Steuerpolitik',
    icon: '🏛️'
  },
  // — Steuerrecht —
  {
    url: 'https://www.bundesfinanzministerium.de/SiteGlobals/Functions/RSSFeed/DE/Steuern/RSSSteuern.xml',
    source: 'BMF Steuern',
    category: 'Steuerrecht',
    icon: '📋'
  },
  {
    url: 'https://www.haufe.de/xml/rss_129148.xml',
    source: 'Haufe Steuer',
    category: 'Steuerrecht',
    icon: '⚖️'
  },
  // — Gesetzgebung —
  {
    url: 'https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_Announcement.xml?nn=4352850',
    source: 'Bundesrat',
    category: 'Gesetzgebung',
    icon: '📜'
  },
  {
    url: 'https://www.recht.bund.de/de/serviceseiten/rss/rss/feeds/rss_bgbl-1-2.xml?nn=211452',
    source: 'Bundesgesetzblatt',
    category: 'Gesetzgebung',
    icon: '📰'
  },
  // — Rechtsprechung —
  {
    url: 'https://www.bundesfinanzhof.de/de/precedent.rss',
    source: 'Bundesfinanzhof',
    category: 'Rechtsprechung',
    icon: '⚖️'
  },
  {
    url: 'https://www.bundesfinanzhof.de/de/news.rss',
    source: 'BFH Presse',
    category: 'Rechtsprechung',
    icon: '🔔'
  },
  // — Immobilien —
  {
    url: 'https://www.haufe.de/xml/rss_129166.xml',
    source: 'Haufe Immobilien',
    category: 'Immobilien',
    icon: '🏠'
  },
  // — Recht & Wirtschaft —
  {
    url: 'https://www.haufe.de/xml/rss_129178.xml',
    source: 'Haufe Recht',
    category: 'Recht & Wirtschaft',
    icon: '📖'
  },
  // — Personal & Lohn —
  {
    url: 'https://www.haufe.de/xml/rss_129174.xml',
    source: 'Haufe Personal',
    category: 'Personal & Lohn',
    icon: '👥'
  },
  // — Finanzen & Rechnungswesen —
  {
    url: 'https://www.haufe.de/xml/rss_129154.xml',
    source: 'Haufe Finance',
    category: 'Finanzen & Rechnungswesen',
    icon: '💰'
  }
];

// ────────────────────────────────────────────────────────────────
// Static Resource Articles (no RSS available)
// ────────────────────────────────────────────────────────────────

const STATIC_ARTICLES = [
  // — Türkei / International —
  {
    title: 'Mieteinnahmen in der Türkei: Besteuerung für Privatpersonen (GİB)',
    link: 'https://www.gib.gov.tr/vergi-konulari/1_bireysel/9_kira_geliri/9',
    description: 'Offizielle Informationen der türkischen Finanzverwaltung (Gelir İdaresi Başkanlığı) zur Besteuerung von Mieteinnahmen für Privatpersonen in der Türkei.',
    date: new Date('2026-01-15'),
    source: 'GİB Türkei',
    category: 'Türkei / International',
    icon: '🇹🇷',
    isStatic: true
  },
  {
    title: 'Einkommensteuer-Tarife Türkei 2026 (PwC Türkei)',
    link: 'https://www-pwc-com-tr.translate.goog/tr/hizmetlerimiz/vergi/bultenler/2026/2026-yili-bazi-gelir-vergisi-rakamlari.html?_x_tr_sl=tr&_x_tr_tl=de&_x_tr_hl=de&_x_tr_pto=sc',
    description: 'PwC Türkei: Aktuelle Einkommensteuer-Zahlen und Tarife für das Steuerjahr 2026 – automatisch ins Deutsche übersetzt.',
    date: new Date('2026-01-10'),
    source: 'PwC Türkei',
    category: 'Türkei / International',
    icon: '🇹🇷',
    isStatic: true
  },
  {
    title: 'Türkische Einkommensteuertarife – Verginet Übersicht',
    link: 'https://www.verginet.net/dtt/1/gelirvergisitarifesi_3804.aspx',
    description: 'Verginet.net: Detaillierte Übersicht der türkischen Einkommensteuertarife mit historischen Vergleichswerten und aktuellen Steuersätzen.',
    date: new Date('2026-01-08'),
    source: 'Verginet',
    category: 'Türkei / International',
    icon: '🇹🇷',
    isStatic: true
  },
  {
    title: 'Lohneinkünfte in der Türkei: Steuerliche Behandlung (GİB)',
    link: 'https://www.gib.gov.tr/vergi-konulari/1_bireysel/11_ucret_geliri/11',
    description: 'Offizielle Informationen der türkischen Finanzverwaltung zur Besteuerung von Lohn- und Gehaltseinkünften für Arbeitnehmer in der Türkei.',
    date: new Date('2026-01-15'),
    source: 'GİB Türkei',
    category: 'Türkei / International',
    icon: '🇹🇷',
    isStatic: true
  },
  // — Branchenspezifisch: Gastro & Hotellerie —
  {
    title: 'DEHOGA: Aktuelle Steuerthemen für Gastronomen und Hoteliers',
    link: 'https://www.dehoga-bundesverband.de/presse-events/aktuelles-statements/',
    description: 'Branchenverband DEHOGA: Aktuelle Nachrichten zu Umsatzsteuer, Trinkgeld-Regelungen, Kassensysteme und Betriebsprüfungen in der Gastronomie.',
    date: new Date('2026-03-01'),
    source: 'DEHOGA',
    category: 'Gastro & Hotellerie',
    icon: '🍽️',
    isStatic: true
  },
  {
    title: 'Registrierkassenpflicht und TSE: Was Gastronomen wissen müssen',
    link: 'https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Umsatzsteuer/umsatzsteuer.html',
    description: 'Seit 2020 ist die technische Sicherheitseinrichtung (TSE) für elektronische Kassensysteme Pflicht. Gastronomie und Einzelhandel sind besonders betroffen.',
    date: new Date('2026-02-15'),
    source: 'BMF',
    category: 'Gastro & Hotellerie',
    icon: '🍽️',
    isStatic: true
  },
  {
    title: 'Umsatzsteuer in der Gastronomie: 19% vs. 7% – Was gilt wann?',
    link: 'https://www.ihk.de/themen/recht-und-steuern/recht-und-steuern-index-5533742',
    description: 'Speisen vor Ort: 19% USt. Speisen zum Mitnehmen: 7% USt. Getränke immer 19%. Die Abgrenzung ist in der Praxis komplex – besonders bei Catering und Lieferdiensten.',
    date: new Date('2026-02-28'),
    source: 'IHK',
    category: 'Gastro & Hotellerie',
    icon: '🍽️',
    isStatic: true
  },
  {
    title: 'Trinkgeld steuerfrei: Voraussetzungen und Fallstricke für Arbeitgeber',
    link: 'https://www.haufe.de/personal/haufe-personal-office-platin/',
    description: 'Freiwilliges Trinkgeld ist für Arbeitnehmer steuerfrei (§ 3 Nr. 51 EStG). Aber: Zwangsweise erhobenes Service-Entgelt ist steuerpflichtig. Was Gastronomen beachten müssen.',
    date: new Date('2026-02-08'),
    source: 'Haufe',
    category: 'Gastro & Hotellerie',
    icon: '🍽️',
    isStatic: true
  },
  {
    title: 'Betriebsprüfung in der Gastronomie: Worauf das Finanzamt achtet',
    link: 'https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerverwaltungu-Steuerrecht/Betriebspruefung/betriebspruefung.html',
    description: 'Gastronomie gehört zu den prüfungsintensivsten Branchen. Kassennachschau, Vermögenszuwachsrechnung, Zeitreihenvergleich – die wichtigsten Prüfungsmethoden.',
    date: new Date('2026-01-22'),
    source: 'BMF',
    category: 'Gastro & Hotellerie',
    icon: '🍽️',
    isStatic: true
  },
  // — Branchenspezifisch: E-Commerce —
  {
    title: 'OSS-Verfahren: Umsatzsteuer im EU-Onlinehandel',
    link: 'https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/One-Stop-Shop_EU/one_stop_shop_eu_node.html',
    description: 'Bundeszentralamt für Steuern: One-Stop-Shop (OSS) für E-Commerce-Unternehmer – Umsatzsteuermeldung für EU-weite Fernverkäufe an einem Ort.',
    date: new Date('2026-02-20'),
    source: 'BZSt',
    category: 'E-Commerce',
    icon: '🛒',
    isStatic: true
  },
  {
    title: 'Amazon, eBay & Co.: Plattformhaftung und Umsatzsteuer',
    link: 'https://www.haufe.de/steuern/',
    description: 'Online-Marktplätze haften für die Umsatzsteuer ihrer Verkäufer. Was Händler über § 22f UStG und die Bescheinigung nach § 22f wissen müssen.',
    date: new Date('2026-02-10'),
    source: 'Haufe',
    category: 'E-Commerce',
    icon: '🛒',
    isStatic: true
  },
  {
    title: 'Dropshipping: Steuerliche Behandlung bei internationalen Lieferketten',
    link: 'https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/umsatzsteuer_node.html',
    description: 'Beim Dropshipping aus Drittländern (China, USA) gelten besondere Umsatzsteuer-Regelungen: Import-OSS, Zollrecht und die Lieferschwelle von 150 EUR.',
    date: new Date('2026-02-25'),
    source: 'BZSt',
    category: 'E-Commerce',
    icon: '🛒',
    isStatic: true
  },
  {
    title: 'Buchführungspflichten für Online-Händler: GoBD im E-Commerce',
    link: 'https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerverwaltungu-Steuerrecht/Abgabeordnung/abgabenordnung.html',
    description: 'GoBD-konforme Buchhaltung: Warenwirtschaftssysteme, elektronische Rechnungen, Aufbewahrungsfristen und Verfahrensdokumentation für Online-Shops.',
    date: new Date('2026-01-18'),
    source: 'BMF',
    category: 'E-Commerce',
    icon: '🛒',
    isStatic: true
  },
  {
    title: 'Kleinunternehmerregelung im E-Commerce: § 19 UStG richtig nutzen',
    link: 'https://www.ihk.de/themen/recht-und-steuern/recht-und-steuern-index-5533742',
    description: 'Umsatzgrenze, EU-Fernverkäufe, OSS-Pflicht: Wann gilt die Kleinunternehmerregelung noch? Was passiert bei Überschreiten der Grenzen im Onlinehandel?',
    date: new Date('2026-01-12'),
    source: 'IHK',
    category: 'E-Commerce',
    icon: '🛒',
    isStatic: true
  },
  // — Branchenspezifisch: Heilberufe —
  {
    title: 'Heilberufe: Umsatzsteuerbefreiung und aktuelle BFH-Rechtsprechung',
    link: 'https://www.bundesfinanzhof.de/de/entscheidungen/entscheidungen-online/',
    description: 'Ärzte, Zahnärzte und Therapeuten: Die Umsatzsteuerbefreiung nach § 4 Nr. 14 UStG und aktuelle Urteile zu Heilbehandlungsleistungen.',
    date: new Date('2026-02-18'),
    source: 'BFH',
    category: 'Heilberufe',
    icon: '🏥',
    isStatic: true
  },
  {
    title: 'MVZ-Gründung: Steuerliche Strukturierung und Fallstricke',
    link: 'https://www.kbv.de/infothek/zahlen-und-fakten/gesundheitsdaten/statistik-mvz',
    description: 'Medizinische Versorgungszentren (MVZ): Steuerliche Aspekte der Gründung, Rechtsformwahl und Gewinnverteilung zwischen den Gesellschaftern.',
    date: new Date('2026-01-25'),
    source: 'KBV',
    category: 'Heilberufe',
    icon: '🏥',
    isStatic: true
  },
  {
    title: 'Praxisbewertung beim Verkauf: Ertragswertverfahren für Ärzte',
    link: 'https://www.bundesaerztekammer.de/',
    description: 'Beim Praxisverkauf ist die steuerliche Bewertung entscheidend: Ertragswertverfahren, Substanzwertverfahren und die Fünftelregelung (§ 34 EStG) für Veräußerungsgewinne.',
    date: new Date('2026-02-12'),
    source: 'BÄK',
    category: 'Heilberufe',
    icon: '🏥',
    isStatic: true
  },
  {
    title: 'Rürup-Rente für Freiberufler: Maximale Steuerersparnis 2026',
    link: 'https://www.haufe.de/steuern/',
    description: 'Ärzte und Apotheker als Freiberufler: Bis zu 30.826 EUR (2026) als Sonderausgaben absetzbar. Basisrente als Baustein der Altersvorsorge.',
    date: new Date('2026-01-28'),
    source: 'Haufe',
    category: 'Heilberufe',
    icon: '🏥',
    isStatic: true
  },
  {
    title: 'Gewerbesteuer bei Ärzten: Wann droht die Abfärbung?',
    link: 'https://www.bundesfinanzhof.de/de/entscheidungen/entscheidungen-online/',
    description: 'Freiberufliche Einkünfte vs. gewerbliche Einkünfte: Die Abfärberegelung (§ 15 Abs. 3 Nr. 1 EStG) kann eine gesamte Praxis gewerbesteuerpflichtig machen.',
    date: new Date('2026-01-15'),
    source: 'BFH',
    category: 'Heilberufe',
    icon: '🏥',
    isStatic: true
  },
  // — Branchenspezifisch: Juweliere & Einzelhandel —
  {
    title: 'Differenzbesteuerung nach § 25a UStG: Für Juweliere und Antiquitätenhändler',
    link: 'https://www.haufe.de/steuern/',
    description: 'Beim An- und Verkauf gebrauchter Waren (Schmuck, Uhren, Antiquitäten) kann die Differenzbesteuerung die Umsatzsteuer erheblich reduzieren.',
    date: new Date('2026-02-05'),
    source: 'Haufe',
    category: 'Juweliere & Einzelhandel',
    icon: '💎',
    isStatic: true
  },
  {
    title: 'Bargeldintensive Branchen: Kassenführung und Betriebsprüfung',
    link: 'https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Umsatzsteuer/umsatzsteuer.html',
    description: 'Juweliere, Gastronomen und Einzelhändler stehen bei Betriebsprüfungen unter besonderer Beobachtung. Ordnungsgemäße Kassenführung ist Pflicht.',
    date: new Date('2026-01-20'),
    source: 'BMF',
    category: 'Juweliere & Einzelhandel',
    icon: '💎',
    isStatic: true
  },
  {
    title: 'Goldhandel: Umsatzsteuer bei Anlagegold vs. Schmuck',
    link: 'https://www.haufe.de/steuern/',
    description: 'Anlagegold (Barren, Münzen) ist nach § 25c UStG umsatzsteuerfrei. Schmuckgold wird mit 19% besteuert. Die Abgrenzung ist für Juweliere entscheidend.',
    date: new Date('2026-02-22'),
    source: 'Haufe',
    category: 'Juweliere & Einzelhandel',
    icon: '💎',
    isStatic: true
  },
  {
    title: 'Wareneinsatzquote: So berechnen Einzelhändler ihre Kennzahl richtig',
    link: 'https://www.ihk.de/themen/recht-und-steuern/recht-und-steuern-index-5533742',
    description: 'Die Wareneinsatzquote ist eine Schlüsselkennzahl bei Betriebsprüfungen im Einzelhandel. Abweichungen von Branchenrichtsätzen führen zu Hinzuschätzungen.',
    date: new Date('2026-01-10'),
    source: 'IHK',
    category: 'Juweliere & Einzelhandel',
    icon: '💎',
    isStatic: true
  },
  // — Branchenspezifisch: Handwerk & Mittelstand —
  {
    title: 'ZDH: Steuerpolitik für das Handwerk – aktuelle Positionen',
    link: 'https://www.zdh.de/ueber-uns/fachbereich-steuern-und-finanzen/',
    description: 'Zentralverband des Deutschen Handwerks: Forderungen und Stellungnahmen zu Einkommensteuer, Gewerbesteuer und Fachkräftesicherung im Handwerk.',
    date: new Date('2026-02-25'),
    source: 'ZDH',
    category: 'Handwerk & Mittelstand',
    icon: '🔧',
    isStatic: true
  },
  {
    title: 'Investitionsabzugsbetrag nach § 7g EStG: Steuervorteile für den Mittelstand',
    link: 'https://www.haufe.de/steuern/',
    description: 'Kleine und mittlere Unternehmen können mit dem Investitionsabzugsbetrag bis zu 50% der geplanten Investitionskosten vorab steuerlich geltend machen.',
    date: new Date('2026-01-30'),
    source: 'Haufe',
    category: 'Handwerk & Mittelstand',
    icon: '🔧',
    isStatic: true
  },
  {
    title: 'Handwerkerbonus: § 35a EStG – Steuerermäßigung für Handwerkerleistungen',
    link: 'https://www.zdh.de/ueber-uns/fachbereich-steuern-und-finanzen/',
    description: 'Endkunden können 20% der Lohnkosten (max. 1.200 EUR/Jahr) für Handwerkerleistungen von der Steuer absetzen. Wichtig für die Kundenakquise.',
    date: new Date('2026-02-18'),
    source: 'ZDH',
    category: 'Handwerk & Mittelstand',
    icon: '🔧',
    isStatic: true
  },
  {
    title: 'Gewerbesteuer-Freibetrag und Anrechnung: Was Handwerker wissen müssen',
    link: 'https://www.ihk.de/themen/recht-und-steuern/recht-und-steuern-index-5533742',
    description: 'Personengesellschaften im Handwerk: 24.500 EUR Freibetrag, Anrechnung auf die ESt (§ 35 EStG). So optimieren Sie die Gesamtsteuerbelastung.',
    date: new Date('2026-01-14'),
    source: 'IHK',
    category: 'Handwerk & Mittelstand',
    icon: '🔧',
    isStatic: true
  },
  // — Türkei / International (erweitert) —
  {
    title: 'Doppelbesteuerungsabkommen Deutschland-Türkei: Überblick',
    link: 'https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Internationales_Steuerrecht/Staatenbezogene_Informationen/Tuerkei/tuerkei.html',
    description: 'Das DBA Deutschland-Türkei regelt, welcher Staat Einkünfte besteuern darf. Relevant für Mieteinnahmen, Renten, Dividenden und Arbeitslöhne.',
    date: new Date('2026-02-20'),
    source: 'BMF',
    category: 'Türkei / International',
    icon: '🇹🇷',
    isStatic: true
  },
  {
    title: 'Immobilienbesitz in der Türkei: Deutsche Steuererklärung nicht vergessen',
    link: 'https://www.haufe.de/steuern/',
    description: 'Deutsche Steuerpflichtige mit Immobilien in der Türkei müssen Mieteinnahmen in Deutschland angeben. Anrechnung türkischer Steuern nach DBA möglich.',
    date: new Date('2026-02-05'),
    source: 'Haufe',
    category: 'Türkei / International',
    icon: '🇹🇷',
    isStatic: true
  },
  {
    title: 'Erbschaftsteuer bei Vermögen in der Türkei',
    link: 'https://www.haufe.de/steuern/',
    description: 'Wer Vermögen in der Türkei erbt oder vererbt, unterliegt möglicherweise der Doppelbesteuerung. Das DBA regelt die Anrechnungsmethode.',
    date: new Date('2026-01-28'),
    source: 'Haufe',
    category: 'Türkei / International',
    icon: '🇹🇷',
    isStatic: true
  }
];

// ────────────────────────────────────────────────────────────────
// RSS Parsing (direct via DOMParser)
// ────────────────────────────────────────────────────────────────

function parseRSSXml(xmlStr, feed) {
  try {
    const doc = new DOMParser().parseFromString(xmlStr, 'application/xml');
    if (doc.querySelector('parsererror')) return [];

    const items = doc.querySelectorAll('item');
    if (!items.length) return [];

    return Array.from(items).slice(0, 10).map(item => {
      const text = tag => item.querySelector(tag)?.textContent?.trim() || '';

      let link = text('link');
      if (!link) {
        const guid = item.querySelector('guid');
        if (guid && guid.getAttribute('isPermaLink') !== 'false') {
          link = guid.textContent.trim();
        }
      }
      if (!link || link === '') link = '#';

      const pubDate = text('pubDate') || text('date') || text('dc\\:date');
      const date = pubDate ? new Date(pubDate) : new Date();

      return {
        title: text('title'),
        link,
        description: stripHtml(text('description') || text('content\\:encoded') || ''),
        date: isNaN(date.getTime()) ? new Date() : date,
        source: feed.source,
        category: feed.category,
        icon: feed.icon
      };
    }).filter(a => a.title && a.title.length > 2);
  } catch {
    return [];
  }
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.replace(/\s+/g, ' ').trim().slice(0, 240);
}

// ────────────────────────────────────────────────────────────────
// Fetch — 3-strategy proxy chain
// ────────────────────────────────────────────────────────────────

async function fetchFeed(feed) {
  // Strategy 1: Netlify Function
  try {
    const fnUrl = `/.netlify/functions/news?url=${encodeURIComponent(feed.url)}`;
    const res = await fetch(fnUrl, { signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      const xmlStr = await res.text();
      const articles = parseRSSXml(xmlStr, feed);
      if (articles.length > 0) return articles;
    }
  } catch {}

  // Strategy 2: allorigins.win
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const json = await res.json();
      if (json.contents) {
        const articles = parseRSSXml(json.contents, feed);
        if (articles.length > 0) return articles;
      }
    }
  } catch {}

  // Strategy 3: rss2json.com
  try {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=10`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.map(item => ({
          title: item.title || '',
          link: item.link || '#',
          description: stripHtml(item.description || item.content || ''),
          date: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: feed.source,
          category: feed.category,
          icon: feed.icon
        })).filter(a => a.title);
      }
    }
  } catch {}

  return [];
}

async function loadAllNews() {
  // Check localStorage cache
  try {
    const cached = localStorage.getItem(NEWS_CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < NEWS_CACHE_TTL && Array.isArray(data) && data.length > 0) {
        // Merge cached RSS articles with static articles
        const rssArticles = data.map(a => ({ ...a, date: new Date(a.date) }));
        return mergeWithStatic(rssArticles);
      }
    }
  } catch {}

  // Fetch all feeds in parallel
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const articles = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  // Deduplicate by title, sort newest first
  const seen = new Set();
  const unique = articles
    .filter(a => {
      if (!a.title || seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    })
    .sort((a, b) => b.date - a.date);

  // Cache only RSS articles (static are always added fresh)
  if (unique.length > 0) {
    try {
      localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ data: unique, ts: Date.now() }));
    } catch {}
  }

  return mergeWithStatic(unique);
}

/** Merge RSS articles with static resource articles */
function mergeWithStatic(rssArticles) {
  const all = [...rssArticles, ...STATIC_ARTICLES];
  // Sort: RSS articles first (by date), then static articles at the end of each category
  all.sort((a, b) => {
    // Static articles go after RSS articles of the same date
    if (a.isStatic && !b.isStatic) return 1;
    if (!a.isStatic && b.isStatic) return -1;
    return b.date - a.date;
  });
  return all;
}

// ────────────────────────────────────────────────────────────────
// Render — Editorial (nm- classes)
// ────────────────────────────────────────────────────────────────

function formatDate(date) {
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getCategories(articles) {
  return [...new Set(articles.map(a => a.category))].sort();
}

/** Featured hero card (first article) */
function renderNmFeatured(article) {
  const desc = article.description
    ? `<p class="nm-featured__desc">${article.description}…</p>`
    : '';
  const staticBadge = article.isStatic ? ' · Ressource' : '';
  return `
    <div class="nm-featured" role="article">
      <div class="nm-featured__content">
        <div class="nm-featured__badge">★ Top-Beitrag</div>
        <div class="nm-featured__source">${article.icon}&nbsp;${article.source}&ensp;·&ensp;${article.category}${staticBadge}</div>
        <h2 class="nm-featured__title">${article.title}</h2>
        ${desc}
        <div class="nm-featured__footer">
          <time class="nm-featured__date" datetime="${article.date.toISOString()}">${formatDate(article.date)}</time>
          <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="nm-featured__link">
            Artikel lesen
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      <div class="nm-featured__deco" aria-hidden="true">01</div>
    </div>
  `;
}

/** Grid card (remaining articles) */
function renderNmCard(article, index) {
  const desc = article.description
    ? `<p class="nm-card__desc">${article.description}…</p>`
    : '';
  const delay = (index % 9) * 0.055;
  const staticTag = article.isStatic
    ? '<span class="nm-card__static-tag">Ressource</span>'
    : '';
  return `
    <article class="nm-card" data-category="${article.category}" style="animation-delay:${delay}s">
      <div class="nm-card__meta">
        <span class="nm-card__source">${article.icon}&nbsp;${article.source}</span>
        <span class="nm-card__category">${article.category}</span>
        ${staticTag}
      </div>
      <h3 class="nm-card__title">${article.title}</h3>
      ${desc}
      <div class="nm-card__footer">
        <time class="nm-card__date" datetime="${article.date.toISOString()}">${formatDate(article.date)}</time>
        <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="nm-card__link">
          Lesen
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </article>
  `;
}

/** Tab button */
function renderNmTab(cat, label, active) {
  return `<button class="nm-tab${active === cat ? ' is-active' : ''}" data-cat="${cat}" role="tab" aria-selected="${active === cat}">${label}</button>`;
}

/** Loading skeleton */
function renderNmSkeleton(count = 6) {
  return Array.from({ length: count }, () => `
    <div class="nm-skeleton" aria-hidden="true">
      <div class="nm-skeleton__line nm-skeleton__line--short"></div>
      <div class="nm-skeleton__line nm-skeleton__line--title nm-skeleton__line--medium"></div>
      <div class="nm-skeleton__line nm-skeleton__line--medium"></div>
      <div class="nm-skeleton__line nm-skeleton__line--short"></div>
      <div class="nm-skeleton__footer">
        <div class="nm-skeleton__line" style="width:35%"></div>
      </div>
    </div>
  `).join('');
}

/** Featured skeleton */
function renderNmFeaturedSkeleton() {
  return `
    <div class="nm-skeleton__featured" aria-hidden="true">
      <div class="nm-skeleton__line nm-skeleton__line--short" style="width:100px;height:20px"></div>
      <div class="nm-skeleton__line" style="width:65%;height:14px;margin-top:1rem"></div>
      <div class="nm-skeleton__line nm-skeleton__line--title" style="width:85%"></div>
      <div class="nm-skeleton__line nm-skeleton__line--medium" style="height:11px"></div>
      <div class="nm-skeleton__line nm-skeleton__line--short" style="height:11px"></div>
    </div>
  `;
}

/** Empty state */
function renderNmEmpty() {
  return `
    <div class="nm-empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>Keine Artikel gefunden.</p>
    </div>
  `;
}

/** Error state */
function renderNmError() {
  return `
    <div class="nm-empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>Nachrichten konnten nicht geladen werden.</p>
      <div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;">
        <a href="https://www.bundesfinanzministerium.de/Web/DE/Presse/Pressemitteilungen/pressemitteilungen.html" target="_blank" rel="noopener" class="btn btn--secondary" style="font-size:.85rem">BMF Pressemitteilungen</a>
        <a href="https://www.bundesfinanzhof.de/de/entscheidungen/entscheidungen-online/" target="_blank" rel="noopener" class="btn btn--secondary" style="font-size:.85rem">BFH Entscheidungen</a>
        <a href="https://www.haufe.de/steuern/steuer-aktuell/" target="_blank" rel="noopener" class="btn btn--secondary" style="font-size:.85rem">Haufe Steuer</a>
        <a href="https://www.bundesrat.de/DE/presse/pressemitteilungen/pressemitteilungen-node.html" target="_blank" rel="noopener" class="btn btn--secondary" style="font-size:.85rem">Bundesrat</a>
      </div>
      <button class="btn btn--primary" style="margin-top:1rem" onclick="initNews()">Erneut versuchen</button>
    </div>
  `;
}

/** Load more button */
function renderLoadMoreButton(remaining) {
  return `
    <div class="nm-load-more" id="nm-load-more">
      <button class="nm-load-more__btn" onclick="loadMoreArticles()">
        Weitere ${Math.min(remaining, ARTICLES_PER_PAGE)} von ${remaining} Artikeln laden
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
    </div>
  `;
}

// ────────────────────────────────────────────────────────────────
// State & Filter & Pagination
// ────────────────────────────────────────────────────────────────

let allArticles = [];
let activeCategory = 'all';
let visibleCount = ARTICLES_PER_PAGE;

function getFilteredArticles() {
  return activeCategory === 'all'
    ? allArticles
    : allArticles.filter(a => a.category === activeCategory);
}

function filterAndRender(category) {
  activeCategory = category;
  visibleCount = ARTICLES_PER_PAGE; // Reset pagination on filter change

  const featured  = document.getElementById('nm-featured');
  const grid      = document.getElementById('news-grid');
  const filters   = document.getElementById('news-filters');
  const countEl   = document.getElementById('news-count');
  const gridCount = document.getElementById('nm-grid-count');

  if (!grid) return;

  const filtered = getFilteredArticles();

  // Update tab active state
  if (filters) {
    filters.querySelectorAll('.nm-tab').forEach(btn => {
      const isActive = btn.dataset.cat === category;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
  }

  // Update counts
  if (countEl) countEl.textContent = filtered.length;

  // Featured: first article
  if (featured) {
    featured.innerHTML = filtered.length > 0 ? renderNmFeatured(filtered[0]) : '';
  }

  // Grid: remaining articles (paginated)
  const rest = filtered.slice(1);
  const visible = rest.slice(0, visibleCount);
  const remaining = rest.length - visible.length;

  if (gridCount) {
    gridCount.textContent = rest.length > 0 ? `${rest.length} weitere` : '';
  }

  if (visible.length > 0) {
    grid.innerHTML = visible.map((a, i) => renderNmCard(a, i)).join('');
    if (remaining > 0) {
      grid.insertAdjacentHTML('beforeend', renderLoadMoreButton(remaining));
    }
  } else if (filtered.length === 0) {
    grid.innerHTML = renderNmEmpty();
  } else {
    grid.innerHTML = '';
  }
}

/** Load more articles (pagination) */
function loadMoreArticles() {
  visibleCount += ARTICLES_PER_PAGE;

  const grid = document.getElementById('news-grid');
  const gridCount = document.getElementById('nm-grid-count');
  if (!grid) return;

  const filtered = getFilteredArticles();
  const rest = filtered.slice(1);
  const visible = rest.slice(0, visibleCount);
  const remaining = rest.length - visible.length;

  if (gridCount) {
    gridCount.textContent = rest.length > 0 ? `${rest.length} weitere` : '';
  }

  grid.innerHTML = visible.map((a, i) => renderNmCard(a, i)).join('');
  if (remaining > 0) {
    grid.insertAdjacentHTML('beforeend', renderLoadMoreButton(remaining));
  }
}

// Make loadMoreArticles available globally
window.loadMoreArticles = loadMoreArticles;

// ────────────────────────────────────────────────────────────────
// Init
// ────────────────────────────────────────────────────────────────

async function initNews() {
  const featured  = document.getElementById('nm-featured');
  const grid      = document.getElementById('news-grid');
  const filters   = document.getElementById('news-filters');
  const timestamp = document.getElementById('news-timestamp');
  const countEl   = document.getElementById('news-count');

  if (!grid) return;

  // Show loading skeletons
  if (featured) featured.innerHTML = renderNmFeaturedSkeleton();
  grid.innerHTML = renderNmSkeleton(6);
  if (filters) filters.innerHTML = renderNmTab('all', 'Alle', 'all');

  try {
    allArticles = await loadAllNews();

    if (allArticles.length === 0) {
      if (featured) featured.innerHTML = '';
      grid.innerHTML = renderNmError();
      return;
    }

    const categories = getCategories(allArticles);

    // Category display names with count
    const catLabels = {
      'all': 'Alle'
    };

    // Render tab bar
    if (filters) {
      filters.innerHTML =
        renderNmTab('all', 'Alle', activeCategory) +
        categories.map(cat => renderNmTab(cat, cat, activeCategory)).join('');

      filters.addEventListener('click', e => {
        const btn = e.target.closest('.nm-tab');
        if (btn) filterAndRender(btn.dataset.cat);
      });
    }

    // Update timestamp
    if (timestamp) {
      timestamp.textContent = `Aktualisiert ${new Date().toLocaleTimeString('de-DE', {
        hour: '2-digit', minute: '2-digit'
      })} Uhr`;
    }

    if (countEl) countEl.textContent = allArticles.length;

    // Render content
    filterAndRender(activeCategory);

  } catch {
    if (featured) featured.innerHTML = '';
    grid.innerHTML = renderNmError();
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNews);
} else {
  initNews();
}
