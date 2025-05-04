import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/pages/_app';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent">Loading...</div>
      </div>
    );
  }

  // Show children only when authenticated
  return user ? children : null;
};

export default ProtectedRoute; 