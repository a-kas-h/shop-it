import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem'
};

function Map({ stores, userLocation }) {
  const [selectedStore, setSelectedStore] = useState(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const onMapClick = useCallback(() => {
    setSelectedStore(null);
  }, []);

  if (loadError) {
    return <div className="bg-red-100 p-4 rounded-lg">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="bg-gray-100 p-4 rounded-lg flex justify-center items-center h-64">Loading maps...</div>;
  }

  if (!userLocation) {
    return (
      <div className="bg-yellow-100 p-4 rounded-lg text-center">
        <p>Please enable location services to view the map</p>
      </div>
    );
  }

  const center = {
    lat: userLocation.latitude,
    lng: userLocation.longitude
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={onMapClick}
      >
        {/* User location marker */}
        <Marker
          position={center}
          icon={{
            url: '/user-location.svg',
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />

        {/* Store markers */}
        {stores.map(store => (
          <Marker
            key={store.id}
            position={{
              lat: parseFloat(store.latitude),
              lng: parseFloat(store.longitude)
            }}
            onClick={() => setSelectedStore(store)}
          />
        ))}

        {selectedStore && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedStore.latitude),
              lng: parseFloat(selectedStore.longitude)
            }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <div className="p-2">
              <h3 className="font-medium">{selectedStore.name}</h3>
              <p className="text-sm">{selectedStore.address}</p>
              <div className="mt-1 flex justify-between text-xs">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {selectedStore.quantity} in stock
                </span>
                <span>{selectedStore.distance_km.toFixed(1)} km away</span>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;