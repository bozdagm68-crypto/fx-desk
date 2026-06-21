# FX Desk — Yayına Alma (GitHub → Render.com)

FX trader'lar için web uygulaması: canlı grafik + ekonomik takvim, topluluk paylaşımları, Tradezella tarzı işlem günlüğü (MT5/fon raporu içe aktarma), admin/moderatör paneli. Backend: Supabase. Statik site (HTML/CSS/JS tek dosya).

**Ana dosya:** `index.html` (Render kök sayfayı bununla açar — `trade.html`'in kopyası).

---

## 1) GitHub'a yükle

**Kolay yol (web arayüzü):**
1. https://github.com → giriş yap → sağ üst **+ → New repository**.
2. İsim: `fx-desk` · **Public** (Render ücretsiz planı için public yeterli) · Create.
3. Açılan sayfada **"uploading an existing file"** linkine tıkla.
4. Bu klasördeki dosyaları sürükle-bırak: **index.html**, **render.yaml**, **README.md** (istersen .md dökümanları da). → **Commit changes**.

**Git ile (alternatif):**
```bash
cd fx-desk
git init
git add index.html render.yaml README.md
git commit -m "FX Desk ilk sürüm"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/fx-desk.git
git push -u origin main
```

---

## 2) Render.com'a bağla

1. https://render.com → **Get Started / Sign in** → GitHub ile giriş yap.
2. Sağ üst **New + → Blueprint** (render.yaml'i otomatik okur).
   - Repo listesinden `fx-desk`'i seç → **Connect** → **Apply**.
   - Render `render.yaml`'i görüp **Static Site** olarak kurar.
3. Alternatif (render.yaml kullanmadan): **New + → Static Site** → repoyu seç →
   - **Build Command:** boş bırak
   - **Publish Directory:** `.`
   - **Create Static Site**.
4. 1-2 dakikada deploy biter. Linkin şuna benzer: **`https://fx-desk.onrender.com`** 🎉

Her GitHub push'unda Render otomatik yeniden yayınlar.

---

## 3) Yayından sonra kontrol

- Link açılınca giriş ekranı gelmeli; "Supabase bağlı — gerçek hesaplar" yazmalı.
- Kayıt ol → Paylaşımlar'da paylaşım yap → başka cihazdan aynı hesapla gör.
- **Supabase tarafında:** Authentication → URL Configuration → **Site URL**'e Render linkini eklersen (örn. `https://fx-desk.onrender.com`) e-posta doğrulama/şifre sıfırlama linkleri doğru yere döner.

## Notlar
- Supabase **anon key** zaten `index.html` içinde — bu normal ve güvenli (gerçek koruma RLS politikalarında).
- Ekonomik takvim canlı verisi `file://` veya bazı durumlarda CORS'a takılabilir; gerçek domainde genelde sorunsuz, gerekirse küçük bir proxy eklenebilir.
- Detaylı backend/admin/MetaApi kurulumu için `SUPABASE_KURULUM.md`.
