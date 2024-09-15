import React from 'react';
import PropTypes from 'prop-types';

function InvoiceItemComponent({ item, index, handleItemChange }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}
    >
      <input
        type="text"
        placeholder="Item Description"
        value={item.description}
        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
        className="invoice-input no-spinner"
        style={{ width: '100%' }}
      />

      <input
        type="number"
        placeholder="Price"
        value={item.price}
        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
        style={{ textAlign: 'right' }}
        className="invoice-input no-spinner"
      />
    </div>
  );
}

// reivew this block later
InvoiceItemComponent.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleItemChange: PropTypes.func.isRequired,
};

export default InvoiceItemComponent;
