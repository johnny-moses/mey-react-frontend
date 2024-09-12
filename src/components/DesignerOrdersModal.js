import React, { useState, useEffect } from 'react';

function DesignerOrdersModal({ designerId, closeModal }) {
  const [sidemarks, setSidemarks] = useState([]);  // List of sidemarks
  const [orders, setOrders] = useState([]);        // Orders for selected sidemark
  const [selectedSidemark, setSelectedSidemark] = useState(null);  // Track selected sidemark
  const [selectedWorkorder, setSelectedWorkorder] = useState(null);  // Track selected workorder
  const [inventory, setInventory] = useState([]);  // Inventory for the selected workorder

  // Fetch sidemarks when modal opens
  useEffect(() => {
    const fetchSidemarks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/designer/${designerId}/sidemarks`);
        const data = await response.json();
        setSidemarks(data);
      } catch (error) {
        console.error("Failed to fetch sidemarks", error);
      }
    };

    fetchSidemarks();
  }, [designerId]);

  // Fetch orders for selected sidemark
  const fetchOrders = async (sidemarkId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/designer/${designerId}/sidemark/${sidemarkId}/orders`);
      const data = await response.json();
      setOrders(data);
      setSelectedSidemark(sidemarkId);  // Set selected sidemark
      setSelectedWorkorder(null);  // Clear selected workorder when sidemark changes
      setInventory([]);  // Clear inventory when sidemark changes
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  // Fetch inventory for selected workorder
  const fetchWorkorderInventory = async (workorderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/workorder/${workorderId}/inventory`);
      const data = await response.json();
      setInventory(data);
      setSelectedWorkorder(workorderId);  // Set selected workorder
    } catch (error) {
      console.error("Failed to fetch inventory", error);
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

            {/* Orders Table */}
            {selectedSidemark && orders.length > 0 && (
              <div className="mt-4">
                <h6>Orders for Sidemark</h6>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.workorder_id}</td>
                        <td>{order.status}</td>
                        <td>
                          <button className="btn btn-sm btn-primary" onClick={() => fetchWorkorderInventory(order.id)}>
                            View Inventory
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Inventory Table for Selected Workorder */}
            {selectedWorkorder && inventory.length > 0 && (
              <div className="mt-4">
                <h6>Inventory for Workorder {selectedWorkorder}</h6>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map(item => (
                      <tr key={item.id}>
                        <td>{item.item_name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
