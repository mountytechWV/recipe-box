/* Recipe Box sign-in helper (Cloudflare Worker).
   Keeps Google Drive sync signed in without asking people to sign in again.
   It stores nothing: it only trades a sign-in code or "stay signed in" key for a
   fresh Google pass, adding the app's secret, which must never sit in public code.

   Settings it needs (Cloudflare > this Worker > Settings > Variables and Secrets):
     GOOGLE_CLIENT_ID      your Google Client ID              (Text)
     GOOGLE_CLIENT_SECRET  your Google Client secret          (Secret)
     ALLOWED_ORIGIN        https://mountytechwv.github.io     (Text) */
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!allowed.includes(origin)) return new Response('Not allowed', { status: 403 });
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };
    const reply = (obj, status = 200) => new Response(JSON.stringify(obj), {
      status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return reply({ error: 'method_not_allowed' }, 405);

    let body;
    try { body = await req.json(); } catch (e) { return reply({ error: 'bad_request' }, 400); }
    const path = new URL(req.url).pathname;
    let params;
    if (path === '/token') {
      const { code, code_verifier, redirect_uri } = body || {};
      if (typeof code !== 'string' || typeof code_verifier !== 'string' || typeof redirect_uri !== 'string'
          || !redirect_uri.startsWith(origin + '/')) return reply({ error: 'bad_request' }, 400);
      params = { grant_type: 'authorization_code', code, code_verifier, redirect_uri };
    } else if (path === '/refresh') {
      const { refresh_token } = body || {};
      if (typeof refresh_token !== 'string') return reply({ error: 'bad_request' }, 400);
      params = { grant_type: 'refresh_token', refresh_token };
    } else {
      return reply({ error: 'not_found' }, 404);
    }
    params.client_id = env.GOOGLE_CLIENT_ID;
    params.client_secret = env.GOOGLE_CLIENT_SECRET;

    const r = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params),
    });
    let j = {};
    try { j = await r.json(); } catch (e) {}
    if (!r.ok || !j.access_token) return reply({ error: j.error || 'token_failed' }, r.status >= 400 ? r.status : 502);
    const out = { access_token: j.access_token, expires_in: j.expires_in };
    if (j.refresh_token) out.refresh_token = j.refresh_token;
    return reply(out);
  },
};
