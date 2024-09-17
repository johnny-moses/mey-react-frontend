import React, { useState, useEffect } from 'react';
import '../assets/styles/ViewInventoryModal.css';  // Optional: Custom styling for the modal

function ViewInventoryModal({ workorderId, closeModal }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch inventory for the workorder
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/workorder/${workorderId}/inventory`);  // Adjust the endpoint as needed
        const data = await response.json();
        setInventory(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
        setLoading(false);
      }
    };

    fetchInventory();
  }, [workorderId]);

  return (
    <div className="modal show view-inventory-modal" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Inventory for Workorder {workorderId}</h5>
            <button type="button" className="close" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            {loading && <div className="loading-indicator">Loading...</div>}

            {/* Inventory Table */}
            {inventory.length > 0 ? (
              <table className="table table-bordered table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>  {/* Adjust fields based on your data model */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !loading && <p>No inventory available for this workorder.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInventoryModal;
