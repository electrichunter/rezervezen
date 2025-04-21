import { useEffect } from 'react';
import { useRouter } from 'next/router';

const VerifyEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendikten sonra, kullanıcıyı otomatik olarak yönlendirebilirsiniz
    const timer = setTimeout(() => {
      router.push('/'); // 5 saniye sonra ana sayfaya yönlendirilir
    }, 5000);

    return () => clearTimeout(timer); // Component unmount olduğunda temizleme
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Email Verification Required</h1>
      <p>
        We have sent a verification email to your address. Please check your
        inbox and verify your email before logging in.
      </p>
      <p>If you didn't receive the email, check your spam folder.</p>
      <p>
        After verifying your email, you can log in and access the system.
      </p>
      <p>Redirecting to the homepage...</p>
    </div>
  );
};

export default VerifyEmailPage;
