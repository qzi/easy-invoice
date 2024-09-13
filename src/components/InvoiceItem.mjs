import React from "react";

function InvoiceItem({ item, index, handleItemChange }) {
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Item Description"
        value={item.description}
        onChange={(e) => handleItemChange(index, "description", e.target.value)}
        style={{ width: "200px" }}
        className="invoice-input no-spinner"
      />

      <input
        type="number"
        placeholder="Price"
        value={item.price}
        onChange={(e) => handleItemChange(index, "price", e.target.value)}
        style={{ textAlign: "right" }}
        className="invoice-input no-spinner"
      />
      {/* <span>{(item.quantity * item.price).toFixed(2)}</span> */}
    </div>
  );
}

export default InvoiceItem;
