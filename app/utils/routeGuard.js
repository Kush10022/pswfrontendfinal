import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useLayoutEffect(() => {
      const token = localStorage.getItem('access_token');
      // Redirect to login if no token is found
      if (!token) {
        router.push('/login'); // Use `replace` to avoid adding the current path to the history stack
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;