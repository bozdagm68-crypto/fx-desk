# FX Desk — Yapılacaklar

> Çalışma listesi. Müsait oldukça tek tek yapıyoruz. Yeni madde geldikçe buraya eklenir, biten **✅ Bitti**'ye taşınır.
> Format: `- [ ]` yapılacak · `- [x]` bitti.

---

## 📝 Senin yazacakların (öncelik buraya)
<!-- Aklına gelenleri buraya yaz; ben düzenleyip sıralarım -->
- [ ] (boş — sıradakini yaz)

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
