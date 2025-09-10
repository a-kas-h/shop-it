import { Routes, Route } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import Home from "../pages/Home";
import Search from "../pages/Search";
import StoreDetails from "../pages/StoreDetails";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";

function CustomerApp() {
    return (
        <>
            <CustomerNavbar />
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/store/:storeId" element={<StoreDetails />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </>
    );
}

export default CustomerApp;