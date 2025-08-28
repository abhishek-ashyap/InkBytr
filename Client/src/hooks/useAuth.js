import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error, token } = useSelector((state) => state.auth);
  // ✅ RBAC: The user object now contains the role, so we can return it.
  return { user, isAuthenticated, isLoading, error, token };
};
