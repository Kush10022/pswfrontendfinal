"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EmailReviewer() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login'); // Change '/login' to your login page route
    }, 180000); // 180000 milliseconds = 3 minutes

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [router]);

  return (
    <div className="font-semibold text-center text-green-700 mr-8 mt-10">
      You have received an email to verify.
    </div>
  );
}
