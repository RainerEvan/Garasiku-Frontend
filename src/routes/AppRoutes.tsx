import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { Loader2 } from "lucide-react";
import ScrollToTop from "./ScrollToTop";

const LoginPage = lazy(() => import("@/features/auth/pages/login-page"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/dashboard-page"));
const DaftarKendaraanPage = lazy(() => import("@/features/garasi/pages/daftar-kendaraan-page"));
const CariKendaraanPage = lazy(() => import("@/features/garasi/pages/cari-kendaraan-page"));
const KendaraanDetailPage = lazy(() => import("@/features/garasi/pages/kendaraan-detail-page"));
const AktivitasServisKendaraanPage = lazy(() => import("@/features/garasi/pages/aktivitas-servis-kendaraan-page"));
const AktivitasAdministrasiKendaraanPage = lazy(() => import("@/features/garasi/pages/aktivitas-administrasi-kendaraan-page"));
const RiwayatLokasiKendaraanPage = lazy(() => import("@/features/garasi/pages/riwayat-lokasi-kendaraan-page"));
const ServisPage = lazy(() => import("@/features/servis/pages/servis-page"));
const ServisDetailPage = lazy(() => import("@/features/servis/pages/servis-detail-page"));
const RiwayatLokasiServisPage = lazy(() => import("@/features/servis/pages/riwayat-lokasi-servis-page"));
const AdministrasiPage = lazy(() => import("@/features/administrasi/pages/administrasi-page"));
const AdministrasiDetailPage = lazy(() => import("@/features/administrasi/pages/administrasi-detail-page"));
const MaintenancePage = lazy(() => import("@/features/maintenance/pages/maintenance-page"));
const MaintenanceDetailPage = lazy(() => import("@/features/maintenance/pages/maintenance-detail-page"));
const UserPage = lazy(() => import("@/features/user/pages/user-page"));
const UserDetailPage = lazy(() => import("@/features/user/pages/user-detail-page"));

export default function AppRoutes() {
  const isAuthenticated = true; // Temporarily set to true for testing

  return (
    <Router>
      <ScrollToTop />
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
              <Route path="/kendaraan/:id/aktivitas-servis" element={<AktivitasServisKendaraanPage />} />
              <Route path="/kendaraan/:id/aktivitas-administrasi" element={<AktivitasAdministrasiKendaraanPage />} />
              <Route path="/kendaraan/:id/riwayat-lokasi" element={<RiwayatLokasiKendaraanPage />} />
              <Route path="/servis" element={<ServisPage />} />
              <Route path="/servis/:id" element={<ServisDetailPage />} />
              <Route path="/servis/:id/riwayat-lokasi" element={<RiwayatLokasiServisPage />} />
              <Route path="/administrasi" element={<AdministrasiPage />} />
              <Route path="/administrasi/:id" element={<AdministrasiDetailPage />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/maintenance/:id" element={<MaintenanceDetailPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/user/:id" element={<UserDetailPage />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}