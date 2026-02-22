# 📸 Resimler Nasıl Eklenir

Şu anda web sitesi **placeholder (yer tutucu)** görsellerle çalışıyor. Bu rehber, gerçek görselleri nasıl ekleyeceğini açıklar.

---

## 🎯 Hızlı Başlangıç

### 3 adımda resim değiştir:

1. **Resmi `assets/images/` klasörüne kopyala**
```bash
cp yeni-resim.jpg assets/images/
```

2. **HTML'de referansı güncelle**
```html
<!-- Eski -->
<img src="assets/images/placeholder-hero.svg" alt="Hero">

<!-- Yeni -->
<img src="assets/images/yeni-resim.jpg" alt="Hero">
```

3. **Tarayıcıda kontrol et**
```
http://localhost:8000
```

**İşte bu kadar!** 🎉

---

## 📂 Görsel Türleri

### 1. SVG Simgeler (zaten var)
```
assets/images/
├── icon-shield.svg
├── icon-globe.svg
├── icon-shopping-cart.svg
├── icon-heart-pulse.svg
└── ... (daha fazla)
```

**Bu simgeleri değiştirme gerek yok** - zaten profesyonel simgeler!

### 2. Placeholder'lar (DEĞİŞTİRİLMELİ)
```
assets/images/
├── placeholder-hero.svg       ← Hero banner için
├── placeholder-team.svg       ← Ekip fotoğrafları için
└── placeholder-info.txt       ← Hangi görsellerin gerekli olduğu
```

**Bunları değiştirmelisin!**

---

## 🖼️ Hangi Görseller Gerekli?

### Öncelik 1 (ÖNEMLİ)

#### Logo (Header)
- **Konum**: Header'da, şu an metin olarak
- **Boyut**: ~200x60px (yatay) veya 150x150px (kare)
- **Format**: SVG (tercih edilen) veya PNG
- **Dosya adı**: `logo.svg` veya `logo.png`

```html
<!-- index.html, satır 16 -->
<!-- Eski -->
<a href="index.html" class="header__logo">Steuerkanzlei Ibrahim Erben</a>

<!-- Yeni -->
<a href="index.html" class="header__logo">
  <img src="assets/images/logo.svg" alt="Steuerkanzlei Ibrahim Erben">
</a>
```

**CSS ekle**:
```css
.header__logo img {
  height: 50px;
  width: auto;
}
```

#### Hero Banner Görseli (Ana Sayfa)
- **Konum**: Hero bölümünde arka plan veya görsel
- **Boyut**: 1920x1080px (Full HD)
- **Format**: JPG (optimize edilmiş)
- **Dosya adı**: `hero-background.jpg`

**Seçenek 1**: Arka plan resmi
```html
<section class="hero" style="background-image: url('assets/images/hero-background.jpg');">
```

**Seçenek 2**: Görsel eleman olarak
```html
<div class="hero__visual">
  <img src="assets/images/hero-image.jpg" alt="Vergi danışmanlığı">
</div>
```

#### Ekip Fotoğrafı (Hakkımızda)
- **Konum**: `ueber-uns.html`, Ekip bölümü
- **Boyut**: 800x800px (kare)
- **Format**: JPG
- **Dosya adı**: `team.jpg` veya `ibrahim-erben.jpg`

```html
<!-- ueber-uns.html, ekip bölümü -->
<!-- Eski -->
<img src="assets/images/placeholder-team.svg" alt="Team" class="team-photo">

<!-- Yeni -->
<img src="assets/images/team.jpg" alt="Ibrahim Erben und Team" class="team-photo">
```

### Öncelik 2 (İYİ OLUR)

#### Hizmet Görselleri
- Her hizmet kategorisi için 1 görsel
- **Boyut**: 600x400px
- **Format**: JPG
- **Dosya adları**:
  - `service-steuerstrafrecht.jpg`
  - `service-wegzug.jpg`
  - `service-ecommerce.jpg`
  - `service-heilberufe.jpg`
  - `service-immobilien.jpg`
  - `service-nachfolge.jpg`
  - `service-betreuung.jpg`

#### Ofis Fotoğrafları
- İletişim sayfası için ofis görüntüleri
- **Boyut**: 800x600px
- **Format**: JPG

### Öncelik 3 (OPSIYONEL)

- Referans logoları (müşteriler)
- İkon varyasyonları
- Sosyal medya görselleri

---

## 📏 Görsel Gereksinimleri

### Dosya Boyutları
- **Hero/Banner**: Max 500 KB
- **Ekip fotoğrafları**: Max 200 KB
- **Simgeler**: Max 50 KB
- **Logo**: Max 100 KB

### Formatlar
- **Fotoğraflar**: JPG (optimize edilmiş)
- **Simgeler/Logo**: SVG (tercih edilen) veya PNG
- **Arka planlar**: JPG veya WebP

