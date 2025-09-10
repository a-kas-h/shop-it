import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStoreOwnerAuth } from '../contexts/StoreOwnerAuthContext';

function StoreOwnerNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentStoreOwner, logout } = useStoreOwnerAuth();
    const location = useLocation();

    const handleLogout = () => {
        try {
            logout();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const isActive = (path) => {
        const fullPath = `/store-owner${path}`;
        return location.pathname === fullPath ? "bg-green-700" : "";
    };

    return (
        <nav className="bg-green-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/store-owner" className="flex items-center space-x-2">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-bold text-xl">ShopIt Business</span>
                        </Link>
                        <Link to="/" className="ml-4 text-sm text-green-200 hover:text-white">
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-1">
                        <Link to="/store-owner" className={`px-3 py-2 rounded hover:bg-green-700 ${isActive('')}`}>
                            Dashboard
                        </Link>
                        {currentStoreOwner ? (
                            <>
                                <Link to="/store-owner/register-store" className={`px-3 py-2 rounded hover:bg-green-700 ${isActive('/register-store')}`}>
                                    Add Store
                                </Link>
                                <div className="flex items-center px-3 py-2">
                                    <span className="text-sm">Welcome, {currentStoreOwner.firstName || currentStoreOwner.email}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded hover:bg-green-700 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/store-owner/login" className={`px-3 py-2 rounded hover:bg-green-700 ${isActive('/login')}`}>
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded hover:bg-green-700 focus:outline-none"
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
                            to="/store-owner"
                            className={`block px-3 py-2 rounded ${isActive('') ? 'bg-green-700' : 'hover:bg-green-700'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        {currentStoreOwner ? (
                            <>
                                <Link
                                    to="/store-owner/register-store"
                                    className={`block px-3 py-2 rounded ${isActive('/register-store') ? 'bg-green-700' : 'hover:bg-green-700'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Add Store
                                </Link>
                                <div className="px-3 py-2 text-sm text-green-200">
                                    Welcome, {currentStoreOwner.firstName || currentStoreOwner.email}
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 rounded hover:bg-green-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/store-owner/login"
                                className={`block px-3 py-2 rounded ${isActive('/login') ? 'bg-green-700' : 'hover:bg-green-700'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default StoreOwnerNavbar;