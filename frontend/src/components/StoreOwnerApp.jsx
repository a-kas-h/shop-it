import { Routes, Route } from "react-router-dom";
import StoreOwnerNavbar from "./StoreOwnerNavbar";
import StoreOwnerDashboard from "../pages/StoreOwnerDashboard";
import StoreRegistration from "../pages/StoreRegistration";
import StoreOwnerLogin from "../pages/StoreOwnerLogin";

function StoreOwnerApp() {
    return (
        <>
            <StoreOwnerNavbar />
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<StoreOwnerDashboard />} />
                    <Route path="/login" element={<StoreOwnerLogin />} />
                    <Route path="/register-store" element={<StoreRegistration />} />
                </Routes>
            </main>
        </>
    );
}

export default StoreOwnerApp;