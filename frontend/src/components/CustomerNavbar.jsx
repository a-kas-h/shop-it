import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function CustomerNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useContext(AuthContext);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const isActive = (path) => {
        const fullPath = `/customer${path}`;
        return location.pathname === fullPath ? "bg-blue-700" : "";
    };

    return (
        <nav className="bg-blue-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/customer" className="flex items-center space-x-2">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="font-bold text-xl">ShopIt</span>
                        </Link>
                        <Link to="/" className="ml-4 text-sm text-blue-200 hover:text-white">
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-1">
                        <Link to="/customer" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('')}`}>
                            Home
                        </Link>
                        <Link to="/customer/search" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/search')}`}>
                            Search Products
                        </Link>
                        {currentUser ? (
                            <>
                                <Link to="/customer/profile" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/profile')}`}>
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
                            <Link to="/customer/login" className={`px-3 py-2 rounded hover:bg-blue-700 ${isActive('/login')}`}>
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
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            to="/customer"
                            className={`block px-3 py-2 rounded ${isActive('') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/customer/search"
                            className={`block px-3 py-2 rounded ${isActive('/search') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Search Products
                        </Link>
                        {currentUser ? (
                            <>
                                <Link
                                    to="/customer/profile"
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
                                to="/customer/login"
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

export default CustomerNavbar;