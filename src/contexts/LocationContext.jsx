import { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Unable to access your location. Please enable location services.");
          setLocationLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
    }
  }, []);

  // Function to manually update location
  const refreshLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationError(null);
          setLocationLoading(false);
        },
        (error) => {
          setLocationError("Unable to access your location");
          setLocationLoading(false);
        }
      );
    }
  };

  return (
    <LocationContext.Provider value={{ 
      userLocation, 
      locationError, 
      locationLoading, 
      refreshLocation 
    }}>
      {children}
    </LocationContext.Provider>
  );
};