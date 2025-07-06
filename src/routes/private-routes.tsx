import { useAuth } from "@/lib/auth-context";
import { useLoading } from "@/lib/loading-context";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

  if (authLoading) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
