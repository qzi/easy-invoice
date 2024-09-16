import React, { useRef }  from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import './InvoiceDisplay.css';

function InvoiceDisplayComponent() {
  const location = useLocation();
  const { invoiceData } = location.state || {};
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!invoiceData) {
    return <div>No invoice data available</div>;
  }

  return (
    <div className="container"  >
      <button className="no-print" onClick={handlePrint}>Print Invoice</button>
      <div className="invoice-container" ref={componentRef}>
        <h2>Invoice</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',

            
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
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}>
            <b>Desc.</b> <b>Amount</b>
          </div>
          <ul>
            {invoiceData.items.map((item) => (
              <React.Fragment key={item.id}>
                <li>{item.description}</li>
                <li>{Number(item.price)}</li>
              </React.Fragment>
            ))}
          </ul>
          <hr />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <b>Total:</b> ¥{invoiceData.total}
        </div>
      </div>
    </div>
  );
}

export default InvoiceDisplayComponent;
