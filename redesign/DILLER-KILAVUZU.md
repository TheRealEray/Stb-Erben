# 🌍 Diller Kılavuzu - Çok Dilli Web Sitesi

Bu web sitesi **3 dili destekler**: Almanca (DE), Türkçe (TR), İngilizce (EN)

---

## 🎯 Hızlı Başlangıç

### Çeviri eklemek istiyorsun?

1. **JSON dosyasını aç**: `assets/translations/tr.json` (veya de.json, en.json)
2. **Metni ekle/düzenle**:
```json
{
  "yeniAlan": {
    "baslik": "Başlığınız",
    "metin": "Metniniz"
  }
}
```

3. **HTML'de kullan**:
```html
<h1 data-i18n="yeniAlan.baslik">Yedek başlık</h1>
<p data-i18n="yeniAlan.metin">Yedek metin</p>
```

**İşte bu kadar!** 🎉

---

## 📖 Detaylı Açıklama

### Nasıl Çalışır?

Sistem `data-i18n` özniteliğini kullanır:

```html
<h1 data-i18n="hero.slide1.title">Steuerberatung für vorausschauende Unternehmer</h1>
```

Sayfa yüklendiğinde:
1. Sistem aktif dili algılar (URL, localStorage veya tarayıcı)
2. Doğru JSON dosyasını yükler (`de.json`, `tr.json` veya `en.json`)
3. Tüm `data-i18n` özniteliklerine sahip öğeleri bulur
4. Metni çevirilen versiyonla değiştirir

---

## 🗂️ Dosya Yapısı

```
assets/translations/
├── de.json    # Almanca (varsayılan)
├── tr.json    # Türkçe
└── en.json    # İngilizce
```

Her dosya aynı yapıya sahip!

---

## 📝 Çeviri Ekleme (Adım Adım)

### Örnek: "Hizmetler" sayfasına yeni bir bölüm ekle

#### 1. Almanca ekle (de.json)
```json
{
  "pages": {
    "services": {
      "yeniHizmet": {
        "title": "Digitalisierung & KI",
        "text": "Wir beraten bei der digitalen Transformation.",
        "link": "Mehr erfahren →"
      }
    }
  }
}
```

#### 2. Türkçe ekle (tr.json)
```json
{
  "pages": {
    "services": {
      "yeniHizmet": {
        "title": "Dijitalleşme & Yapay Zeka",
        "text": "Dijital dönüşümde danışmanlık veriyoruz.",
        "link": "Daha fazla bilgi →"
      }
    }
  }
}
```

#### 3. İngilizce ekle (en.json)
```json
{
  "pages": {
    "services": {
      "yeniHizmet": {
        "title": "Digitalization & AI",
        "text": "We advise on digital transformation.",
        "link": "Learn more →"
      }
    }
  }
}
```

#### 4. HTML'de kullan
```html
<div class="card">
  <h3 data-i18n="pages.services.yeniHizmet.title">Digitalisierung & KI</h3>
  <p data-i18n="pages.services.yeniHizmet.text">Wir beraten bei der digitalen Transformation.</p>
  <a href="#" data-i18n="pages.services.yeniHizmet.link">Mehr erfahren →</a>
</div>
```

---

## 🎨 Farklı Öznitelikler

### Metin içeriği (varsayılan)
```html
<h1 data-i18n="anahtarınız">Metin</h1>
```

### HTML içeriği
```html
<div data-i18n-html="anahtarınız">HTML ile <strong>metin</strong></div>
```

### Placeholder
```html
<input data-i18n-placeholder="anahtarınız" placeholder="Adınız">
```

### Alt text (resimler)
```html
<img data-i18n-alt="anahtarınız" alt="Açıklama">
```

### Title (tooltip)
```html
<button data-i18n-title="anahtarınız" title="Tooltip">Düğme</button>
```

### ARIA label (erişilebilirlik)
```html
<button data-i18n-aria="anahtarınız" aria-label="Açıklama">X</button>
```

---

## 🌐 Dil Değiştirme

### Kullanıcılar için

**Yöntem 1**: Dil değiştirici düğmesi
- Sağ üstteki düğmeyi tıkla
- Dil seç: 🇩🇪 DE / 🇹🇷 TR / 🇬🇧 EN

**Yöntem 2**: URL parametresi
- Türkçe: `?lang=tr`
- İngilizce: `?lang=en`
- Almanca: `?lang=de` (veya parametre yok)

Örnek: `https://site.com/index.html?lang=tr`

### Öncelik Sırası

Sistem şu sırayla kontrol eder:

1. **URL parametresi** (`?lang=tr`) ← En yüksek öncelik
2. **localStorage** (kullanıcının önceki seçimi)
3. **Tarayıcı dili** (örn. `navigator.language`)
4. **Varsayılan** (Almanca)

---

## 🔍 Anahtar Adlandırma Kuralları

### İyi ✅
```json
{
  "hero": {
    "slide1": {
      "title": "...",
      "subtitle": "...",
      "ctaPrimary": "..."
    }
  }
}
```

