import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import StoreDetails from './pages/StoreDetails';
import UserProfile from './pages/UserProfile';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { SearchHistoryProvider } from './contexts/SearchHistoryContext';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <SearchHistoryProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/store/:storeId" element={<StoreDetails />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/login" element={<Login />} /> {/* Add this route */}
                </Routes>
              </main>
            </div>
          </Router>
        </SearchHistoryProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;