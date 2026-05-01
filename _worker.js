// Cloudflare Worker für nephron.at — Static-Assets-Hosting + SPA-Fallback
// für /magyarul/* (Virág-App).
//
// Verhalten:
//   - Jeder Request wird zuerst gegen das ASSETS-Binding gefetcht (statische
//     Files aus dem Repo).
//   - Standard-404 wird durchgereicht — KEINE Verhaltensänderung für /app/,
//     /disclaimer, /index.html etc.
//   - AUSNAHME: 404 unter /magyarul/* wird zu /magyarul/index.html gerewriten,
//     damit React-Router clientseitig die Sub-Route handeln kann (z.B.
//     /magyarul/auth/login, /magyarul/onboarding).

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 1. Asset direkt versuchen (clean URLs, html_handling etc. greifen hier)
    const response = await env.ASSETS.fetch(request)

    // 2. SPA-Fallback nur für Virág
    if (response.status === 404 && url.pathname.startsWith('/magyarul/')) {
      const fallback = new URL('/magyarul/index.html', url.origin)
      return env.ASSETS.fetch(new Request(fallback.toString(), request))
    }

    // 3. Sonst: Original-Antwort (auch 404) durchreichen
    return response
  }
}
