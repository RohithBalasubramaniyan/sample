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
      <Router>
        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
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
