import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { StoreOwnerAuthProvider } from "./contexts/StoreOwnerAuthContext";
import { LocationProvider } from "./contexts/LocationContext";
import { SearchHistoryProvider } from "./contexts/SearchHistoryContext";
import LandingPage from "./pages/LandingPage";
import CustomerApp from "./components/CustomerApp";
import StoreOwnerApp from "./components/StoreOwnerApp";

function App() {
  return (
    <AuthProvider>
      <StoreOwnerAuthProvider>
        <LocationProvider>
          <SearchHistoryProvider>
            <Router>
              <div className="min-h-screen bg-gray-100">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/customer/*" element={<CustomerApp />} />
                  <Route path="/store-owner/*" element={<StoreOwnerApp />} />
                </Routes>
              </div>
            </Router>
          </SearchHistoryProvider>
        </LocationProvider>
      </StoreOwnerAuthProvider>
    </AuthProvider>
  );
}

export default App;