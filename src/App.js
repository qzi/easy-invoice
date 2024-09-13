import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Invoice2Component from './components/invoice2.jsx';
import InvoiceDisplay from './components/InvoiceDisplay.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Invoice2Component />} />
        <Route path="/display" element={<InvoiceDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
