import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRoutes } from './routes/AppRoutes';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/toaster';
import { checkAuthState } from './app/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <Layout>
      <AppRoutes />
      <Toaster />
    </Layout>
  );
}

export default App;