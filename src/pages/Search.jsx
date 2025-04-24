import { useState, useEffect, useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';
import ProductSearchBar from '../components/ProductSearchBar';
import StoreList from '../components/StoreList';
import Map from '../components/Map';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchProductNearby } from '../services/api';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userLocation } = useContext(LocationContext);

  const handleSearch = async (product) => {
    if (!product.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      setSearchTerm(product);
      
      if (!userLocation) {
        throw new Error("Location access is required to search for nearby stores");
      }
      
      const { latitude, longitude } = userLocation;
      const storesWithProduct = await searchProductNearby(product, latitude, longitude);
      setResults(storesWithProduct);
    } catch (err) {
      console.error("Search failed:", err);
      setError(err.message || "Failed to search for product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Find Products Nearby</h1>
      
      <ProductSearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <StoreList stores={results} searchTerm={searchTerm} />
              </div>
              <div className="lg:col-span-2">
                <Map stores={results} userLocation={userLocation} />
              </div>
            </div>
          ) : searchTerm ? (
            <p className="text-center py-8">
              No stores with "{searchTerm}" found nearby. Try another product or expand your search radius.
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Search;