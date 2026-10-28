# Kahve ve toptan talep yönetimi

## Kullanım

- `/admin` yönetim ekranıdır; oturum yoksa `/admin/giris` açılır.
- Giriş ekranında kullanıcı adı **Deniz Yalın** olarak yazılır.
- “Toptan talepler” gelen teklif taleplerini gösterir; bu kayıtlar salt okunurdur.
- “Kahveler” (`/admin/kahveler`) üzerinden kahve eklenir, düzenlenir ve kaldırılır.
  Kahve adı, köken, tadım notları, kavurma derecesi, 250 g fiyatı ve stok durumu
  değiştirilebilir. Supabase panelini açmak veya siteyi tekrar deploy etmek gerekmez.
- Kahve kaldırma ayrıca bir onay kutusu gerektirir ve kalıcıdır. Geçici stok yokluğu
  için kahveyi kaldırmak yerine “Stokta var” işareti kaldırılır.
- Yeni kahvelerde varsayılan marka simgesi gösterilir. Mevcut görseller ürün ID'sine
  bağlı olduğu için isim değişince korunur. Görsel yükleme bu sürümde bulunmaz.
- Ana sayfanın mevcut üç seçimi sabit ID'leriyle korunur; biri kaldırılırsa
  sıradaki kahve onun yerini alır. İsim değişikliği ana sayfayı bozmaz.
- Ödeme, sipariş onayı, toptan talep silme veya kullanıcı kaydı özelliği içermez.
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

Kahve yönetimi için `supabase/migrations/20261028060514_product_admin_management.sql`
kullanıcı onayıyla ortak/canlı Supabase veritabanına uygulanmıştır. Yeni bir
ortam kurulurken bu migration ayrıca uygulanmalıdır. Uygulanmadan kahveler
okunabilir, ancak ekleme/düzenleme/kaldırma işlemleri izin hatasıyla durur.

Migration ürünlerin public SELECT politikasını korur; sadece doğrulanmış,
anonim olmayan ve `app_metadata.role = admin` taşıyan kullanıcıya INSERT,
UPDATE ve DELETE izni verir. Kimlik ve oluşturulma tarihi düzenlenemez.
Anonim yazma ile TRUNCATE gibi RLS dışı yetkiler kapalıdır. Üç restrictive
yazma politikası ileride eklenecek permissive politikaların korumayı açmasını önler.

`supabase/tests/product_admin_access.sql` izinlerin allow/deny kontrollerini yapar.
`node --test tests/product-form.test.mjs` (Node 24+) fiyat/alan doğrulamasını,
int8 ID sınırlarını ve isim değişince ana sayfa seçiminin korunmasını denetler.
Ürün kaydından sonra katalog, ana sayfa, yönetim listesi ve toptan formu yeniden
doğrulanır. Açık bir ziyaretçi sekmesi yeni bilgiyi sayfa yenilendiğinde görür.

## Oturum ve erişim

- İstek başına yeni `@supabase/ssr` istemcisi kullanılır; oturumlar paylaşılmaz.
- Admin çerezleri HttpOnly, SameSite=Lax ve üretimde Secure olarak ayarlanır.
- `proxy.ts` yalnızca `/admin` yollarında oturum yeniler; sunucu veri katmanı
  `getUser()` ile kullanıcıyı ayrıca doğrular.
- Şahsi bilgiler önbelleğe alınmaz. Admin cevapları `private, no-store` taşır.
- Service-role anahtarı kullanılmaz. Veritabanı sorguları kullanıcının JWT'si
  ve RLS üzerinden çalışır; yönetici kontrolü her okuma ve yazmadan önce yapılır.
- Admin sayfaları arama motorları için noindex/nofollow olarak işaretlenir.
- Genel kayıt olma ekranı yoktur; yeni hesaplara admin rolü otomatik verilmez.

## Yerel ve üretim ayarları

Mevcut `NEXT_PUBLIC_SUPABASE_URL` ve
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` yeterlidir. İlave şifre veya service-role
ortam değişkeni gerekmez. SQL yetki değişikliği ve ilk Auth kullanıcısı ayrıca
kurulmalıdır; yalnızca uygulama kodunu deploy etmek kullanıcı oluşturmaz.
