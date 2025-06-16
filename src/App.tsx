import './App.css'
import { LoadingOverlay } from './components/shared/loading-overlay'
import { LoadingProvider } from './lib/loading-context'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <LoadingProvider>
      <AppRoutes />
      <LoadingOverlay />
    </LoadingProvider>
  )
}

export default App
