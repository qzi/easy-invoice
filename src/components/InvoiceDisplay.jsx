import React from 'react';
import { useLocation } from 'react-router-dom';

import './Invoice.css';

const InvoiceDisplay = () => {
  const location = useLocation();
  const { invoiceData } = location.state || {};

  if (!invoiceData) {
    return <div>No invoice data available</div>;
  }

  return (
    <div className="container">
      <div className="invoice-container">
        <h2>Invoice</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
          <div>
            <b>Date:</b> {invoiceData.invoiceDate}
          </div>
          <div style={{ color: 'gray' }}>
            <b>Invoice ID:</b> {invoiceData.invoiceId}
          </div>
        </div>
        <div>
          <b>Bill From:</b> {invoiceData.billFrom.name}
        </div>
        <div>
          <b>Bill To:</b> {invoiceData.billTo.name}
        </div>
        <div>
          <hr></hr>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}>
            <b>Desc.</b> <b>Amount</b>
          </div>
          <ul>
            {invoiceData.items.map((item, index) => (
              <React.Fragment key={index}>
                <li>{item.description}</li>
                <li>{Number(item.price)}</li>
              </React.Fragment>
            ))}
          </ul>
          <hr></hr>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <b>Total:</b> ¥{invoiceData.total}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDisplay;
