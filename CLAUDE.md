# CLAUDE.md — FX Desk Projesi

Bu dosya, bu klasörde çalışan Claude'a (Claude Code dahil) projeyi tanıtır.
Düzenleme yapmadan önce bunu oku. Detaylı bağlam için `PROJE_NOTLARI.md`'ye bak.

## Proje özeti
FX trader'lar için tek dosyalık web uygulaması. Sahibi/kurucusu: Mustafa Bozdağ (admin: bozdagm68@gmail.com).
Yayın: Supabase backend + Güzel Hosting. Dil: Türkçe. Saat: İstanbul. Tema: koyu/profesyonel.

## Dosyalar
- `trade.html` — TÜM uygulama (HTML + CSS + JS tek dosya). Ana çalışma dosyası budur.
- `SUPABASE_KURULUM.md` — Backend kurulum rehberi + SQL şeması.
- `PROJE_NOTLARI.md` — Geniş bağlam, geçmiş kararlar, TODO.
- `CLAUDE.md` — Bu dosya.

## Mevcut durum
- Sekmeler: **Trade** (tamam), **Paylaşımlar** (tamam), Journal/İstatistik/Ayarlar (yakında, boş).
- **DEMO MOD**: Supabase anahtarı boş olduğu için veriler tarayıcıda (localStorage). Anahtar eklenince gerçek backend devreye girer.

## Çalışma kuralları (ÖNEMLİ)
- **Tek dosya mimarisi**: Aksi istenmedikçe her şey `trade.html` içinde kalsın (ayrı .css/.js açma).
- **Tema değişkenleri**: Renkler `:root` içindeki CSS değişkenleriyle (`--bg`, `--panel`, `--green`, `--red`, `--accent` ...). Yeni renk uydurma, mevcutları kullan.
- **Dil**: Tüm arayüz metinleri Türkçe.
- **Kullanıcı tercihi**: Sade ve doğrudan; gereksiz karmaşa ekleme.
- Mevcut çalışan özellikleri bozma; ekleme yaparken küçük ve hedefli düzenle.

## Yapılandırma (trade.html en üstü)
```js
const SUPABASE_URL = "";        // Supabase project URL
const SUPABASE_ANON_KEY = "";   // anon public key
const ADMIN_EMAILS = ["bozdagm68@gmail.com"]; // otomatik yöneticiler
const DEMO = !sb;               // anahtar yoksa demo mod
```

## localStorage anahtarları (demo mod)
`fxdesk_users`, `fxdesk_session`, `fxdesk_feed`, `fxdesk_votes`, `fxdesk_hidden`, `fxdesk_symbols`, `fxdesk_active`.

## Sıradaki işler (TODO)
1. Supabase kur (SUPABASE_KURULUM.md adım 1-6) ve anahtarları gir.
2. Paylaşım/oy/yorum verisini localStorage'dan Supabase tablolarına taşı; görselleri `screenshots` bucket'ına.
3. Sunucu tarafı görsel moderasyonu (Edge Function + moderasyon API).
4. Admin paneli (bildirimler tablosu + silme).
5. Diğer sekmeler: Journal, İstatistik, Ayarlar.

## Bilinen sınırlar
- Demo modda veriler cihazlar arası paylaşılmaz (backend gerekir).
- TradingView ücretsiz widget'ında çizimler hesaba kalıcı kaydedilmez.
- NSFW görsel kontrolü tarayıcıda → atlanabilir; gerçek koruma sunucuda olmalı.
```
