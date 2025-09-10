import { createContext, useState, useEffect, useContext } from "react";

// Create context
const StoreOwnerAuthContext = createContext();

// Custom hook to use the context
export const useStoreOwnerAuth = () => {
  const context = useContext(StoreOwnerAuthContext);
  if (!context) {
    throw new Error(
      "useStoreOwnerAuth must be used within a StoreOwnerAuthProvider"
    );
  }
  return context;
};

export const StoreOwnerAuthProvider = ({ children }) => {
  const [currentStoreOwner, setCurrentStoreOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      const storedOwner = localStorage.getItem("storeOwner");
      const sessionToken = localStorage.getItem("storeOwnerToken");

      if (storedOwner && sessionToken) {
        try {
          const ownerData = JSON.parse(storedOwner);
          setCurrentStoreOwner(ownerData);
        } catch (err) {
          console.error("Error parsing stored store owner data:", err);
          localStorage.removeItem("storeOwner");
          localStorage.removeItem("storeOwnerToken");
        }
      }
      setLoading(false);
    };

    checkExistingSession();
  }, []);

  // Register a new store owner
  const register = async (registrationData) => {
    setError("");
    try {
      const response = await fetch("/api/store-owner-auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();

      // Store session data
      localStorage.setItem("storeOwner", JSON.stringify(data.storeOwner));
      localStorage.setItem("storeOwnerToken", data.sessionToken);

      setCurrentStoreOwner(data.storeOwner);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login store owner
  const login = async (email, password) => {
    setError("");
    try {
      const response = await fetch("/api/store-owner-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();

      // Store session data
      localStorage.setItem("storeOwner", JSON.stringify(data.storeOwner));
      localStorage.setItem("storeOwnerToken", data.sessionToken);

      setCurrentStoreOwner(data.storeOwner);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout store owner
  const logout = () => {
    setError("");
    try {
      localStorage.removeItem("storeOwner");
      localStorage.removeItem("storeOwnerToken");
      setCurrentStoreOwner(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Get current session token
  const getSessionToken = () => {
    return localStorage.getItem("storeOwnerToken");
  };

  // Fetch store owner profile
  const fetchProfile = async () => {
    if (!currentStoreOwner) return null;

    try {
      const response = await fetch("/api/store-owner-auth/profile", {
        headers: {
          "Store-Owner-Email": currentStoreOwner.email,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setCurrentStoreOwner(data);
      localStorage.setItem("storeOwner", JSON.stringify(data));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    currentStoreOwner,
    loading,
    error,
    register,
    login,
    logout,
    getSessionToken,
    fetchProfile,
  };

  return (
    <StoreOwnerAuthContext.Provider value={value}>
      {!loading && children}
    </StoreOwnerAuthContext.Provider>
  );
};
