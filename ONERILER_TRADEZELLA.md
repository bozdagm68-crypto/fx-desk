# TradeZella Tarzı Sistem — Analiz ve Yol Haritası Önerisi

> Hazırlayan: Claude · 2026-07-02
> Kaynak karşılaştırma: TradeZella, Tradervue, Edgewonk, TraderSync ve FX Replay'in halka açık özellik setleri.

## 1) Şu an elimizde ne var? (güçlü yanlar)

Kodak Trade Community, TradeZella'nın çekirdek özelliklerinin şaşırtıcı derecede büyük bölümünü **zaten** karşılıyor:

| TradeZella özelliği | Bizde durumu |
|---|---|
| Trade journal (işlem günlüğü) | ✅ Raporlar + İşlem Günlüğüm (iki ayrı görünüm) |
| Broker import | ✅ MT5 HTML, Tickmill CSV, prop PDF statement |
| P&L takvimi | ✅ Aylık takvim + hafta özetleri + gün detay modalı |
| Zella Score | ✅ Kodak Skoru (radar grafikli) |
| Winrate / PF / expectancy / Sharpe | ✅ İstatistik sekmesi |
| Duygu/davranış etiketleri | ✅ FOMO, Revenge, vb. + "Duygunun Maliyeti" raporu |
| Prop firm challenge takibi | ✅ FTMO/FundedNext/The5ers/BrightFunded şablonlu, trailing DD dahil |
| Rozetler / gamification | ✅ İki ayrı rozet sistemi |
| Paylaşılabilir performans kartı | ✅ PNG kart + pano kopyalama |
| Topluluk | ✅ TradeZella'da yok — bizde VAR (avantajımız!) |
| Günlük not (daily journal) | ✅ YENİ eklendi (gün detayında otomatik kayıtlı not) |

## 2) Eksikler — öncelik sırasıyla eklenecekler

### 🥇 P1 — En yüksek etki (TradeZella'nın kalbi)
1. **İşlem başına "Setup / Playbook" sistemi**: Kullanıcı kendi setup'larını tanımlar (örn. "Londra likidite avı"), her işlemi bir setup'a bağlar. İstatistik sekmesi setup bazında winrate/PF gösterir. *Mevcut "Strateji" alanı bunun ilkel hali — playbook'a dönüştürülmeli: kural listesi + uyum yüzdesi.*
2. **İşlem detay sayfası**: Şu an işlemler tablo satırı. TradeZella'da her işlemin kendi sayfası var: grafik görselleri, notlar, etiketler, R-multiple, MFE/MAE. *Gün modalının işlem-detay versiyonu.*
3. **Running P&L / equity üzerine drawdown bandı**: Sermaye eğrisine max-DD gölgesi eklemek (Chart.js ile kolay).

### 🥈 P2 — Farkı hissettiren
4. **Backtest/Replay** (yol haritasında zaten var): FX Replay tarzı. Büyük iş — ayrı faz.
5. **MFE/MAE takibi**: "İşlem lehine en çok ne kadar gitti?" → erken çıkış analizi. Import'ta yoksa elle giriş alanı.
6. **Haftalık/aylık otomatik rapor özeti**: "Bu hafta: 12 işlem, %58 WR, en iyi setup X" — pazar akşamı bildirimi (push altyapısı hazır).
7. **Hedef bazlı risk uyarısı**: Günlük kayıp limitine yaklaşınca (prop panelinde var) uygulama genelinde kırmızı bant.

### 🥉 P3 — Cila
8. **Not defterine zengin metin/checklist** (şu an düz metin).
9. **İşlem günlüğünde çoklu seçim + toplu silme/etiketleme.**
10. **CSV dışa aktarma** (İşlem Günlüğüm tablosu için; Raporlar'da JSON yedek zaten var).
11. **Karanlık/açık tema dışında "OLED" tema.**

## 3) Bilinçli olarak EKLENMEMESİ gerekenler

- **Canlı broker bağlantısı (API ile otomatik senkron)**: Yol haritasında var ama beta topluluğu 100-150 kişiyken bakım yükü yüksek; önce rapor-yükleme akışı otursun.
- **Mobil uygulama (native)**: PWA yeterli; native app maliyeti şu ölçekte gereksiz.
- **Çoklu dil**: Topluluk Türkçe; İngilizce lansmandan sonra.
- **Ödeme/abonelik altyapısı**: Özel Discord grubu modeli varken gereksiz karmaşa.

## 4) Bu oturumda yapılanlar (özet)

- 🐛 **Kritik hata**: `NB_POS_C` tanımsızdı → İşlem Günlüğüm'de "Pozisyon" (TP/Stop/BE) seçilince tablo bozuluyordu. Düzeltildi.
- 🐛 Journal'daki "Paylaşımlar'a da gönder" kutusu canlı modda (Supabase) hiçbir şey paylaşmıyordu → artık gerçekten paylaşıyor (görsel yüklemesiyle).
- 🛡 Takvim başlıkları ve sembol adları HTML-escape edildi (XSS koruması).
- 🔄 Ekonomik takvim artık kendini canlı tutuyor: 15 dk'da bir + sekmeye dönünce tazeleme; liste bugüne otomatik kaydırılıyor.
- 🎨 CSS regresyonu: eski yatay menü kuralları sidebar butonlarının dikey padding'ini eziyordu → düzeltildi.
- 🗳 Demo modda oy sayacının eksiye düşebilme ihtimali kapatıldı.
- ⌨️ **Ctrl+K Komut Paleti** eklendi: sekmeler, semboller, "yeni işlem", tema, odak modu, risk hesaplayıcı — hepsi klavyeden.
- 📝 **Günlük Not**: P&L takviminde her güne not yazılabiliyor (📝 işaretli), Supabase'e senkronlanıyor.
- 🌐 Edge Function `ff-calendar` yeniden yazıldı: ForexFactory HTML'inden **Açıklanan (actual)** değerini ayrıştırıp JSON'a ekliyor (engellenirse zarifçe eski davranışa düşüyor).
