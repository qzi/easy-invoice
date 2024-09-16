/* eslint-env browser */

import React, { useState, useRef, useEffect } from 'react';
import JSPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import InvoiceItemComponent from './InvoiceItemComponent';

import './Invoice.css';

let InvoiceConfig;
try {
  InvoiceConfig = require('./InvoiceConfig.json');
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-console */
    console.error(
      'Failed to load InvoiceConfig.json, using default values',
      error,
    );
  }

  InvoiceConfig = {
    billFrom: { name: 'Service Provider Name' },
    billTo: { name: 'Customer Name' },
  };
}

function InvoiceComponent() {
  const [items, setItems] = useState([{ description: '', price: 0 }]);
  const [invoiceId, setInvoiceId] = useState('');
  const [billFrom, setBillFrom] = useState({ name: '' });
  const [billTo, setBillTo] = useState({ name: '' });
  const [invoiceDate, setInvoiceDate] = useState('');
  const navigate = useNavigate();

  // Generate a unique invoice ID
  const generateInvoiceId = () =>
    `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    setInvoiceId(generateInvoiceId());

    // Set default values for Bill From and Bill To
    setBillFrom(InvoiceConfig.billFrom);
    setBillTo(InvoiceConfig.billTo);

    // Set the initial invoice date to today
    const today = new Date().toISOString().split('T')[0];
    setInvoiceDate(today);
  }, []);

  useEffect(() => {
    // Set the document title
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.title = `Invoice ${invoiceId}`;
    }
  }, [invoiceId]);

  const invoiceRef = useRef();

  const generatePDF = () => {
    const input = invoiceRef.current;

    // Add the class to hide buttons
    input.classList.add('hide-buttons');

    // A4 size in points (1px = 0.75pt) in portrait orientation
    const pdf = new JSPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    html2canvas(input, { useCORS: true, scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 0;
        let heightLeft = imgHeight;
        // pdf.addImage(imgData, 'PNG', 0, 0);
        // Add image to the first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if necessary
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`Invoice-${invoiceId}.pdf`);
        // pdf.save("invoice.pdf");

        // Remove the class after generating the PDF
        input.classList.remove('hide-buttons');
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          /* eslint-disable no-console */
          console.error('Error generating PDF', err);
        }

        // alert.error('Error generating PDF', err);
        // Remove the class in case of error
        input.classList.remove('hide-buttons');
      });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleDisplayInvoice = () => {
    const invoiceData = {
      invoiceId,
      invoiceDate,
      billFrom,
      billTo,
      items,
      total: calculateTotal(),
    };
    navigate('/display', { state: { invoiceData } });
  };

  return (
    <div className="container">
      <div className="invoice-container" ref={invoiceRef}>
        <h2>Invoice</h2>

        {/* Bill From */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            marginTop: '10px',
            fontSize: '12px',

          }}>
          <div
            >
            <b style={{ height:'16px',  boxSizing: 'border-box'}}>Bill From: </b>
            <input
              type="text"
              placeholder="Bill From Name"
              className="invoice-input"
              value={billFrom.name}
              onChange={(e) =>
                setBillFrom({ ...billFrom, name: e.target.value })
              }
            />
          </div>

          <div
            style={{
              fontSize: '8px',
              color: 'rgb(206, 206, 205)',
            }}>
            <span>Invoice Date: </span>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="invoice-input"
              style={{
                fontSize: '8px',
                color: 'rgb(206, 206, 205)',
                height: '24px',
                border: 'none',
                boxSizing: 'border-box',
                lineHeight: '1',
                padding: '0 0 0 0px',
                
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <div>
            <b>Bill To: </b>
            <input
              type="text"
              placeholder="Bill To Name"
              className="invoice-input"
              value={billTo.name}
              onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
            />
          </div>
          <b
            style={{
              fontSize: '8px',
              color: 'rgb(206, 206, 205)',
              textAlign: 'right',
            }}>
            Invoice ID: {invoiceId}
          </b>
        </div>

        {/* Item List */}
        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
            marginBottom: '12px',
          }}>
          <b>Desc.</b>
          <b>Amount</b>
        </div>
        {items.map((item, index) => (
          <div key={index}>
            <InvoiceItemComponent
              item={item}
              index={index}
              handleItemChange={handleItemChange}
            />
            {items.length > 1 && (
              <button
                type="button"
                className="remove-button"
                onClick={() => removeItem(item.id)}>
                -
              </button>
            )}
          </div>
        ))}

        <button type="button" className="remove-button" onClick={addItem}>
          +
        </button>
        <hr />
        {/* Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <div />
          <b style={{ textAlign: 'right' }}>Total: ¥{calculateTotal()}</b>
        </div>

        <button type="button" className="remove-button" onClick={generatePDF}>
          Download PDF
        </button>

        <button
          type="button"
          onClick={handleDisplayInvoice}
          style={{ marginTop: '10px' }}>
          Display Invoice
        </button>
      </div>
    </div>
  );
}

export default InvoiceComponent;
