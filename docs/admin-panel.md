# Toptan talep yönetimi

## Kullanım

- `/admin` yönetim ekranıdır; oturum yoksa `/admin/giris` açılır.
- Giriş ekranında kullanıcı adı **Deniz Yalın** olarak yazılır.
- Panel yalnızca teklif taleplerini gösterir. Ödeme, sipariş onayı, kayıt silme,
  ürün yönetimi veya kullanıcı kaydı özelliği içermez.
- En yeni kayıtlar önce listelenir; her sayfada 20 talep gösterilir.
- “Listeyi yenile” yeni kayıtları getirir. “Çıkış yap” bu cihazın oturumunu kapatır.

## İlk kullanıcı kurulumu (bir kez)

Kafe sahibinin Supabase paneline erişmesi gerekmez. Kurulumu yapan kişi,
Supabase **Authentication → Users → Add user → Create new user** ekranında:

1. Teknik kullanıcı tanımlayıcısı olarak `deniz.yalin@furks-admin.invalid`
   adresini kullanır. Bu `.invalid` adresi bir posta kutusu değildir.
2. En az 6 karakterlik bir şifre belirler; mümkünse uzun ve benzersiz bir şifre
   seçer. `1234` sağlayıcının asgari şifre uzunluğunu karşılamaz.
3. **Auto Confirm User** seçeneğini açar; e-posta daveti göndermez.
4. Oluşan kullanıcının `app_metadata` alanına `"role": "admin"` ekler.
   `user_metadata` alanına eklenen bir rol yetki sağlamaz.

SQL Editor ile, sadece bu teknik hesabı yetkilendirmek için:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where email = 'deniz.yalin@furks-admin.invalid';
```

Yeni rolün oturuma yansıması için çıkış yapıp tekrar giriş yapılır. Şifreler
kaynak koda, GitHub'a veya ortam değişkenlerine yazılmaz; Supabase Auth yönetir.
Şifre değişiklikleri gerektiğinde bu hesabın Authentication ekranından yapılır.

## Veritabanı

`supabase/migrations/20261027180634_wholesale_admin_read_access.sql` uygulanır.
Mevcut sütunlar ve ziyaretçilerin INSERT politikası korunur. Yeni SELECT izni
yalnızca `app_metadata.role = admin` olan doğrulanmış kullanıcılar içindir.
Ek restrictive SELECT politikası, başka permissive politikalar eklense bile
normal kullanıcıların talepleri okumasını engeller.

`supabase/tests/wholesale_admin_access.sql` anonim okuma engelini, anonim form
gönderimini, normal kullanıcı ve `user_metadata` ile yetki yükseltme engelini,
yönetici okumasını ve UPDATE/DELETE izinlerinin kapalı olduğunu denetler.
Test verileri transaction sonunda geri alınır.

## Oturum ve erişim

- İstek başına yeni `@supabase/ssr` istemcisi kullanılır; oturumlar paylaşılmaz.
- Admin çerezleri HttpOnly, SameSite=Lax ve üretimde Secure olarak ayarlanır.
- `proxy.ts` yalnızca `/admin` yollarında oturum yeniler; sunucu veri katmanı
  `getUser()` ile kullanıcıyı ayrıca doğrular.
- Şahsi bilgiler önbelleğe alınmaz. Admin cevapları `private, no-store` taşır.
- Service-role anahtarı kullanılmaz. Veritabanı sorguları kullanıcının JWT'si
  ve RLS üzerinden çalışır; yönetici kontrolü SELECT işleminden önce yapılır.
- Admin sayfaları arama motorları için noindex/nofollow olarak işaretlenir.
- Genel kayıt olma ekranı yoktur; yeni hesaplara admin rolü otomatik verilmez.

## Yerel ve üretim ayarları

Mevcut `NEXT_PUBLIC_SUPABASE_URL` ve
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` yeterlidir. İlave şifre veya service-role
ortam değişkeni gerekmez. SQL yetki değişikliği ve ilk Auth kullanıcısı ayrıca
kurulmalıdır; yalnızca uygulama kodunu deploy etmek kullanıcı oluşturmaz.
