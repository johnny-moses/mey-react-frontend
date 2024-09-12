import React, { useState } from 'react';
import Table from './Table';
import DesignerOrdersModal from './DesignerOrdersModal';
import '../assets/styles/Modal.css';  // Import custom styling for the modal

function Dashboard({ designers }) {
  const [selectedDesigner, setSelectedDesigner] = useState(null);  // Track selected designer
  const [showModal, setShowModal] = useState(false);  // Control modal visibility

  const handleDesignerClick = (designerId) => {
    console.log('Clicked designer ID:', designerId);
    setSelectedDesigner(designerId);  // Track which designer was clicked
    setShowModal(true);  // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDesigner(null);  // Clear selected designer when closing modal
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center">Designers</h1>
      <Table data={designers} onDesignerClick={handleDesignerClick} />

      {showModal && (
        <DesignerOrdersModal
          designerId={selectedDesigner}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
