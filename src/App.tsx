import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

function AppContent() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Dashboard />;
  }

  return <LandingPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
