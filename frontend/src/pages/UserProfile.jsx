import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LocationContext } from '../contexts/LocationContext';
import { SearchHistoryContext } from '../contexts/SearchHistoryContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Login from './Login';

function UserProfile() {
  const { currentUser, loading: authLoading } = useContext(AuthContext);
  const { userLocation } = useContext(LocationContext);
  const { searchHistory, clearSearchHistory, removeSearchFromHistory } = useContext(SearchHistoryContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      // Simulate loading time for better UX
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [currentUser]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Login />;
  }





  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      clearSearchHistory();
    }
  };

  const handleSearchAgain = (searchTerm) => {
    // Navigate to search page with the search term
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleRemoveSearch = (searchId, event) => {
    event.stopPropagation();
    removeSearchFromHistory(searchId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-4 font-medium text-lg">
                  {currentUser.displayName || 'User'}
                </h2>
                <p className="text-gray-600 text-sm">{currentUser.email}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Current Location</h3>
                {userLocation ? (
                  <p className="text-sm text-gray-600">
                    Latitude: {userLocation.latitude.toFixed(6)}<br />
                    Longitude: {userLocation.longitude.toFixed(6)}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Location services not enabled
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="md:col-span-2">


            {/* Search History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Searches</h2>
                {searchHistory.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {searchHistory.length > 0 ? (
                <ul className="divide-y">
                  {searchHistory.map(search => (
                    <li key={search.id} className="py-3 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{search.term}</p>
                          {search.resultsCount !== undefined && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {search.resultsCount} results
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(search.date)}
                          {search.location && (
                            <span className="ml-2">
                              📍 {search.location.latitude.toFixed(4)}, {search.location.longitude.toFixed(4)}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSearchAgain(search.term)}
                          className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 rounded hover:bg-blue-50"
                        >
                          Search Again
                        </button>
                        <button
                          onClick={(e) => handleRemoveSearch(search.id, e)}
                          className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                          title="Remove from history"
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 py-4 text-center">
                  No recent searches
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;