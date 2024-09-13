import React, { useState, useRef, useEffect } from 'react';
import InvoiceItem from './InvoiceItem.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import './Invoice.css';

const InvoiceComponent = () => {
  const [items, setItems] = useState([
    { description: '', quantity: 1, price: 0 },
  ]);
  const [invoiceId, setInvoiceId] = useState('');

  useEffect(() => {
    // Generate a unique invoice ID
    const generateInvoiceId = () => {
      return `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };
    setInvoiceId(generateInvoiceId());
  }, []);

  const invoiceRef = useRef();

  const generatePDF = () => {
    const input = invoiceRef.current;

    // Add the class to hide buttons
    input.classList.add('hide-buttons');

    // A4 size in points (1px = 0.75pt) in portrait orientation
    const pdf = new jsPDF('p', 'pt', 'a4');
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

        pdf.save('invoice.pdf');
        // Remove the class after generating the PDF
        input.classList.remove('hide-buttons');
      })
      .catch((err) => {
        console.error('Error generating PDF', err);
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
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  return (
    <div className="invoice-container" ref={invoiceRef}>
      <h1>Invoice</h1>
      <p>Invoice ID: {invoiceId}</p>

      {/* Customer Info */}
      <div>
        <h2>Bill From</h2>
        <input
          type="text"
          placeholder="Bill From Name"
          className="invoice-input"
        />
        <input
          type="text"
          placeholder="Bill From Email"
          className="invoice-input"
        />
      </div>

      <div>
        <h2>Bill To</h2>
        <input
          type="text"
          placeholder="Bill To Name"
          className="invoice-input"
        />
        <input
          type="text"
          placeholder="Bill To Email"
          className="invoice-input"
        />
      </div>

      {/* Item List */}
      <h2>Items</h2>
      {items.map((item, index) => (
        <div key={index}>
          <InvoiceItem
            item={item}
            index={index}
            handleItemChange={handleItemChange}
          />
          {items.length > 1 && (
            <button className="remove-button" onClick={() => removeItem(index)}>
              Remove Item
            </button>
          )}
        </div>
      ))}

      <button
        className="remove-button"
        onClick={addItem}
        // style={{ marginTop: "10px" }}
      >
        Add Item
      </button>

      {/* Total */}
      <h2>Total: ${calculateTotal()}</h2>

      <button
        className="remove-button"
        onClick={generatePDF}
        // style={{ marginTop: "10px" }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default InvoiceComponent;
