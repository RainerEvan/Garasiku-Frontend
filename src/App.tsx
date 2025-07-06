import './App.css'
import { LoadingOverlay } from './components/shared/loading-overlay'
import { AuthProvider } from './lib/auth-context';
import { LoadingProvider } from './lib/loading-context'
import AppRoutes from './routes/app-routes'
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AppRoutes />
        <LoadingOverlay />
        <Toaster />
      </LoadingProvider>
    </AuthProvider>
  )
}

export default App
