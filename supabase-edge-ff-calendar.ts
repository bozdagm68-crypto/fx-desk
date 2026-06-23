// Supabase Edge Function: ff-calendar
// ForexFactory haftalık ekonomik takvimini sunucudan çekip CORS'suz sunar.
// Kurulum: Supabase Dashboard → Edge Functions → Deploy a new function → ad: ff-calendar → bu kodu yapıştır → Deploy.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const r = await fetch("https://nfs.faireconomy.media/ff_calendar_thisweek.json", {
      headers: { "User-Agent": "Mozilla/5.0 FXDesk" },
    });
    const body = await r.text();
    return new Response(body, {
      status: r.status,
      headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "public, max-age=900" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 502,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
