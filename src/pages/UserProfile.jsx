import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LocationContext } from '../contexts/LocationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Login from './Login';

function UserProfile() {
  const { currentUser, loading: authLoading } = useContext(AuthContext);
  const { userLocation } = useContext(LocationContext);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [preferences, setPreferences] = useState({
    defaultRadius: 10,
    notificationsEnabled: true,
    savedStores: [],
  });

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      
      setTimeout(() => {
        setSearchHistory([
          { id: 1, term: 'Milk', date: new Date().toISOString() },
          { id: 2, term: 'Bread', date: new Date(Date.now() - 86400000).toISOString() },
          { id: 3, term: 'Coffee', date: new Date(Date.now() - 172800000).toISOString() },
        ]);
        
        setLoading(false);
      }, 800);
    }
  }, [currentUser]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Login />;
  }

  const handleRadiusChange = (e) => {
    setPreferences({
      ...preferences,
      defaultRadius: parseInt(e.target.value),
    });
  };

  const handleNotificationToggle = () => {
    setPreferences({
      ...preferences,
      notificationsEnabled: !preferences.notificationsEnabled,
    });
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    alert('Preferences saved successfully!');
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    alert('Search history cleared!');
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Preferences</h2>
              
              <form onSubmit={handleSavePreferences}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Default Search Radius
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={preferences.defaultRadius}
                      onChange={handleRadiusChange}
                      className="w-full mr-4"
                    />
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {preferences.defaultRadius} km
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notificationsEnabled}
                      onChange={handleNotificationToggle}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm font-bold">
                      Enable notifications for stock updates
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Preferences
                </button>
              </form>
            </div>
            
            {/* Search History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Searches</h2>
                {searchHistory.length > 0 && (
                  <button
                    onClick={clearSearchHistory}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear History
                  </button>
                )}
              </div>
              
              {searchHistory.length > 0 ? (
                <ul className="divide-y">
                  {searchHistory.map(search => (
                    <li key={search.id} className="py-3 flex justify-between">
                      <div>
                        <p className="font-medium">{search.term}</p>
                        <p className="text-xs text-gray-500">{formatDate(search.date)}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Search Again
                      </button>
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