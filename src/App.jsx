import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PagePlaceholder from './components/PagePlaceholder';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<PagePlaceholder title="Dashboard" />} />
          <Route path="saved" element={<PagePlaceholder title="Saved" />} />
          <Route path="digest" element={<PagePlaceholder title="Digest" />} />
          <Route path="settings" element={<PagePlaceholder title="Settings" />} />
          <Route path="proof" element={<PagePlaceholder title="Proof" />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
