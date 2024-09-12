import React, { useState, useEffect } from 'react';

function DesignerOrdersModal({ designerId, closeModal }) {
  const [sidemarks, setSidemarks] = useState([]);  // List of sidemarks
  const [orders, setOrders] = useState([]);        // Orders for selected sidemark
  const [selectedSidemark, setSelectedSidemark] = useState(null);

  // Fetch sidemarks when modal opens
  useEffect(() => {
    const fetchSidemarks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/designer/${designerId}/sidemarks`);
        const data = await response.json();
        setSidemarks(data);  // Set fetched sidemarks
      } catch (error) {
        console.error("Failed to fetch sidemarks", error);
      }
    };

    fetchSidemarks();
  }, [designerId]);  // Ensure this runs when designerId changes (i.e., when modal opens)

  // Fetch orders for selected sidemark
  const fetchOrders = async (sidemarkId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sidemark/${sidemarkId}/orders`);
      const data = await response.json();
      setOrders(data);
      setSelectedSidemark(sidemarkId);  // Set selected sidemark
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block' }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Orders for Designer {designerId}</h5>
            <button type="button" className="close" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            {/* Sidemark Dropdown */}
            <div>
              <label>Select Sidemark:</label>
              <select onChange={(e) => fetchOrders(e.target.value)}>
                <option value="">Select Sidemark</option>
                {sidemarks.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Orders List */}
            {selectedSidemark && (
              <div>
                <h6>Orders for Sidemark</h6>
                <ul>
                  {orders.map(order => (
                    <li key={order.id}>{order.workorder_id} - Status: {order.status}</li>
                  ))}
                </ul>
              </div>
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

export default DesignerOrdersModal;
