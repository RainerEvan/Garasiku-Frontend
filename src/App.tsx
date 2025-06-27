import './App.css'
import { LoadingOverlay } from './components/shared/loading-overlay'
import { LoadingProvider } from './lib/loading-context'
import AppRoutes from './routes/app-routes'
import { Toaster } from "sonner";

function App() {
  return (
    <LoadingProvider>
      <AppRoutes />
      <LoadingOverlay />
      <Toaster />
    </LoadingProvider>
  )
}

export default App
