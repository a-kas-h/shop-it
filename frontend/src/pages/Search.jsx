import { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import { SearchHistoryContext } from '../contexts/SearchHistoryContext';
import ProductSearchBar from '../components/ProductSearchBar';
import RecentSearches from '../components/RecentSearches';
import StoreList from '../components/StoreList';
import Map from '../components/Map';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchProductNearby } from '../services/api';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(100); // Default 100km radius
  const { userLocation } = useContext(LocationContext);
  const { addSearchToHistory } = useContext(SearchHistoryContext);
  const [searchParams, setSearchParams] = useSearchParams();

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
      const storesWithProduct = await searchProductNearby(product, latitude, longitude, radius);
      setResults(storesWithProduct);

      // Add search to history
      addSearchToHistory(product, userLocation, storesWithProduct);
    } catch (err) {
      console.error("Search failed:", err);
      setError(err.message || "Failed to search for product");
    } finally {
      setLoading(false);
    }
  };

  // Handle URL search parameter on component mount
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam && userLocation) {
      handleSearch(queryParam);
    }
  }, [searchParams, userLocation]);

  // Re-search when radius changes
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (searchTerm && userLocation) {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Find Products Nearby</h1>

      <ProductSearchBar onSearch={handleSearch} />

      {/* Recent Searches */}
      {!searchTerm && <RecentSearches onSearchSelect={handleSearch} />}

      {/* Search Radius Selector */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <label htmlFor="radius" className="text-sm font-medium text-gray-700">
          Search Radius:
        </label>
        <select
          id="radius"
          value={radius}
          onChange={(e) => handleRadiusChange(Number(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10 km</option>
          <option value={25}>25 km</option>
          <option value={50}>50 km</option>
          <option value={100}>100 km</option>
          <option value={200}>200 km</option>
          <option value={500}>500 km</option>
        </select>
        <span className="text-sm text-gray-500">
          Currently searching within {radius} km of your location
        </span>
      </div>

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
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 mb-4">
                No stores with "{searchTerm}" found within {radius} km of your location.
              </p>
              <p className="text-sm text-gray-500">
                Try increasing the search radius above or searching for a different product.
              </p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Search;