import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { Loader2 } from "lucide-react";
import ServisPage from "@/features/servis/pages/servis-page";
import ServisDetailPage from "@/features/servis/pages/servis-detail-page";

const LoginPage = lazy(() => import("@/features/auth/pages/login-page"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/dashboard-page"));
const DaftarKendaraanPage = lazy(() => import("@/features/garasi/pages/daftar-kendaraan-page"));
const CariKendaraanPage = lazy(() => import("@/features/garasi/pages/cari-kendaraan-page"));
const KendaraanDetailPage = lazy(() => import("@/features/garasi/pages/kendaraan-detail-page"));

export default function AppRoutes() {
  const isAuthenticated = true; // Temporarily set to true for testing

  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin"/>
            <span className="font-medium">Loading...</span>
          </div>
        </div>
      }>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/daftar-kendaraan" element={<DaftarKendaraanPage />} />
              <Route path="/cari-kendaraan" element={<CariKendaraanPage />} />
              <Route path="/kendaraan/:id" element={<KendaraanDetailPage />} />
              <Route path="/servis" element={<ServisPage />} />
              <Route path="/servis/:id" element={<ServisDetailPage />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}