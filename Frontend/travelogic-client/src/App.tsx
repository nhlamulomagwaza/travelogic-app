import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './shared/components/AppLayout'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { SuppliersPage } from './pages/SuppliersPage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
