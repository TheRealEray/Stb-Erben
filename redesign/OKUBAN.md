# Steuerkanzlei Ibrahim Erben - Web Sitesi Yeniden Tasarımı

Modern, responsive ve çok dilli web sitesi Steuerkanzlei Ibrahim Erben için.

---

## 🌟 Özellikler

### ✅ Çok Dilli Destek
- **3 dil**: Almanca (DE), Türkçe (TR), İngilizce (EN)
- Otomatik dil algılama
- URL parametresi ile dil seçimi: `?lang=tr`
- localStorage ile tercih kaydetme

### ✅ Modern Tasarım
- Hero-Slideshow (5 farklı slayt)
- Responsive navigasyon açılır menüler ile
- Düzgün animasyonlar ve geçişler
- Modern simgeler ve görsel efektler

### ✅ Tam Responsive
- **Masaüstü**: > 768px
- **Tablet**: 480px - 768px
- **Mobil**: < 480px

### ✅ Tamamlanmış Sayfalar
1. **Ana Sayfa** (`index.html`) - Hero-Slideshow, Hizmetler, SSS Teaser
2. **Hizmetler** (`leistungen.html`) - Tüm hizmet kategorileri
3. **Hakkımızda** (`ueber-uns.html`) - Şirket hikayesi ve değerler
4. **İletişim** (`kontakt.html`) - Form ve harita
5. **SSS** (`faq.html`) - 20 soru ve cevap
6. **Künye** (`impressum.html`)
7. **Gizlilik** (`datenschutz.html`)

---

## 📂 Klasör Yapısı

```
redesign/
├── index.html              # Ana sayfa
├── leistungen.html         # Hizmetler
├── ueber-uns.html          # Hakkımızda
├── kontakt.html            # İletişim
├── faq.html                # SSS
├── impressum.html          # Künye
├── datenschutz.html        # Gizlilik
├── assets/
│   ├── css/
│   │   └── styles.css      # Ana stil sayfası
│   ├── js/
│   │   └── i18n.js         # Dil sistemi
│   ├── images/
│   │   └── *.svg           # Tüm simgeler
│   └── translations/
│       ├── de.json         # Almanca
│       ├── tr.json         # Türkçe
│       └── en.json         # İngilizce
└── [Dokümantasyon dosyaları]
```

---

## 🚀 Hızlı Başlangıç

### Lokal olarak çalıştırma:

1. **Basit HTTP sunucusu ile** (önerilir):
```bash
cd redesign
python3 -m http.server 8000
```
Sonra: `http://localhost:8000` tarayıcıda aç

2. **Veya dosyayı doğrudan aç**:
`index.html`'i çift tıkla (dikkat: dil sistemi sunucu gerektirir!)

---

## 🌍 Dil Değiştirme

### Kullanıcılar için:
- Sağ üstteki dil değiştiriciyi tıkla (🇩🇪 DE / 🇹🇷 TR / 🇬🇧 EN)
- Veya URL'ye ekle: `?lang=tr` veya `?lang=en`

### Geliştiriciler için:
Çeviri ekleme/düzenleme:

1. `assets/translations/tr.json` (veya de.json, en.json) aç
2. Metni ekle/düzenle
3. HTML'de `data-i18n` özniteliği kullan:

```html
<h1 data-i18n="anahtariniz">Yedek metin</h1>
```

Ayrıntılı talimatlar: `DILLER-KILAVUZU.md`

---

## 📱 Responsive Tasarım

Tüm sayfalar optimize edilmiştir:
- **Mobil**: Dokunma dostu düğmeler, optimize menü, compact düzen
- **Tablet**: Uyarlanmış grid düzenleri
- **Masaüstü**: Tam özellikler, hover efektleri

---

## 🎨 Bileşenler

### Hero-Slideshow
5 farklı slayt, otomatik döner (5 saniye):
- Slayt 1: Ana mesaj
- Slayt 2: Steuerstrafrecht (24/7)
- Slayt 3: Wegzug (bayraklar)
- Slayt 4: E-Commerce (platformlar)
- Slayt 5: İstatistikler

### Navigasyon
- Responsive açılır menüler
- Mobil hamburger menü
- Öne çıkan hizmet (Steuerstrafrecht - kırmızı)

### Kartlar & Izgara
- Hover efektleri ile interaktif kartlar
- 1/2/3 sütunlu gridler (responsive)
- Simgeler ve görsel öğeler

---

## 📝 Önemli Dosyalar

- `BURADAN-BASLA.md` - Proje genel bakış
- `DILLER-KILAVUZU.md` - Çeviri rehberi
- `RESIMLER-EKLE.md` - Görsel ekleme talimatları
- `SON-OZET.txt` - Proje özeti

---

## 🔧 Teknik Detaylar

- **HTML5** semantik işaretleme ile
- **CSS3** custom properties (CSS değişkenleri) ile
- **Vanilla JavaScript** (framework yok)
- **SVG simgeler** ölçeklenebilir grafikler için
- **Mobile-first** yaklaşım

---

## 🌐 Canlı Demo

Web sitesi şurada yayında:
**https://steuerkanzlei-erben-demo.netlify.app**

---

## 📧 Destek

Sorular veya sorunlar için:
- Dokümantasyon dosyalarına bak
- Koddaki yorumları kontrol et
- Geliştiriciye ulaş

---

**Mutlu kodlama!** 🎉
