import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

const LoginPage = lazy(() => import("@/features/auth/pages/login-page"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/dashboard-page"));
const DaftarKendaraanPage = lazy(() => import("@/features/garasi/pages/daftar-kendaraan-page"));
const VehicleDetailPage = lazy(() => import("@/features/garasi/pages/vehicle-detail-page"));

export default function AppRoutes() {
  const isAuthenticated = true; // Temporarily set to true for testing

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/daftar-kendaraan" element={<DaftarKendaraanPage />} />
              <Route path="/daftar-kendaraan/:id" element={<VehicleDetailPage />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}