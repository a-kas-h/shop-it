import { Link } from 'react-router-dom';

function StoreList({ stores, searchTerm }) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">
          {stores.length} {stores.length === 1 ? 'store' : 'stores'} with "{searchTerm}"
        </h2>
      </div>

      <div className="divide-y">
        {stores.map((store) => (
          <div key={store.id} className="p-4 hover:bg-gray-50">
            <Link to={`/customer/store/${store.id}`} className="block">
              <h3 className="font-medium text-lg">{store.name}</h3>
              <p className="text-gray-600 text-sm">{store.address}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {store.quantity} in stock
                </span>
                <span className="text-gray-500 text-sm">
                  {store.distance_km.toFixed(1)} km away
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreList;