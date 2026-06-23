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
- [ ] **Paylaşımlarda çoklu görsel** — Topluluk paylaşımında tek görsel yerine kullanıcı **aynı anda 3 görsele kadar** ekleyebilsin (önizleme + paylaşımda galeri görünümü).
- [ ] **Journal tablosu sadeleştirme** — Tablodan **Giriş, Çıkış, SL, RR, Strateji, Psikoloji** sütunlarını kaldır; yalnızca **Tarih · Parite · Yön · Kazanılan/Kaybedilen (P/L)** göster. *(Not: bu alanlar veride saklanmaya devam mı etsin yoksa tamamen mi kalksın — uygularken netleştirilecek.)*
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
- [x] Admin: kullanıcı listesi (e-posta, kayıt, son aktif, çevrimiçi durum) + arama + satır içi mod yap/al + banla.
- [x] Beta geri bildirimlerini admin panelinde okunur hale getirme (panel açılınca yüklenir, sayaç + otomatik tazele).
- [x] Kayıp İstatistik/Ayarlar/Beta sürümünü geri yükleme + klasörü git'e (GitHub/Render) düzgün bağlama.
