// Cloudflare Worker für nephron.at — Static-Assets-Hosting + SPA-Fallback
// für /magyarul/* (Virág-App) und /russian/* (Soviet Transformer).
//
// Verhalten:
//   - Jeder Request wird zuerst gegen das ASSETS-Binding gefetcht (statische
//     Files aus dem Repo).
//   - Standard-404 wird durchgereicht — KEINE Verhaltensänderung für /app/,
//     /disclaimer, /index.html etc.
//   - AUSNAHME: 404 unter /magyarul/* oder /russian/* wird zum jeweiligen
//     index.html gerewriten, damit React-Router clientseitig die Sub-Route
//     handeln kann.

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 1. Asset direkt versuchen (clean URLs, html_handling etc. greifen hier)
    const response = await env.ASSETS.fetch(request)

    // 2. SPA-Fallback für Virág
    if (response.status === 404 && url.pathname.startsWith('/magyarul/')) {
      const fallback = new URL('/magyarul/index.html', url.origin)
      return env.ASSETS.fetch(new Request(fallback.toString(), request))
    }

    // 3. SPA-Fallback für Soviet Transformer
    if (response.status === 404 && url.pathname.startsWith('/russian/')) {
      const fallback = new URL('/russian/index.html', url.origin)
      return env.ASSETS.fetch(new Request(fallback.toString(), request))
    }

    // 4. Sonst: Original-Antwort (auch 404) durchreichen
    return response
  }
}
