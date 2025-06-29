// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Account from './pages/Account';
import { Journal } from './pages/Journal';
import { TrialBalance } from './pages/TrialBalance';

const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/trial-balance" element={<TrialBalance />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
