import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
