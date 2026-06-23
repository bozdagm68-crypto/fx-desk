# FX Desk — Proje Notları & Bağlam (Claude Code için)

Bu dosya, projenin ne olduğunu, şu ana kadar neler yapıldığını ve sıradaki adımları özetler.
Amaç: Claude Code'un (veya başka bir geliştiricinin) projeye sıfırdan bağlam kazanıp devam edebilmesi.

---

## Proje nedir?

FX trader'lar için bir web uygulaması. Sahibi **Mustafa Bozdağ** (kurucu/admin, e-posta: bozdagm68@gmail.com).
Hedef: tutarlı bir trader topluluğu için tek ekranda grafik + haber takvimi + topluluk paylaşımları.

Site **public** olacak (gerçek kullanıcı hesapları), **Supabase** backend + **Güzel Hosting** üzerinde yayınlanacak.

---

## Dosyalar

- `trade.html` — Tüm uygulama (tek dosya: HTML + CSS + JS). Tarayıcıda açılır.
- `SUPABASE_KURULUM.md` — Gerçek backend kurulum rehberi (proje açma, SQL tabloları, RLS, storage, admin, moderasyon, hosting).
- `PROJE_NOTLARI.md` — Bu dosya.

---

## Planlanan sekmeler

Üst barda 4-5 sekme olacak. Şu an yapılanlar:

1. **Trade** (TAMAM) — Sol: TradingView grafiği; Sağ: ekonomik takvim + veri sözlüğü.
2. **Paylaşımlar** (TAMAM) — Topluluk akışı: setup/bias paylaşımı, oylama, yorum.
3. Journal — (yakında, henüz yok)
4. İstatistik — (yakında, henüz yok)
5. Ayarlar — (yakında, henüz yok)

---

## Yapılanlar (detay)

### Trade sekmesi
- TradingView **Advanced Chart** widget'ı (çizim araçları, indikatörler, sembol arama açık). Hesaba bağlı kalıcı kayıt YOK (ücretsiz widget sınırı — kabul edildi).
- **Özelleştirilebilir hızlı sembol çubuğu**: `+` ile ekleme, hover'da `×` ile silme, sürükle-bırak sıralama. localStorage'da `fxdesk_symbols` ve `fxdesk_active`.
- Sağ panel: TradingView **Ekonomik Takvim** widget'ı (hazır widget; geri sayım + beklenti/gerçekleşen yerleşik) + **Veri Sözlüğü** (CPI, NFP, FOMC vb. tanımlar, aranabilir).
- Saat: İstanbul (Europe/Istanbul).

### Paylaşımlar sekmesi
- Paylaşım oluşturma: sembol, yön (Long/Short/Nötr), analiz metni, ekran görüntüsü.
- **Kullanıcı adı otomatik** (giriş yapan kullanıcıdan; manuel ad girişi kaldırıldı).
- Ekran görüntüsü: dosya seç **veya Ctrl+V ile panodan yapıştır**; eklenen görseli `×` ile sil.
- Görseller küçültülerek (max 1100px, JPEG) saklanıyor (localStorage şişmesin diye).
- Oylama: 👍 Katılıyorum / 👎 Katılmıyorum / 🤔 Kararsızım — yüzde + renkli oran çubuğu, tek oy, geri alma/değiştirme.
- Yorum: aç/kapa, giriş yapan kullanıcı adıyla.
- Filtre: Tümü / Long / Short / Nötr. Görsele tıklayınca lightbox.

### Giriş / Kayıt (Auth)
- Tam ekran giriş kapısı; giriş yapmadan içeri girilemez.
- Kayıt: kullanıcı adı + e-posta + şifre. Giriş: e-posta + şifre.
- Supabase'e bağlı (anahtar varsa gerçek auth). Anahtar yoksa **DEMO MOD**: hesaplar localStorage `fxdesk_users`, oturum `fxdesk_session`.
- Sağ üstte kullanıcı çipi + Çıkış.

### Yönetici (Admin)
- `ADMIN_EMAILS` dizisindeki e-postalar otomatik yönetici (varsayılan: bozdagm68@gmail.com).
- Supabase'de `profiles.is_admin = true` olanlar da yönetici.
- Yöneticiler **her** paylaşımı siler (🗑 Sil), sıradan kullanıcı yalnızca kendi paylaşımını siler. Yöneticide YÖNETİCİ rozeti.

### İçerik denetimi (moderasyon)
- Tarayıcı tarafı **NSFW (müstehcen görsel) tespiti** (nsfwjs + tfjs): görsel paylaşılmadan kontrol edilir, uygunsuzsa eklenmez.
- Her paylaşımda **🚩 Bildir** (bildirilen post o kullanıcıdan gizlenir; `fxdesk_hidden`).
- NOT: Tarayıcı kontrolü atlanabilir → gerçek koruma için sunucu tarafı (Supabase Edge Function + moderasyon API) gerekli (rehberde anlatıldı, henüz YAPILMADI).

---

## Önemli teknik notlar

### Yapılandırma (trade.html en üstü)
```js
const SUPABASE_URL = "";        // doldurulacak
const SUPABASE_ANON_KEY = "";   // doldurulacak
const ADMIN_EMAILS = ["bozdagm68@gmail.com"];
const sb = (... ) ? createClient(...) : null;
const DEMO = !sb;   // anahtar yoksa demo mod
```

### localStorage anahtarları (DEMO mod)
- `fxdesk_users` — kayıtlı hesaplar `[{id,username,email,pass}]`
- `fxdesk_session` — aktif oturum
- `fxdesk_feed` — paylaşımlar
- `fxdesk_votes` — kullanıcının oyları
- `fxdesk_hidden` — gizlenen (bildirilen) post id'leri
- `fxdesk_symbols`, `fxdesk_active` — hızlı semboller

### Harici bağımlılıklar (CDN)
- TradingView: `tv.js` + economic calendar embed
- Supabase: `@supabase/supabase-js@2`
- Moderasyon: `@tensorflow/tfjs` + `nsfwjs`

---

## Sıradaki adımlar (TODO)

1. **Supabase'i kur** (SUPABASE_KURULUM.md adım 1-6): proje, tablolar, RLS, storage, admin kolonu.
2. Anahtarları `trade.html`'e yapıştır → auth gerçek olur.
3. **Veri katmanını Supabase'e taşı**: paylaşım/oy/yorum şu an localStorage'da. Bunları `posts`/`votes`/`comments` tablolarına ve görselleri `screenshots` bucket'ına bağla. (Kod buna hazır; deletePost zaten Supabase'e yazıyor.)
4. **Sunucu tarafı moderasyon**: Edge Function + moderasyon API (Sightengine/Google Vision) ile yüklemeyi reddet.
5. **Admin paneli**: bildirimleri (reports tablosu) toplayıp görüntüleme/silme.
6. Güzel Hosting'e yükle (`index.html` olarak).
7. Diğer sekmeler: Journal, İstatistik, Ayarlar.

### Bilinen sınırlar
- Demo modda her şey tek tarayıcıda; cihazlar arası paylaşım YOK (backend gerekir).
- TradingView widget'ında çizimler hesaba kalıcı kaydedilmez.
- NSFW kontrolü tarayıcıda → atlanabilir.
