'use client'

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

// Placeholder for a loading component or any other fallback UI
const Loading = () => <div>Loading...</div>;

// Async component that utilizes useSearchParams
const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [statusMessage, setStatusMessage] = useState('Verifying...');
    
    //useEffect runs when token changes
    useEffect(() => {
        async function retrieveSendToken() {
            try {
                if (token) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verifyemail`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        console.log(`response is ", ${responseData}`);
                        router.push("/login");
                    } else {
                        setStatusMessage('Failed to verify email. Please register again.');
                    }
                }
            } catch (error) {
                setStatusMessage('An error occurred. Please register again.');
            }
        }

        retrieveSendToken();
    }, [token, router]);

    return <div>{statusMessage}</div>;
};

// Default exported component wrapped with Suspense
export default function Verification() {
    return (
        <Suspense fallback={<Loading />}>
            <VerifyEmail />
        </Suspense>
    );
}
