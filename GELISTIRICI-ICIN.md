# Steuerkanzlei Ibrahim Erben - Yeniden Tasarım Projesi

## Genel Bakış
Bu paket, modern tasarım, çok dilli destek (Almanca, Türkçe, İngilizce) ve duyarlı düzen ile Steuerkanzlei Ibrahim Erben için tam web sitesi yeniden tasarımını içerir.

---

## 📦 İçindekiler

### **HTML Sayfaları**
- `index.html` - Hero-Slideshow ile ana sayfa
- `leistungen.html` - Hizmetler genel bakış
- `ueber-uns.html` - Hakkımızda sayfası
- `kontakt.html` - Harita ile iletişim formu
- `faq.html` - SSS sayfası (20 soru)
- `impressum.html` - Künye
- `datenschutz.html` - Gizlilik politikası

### **Varlıklar**
```
assets/
├── css/
│   └── styles.css          # Tam stil sayfası (responsive, modern)
├── js/
│   └── i18n.js             # Uluslararasılaştırma sistemi
├── images/
│   └── icon-*.svg          # Tüm SVG simgeleri
└── translations/
    ├── de.json             # Almanca çeviriler
    ├── tr.json             # Türkçe çeviriler
    └── en.json             # İngilizce çeviriler
```

---

## 🎨 Tasarım Özellikleri

### **Modern UI Bileşenleri**
- **Hero-Slideshow** 5 slayt ile (otomatik döner, 5 saniye)
- **Responsive Navigasyon** açılır menüler ile
- **Dil değiştirici** (DE/TR/EN) URL parametresi & localStorage ile
- **Kartlar** hover efektleri ile
- **SSS-Accordion** düzgün animasyonlar ile
- **Güven Çubuğu** simgeler ile
- **CTA Bölümleri** gradient arka planlar ile

### **Responsive Tasarım**
- Masaüstü: > 768px
- Tablet: 768px - 480px
- Mobil: < 480px

Tüm öğeler tamamen responsive optimize edilmiştir!

---

## 🌍 Çok Dillilik (i18n)

### **Nasıl çalışır?**
Sistem HTML'de `data-i18n` özniteliklerini kullanır:

```html
<h1 data-i18n="hero.slide1.title">Almanca metin</h1>
```

**Otomatik Özellikler:**
- URL parametresi: `?lang=tr` veya `?lang=en`
- localStorage: Dil tercihini kaydeder
- Tarayıcı algılama: Yedek olarak tarayıcı dilini kullanır
- Dinamik geçiş: Sayfa yeniden yüklemeden

### **Çeviri ekleme**
JSON dosyalarında (`assets/translations/*.json`):

```json
{
  "hero": {
    "slide1": {
      "title": "Metniniz burada"
    }
  }
}
```

Sonra HTML'de:
```html
<h1 data-i18n="hero.slide1.title">Yedek metin</h1>
```

---

## 💻 Mevcut Web Sitesine Entegrasyon

### **Seçenek 1: Tam sayfaları kullan**
HTML dosyalarını kopyalayın ve `assets/` klasör yapısını koruyun.

### **Seçenek 2: Bireysel bileşenleri kullan**

#### **Hero-Slideshow**
```html
<!-- index.html'den HTML kopyala -->
<section class="hero hero--slideshow">...</section>

<!-- CSS: styles.css'den tüm .hero* sınıfları -->
<!-- JS: index.html'den Slideshow kodu (satırlar 624-728) -->
```

#### **Dil değiştirici**
```html
<!-- HTML: Header'dan Language Switcher -->
<div class="lang-switcher">...</div>

<!-- CSS: .lang-switcher* sınıfları -->
<!-- JS: assets/js/i18n.js dahil et -->
<!-- JSON: assets/translations/*.json -->
```

#### **SSS-Accordion**
```html
<!-- faq.html'den HTML -->
<ul class="faq__list">...</ul>

<!-- CSS: .faq* sınıfları -->
<!-- JS: index.html'den SSS kodu (satırlar 541-548) -->
```

### **Seçenek 3: Sadece stil kullan**
`styles.css` modüler bir CSS sistemi içerir:
- CSS Özel Özellikleri (`:root` değişkenleri)
- Yardımcı sınıflar (`.text-center`, `.mt-lg`, vb.)
- Bileşen sınıfları (`.btn`, `.card`, `.hero`, vb.)

Bireysel bölümleri kopyalayabilir veya tüm stil sayfasını kullanabilirsiniz.

---

## 🚀 Canlı Demo
Web sitesi burada yayında:
**https://steuerkanzlei-erben-demo.netlify.app**

Tüm özellikleri orada test edin!

---

## 📱 Mobil Optimizasyonlar

### **Ne optimize edildi?**
- Hero-Banner: Küçük ekranlar için ayarlanmış yükseklikler ve simge boyutları
- Navigasyon: Düzgün geçişlerle kaydırmalı mobil menü
- Dokunma dostu: Tüm düğmeler ve bağlantılar yeterli dokunma hedeflerine sahip
- Performans: Optimize edilmiş yükleme süreleri, büyük görüntü yok

### **Önemli Mobil Özellikler**
- Bağlantı tıklandıktan sonra mobil menü otomatik kapanır
- Akıcı animasyonlar (0.3s-0.4s geçişler)
- Yatay kaydırma çubukları yok
- Okunabilir yazı boyutları (en az 14px)

---

## 🎯 Özel Özellikler

### **1. Öne Çıkan Hizmet ile Navigasyon**
Açılır menü, vurgulanan "Steuerstrafrecht" bağlantısına sahiptir (kırmızı işaretli).

### **2. Hero-Slideshow Slaytları**
- Slayt 1: Simge grubu ile ana mesaj
- Slayt 2: Steuerstrafrecht (Acil) 24/7 rozeti ile
- Slayt 3: Wegzug bayrak animasyonu ile
- Slayt 4: E-Commerce platform rozetleri ile
- Slayt 5: İstatistikler/Sayılar (3 istatistik)

### **3. SEO-Optimize**
- Anlamsal HTML5
- Meta etiketleri (çok dilli)
- Resimler için alt metinler
- Başlık hiyerarşisi doğru

---

## 📞 Destek

Kod veya entegrasyon hakkında sorularınız için:
- Tüm sayfalar tamamen belgelenmiştir
- CSS sınıfları BEM kuralını izler (örn. `.hero__slide--active`)
- JavaScript vanilladır (framework yok)
- Koddaki yorumlar karmaşık kısımları açıklar

---

## ✅ Entegrasyon için Kontrol Listesi

- [ ] `assets/` klasörünü projeye kopyala
- [ ] HTML sayfalarını düzenle (Logo, iletişim bilgileri, vb.)
- [ ] `kontakt.html`'de Google Maps API anahtarını değiştir
- [ ] JSON dosyalarındaki çevirileri kontrol et/düzenle
- [ ] Görselleri değiştir (şu anda yer tutucular)
- [ ] İletişim formu backend entegrasyonu
- [ ] Üretim için SSL sertifikası
- [ ] Analytics/Tracking ekle (istenirse)

---

**Entegrasyonda başarılar!** 🎉

Teknik sorularınız varsa iletişime geçin.
