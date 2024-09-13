import React from 'react';
import { useLocation } from 'react-router-dom';

const InvoiceDisplay = () => {
  const location = useLocation();
  const { invoiceData } = location.state || {};

  if (!invoiceData) {
    return <div>No invoice data available</div>;
  }

  return (
    <div>
      <h2>Invoice Display</h2>
      <div>
        <b>Invoice ID:</b> {invoiceData.invoiceId}
      </div>
      <div>
        <b>Date:</b> {invoiceData.invoiceDate}
      </div>
      <div>
        <b>Bill From:</b> {invoiceData.billFrom.name} (
        {invoiceData.billFrom.email})
      </div>
      <div>
        <b>Bill To:</b> {invoiceData.billTo.name} ({invoiceData.billTo.email})
      </div>
      <div>
        <b>Items:</b>
        <ul>
          {invoiceData.items.map((item, index) => (
            <li key={index}>
              {item.description} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <b>Total:</b> ${invoiceData.total}
      </div>
    </div>
  );
};

export default InvoiceDisplay;
