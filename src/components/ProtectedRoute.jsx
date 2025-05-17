import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !session) {
      router.push('/sign-in');
    }
  }, [session, loading, router]);

  // Show nothing while checking authentication
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated and not loading, don't render the children yet
  if (!session && !loading) {
    return null;
  }
  
  // If authenticated, render the children
  return children;
}