**Neden iyi?**
- Hiyerarşik yapı
- Açıklayıcı isimler
- camelCase kullanımı

### Kötü ❌
```json
{
  "text1": "...",
  "text2": "...",
  "button": "..."
}
```

**Neden kötü?**
- Yapı yok
- Belirsiz isimler
- Nereden geldiği belli değil

---

## 🛠️ Geliştirici İpuçları

### 1. Eksik çeviriyi bul

Tarayıcı konsolunu aç (F12), şunu ara:
```
[i18n] Translation key not found: anahtarınız
```

### 2. Tüm dilleri kontrol et

Her JSON dosyasının aynı anahtarlara sahip olduğundan emin ol!

```bash
# Basit kontrol (macOS/Linux)
diff <(jq -S 'keys' assets/translations/de.json) \
     <(jq -S 'keys' assets/translations/tr.json)
```

### 3. Nested keys (nokta notasyonu)

```json
{
  "sayfa": {
    "bolum": {
      "alttitle": "Metin"
    }
  }
}
```

HTML'de:
```html
<h1 data-i18n="sayfa.bolum.alttitle">Metin</h1>
```

---

## 📋 Mevcut Çeviriler

### Ana alanlar
- `meta.*` - Sayfa başlığı & açıklama
- `nav.*` - Navigasyon menüsü
- `hero.*` - Ana hero bölümleri (5 slayt)
- `trustBar.*` - Güven çubuğu
- `problemSolution.*` - Problem/Çözüm kartları
- `competencies.*` - Yeterlilik bölümü
- `process.*` - Süreç adımları
- `cta.*` - Harekete geçirme bölümleri
- `footer.*` - Footer
- `homepage.*` - Ana sayfa özel bölümler

### Sayfa çevirileri
- `pages.services.*` - Hizmetler sayfası
- `pages.about.*` - Hakkımızda sayfası
- `pages.contact.*` - İletişim sayfası
- `pages.faq.*` - SSS sayfası (20 soru)

---

## 🐛 Yaygın Sorunlar

### "Çeviriler çalışmıyor"

**Sebep**: Dosya yolu yanlış veya sunucu gerekli

**Çözüm**:
```bash
# Sunucu başlat
python3 -m http.server 8000

# Sonra aç: http://localhost:8000
```

### "Bazı metinler çevrilmiyor"

**Sebep**: `data-i18n` özniteliği eksik veya anahtar yanlış

**Çözüm**:
1. HTML'de özniteliği kontrol et
2. JSON'da anahtarın var olduğunu doğrula
3. Tarayıcı konsoluna bak (F12)

### "Dil değişmiyor"

**Sebep**: JavaScript hatası veya `i18n.js` yüklenmemiş

**Çözüm**:
1. Tarayıcı konsolunu kontrol et (F12)
2. `assets/js/i18n.js` yolunu doğrula
3. HTML'de script etiketini kontrol et:
```html
<script src="assets/js/i18n.js"></script>
```

---

## 📚 Örnekler

### Tam örnek: Yeni sayfa çevirisi

**de.json**:
```json
{
  "pages": {
    "blog": {
      "hero": {
        "title": "Unser Blog",
        "subtitle": "Aktuelle Steuernews"
      },
      "readMore": "Weiterlesen"
    }
  }
}
```

**tr.json**:
```json
{
  "pages": {
    "blog": {
      "hero": {
        "title": "Blogumuz",
        "subtitle": "Güncel Vergi Haberleri"
      },
      "readMore": "Daha Fazla Oku"
    }
  }
}
```

**blog.html**:
```html
<section class="hero">
  <h1 data-i18n="pages.blog.hero.title">Unser Blog</h1>
  <p data-i18n="pages.blog.hero.subtitle">Aktuelle Steuernews</p>
</section>

<article>
  <a href="#" data-i18n="pages.blog.readMore">Weiterlesen</a>
</article>
```

---

## 🎯 En İyi Uygulamalar

1. **Tutarlı ol**: Aynı adlandırma kuralını kullan
2. **Hiyerarşik düşün**: `sayfa.bolum.oge` yapısını kullan
3. **Açıklayıcı ol**: `text1` yerine `contactFormTitle` kullan
4. **Tüm dilleri güncelle**: Bir dilde değişiklik = diğerlerinde de değişiklik
5. **Yedek metni koy**: HTML'de her zaman Almanca metin bırak

---

## ✅ Kontrol Listesi

Yeni çeviri eklerken:

- [ ] Aynı anahtarı **3 dosyaya da** ekle (de.json, tr.json, en.json)
- [ ] Anahtar adı **açıklayıcı** ve **tutarlı**
- [ ] HTML'de `data-i18n` **doğru yazılmış**
- [ ] Tarayıcıda **test edilmiş** (tüm 3 dil)
- [ ] Konsol **hata göstermiyor**
- [ ] Yedek metin HTML'de **mevcut**

---

**Mutlu çeviri!** 🌍

Sorular? → Koddaki `assets/js/i18n.js` yorumlarını oku!
