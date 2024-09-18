import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/ViewInventoryModal.css';  // Ensure this path is correct for your setup

function ViewInventoryModal({ workorderId, closeModal }) {
  const [inventory, setInventory] = useState([]);
  const [originalInventory, setOriginalInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editField, setEditField] = useState({ id: null, field: '' });
  const [originalValue, setOriginalValue] = useState('');

  const inputRef = useRef();

  // Fetch inventory for the workorder
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/workorder/${workorderId}/inventory`);  // Adjust the endpoint as needed
        const data = await response.json();
        setInventory(data);
        setOriginalInventory(data);  // Store original inventory for comparison
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
        setLoading(false);
      }
    };

    fetchInventory();
  }, [workorderId]);

  // Add event listener for clicks outside the input to discard changes
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        discardChanges();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editField]);

  // Handle input change
  const handleInputChange = (id, field, value) => {
    setInventory(prevInventory =>
        prevInventory.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        )
    );
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      closeEdit();
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/workorder/${workorderId}/inventory`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventory)
      });
      if (response.ok) {
        alert('Inventory updated successfully!');
        setOriginalInventory(inventory);  // Update the original state after saving
      } else {
        alert('Failed to update inventory.');
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to update inventory", error);
      setLoading(false);
    }
  };

  // Toggle edit mode
  const toggleEdit = (id, field, value) => {
    setEditField({ id, field });
    setOriginalValue(value);
  };

  // Close edit mode and save changes
  const closeEdit = () => {
    setEditField({ id: null, field: '' });
  };

  // Discard changes and revert to original value
  const discardChanges = () => {
    if (editField.id && originalValue !== null) {
      setInventory(prevInventory =>
          prevInventory.map(item =>
              item.id === editField.id ? { ...item, [editField.field]: originalValue } : item
          )
      );
    }
    setEditField({ id: null, field: '' });
  };

  // Check if there are any changes in the inventory
  const isInventoryChanged = () => {
    return JSON.stringify(inventory) !== JSON.stringify(originalInventory);
  };

  return (
      <div className="modal show view-inventory-modal" aria-modal="true" role="dialog">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Inventory for Workorder {workorderId}</h5>
              <button type="button" className="close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-buttons" style={{ textAlign: 'right', margin: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => alert('Print Delivery Sheet clicked')}>Print Delivery Sheet</button>
              <button type="button" className="btn btn-secondary" onClick={() => alert('Send Email clicked')}>Send Email</button>
            </div>
            <div className="modal-body">
              {loading && <div className="loading-indicator">Loading...</div>}

              {/* Inventory Table */}
              {inventory.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="thead-light">
                      <tr>
                        <th>Item Name</th>
                        <th>SKU</th>
                        <th>Manufacture</th>
                        <th>Quantity</th>
                        <th>Length</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>Weight</th>
                      </tr>
                      </thead>
                      <tbody>
                      {inventory.map(item => (
                          <tr key={item.id}>
                            {['item_name', 'sku', 'manufacture', 'quantity', 'length', 'width', 'height', 'weight'].map(field => (
                                <td
                                    key={field}
                                    onClick={() => toggleEdit(item.id, field, item[field])}
                                    ref={editField.id === item.id && editField.field === field ? inputRef : null}
                                >
                                  {editField.id === item.id && editField.field === field ? (
                                      <input
                                          type={['quantity', 'length', 'width', 'height', 'weight'].includes(field) ? 'number' : 'text'}
                                          autoFocus
                                          value={item[field]}
                                          onChange={(e) => handleInputChange(item.id, field, e.target.value)}
                                          onKeyPress={handleKeyPress}
                                          ref={inputRef}
                                      />
                                  ) : (
                                      item[field]
                                  )}
                                </td>
                            ))}
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
              ) : (
                  !loading && <p>No inventory available for this workorder.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!isInventoryChanged()}>Save Changes</button>
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ViewInventoryModal;