import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home.jsx'
import SystemInput from '../SystemInput.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import Login from './Login.jsx'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import Navbar from './Navbar.jsx'

function ProtectedRoute({ children }) {
  const { session } = useAuth();
  if (session === undefined) return <div style={{ minHeight: '100vh', background: '#FFFBEE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial', color: '#006C35', fontSize: '18px' }}>جاري التحميل...</div>;
  if (!session) return <Navigate to="/login" replace />;
  return <><Navbar />{children}</>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/aris" element={<ProtectedRoute><PlaceholderPage title="ARIS Committee Data" /></ProtectedRoute>} />
          <Route path="/change" element={<ProtectedRoute><SystemInput /></ProtectedRoute>} />
          <Route path="/db-transformation" element={<ProtectedRoute><PlaceholderPage title="Database Transformation" /></ProtectedRoute>} />
          <Route path="/strategy-map" element={<ProtectedRoute><PlaceholderPage title="Strategy Map Database Structure" /></ProtectedRoute>} />
          <Route path="/plans" element={<ProtectedRoute><PlaceholderPage title="هيئة الخطط" /></ProtectedRoute>} />
          <Route path="/tom" element={<ProtectedRoute><PlaceholderPage title="TOM" /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
