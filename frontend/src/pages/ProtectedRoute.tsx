import { login } from '@/features/user/components/authSlice';
import type { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
      return;
    }

    async function verify() {
      try {
        const response = await fetch('http://localhost:8000/api/user/', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(login(data));

          return;
        }

        navigate('/login');
      } catch (error) {
        console.error('Error verifying authentication:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [isAuthenticated, navigate, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
}
export default ProtectedRoute;
