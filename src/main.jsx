import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from "react-error-boundary";
import Fallback from './errorBoundary/GenericFallback.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ErrorBoundary FallbackComponent={Fallback}>
  <ToastContainer limit={2} pauseOnFocusLoss={false} />
    <App />
  </ErrorBoundary>
  </BrowserRouter>
)
