import { useState, useEffect } from "react";
import { useStoreOwnerAuth } from "../contexts/StoreOwnerAuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import StoreOwnerLogin from "./StoreOwnerLogin";

function StoreOwnerDashboard() {
  const { currentStoreOwner, loading: authLoading } = useStoreOwnerAuth();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyStores = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/store-management/my-stores", {
          headers: {
            "Store-Owner-Email": currentStoreOwner.email,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stores");
        }

        const data = await response.json();
        setStores(data);
      } catch (err) {
        console.error("Error fetching stores:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentStoreOwner) {
      fetchMyStores();
    }
  }, [currentStoreOwner]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!currentStoreOwner) {
    return <StoreOwnerLogin />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
        <Link
          to="/store-owner/register-store"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Register New Store
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {stores.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No stores registered
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by registering your first store.
          </p>
          <Link
            to="/store-owner/register-store"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
          >
            Register Your Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores
            .filter((storeOwnership) => storeOwnership?.store)
            .map((storeOwnership) => (
              <div
                key={storeOwnership.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {storeOwnership.store?.name || "Unknown Store"}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${storeOwnership.role === "OWNER"
                        ? "bg-green-100 text-green-800"
                        : storeOwnership.role === "MANAGER"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {storeOwnership.role}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p>
                      {storeOwnership.store?.address || "Address not available"}
                    </p>
                    <p>
                      {storeOwnership.store?.city || "City"},{" "}
                      {storeOwnership.store?.state || "State"}
                    </p>
                    {storeOwnership.store?.phone && (
                      <p className="mt-1">📞 {storeOwnership.store.phone}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/store-owner/manage/${storeOwnership.store?.id || "unknown"
                        }`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded text-sm"
                    >
                      Manage Store
                    </Link>
                    <Link
                      to={`/store-owner/inventory/${storeOwnership.store?.id || "unknown"
                        }/inventory`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded text-sm"
                    >
                      Inventory
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default StoreOwnerDashboard;
