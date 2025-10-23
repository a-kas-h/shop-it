import { useContext } from "react";
import { Link } from "react-router-dom";
import { LocationContext } from "../contexts/LocationContext";
import { FaAppStore } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

function Home() {
  const { userLocation, locationError, refreshLocation } =
    useContext(LocationContext);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Find Products in Your Area</h1>
        <p className="text-xl text-gray-600 mb-8">
          Search for products and discover which nearby stores have them in
          stock.
        </p>

        {/* Location Status */}
        <div className="mb-8">
          {locationError ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Location Error: </strong>
              <span className="block sm:inline">{locationError}</span>
              <button
                onClick={refreshLocation}
                className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Enable Location
              </button>
            </div>
          ) : userLocation ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Location Active: </strong>
              <span className="block sm:inline">
                We can show you stores near your location.
              </span>
            </div>
          ) : (
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Getting Location: </strong>
              <span className="block sm:inline">
                Please allow location access to find stores near you.
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to="/customer/search"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          Start Searching
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Search</h3>
            <p className="text-gray-600">
              Enter the product you're looking for, from groceries to
              electronics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Locate</h3>
            <p className="text-gray-600">
              We'll show you the closest stores that have your item in stock.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Shop</h3>
            <p className="text-gray-600">
              Head to the store knowing your item is available and in stock.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Groceries", icon: "🍎" },
            { name: "Electronics", icon: "📱" },
            { name: "Home Goods", icon: "🏠" },
            { name: "Health & Beauty", icon: "💊" },
            { name: "Toys", icon: "🧸" },
            { name: "Sports", icon: "⚽" },
            { name: "Clothing", icon: "👕" },
            { name: "Books", icon: "📚" },
          ].map((category, index) => (
            <Link
              key={index}
              to={`/search?category=${category.name}`}
              className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-blue-50 transition duration-300"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* App Promotion */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-md my-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Download Our App</h2>
          <p className="text-gray-600 mb-6">
            Get real-time updates and notifications when products come back in
            stock. (In development)
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center">
              <span className="mr-2">
                <FaAppStore size="2em" />
              </span>
              App Store
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center">
              <span className="mr-2">
                <IoLogoGooglePlaystore size="2em" />
              </span>
              Google Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
