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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-xs">
          <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-8 shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="font-medium">Loading...</p>
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
              <Route path="/administrasi" element={<AdministrasiPage />} />
              <Route path="/administrasi/:id" element={<AdministrasiDetailPage />} />
              <Route path="/parameter" element={<MaintenancePage />} />
              <Route path="/parameter/:id" element={<MaintenanceDetailPage />} />
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