# FX Desk — Kolay Güncelleme (GitHub'a tek tıkla)

Artık her seferinde web'den dosya yüklemen gerekmez. İki yol var; biri yeter.

---

## Yol A — GitHub Desktop (en kolay, kod yok) ✅ önerilen

**Tek seferlik kurulum:**
1. https://desktop.github.com → indir, kur, GitHub hesabınla giriş yap.
2. **File → Clone repository** → `bozdagm68-crypto/fx-desk` → **Local path** olarak `C:\Users\mustafa\Desktop\fx-desk` seç (klasör boşsa direkt; doluysa farklı bir konuma klonla ve bundan sonra dosyaları oraya koyalım).
   - Not: Eğer mevcut `Desktop\fx-desk` klasörünü kullanmak istersen, GitHub Desktop "klasör boş değil" derse, klasörü farklı isimde klonla; sana yeni dosyayı o klasöre yazarım.

**Her güncellemede (2 tık):**
1. Ben `index.html`'i güncelleyince, GitHub Desktop sol panelde değişikliği otomatik görür.
2. Altta küçük bir not yaz (örn. "4'lü grafik") → **Commit to main**.
3. Üstte **Push origin** → bitti. Site 1-2 dk'da güncellenir.

---

## Yol B — deploy.bat (tek çift tık, Git kurulu olmalı)

**Tek seferlik kurulum:**
1. https://git-scm.com/download/win → Git'i indir/kur (hepsine Next yeterli).
2. `Desktop\fx-desk` klasöründe, adres çubuğuna `cmd` yazıp Enter (klasörde komut satırı açılır), şunları sırayla çalıştır:
   ```
   git init
   git remote add origin https://github.com/bozdagm68-crypto/fx-desk.git
   git add -A
   git commit -m "ilk"
   git branch -M main
   git push -u origin main
   ```
   İlk push'ta tarayıcı açılıp GitHub girişi ister — giriş yap (bir kere). 

**Her güncellemede:**
- `Desktop\fx-desk` içindeki **deploy.bat** dosyasına çift tıkla → otomatik commit + push. Site güncellenir. (Şifre tekrar sormaz.)

---

## Hangisi?
- Bilgisayarla çok uğraşmak istemiyorsan **Yol A (GitHub Desktop)** — görsel, iki tık.
- "Çift tıkla bitsin" istiyorsan **Yol B (deploy.bat)** — ama önce Git kurulumu + tek seferlik komutlar gerek.

İkisinde de ben dosyayı `Desktop\fx-desk`'e yazmaya devam ederim; sana sadece "gönder" kalır.
