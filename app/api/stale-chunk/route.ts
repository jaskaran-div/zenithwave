// Served (via a `fallback` rewrite in next.config.ts) for any JS chunk under
// /_next/static/chunks/ that does not exist in the current build.
//
// Why: the hosting CDN can hold an old copy of a page's HTML after a redeploy.
// That HTML asks for chunk files the new build no longer has; normally they
// 404 and Next shows "This page couldn't load". Instead, this script reloads
// the page once at a cache-busting URL (the CDN treats ?_v=… as a new URL and
// fetches fresh HTML from the server). useHeaderState (components/Header.tsx)
// removes ?_v from the address bar afterwards.

const script = `(function () {
  try {
    var key = "zw-stale-reload";
    var last = Number(sessionStorage.getItem(key)) || 0;
    if (Date.now() - last < 30000) return; // already tried — don't loop
    sessionStorage.setItem(key, String(Date.now()));
  } catch (e) {}
  var url = new URL(window.location.href);
  url.searchParams.set("_v", Date.now().toString(36));
  window.location.replace(url.toString());
})();`;

export function GET() {
  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
