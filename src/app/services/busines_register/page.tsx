"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from "../../component/ul/nav-header";
 
let x: number = 2; // X saniye bekle (örneğin 5 saniye için 5 yaz)
export default function BusinessSignupForm() {
  const router = useRouter();

  // Form alanları için state'ler
  const [business_name, setBusinessName] = useState('');
  const [business_mail, setBusinessMail] = useState('');
  const [business_address, setBusinessAddress] = useState('');
  const [business_password, setBusinessPassword] = useState('');

  // Durum state'leri
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form gönderme işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:3000/api/busines/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_name,
          business_mail,
          business_address,
          business_password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'İşlem başarısız');
      } else {
        setSuccess(data.message || 'İşletme başarıyla kaydedildi');
        setTimeout(() => {
          router.push('/'); // x saniye sonra yönlendir
        }, x * 1000); // X saniye bekle (örneğin 5 saniye için 5 * 1000)
      }
    } catch (err) {
      setError('Sunucu hatası, lütfen tekrar deneyin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
 
      <div className="mt-16"></div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">İşletme Kaydı</h2>

        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}

        <div className="mb-4">
          <label htmlFor="business_name" className="block text-sm font-medium">İşletme Adı</label>
          <input
            type="text"
            id="business_name"
            value={business_name}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="business_mail" className="block text-sm font-medium">İşletme E-Posta</label>
          <input
            type="email"
            id="business_mail"
            value={business_mail}
            onChange={(e) => setBusinessMail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="business_address" className="block text-sm font-medium">İşletme Adresi</label>
          <input
            type="text"
            id="business_address"
            value={business_address}
            onChange={(e) => setBusinessAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="business_password" className="block text-sm font-medium">Şifre</label>
          <input
            type="password"
            id="business_password"
            value={business_password}
            onChange={(e) => setBusinessPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? 'Yükleniyor...' : 'Kaydet'}
        </button>
      </form>
    </>
  );
}
