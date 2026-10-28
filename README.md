# Furks Kahve

Furks Kahve için geliştirilen çok sayfalı web sitesi projesi.

## Yerel geliştirme

```bash
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde açılır.

## Link paylaşım önizlemesi

Tüm sayfalar `app/opengraph-image.png` dosyasındaki logo görselini paylaşır.
Görsel, mevcut `app/icon.svg` ambleminden hazırlanmıştır.

Yayında görsel bağlantılarının doğru alan adını kullanması için `SITE_URL`
ortam değişkenini sitenin tam HTTPS adresi olarak ayarlayın. Vercel üzerinde
bu değer verilmezse `VERCEL_PROJECT_PRODUCTION_URL` otomatik kullanılır;
yerel geliştirmede localhost adresi kullanılır.

## Kontroller

```bash
npm run lint
npm run build
```

Proje kararları, Supabase kurulumu ve yayın adımları sonraki geliştirme
aşamalarında bu dosyaya eklenecek.

## Görsel kaynakları

Ana sayfadaki kavurma atölyesi ve öne çıkan kahve görselleri bu proje için
OpenAI ImageGen ile özgün olarak üretildi.
