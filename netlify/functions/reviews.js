/**
 * Netlify Function: reviews.js
 * Fetches real Google Reviews via Places API.
 *
 * Required environment variables (set in Netlify dashboard):
 *   GOOGLE_PLACES_API_KEY  — Google Cloud API key with Places API enabled
 *   GOOGLE_PLACE_ID        — Place ID of the business (find via Google Maps)
 */

const https = require('https');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 8000 }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8'))));
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
  });
}

const CORS = { 'Access-Control-Allow-Origin': '*' };

exports.handler = async () => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ configured: false }),
    };
  }

  try {
    const fields = 'rating,user_ratings_total,reviews';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&language=de&key=${apiKey}`;
    const data = await httpsGet(url);

    if (data.status !== 'OK' || !data.result) {
      return {
        statusCode: 200,
        headers: { ...CORS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ configured: true, error: data.status }),
      };
    }

    const { rating, user_ratings_total, reviews = [] } = data.result;

    // Only return top reviews (4-5 stars), max 5
    const topReviews = reviews
      .filter(r => r.rating >= 4)
      .sort((a, b) => b.rating - a.rating || b.time - a.time)
      .slice(0, 5)
      .map(r => ({
        author: r.author_name,
        avatar: r.profile_photo_url || null,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
      }));

    return {
      statusCode: 200,
      headers: {
        ...CORS,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // 1h cache
      },
      body: JSON.stringify({ configured: true, rating, total: user_ratings_total, reviews: topReviews }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ configured: true, error: err.message }),
    };
  }
};
