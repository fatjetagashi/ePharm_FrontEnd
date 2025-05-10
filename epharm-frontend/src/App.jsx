import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PharmacySignupForm from './components/PharmacySignupForm';

export default function App() {
  return (
    <Routes>
      {/* Redirect “/” → signup */}
      <Route path="/" element={<Navigate to="/signup-pharmacy" replace />} />

      {/* Your pharmacy signup page */}
      <Route
        path="/signup-pharmacy"
        element={<PharmacySignupForm />}
      />

      {/* Fallback for any other URL */}
      <Route path="*" element={<div style={{ padding: 20 }}>Page not found</div>} />
    </Routes>
  );
}
