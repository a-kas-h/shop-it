import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page or show success message
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-700" : "";
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="font-bold text-xl">ShopIt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <Link to="/" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/search" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/search')}`}>
              Search Products
            </Link>
            {currentUser ? (
              <>
                <Link to="/profile" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/profile')}`}>
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/login')}`}>
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded hover:bg-blue-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded ${isActive('/') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`block px-3 py-2 rounded ${isActive('/search') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Search Products
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded ${isActive('/profile') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`block px-3 py-2 rounded ${isActive('/login') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;