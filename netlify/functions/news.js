/**
 * Netlify Function: news.js
 * Server-side RSS proxy — fetches feeds without CORS issues.
 * Supports redirect following and returns raw XML.
 */

const https = require('https');
const http = require('http');

const ALLOWED_FEEDS = [
  'https://www.bundesfinanzministerium.de/SiteGlobals/Functions/RSSFeed/DE/Pressemitteilungen/RSSPressemitteilungen.xml',
  'https://www.bundesfinanzministerium.de/SiteGlobals/Functions/RSSFeed/DE/Steuern/RSSSteuern.xml',
  'https://www.haufe.de/xml/rss_129148.xml',
  'https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_Announcement.xml?nn=4352850',
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));

    const lib = url.startsWith('https://') ? https : http;
    const req = lib.get(url, {
      timeout: 9000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StbErbensNewsBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        req.destroy();
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return fetchUrl(next, redirects + 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        req.destroy();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  const rawUrl = event.queryStringParameters && event.queryStringParameters.url;
  if (!rawUrl) {
    return { statusCode: 400, headers: CORS_HEADERS, body: 'Missing ?url parameter' };
  }

  const feedUrl = decodeURIComponent(rawUrl);

  if (!ALLOWED_FEEDS.includes(feedUrl)) {
    return { statusCode: 403, headers: CORS_HEADERS, body: 'URL not in allowlist' };
  }

  try {
    const xml = await fetchUrl(feedUrl);
    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800', // 30 min
      },
      body: xml,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
