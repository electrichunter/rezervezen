## 🚀 Rezervasyon Sistemi MVP - Geliştirme Yol Haritası (Next.js + Supabase)

| 📌 Görev Başlığı | 🔧 Açıklama / Alt Görevler | 🎯 Öncelik Puanı | ✅ Durum |
| --- | --- | --- | --- |
| 🔐 Supabase Auth Kurulumu | - Supabase projesi oluştur <br> - Auth (e-posta + şifre) ile kayıt/giriş | 200 | Tamamlandı(api) |
| 🧾 İşletme Kayıt Sistemi | - Kullanıcı kayıt olduktan sonra işletme profilini oluştur <br> - Ad, adres, telefon vs. | 190 | tamamapi |
|   |    |   |   |
| 📅 Randevu Takvimi Altyapısı | - Randevu tablosu oluştur (Supabase) <br> - Boş saat hesaplama fonksiyonu | 170 | sql tm |
| 🙋‍♂️ Müşteri Randevu Alma | - Takvimden boş saat seçip randevu alma <br> - Ad, telefon girişi | 165 | Yapılacak |
| 📋 Randevu Yönetimi (İşletme Paneli) | - İşletme kendi randevularını görebilsin <br> - İptal edebilsin | 160 | Yapılacak |
| 💰 Hizmet Talebi Oluşturma (Müşteri) | - Müşteri konum, tarih, hizmet tipi girerek “teklif isteği” açar | 155 | Yapılacak |
| 📤 Teklif Verme Sistemi (İşletme) | - İşletmeler açık hizmet taleplerine teklif verir <br> - Fiyat ve not girer | 150 | Yapılacak |
| 🌍 Konum Bazlı Filtreleme | - Lokasyon bilgisine göre teklif eşleştirme (örn: aynı şehir/ilçe içinde) | 145 | Yapılacak |
| 👤 Müşteri Bilgilerini Saklama | - Alınan randevulara müşteri bilgisi iliştir (ad, telefon) | 140 | Yapılacak |
| 📆 react-big-calendar Kurulumu | - react-big-calendar veya benzeri UI takvimi entegre et | 130 | Yapılacak |
| 📬 E-posta Onayı (SendGrid) | - Randevu sonrası müşteriye otomatik e-posta gönder (SendGrid/Mailjet ile) | 120 | Yapılacak |
| 🚫 Ücretsiz Paket Kısıtlamaları | - Tek personel <br> - Tek hizmet <br> - 3 aylık geçmiş <br> - Sadece e-posta bildirimi | 100 | Yapılacak |
| 🎨 UI Kurulumu | - Shadcn/ui veya Mantine setup <br> - Basit arayüz: Giriş/Kayıt, Takvim, Panel | 90 | Yapılacak |
| 🔄 Cron Job ile Hatırlatma Maili | - Vercel cron ile günlük çalışan bir API route yaz <br> - Yaklaşan randevulara e-posta | 60 | Yapılacak |

## 🧪 Test ve Doğrulama

| 📌 Test Aşaması | 🔧 Açıklama | 🎯 Öncelik Puanı | ✅ Durum |
| --- | --- | --- | --- |
| Postman ile API Testleri | - Auth, profil, randevu alma, teklif verme, eşleştirme testleri | 140 | Yapılacak |
| UI Üzerinden Manuel Test | - Müşteri talep oluşturur, işletme teklif verir, müşteri onaylar | 110 | Yapılacak |

## 💡 Notlar

- Teklif sistemi opsiyonel yapılabilir, randevulu sistem ile paralel yürüyebilir.
- Konum verisi için PostGIS veya Supabase’in `geopoint` alanları kullanılabilir.
- Teklif süresine zaman sınırı getirebilirsin (örn: 24 saat içinde cevap).

[rezervezen.png](attachment:98b51c17-4639-4a55-8700-cfaa9b49aeeb:rezervezen.png)

![rezervezen-arkapilansız.png](attachment:1de49d52-ad2a-461c-8285-8278dfd2f96d:rezervezen-arkapilansz.png)
