// Supabase Edge Function: ff-calendar
// ForexFactory haftalık ekonomik takvimini sunucudan çekip CORS'suz sunar.
// EK: JSON feed'de bulunmayan "Açıklanan" (actual) değerini ForexFactory HTML
// takviminden ayrıştırıp olaylara ekler. HTML engellenirse (Cloudflare vb.)
// sessizce yalnız JSON döner — istemci etkilenmez.
// Deploy: MCP / Dashboard → Edge Functions → ff-calendar

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FF_JSON = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";
const FF_HTML = "https://www.forexfactory.com/calendar?week=this";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// bellek içi kısa önbellek (sıcak instance'ta gereksiz istek atmasın)
let _cache: { ts: number; body: string } | null = null;
const CACHE_MS = 5 * 60 * 1000;

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
}

// FF HTML'inden satır satır {currency,title,actual} çıkar (sayfa kronolojik sıralı)
function parseHtmlActuals(html: string): { cur: string; title: string; actual: string }[] {
  const out: { cur: string; title: string; actual: string }[] = [];
  const rows = html.split(/calendar__row/);
  for (const r of rows) {
    const curM = r.match(/calendar__currency[^>]*>([\s\S]*?)<\/td>/);
    const titleM = r.match(/calendar__event-title[^>]*>([\s\S]*?)<\/span>/);
    const actM = r.match(/calendar__actual[^>]*>([\s\S]*?)<\/td>/);
    if (!curM || !titleM) continue;
    const cur = stripTags(curM[1]);
    const title = stripTags(titleM[1]);
    const actual = actM ? stripTags(actM[1]) : "";
    if (cur && title) out.push({ cur, title, actual });
  }
  return out;
}

// JSON olaylarıyla HTML satırlarını sıra korumalı eşleştir; actual'ı yaz
function mergeActuals(events: any[], scraped: { cur: string; title: string; actual: string }[]) {
  let ptr = 0;
  for (const e of events) {
    for (let i = ptr; i < scraped.length; i++) {
      if (scraped[i].cur === e.country && scraped[i].title === e.title) {
        if (scraped[i].actual) e.actual = scraped[i].actual;
        ptr = i + 1;
        break;
      }
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const headers = { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" };
  if (_cache && Date.now() - _cache.ts < CACHE_MS) {
    return new Response(_cache.body, { status: 200, headers });
  }
  try {
    // 1) Ana veri: haftalık JSON feed (forecast/previous/tarih)
    const r = await fetch(FF_JSON, { headers: { "User-Agent": UA } });
    if (!r.ok) throw new Error("feed " + r.status);
    const events = await r.json();
    if (!Array.isArray(events)) throw new Error("feed formatı beklenmedik");

    // 2) Açıklanan (actual): FF HTML — best effort, hata olursa atla
    try {
      const r2 = await fetch(FF_HTML, {
        headers: {
          "User-Agent": UA,
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      if (r2.ok) {
        const html = await r2.text();
        const scraped = parseHtmlActuals(html);
        if (scraped.length) mergeActuals(events, scraped);
      }
    } catch (_e) { /* actual alınamadı — sorun değil */ }

    const body = JSON.stringify(events);
    _cache = { ts: Date.now(), body };
    return new Response(body, { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 502,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
