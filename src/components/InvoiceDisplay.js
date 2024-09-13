import React from 'react';
import { useLocation } from 'react-router-dom';
import './InvoiceComponent.css';

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
        <div>
          <b>Invoice ID:</b> {invoiceData.invoiceId}
        </div>
        <div>
          <b>Date:</b> {invoiceData.invoiceDate}
        </div>
        <div>
          <b>Bill From:</b> {invoiceData.billFrom.name}
        </div>
        <div>
          <b>Bill To:</b> {invoiceData.billTo.name}
        </div>
        <div>
          <hr></hr>
          <b>Items:</b>
          <ul>
            {invoiceData.items.map((item, index) => (
              <li key={index}>
                {item.description} - ¥ {item.price}
              </li>
            ))}
          </ul>
          <hr></hr>
        </div>
        <div>
          <b>Total:</b> ${invoiceData.total}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDisplay;