### Optimizasyon
Görselleri optimize et:
- **Online**: [TinyPNG.com](https://tinypng.com/)
- **macOS**: ImageOptim
- **Komut satırı**: ImageMagick

```bash
# JPG optimize et
convert input.jpg -quality 85 -strip output.jpg

# Yeniden boyutlandır
convert input.jpg -resize 800x600 output.jpg
```

---

## 🔧 Adım Adım: Logo Değiştirme

### 1. Logo dosyasını hazırla
- Format: SVG veya PNG (şeffaf arka plan)
- Boyut: ~200x60px
- Dosya adı: `logo.svg` veya `logo.png`

### 2. `assets/images/` klasörüne kopyala
```bash
cp /path/to/logo.svg assets/images/
```

### 3. Header'ı güncelle
Her HTML dosyasında (index.html, leistungen.html, vb.):

```html
<!-- Eski (satır ~16) -->
<a href="index.html" class="header__logo">Steuerkanzlei Ibrahim Erben</a>

<!-- Yeni -->
<a href="index.html" class="header__logo">
  <img src="assets/images/logo.svg" alt="Steuerkanzlei Ibrahim Erben Logo">
</a>
```

### 4. CSS ekle (`assets/css/styles.css`)
```css
.header__logo {
  display: inline-block;
  line-height: 0;
}

.header__logo img {
  height: 50px;
  width: auto;
  display: block;
}

/* Mobile */
@media (max-width: 768px) {
  .header__logo img {
    height: 40px;
  }
}
```

### 5. Tüm sayfalarda tekrarla
- `index.html`
- `leistungen.html`
- `ueber-uns.html`
- `kontakt.html`
- `faq.html`
- `impressum.html`
- `datenschutz.html`

---

## 🔧 Adım Adım: Hero Banner Değiştirme

### 1. Görsel hazırla
- Boyut: 1920x1080px
- Format: JPG
- Optimize et (<500 KB)
- Dosya adı: `hero-background.jpg`

### 2. `assets/images/` klasörüne kopyala

### 3. CSS ile arka plan olarak ekle
```css
/* assets/css/styles.css */
.hero--slideshow {
  background-image: url('../images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Overlay için (metin okunabilirliği) */
.hero--slideshow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 58, 138, 0.8);
  z-index: 0;
}
```

---

## 🎨 Görsel İpuçları

### En İyi Uygulamalar

1. **Tutarlı stilde kullan**
   - Aynı filtre/renk tonu
   - Benzer kompozisyon
   - Tutarlı kalite

2. **Alt metin her zaman ekle**
```html
<!-- İyi ✅ -->
<img src="team.jpg" alt="Ibrahim Erben und Team vor dem Büro">

<!-- Kötü ❌ -->
<img src="team.jpg">
```

3. **Responsive görseller**
```html
<!-- Farklı boyutlar için -->
<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  alt="Hero image"
>
```

4. **Lazy loading**
```html
<img src="image.jpg" alt="..." loading="lazy">
```

---

## 📋 Kontrol Listesi

Görsel eklerken:

- [ ] Dosya **optimize edilmiş** (<500 KB)
- [ ] Dosya adı **açıklayıcı** (`logo.svg` değil `img123.png`)
- [ ] **Alt metin** eklendi
- [ ] Tüm **sayfalarda** güncellendi (logo için)
- [ ] **Mobile'da** test edildi
- [ ] **Farklı tarayıcılarda** test edildi

---

## 🐛 Yaygın Sorunlar

### "Görsel görünmüyor"

**Sebep**: Yol yanlış

**Çözüm**: Yolu kontrol et
```html
<!-- Doğru -->
<img src="assets/images/logo.svg" alt="Logo">

<!-- Yanlış (bir seviye yukarı) -->
<img src="../assets/images/logo.svg" alt="Logo">
```

### "Görsel çok büyük/yavaş"

**Sebep**: Optimize edilmemiş

**Çözüm**: TinyPNG.com ile optimize et veya:
```bash
convert input.jpg -quality 85 -strip output.jpg
```

### "Görsel bozuk görünüyor"

**Sebep**: Aspect ratio korunmamış

**Çözüm**: CSS ile düzelt
```css
img {
  width: 100%;
  height: auto;
  object-fit: cover; /* veya contain */
}
```

---

## 📚 Ek Kaynaklar

### Ücretsiz Stok Görseller
- [Unsplash](https://unsplash.com/) - Yüksek kalite fotoğraflar
- [Pexels](https://pexels.com/) - Ücretsiz stok fotoğraflar
- [Pixabay](https://pixabay.com/) - Geniş koleksiyon

### Simge Kaynakları
- [Heroicons](https://heroicons.com/) - SVG simgeler
- [Feather Icons](https://feathericons.com/) - Minimal simgeler
- [Font Awesome](https://fontawesome.com/) - Popüler simge kütüphanesi

### Optimizasyon Araçları
- [TinyPNG](https://tinypng.com/) - PNG/JPG optimizasyon
- [Squoosh](https://squoosh.app/) - Google'ın görsel optimizatörü
- [ImageOptim](https://imageoptim.com/) - macOS uygulaması

---

**Mutlu görsel ekleme!** 📸

Sorular? → Koddaki placeholder-info.txt dosyasına bak!
