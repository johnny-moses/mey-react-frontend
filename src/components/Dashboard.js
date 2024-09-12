import React, { useState } from 'react';
import Table from './Table';
import '../assets/styles/Modal.css';  // Import any custom styling for the modal

function Dashboard({ designers }) {
  const [inventory, setInventory] = useState(null);
  const [selectedDesigner, setSelectedDesigner] = useState(null);  // Track selected designer
  const [showModal, setShowModal] = useState(false);  // Control modal visibility

  const handleDesignerClick = async (designerId) => {
    console.log('Clicked designer ID:', designerId);
    try {
      const response = await fetch(`http://localhost:5000/api/designer/${designerId}/inventory`);
      const data = await response.json();
      setInventory(data);
      setSelectedDesigner(designerId);  // Track which designer was clicked
      setShowModal(true);  // Show the modal
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setInventory(null);  // Clear inventory data when closing modal
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center">Designers</h1>
      <Table data={designers} onDesignerClick={handleDesignerClick} />

      {showModal && (
        <div className="modal show" style={{ display: 'block' }} aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Inventory for Designer {selectedDesigner}</h5>
                <button type="button" className="close" onClick={closeModal}>&times;</button>
              </div>
              <div className="modal-body">
                <ul>
                  {inventory.map(item => (
                    <li key={item.id}>{item.item_name} - {item.quantity}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
