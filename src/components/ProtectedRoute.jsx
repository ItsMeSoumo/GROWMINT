import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../pages/_app';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  // Show nothing while checking authentication
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated and not loading, don't render the children yet
  if (!user && !loading) {
    return null;
  }
  
  // If authenticated, render the children
  return children;
} 