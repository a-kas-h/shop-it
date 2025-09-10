import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Welcome to ShopIt
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find products in nearby stores or manage your store inventory
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Customer Interface */}
                    <Link
                        to="/customer"
                        className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-200"
                    >
                        <div className="text-blue-600 mb-6">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            I'm a Customer
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Search for products, find nearby stores, and track your shopping history
                        </p>
                        <div className="text-blue-600 group-hover:text-blue-700 font-medium">
                            Start Shopping →
                        </div>
                    </Link>

                    {/* Store Owner Interface */}
                    <Link
                        to="/store-owner"
                        className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-green-200"
                    >
                        <div className="text-green-600 mb-6">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            I'm a Store Owner
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Manage your stores, update inventory, and track your business
                        </p>
                        <div className="text-green-600 group-hover:text-green-700 font-medium">
                            Manage Stores →
                        </div>
                    </Link>
                </div>

                <div className="mt-12 text-sm text-gray-500">
                    <p>New to ShopIt? Choose your role above to get started</p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;