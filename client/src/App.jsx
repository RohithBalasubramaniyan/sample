import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import PortfolioPage from './pages/public/PortfolioPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Components & Pages
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardOverview from './pages/admin/DashboardOverview';
import ManageProfile from './pages/admin/ManageProfile';
import ManageSkills from './pages/admin/ManageSkills';
import ManageProjects from './pages/admin/ManageProjects';
import ManageEducation from './pages/admin/ManageEducation';
import ManageExperience from './pages/admin/ManageExperience';
import ManageCertifications from './pages/admin/ManageCertifications';
import ManageResume from './pages/admin/ManageResume';
import ManageMessages from './pages/admin/ManageMessages';
import ManageSocialLinks from './pages/admin/ManageSocialLinks';

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0A0A0A',
              color: '#FAFAFA',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '0',
              padding: '14px 18px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            success: {
              iconTheme: { primary: '#4ade80', secondary: '#0A0A0A' },
            },
            error: {
              iconTheme: { primary: '#f87171', secondary: '#0A0A0A' },
            },
          }}
        />

        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PortfolioPage />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin Console Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="profile" element={<ManageProfile />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="education" element={<ManageEducation />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="certifications" element={<ManageCertifications />} />
              <Route path="resume" element={<ManageResume />} />
              <Route path="messages" element={<ManageMessages />} />
              <Route path="social-links" element={<ManageSocialLinks />} />
            </Route>
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
