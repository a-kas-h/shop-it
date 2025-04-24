import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import { getStoreDetails } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function StoreDetails() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { userLocation } = useContext(LocationContext);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        setLoading(true);
        const data = await getStoreDetails(storeId);
        setStore(data);
      } catch (err) {
        console.error('Error fetching store details:', err);
        setError('Failed to load store information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Store Not Found</h2>
        <p className="mb-6">The store you're looking for doesn't exist or has been removed.</p>
        <Link to="/search" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Search
        </Link>
      </div>
    );
  }

  // Extract unique categories
  const categories = ['all', ...new Set(store.inventory.map(item => item.category))];

  // Filter inventory by selected category
  const filteredInventory = activeCategory === 'all' 
    ? store.inventory 
    : store.inventory.filter(item => item.category === activeCategory);

  // Group inventory by category for display
  const inventoryByCategory = filteredInventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      {/* Store Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{store.name}</h1>
            <p className="text-gray-600 mb-4">{store.address}</p>
            
            {store.phone && (
              <p className="flex items-center text-gray-600 mb-2">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                {store.phone}
              </p>
            )}
            
            {store.email && (
              <p className="flex items-center text-gray-600 mb-2">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {store.email}
              </p>
            )}
            
            {store.website && (
              <p className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {store.website.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0">
            {userLocation && (
              <a 
                href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${store.latitude},${store.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Get Directions
              </a>
            )}
          </div>
        </div>
        
        {/* Store Hours */}
        {store.opening_hours && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Opening Hours</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(store.opening_hours).map(([day, hours]) => (
                <div key={day} className="bg-gray-50 p-2 rounded">
                  <div className="font-medium">{day}</div>
                  <div className="text-sm">{hours}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Inventory Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Available Products</h2>
          <p className="text-gray-600 text-sm">{store.inventory.length} products in stock</p>
        </div>
        
        {/* Category filter tabs */}
        <div className="p-4 border-b overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Inventory list */}
        <div className="p-4">
          {Object.keys(inventoryByCategory).length > 0 ? (
            Object.entries(inventoryByCategory).map(([category, items]) => (
              <div key={category} className="mb-8 last:mb-0">
                <h3 className="text-lg font-medium mb-4 border-b pb-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          {item.price && (
                            <p className="text-gray-700 mt-1">${parseFloat(item.price).toFixed(2)}</p>
                          )}
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {item.quantity} in stock
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
      
      {/* Back button */}
      <div className="mt-6">
        <Link to="/search" className="text-blue-600 hover:underline flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Search
        </Link>
      </div>
    </div>
  );
}

export default StoreDetails;