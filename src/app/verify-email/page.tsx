"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router

const VerifyEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user after 5 seconds
    const timer = setTimeout(() => {
      router.push('/'); // Redirect to the homepage
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on component unmount
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
