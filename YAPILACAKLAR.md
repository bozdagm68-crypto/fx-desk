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
- [ ] **Journal'da pariteye göre filtre** — Tabloya parite filtresi ekle; bir parite seçilince (örn. **XAU**) o paritenin **tüm işlemleri** listelensin.

## 🧩 Kod tarafı (ben yapacağım)
- [ ] **Analiz sekmesi** — admin günlük analiz ekler, YouTube videosunu başlangıç–bitiş saatiyle kırpıp gömer (sadece ilgili kısım oynar), grup izler. *(konuşuldu, onayını bekliyor)*
- [ ] (opsiyonel) **Mobilde akıcılık** — 4'lü grafiği telefonda tek grafiğe indir.

## 🗄️ Senin Supabase'de çalıştırman gereken SQL (bir kez — SUPABASE_KURULUM.md'de hazır)
- [ ] Admin kullanıcı listesi: `profiles` kolonları (is_moderator, is_banned, last_seen) + `admin_list_users` + `admin_set_flags` fonksiyonları.
- [ ] **feedback** tablosu + RLS (Beta geri bildirimleri admin'de görünsün).
- [ ] (opsiyonel) Banlı kullanıcının içerik atmasını sunucuda da engelleyen RLS kuralları.

## ⚖️ Karar / Bekleyen
- [ ] **Supabase Free mi Pro mu?** (50-100 kişilik özel grup) — gerçek kullanım tahminiyle karar verelim.
- [ ] **Domain** al + Render'a bağla (yılda ~$12; bağlamayı ben yaparım).

## ⏸️ Ertelendi
- [ ] **X/Twitter otomatik çekme** (@_MysticFlow_) — ücretli API/erişim gerektiriyor; şimdilik durduruldu.

---

## ✅ Bitti
- [x] **Journal tablosu sadeleştirme** — Tablo artık yalnızca **Tarih · Parite · Yön · Kâr/Zarar (P/L)** + sil sütunu. Giriş/Çıkış/SL/RR/Strateji/Psikoloji **veride korunuyor** (İstatistik, grafikler, RR ve otomatik P/L hesabı bozulmadan çalışır) — sadece tablo görünümü sadeleşti. Tablo min-genişliği 760→460px (mobilde daha az yatay kaydırma).
- [x] **Paylaşımlarda çoklu görsel** — Paylaşıma **3 görsele kadar** eklenebilir (📎 çoklu seç veya Ctrl+V; her görsel ayrı kaldırılabilir önizleme). Akışta 1 görsel tam genişlik, 2-3 görsel galeri (grid) olarak; tıklayınca lightbox. NSFW kontrolü her görsele uygulanır. Demo modda `imgs[]` dizisinde; Supabase'de çoklu URL `img_url`'de JSON dizi olarak saklanır (eski tekli paylaşımlar geriye dönük uyumlu). Admin panelinde çoklu görsel rozeti + tek tıkla hepsini silme.
- [x] Paylaşımlar: kullanıcı kendi gönderi/yorumunu **düzenleyebilir** (✏️ inline) ve kendi yorumunu **silebilir** (🗑); düzenleme sahibe, silme sahip+yöneticiye özel. *(Supabase'de `upd_post` + `upd_comment` RLS gerekli.)*
- [x] Admin: kullanıcı listesi (e-posta, kayıt, son aktif, çevrimiçi durum) + arama + satır içi mod yap/al + banla.
- [x] Beta geri bildirimlerini admin panelinde okunur hale getirme (panel açılınca yüklenir, sayaç + otomatik tazele).
- [x] Kayıp İstatistik/Ayarlar/Beta sürümünü geri yükleme + klasörü git'e (GitHub/Render) düzgün bağlama.
