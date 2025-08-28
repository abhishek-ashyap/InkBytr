import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../app/slices/authSlice';
import { Button } from './ui/button';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Inkbytr
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* ✅ FINAL FIX: The <Link> now wraps the <Button> to avoid the asChild error. */}
              <Link to="/profile">
                <Button variant="ghost">My Posts</Button>
              </Link>
              <Link to="/create-post">
                <Button variant="ghost">Create Post</Button>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              {/* ✅ FINAL FIX: The <Link> now wraps the <Button> here as well. */}
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
