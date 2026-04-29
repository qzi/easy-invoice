import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import './InvoiceDisplay.css';

function InvoiceDisplayComponent() {
  const location = useLocation();
  const { invoiceData } = location.state || {};
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: invoiceData?.invoiceId || 'Invoice',
  });

  if (!invoiceData) {
    return <div>No invoice data available</div>;
  }

  return (
    <div className="container">
      <button className="no-print vertical-text-button" onClick={handlePrint}>
        Print
      </button>

      <div className="invoice-container" ref={componentRef}>
        <h2>Invoice</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
          <div>
            <b>Date:</b> {invoiceData.invoiceDate}
          </div>
          <div style={{ color: '#666' }}>
            <b>Invoice ID:</b> {invoiceData.invoiceId}
          </div>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <b>Bill From:</b> {invoiceData.billFrom.name}
        </div>
        <div style={{ marginBottom: '30px' }}>
          <b>Bill To:</b> {invoiceData.billTo.name}
        </div>
        <div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0',
            }}>
            <b>Desc.</b> <b>Amount (CNY)</b>
          </div>
          <ul style={{ display: 'block' }}>
            {invoiceData.items.map((item, index) => (
              <li key={item.id || index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <span>{item.description || 'Item'}</span>
                <span>¥{Number(item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '18px' }}>
          <b>Total (CNY):</b> <b>¥{invoiceData.total}</b>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDisplayComponent;
