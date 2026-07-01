# FX Desk — Yapılacaklar

> Çalışma listesi. Müsait oldukça tek tek yapıyoruz. Yeni madde geldikçe buraya eklenir, biten **✅ Bitti**'ye taşınır.
> Format: `- [ ]` yapılacak · `- [x]` bitti.

---

## 📝 Senin yazacakların (öncelik buraya)
<!-- Aklına gelenleri buraya yaz; ben düzenleyip sıralarım -->
- [ ] (boş — sıradakini yaz)

---

## 🚀 Büyüme Fikirleri — 2026-07-01 (araştırma temelli)

> 2026 trader-uygulaması trendleri + DC/prop kitlemize göre önerildi. Kaynaklar: TradeZella, Edgewonk, TradesViz, Plancana, prop firma dokümanları.
> Not: Leaderboard/aşırı gamification bilinçli olarak DÜŞÜK öncelikte — kaynaklar aşırı risk almayı teşvik edip regülasyon riski doğurduğunu vurguluyor.
>
> **DURUM (2026-07-01 gece, sen uyurken yapıldı):** 7 özellik KODLANDI ve push edildi (#1,#2,#3,#6-kişisel,#8,#9,#10). Kalan 3'ü (#4,#5,#7) **senin kararını/SQL'ini/API tercihini** bekliyor — aşağıda işaretli. Uyanınca birlikte bitiririz.

### 🥇 Kademe 1 — En yüksek etki, kitlemize birebir

- [x] **1. Prop Firma Meydan Okuma Takipçisi** ⭐ ✅ KODLANDI (commit a493a02) — profil kural şablonu + hazır firmalar (FTMO/FundedNext/The5ers/BrightFunded) + Raporlar'da canlı panel (hedef/günlük payı/DD tamponu/min gün) + limite yakın uyarı. DD matematiği (static/trailing/trailing-lock) birim-test edildi.
  - Fon firması profiline **kural şablonu** alanları: profit hedefi %, günlük max kayıp %, toplam max drawdown %, min işlem günü, DD tipi (**trailing / static / trailing→static-lock**), başlangıç bakiyesi.
  - Hazır ön ayarlar: **FTMO, FundedNext, The5ers, BrightFunded** (+ "Özel").
  - Raporlar/İstatistik'te canlı **"Meydan Okuma Paneli"**: hedefe kalan $/%, **drawdown tamponu** (bugün ne kadar daha kaybedersen yanarsın), profit hedefi ilerleme çubuğu, kalan işlem günü, tutarlılık (consistency) skoru.
  - **İhlalden önce uyarı**: "Günlük limitin −%X'ine geldin" (renk + isteğe bağlı sesli/görsel alarm).
  - Veri: profildeki mevcut `startBalance`/trade'lerden hesaplanır; yeni alanlar profile eklenir. Backend değişikliği minimal.
  - *Neden:* TradesViz/PropTracker'ın en çok konuşulan özelliği; Türkçe hiçbir DC topluluğunda düzgün yok. Tek başına bağlılık yaratır.

- [x] **2. Duygu & Kural Etiketleri + "Duygunun Maliyeti" raporu** ⭐ ✅ KODLANDI (commit cb2f7d8) — işlem modalına 9 davranış etiketi (FOMO/Revenge/Plana-sadık…), İstatistik'te "Duygunun Maliyeti" kartı (etikete göre net/win% + en pahalı alışkanlık uyarısı).
  - İşlem eklerken/düzenlerken çoklu etiket: `FOMO`, `Revenge`, `Overtrade`, `Erken çıkış`, `Plan dışı`, `Tereddüt`, `Aşırı lot`, **`Plana sadık`**.
  - İstatistik'te yeni kart **"Duygunun Maliyeti"**: her etiket için işlem sayısı, win %, net $. Örn. *"Plana sadık: +2.400$ / %71 — FOMO: −1.850$ / %28"*.
  - "Etikete göre sırala/filtrele" → kendi kişisel kurallarını çıkarır.
  - Veri: journal'a `tags[]` alanı (zaten `psychology` alanı vardı — genişletilir), istatistikte agregasyon. Neredeyse tamamen frontend.
  - *Neden:* Kaynaklar bunun drawdown'u %30'a kadar azalttığını söylüyor; Edgewonk/Plancana'nın çekirdek satış noktası.

- [x] **3. Disiplin Skoru + Seriler (Streak)** ✅ KODLANDI (commit cb2f7d8) — İstatistik'te günlük 0–100 disiplin skoru (stop/plan/duygusal-ihlal) + güncel & en uzun "plana sadık" serisi.
  - Her işlem gününe otomatik **0–100 disiplin skoru**: stop'a saygı (SL vardı mı), risk sabitliği (lot/risk tutarlı mı), aşırı işlem yok, plana sadık etiketi.
  - **Seri**: "X gün üst üste plana sadık", "Y gün stop'a saygı". Profilde/istatistikte rozet.
  - Kişisel & motive edici — leaderboard'un riskli sosyal-baskı tarafı olmadan.

### 🥈 Kademe 2 — Topluluğu (DC modelini) güçlendirir

- [x] **4. Sonuç Takipli Paylaşım (accountability / şeffaflık)** ✅ KODLANDI (2026-07-01) — `posts` tablosuna `target`/`stop`/`outcome` kolonları eklendi (MCP migration, onaylı). Composer'da opsiyonel hedef/stop; kartta sonuç rozeti (⏳ Devam / ✅ Tuttu / ❌ Stop) + sahibi için "Tuttu/Tutmadı/Devam" butonları (RLS `upd_post` ile yalnız sahibi); İstatistik → Topluluk kartında **paylaşım isabet oranı** (%X · hits/total). Insert fail-safe (kolon yoksa onlarsız çalışır).

- [ ] **5. Haftalık "Setup Yarışı" / Haftanın Analizi** ⏸️ **#4'e bağlı / topluluk verisi**
  - Paylaşımlar zaten oy alıyor. Hafta sonunda en çok oylanan setup **"🏆 Haftanın Analizi"** rozetiyle sabitlenir.
  - **Neden bekliyor:** Ya sabit rozet için `posts`'a `pinned/featured` kolonu, ya da tamamen istemci-tarafı "bu haftanın en çok oylananı" hesabı (backendsiz de yapılabilir — uyanınca hangisini istediğini soracağım).

- [x] **6. Rozetler & Ünvanlar (kişisel kısım)** ✅ KODLANDI (commit sonraki) — İstatistik'te 9 rozet: İlk Adım, Yüzler Kulübü (100 işlem), Disiplin Serisi (7g), Demir İrade (30g), Keskin Nişancı (%60+), Öz-Farkındalık (etiket), Kalkan (disiplin 80+), Fon Avcısı (meydan okuma geçildi), Kârlı Ay. Kazanılan renkli, diğerleri soluk.
  - ⏸️ *Topluluk rozetleri* ("Analist — 10 paylaşım tuttu") #4'e bağlı, onunla gelecek.

### 🥉 Kademe 3 — Cila / ileri (çoğu Beta yol haritasına)

- [ ] **7. AI Trade Koçu** *(Beta)* ⏸️ **SENİN KARARIN GEREKİYOR (API + maliyet)** — Haftalık özet: "En çok Salı ve XAU'da kaybediyorsun; ort. RR 1.2 — 1.5 hedefle." Mevcut istatistik verisinden, Anthropic API (claude-haiku ucuz) ile.
  - **Neden bekliyor:** (a) Anthropic API anahtarı gerekiyor, (b) anahtarı tarayıcıya koyamayız (güvenlik) → Supabase Edge Function proxy şart, (c) kullanım başına ufak maliyet. Bunlar senin kararların. Uyanınca: maliyet/mimari konuşup kurarız. *(Beta sekmesinde "yakında" olarak duruyor.)*
- [x] **8. PWA / "Ana ekrana ekle"** ✅ KODLANDI (commit 0d6b5db) — manifest.webmanifest + sw.js + KTC ikonları; "Uygulamayı yükle" çipi; çevrimdışı kabuk.
- [x] **9. Haber alarmında arka plan push bildirimi** ✅ KODLANDI (commit 0d6b5db) — alarm/tek-olay hatırlatma tetiklenince Service Worker OS bildirimi (sekme kapalı/arka planda). İzin isteği + fail-safe toast.
- [x] **10. Ekonomik takvim: "hatırlat" (tek olay)** ✅ KODLANDI (commit cb2f7d8) — takvim satırında 🔔 → o olay için 3dk önce + haber anında uyarı (genel alarmdan bağımsız).

### ⏸️ Uyanınca birlikte yapılacaklar (karar/SQL/API bekliyor)
1. **#4 Sonuç Takipli Paylaşım** — posts tablosuna kolon (SQL, MCP ile birlikte çalıştırırız).
2. **#5 Haftanın Analizi** — backendsiz mi (istemci hesabı) yoksa kalıcı rozet mi (SQL) — sen seçeceksin.
3. **#7 AI Koç** — Anthropic API + Edge Function proxy + maliyet kararı.

### ⚠️ Teknik borç (uyanınca bir bakılmalı)
- **İki alarm sistemi paralel duruyor:** eski (`alarmOn`/`fireNotif`/`cal-bell` id butonu, `fxdesk_alarm`='on'/'off') + yeni (Ayarlar'daki `alCfg`, `fxdesk_alarm`=JSON). İkisi aynı localStorage anahtarını farklı formatta kullanıyor. Pratikte çakışmıyor (yeni sistem kazanıyor) ama eskisini temizlemek gerek. Riskli olduğu için sen uyurken dokunmadım.

---

## ⭐ Sıradaki seçilenler — 2026-06-30 (sırayla yapılacak)
1. [x] **İşlem Günlüğüm: profil özeti + strateji etiketi** — ✅ Üstte özet kartları (İşlem, Toplam P&L, Ort. RR, Toplam R, Başarı %, En çok parite, En iyi/En kötü işlem) — aktif profil + filtreye göre. Tabloya **Strateji** kolonu (serbest metin — istediğini elle yaz; hazır öneriler OB/FVG/Likidite/Kırılım… + **kullanıcının kendi yazdığı stratejiler tüm profillerinden toplanıp öneri listesine eklenir**; değere göre otomatik renkli etiket) + **strateji filtresi** (parite filtresinin yanında). Filtre seçince özet o seçime göre güncellenir (örn. sadece FVG → FVG başarı %'si).
2. [x] **İşlem Günlüğüm → Paylaş köprüsü** — ✅ Her satırda **📤** butonu. Tıklayınca Paylaşımlar sekmesine geçer ve composer'ı otomatik doldurur: görseller (setup + after, max 3), parite, ve metin (açıklama + "Strateji: … · TF: … · RR: …"). Bias nötr varsayılan (günlükte yön yok), kullanıcı değiştirip "Paylaş"a basar.
3. [x] **Gated access (başvuru + admin onay)** — ✅ Kod hazır. `GATED_ACCESS` bayrağı (varsayılan **false** = mevcut davranış). Açıkken: yeni kayıt = başvuru ("onay bekliyor", giremez); admin panelinde **✅ Onayla** / Onayı al + "N onay bekliyor" sayacı + ⏳ rozet. Güvenli: `approved` kolonu yoksa sistem açık kalır (fail-open), adminler her zaman girer. **Aktifleştirmek için:** (a) SUPABASE_KURULUM.md → "Gated access" SQL'ini çalıştır, (b) `GATED_ACCESS=true` yap. *(SQL + bayrak kullanıcıda — lansman anında açılacak)*

---

## 🎯 UI / UX iyileştirmeleri — 2026-06-23 eklendi (sırayla, acele yok)
- [x] **Daraltılabilir kenar panel** — Logoya/☰'e tıklayınca panel kapanır, grafik tam ekran; durum hatırlanır. ✅
- [x] **4'lü grafikte RSI varsayılan kapalı** — RSI kapalı başlar; her grafiğin köşesindeki **RSI** düğmesiyle aç/kapat (çift tık iframe nedeniyle yakalanamadığı için köşe düğmesi yapıldı). ✅

## 🧩 Kod tarafı (ben yapacağım)
- [ ] **Analiz sekmesi** — admin günlük analiz ekler, YouTube videosunu başlangıç–bitiş saatiyle kırpıp gömer (sadece ilgili kısım oynar), grup izler. *(konuşuldu, onayını bekliyor)*
- [ ] (opsiyonel) **Mobilde akıcılık** — 4'lü grafiği telefonda tek grafiğe indir.

## 🗄️ Senin Supabase'de çalıştırman gereken SQL (bir kez — SUPABASE_KURULUM.md'de hazır)
- [ ] Admin kullanıcı listesi: `profiles` kolonları (is_moderator, is_banned, last_seen) + `admin_list_users` + `admin_set_flags` fonksiyonları.
- [ ] **feedback** tablosu + RLS (Beta geri bildirimleri admin'de görünsün).
- [ ] **nb_state** tablosu + RLS (İşlem Günlüğüm verisi cihazlar arası senkron olsun — SUPABASE_KURULUM.md'de hazır SQL).
- [ ] (opsiyonel) Banlı kullanıcının içerik atmasını sunucuda da engelleyen RLS kuralları.

## ⚖️ Karar / Bekleyen
- [ ] **Supabase Free mi Pro mu?** (50-100 kişilik özel grup) — gerçek kullanım tahminiyle karar verelim.
- [ ] **Domain** al + Render'a bağla (yılda ~$12; bağlamayı ben yaparım).

## ⏸️ Ertelendi
- [ ] **X/Twitter otomatik çekme** (@_MysticFlow_) — ücretli API/erişim gerektiriyor; şimdilik durduruldu.

---

## ✅ Bitti
- [x] **İşlem Günlüğüm: profiller (Backtest / Cash / …)** — Notebook'a özel, bağımsız profil sistemi (Raporlar'ın broker profillerinden ayrı). Üstte profil sekmeleri: tıkla → o profilin kayıtlarına geç; her sekmede kayıt adedi rozeti. Aktif sekmede ✎ (yeniden adlandır) ve 🗑 (sil — son profil silinemez, içindeki kayıtlar da gider). **＋ Profil** ile yeni profil. Her profil kendi verisini `fxdesk_notebook_<uid>_<profil>` anahtarında tutar; mevcut tek-profil verisi otomatik "Genel" profiline taşınır. Profil değişince parite filtresi sıfırlanır. Tümü `nb_state` ile cihazlar arası senkron (profiller + aktif profil + tüm profil verileri tek satırda).
- [x] **"İşlem Günlüğüm" sekmesi (Notion tarzı inline tablo)** — Journal/Raporlar'dan tamamen bağımsız yeni sekme (📓). Fotoğraftaki Notion düzeninin birebir karşılığı: **satır içi düzenlenebilir** tablo (modal yok). Sütunlar: Tarih & Saat · Parite · İşlem Grafiği · Time Frame · Açıklama · Net P&L · RR · Riske Edilen · Pozisyon · **After Chart**. Özellikler: görsel kutusuna tıklayıp **Ctrl+V** ile yapıştır (veya ＋ ile dosya seç) — **İşlem Grafiği ve After Chart hücrelerinin her birine 3 görsele kadar**; **yeni satırda tarih+saat otomatik** (düzenlenebilir datetime); parite/TF/pozisyon **renkli etiket (pill) seçimi** (EUR/GBP/XAU/BTC/ETH…); **parite filtresi** (üstte açılır kutu — örn. sadece XAU veya tüm pariteler; alttaki özet filtreye göre güncellenir; filtreliyken yeni satır o pariteyle açılır); **RR otomatik = Net P&L ÷ Riske Edilen** işaretli (elle de yazılabilir); altta özet (toplam P&L, TP/Stop, başarı %). Görsel tıkla → lightbox, ✕ ile kaldır, 🗑 ile satır sil. Görseller `screenshots` bucket'ına yüklenir, veri `nb_state` tablosuyla cihazlar arası senkronlanır (tablo yoksa localStorage'da çalışır). *(Supabase'de `nb_state` SQL'i bir kez çalıştırılmalı — SUPABASE_KURULUM.md'de hazır.)*
- [x] **Journal → "Raporlar" olarak yeniden adlandırıldı** — Sol menü, başlık ve ilgili metinler 📁 **Raporlar** oldu (iç kod/fonksiyon adları korundu). Böylece 📁 Raporlar (MT5/PDF rapor içe aktarma) ile 📓 İşlem Günlüğüm (kişisel ekran görüntüsü defteri) net ayrışıyor.
- [x] **Raporlar'da yükleme hatırlatma + son yükleme takibi** — Sekme üstünde bant: bugün yükleme yoksa **"📌 Bugün yaptığın trade'leri sisteme yükledin mi?"** (amber), yüklediysen **"✅ Bugün yükleme yaptın — [profil] · saat · TÜR"** (yeşil). Altında **profil bazında en son yükleme listesi** (hangi profile ne zaman HTML/PDF/CSV attın). Her başarılı rapor içe aktarımında otomatik kaydedilir (`fxdesk_uploads_<uid>`), `jr_state` ile cihazlar arası senkron.
- [x] **Journal'da pariteye göre filtre** — Tablo üstüne **açılır parite filtresi** eklendi (her parite yanında işlem adedi rozeti; "Tüm pariteler" varsayılan). Seçilince o paritenin tüm işlemleri tabloda listelenir; filtre yalnızca tablo görünümünde görünür (takvimde gizli) ve sayfalama/sayaçla uyumlu. Paritelerin listesi mevcut işlemlerden otomatik üretilir; seçili parite silinince filtre "Tüm pariteler"e döner.
- [x] **Journal tablosu sadeleştirme** — Tablo artık yalnızca **Tarih · Parite · Yön · Kâr/Zarar (P/L)** + sil sütunu. Giriş/Çıkış/SL/RR/Strateji/Psikoloji **veride korunuyor** (İstatistik, grafikler, RR ve otomatik P/L hesabı bozulmadan çalışır) — sadece tablo görünümü sadeleşti. Tablo min-genişliği 760→460px (mobilde daha az yatay kaydırma).
- [x] **Paylaşımlarda çoklu görsel** — Paylaşıma **3 görsele kadar** eklenebilir (📎 çoklu seç veya Ctrl+V; her görsel ayrı kaldırılabilir önizleme). Akışta 1 görsel tam genişlik, 2-3 görsel galeri (grid) olarak; tıklayınca lightbox. NSFW kontrolü her görsele uygulanır. Demo modda `imgs[]` dizisinde; Supabase'de çoklu URL `img_url`'de JSON dizi olarak saklanır (eski tekli paylaşımlar geriye dönük uyumlu). Admin panelinde çoklu görsel rozeti + tek tıkla hepsini silme.
- [x] Paylaşımlar: kullanıcı kendi gönderi/yorumunu **düzenleyebilir** (✏️ inline) ve kendi yorumunu **silebilir** (🗑); düzenleme sahibe, silme sahip+yöneticiye özel. *(Supabase'de `upd_post` + `upd_comment` RLS gerekli.)*
- [x] Admin: kullanıcı listesi (e-posta, kayıt, son aktif, çevrimiçi durum) + arama + satır içi mod yap/al + banla.
- [x] Beta geri bildirimlerini admin panelinde okunur hale getirme (panel açılınca yüklenir, sayaç + otomatik tazele).
- [x] Kayıp İstatistik/Ayarlar/Beta sürümünü geri yükleme + klasörü git'e (GitHub/Render) düzgün bağlama.
