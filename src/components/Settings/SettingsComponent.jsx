import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Invoice/Invoice.css';

let InvoiceConfig;
try {
  const modules = import.meta.glob('../../config/*.json', { eager: true, import: 'default' });
  if (modules['../../config/InvoiceConfig.json']) {
    InvoiceConfig = modules['../../config/InvoiceConfig.json'];
  } else if (modules['../../config/InvoiceConfig.default.json']) {
    InvoiceConfig = modules['../../config/InvoiceConfig.default.json'];
  } else {
    InvoiceConfig = {
      billFrom: { name: 'Service Provider Name' },
      billTo: { name: 'Customer Name' },
      defaultDescription: 'Consulting Fee',
    };
  }
} catch (error) {
  InvoiceConfig = {
    billFrom: { name: 'Service Provider Name' },
    billTo: { name: 'Customer Name' },
    defaultDescription: 'Consulting Fee',
  };
}

try {
  if (window.require) {
    const fs = window.require('fs');
    const path = window.require('path');
    const configPath = path.join(process.cwd(), 'config', 'InvoiceConfig.json');
    if (fs.existsSync(configPath)) {
      InvoiceConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  }
} catch (error) {
  // Fall back to default config if reading/parsing fails
}

function SettingsComponent() {
  const [billFrom, setBillFrom] = useState({ name: '' });
  const [billTo, setBillTo] = useState({ name: '' });
  const [defaultDescription, setDefaultDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage if exists, else fallback to InvoiceConfig
    const savedSettings = localStorage.getItem('invoiceSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setBillFrom(parsed.billFrom || InvoiceConfig.billFrom);
        setBillTo(parsed.billTo || InvoiceConfig.billTo);
        setDefaultDescription(
          parsed.defaultDescription || InvoiceConfig.defaultDescription || '',
        );
      } catch (e) {
        setBillFrom(InvoiceConfig.billFrom);
        setBillTo(InvoiceConfig.billTo);
        setDefaultDescription(InvoiceConfig.defaultDescription || '');
      }
    } else {
      setBillFrom(InvoiceConfig.billFrom);
      setBillTo(InvoiceConfig.billTo);
      setDefaultDescription(InvoiceConfig.defaultDescription || '');
    }
  }, []);

  const handleSave = () => {
    const settings = { billFrom, billTo, defaultDescription };
    localStorage.setItem('invoiceSettings', JSON.stringify(settings));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="invoice-container">
        <h2>Settings - Default Values</h2>

        <div style={{ marginBottom: '20px' }}>
          <b style={{ display: 'block', marginBottom: '5px' }}>
            Default Bill From:
          </b>
          <input
            type="text"
            placeholder="Service Provider Name"
            className="invoice-input"
            value={billFrom.name}
            onChange={(e) => setBillFrom({ ...billFrom, name: e.target.value })}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <b style={{ display: 'block', marginBottom: '5px' }}>
            Default Bill To:
          </b>
          <input
            type="text"
            placeholder="Customer Name"
            className="invoice-input"
            value={billTo.name}
            onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <b style={{ display: 'block', marginBottom: '5px' }}>
            Default Item Description:
          </b>
          <input
            type="text"
            placeholder="e.g. Consulting Services"
            className="invoice-input"
            value={defaultDescription}
            onChange={(e) => setDefaultDescription(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
          }}>
          <button
            type="button"
            onClick={handleSave}
            style={{ flex: '1', marginRight: '10px' }}>
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="remove-button"
            style={{ flex: '1' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsComponent;
