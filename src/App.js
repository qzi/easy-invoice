import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import InvoiceComponent from './components/Invoice/InvoiceComponent.jsx';
import InvoiceDisplayComponent from './components/Invoice/InvoiceDisplayComponent.jsx';
import SettingsComponent from './components/Settings/SettingsComponent.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceComponent />} />
        <Route path="/display" element={<InvoiceDisplayComponent />} />
        <Route path="/settings" element={<SettingsComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
