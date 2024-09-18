import React, { useState, useEffect } from 'react';
import '../assets/styles/DesignerOrdersModal.css';
import AddSidemarkModal from './addSidemarkModal';  // Uncommented to use
import ViewInventoryModal from './ViewInventoryModal';

function DesignerOrdersModal({ designerId, closeModal }) {
    const [sidemarks, setSidemarks] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedSidemark, setSelectedSidemark] = useState(null);
    const [selectedWorkorder, setSelectedWorkorder] = useState(null);
    const [inventoryModalVisible, setInventoryModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAddSidemarkModal, setShowAddSidemarkModal] = useState(false);
    const [message, setMessage] = useState(null);  // Added state for message

    // Fetch sidemarks when modal opens
    useEffect(() => {
        const fetchSidemarks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/designer/${designerId}/sidemarks`);
                const data = await response.json();
                setSidemarks(data);
            } catch (error) {
                console.error('Failed to fetch sidemarks', error);
            }
        };

        fetchSidemarks();
    }, [designerId]);

    // Fetch workorders for selected sidemark
    const fetchWorkorders = async (sidemarkId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/designer/${designerId}/sidemark/${sidemarkId}/orders`);
            const data = await response.json();
            setOrders(data);
            setSelectedSidemark(sidemarkId);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch workorders', error);
            setLoading(false);
        }
    };

    // Fetch workorder inventory and open inventory modal
    const openInventoryModal = async (workorderId) => {
        setSelectedWorkorder(workorderId);  // Set the selected workorder
        setInventoryModalVisible(true);     // Open the inventory modal
    };

    // Close the inventory modal
    const closeInventoryModal = () => {
        setInventoryModalVisible(false);
        setSelectedWorkorder(null);  // Clear the selected workorder
    };

    // Close the Add Sidemark modal
    const closeAddSidemarkModal = () => {
        setShowAddSidemarkModal(false);
    };

    return (
        <div className="modal show designer-orders-modal" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-xl" style={{maxWidth: '90vw'}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Command Center for Designer {designerId}</h5>
                        <button type="button" className="close" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {/* Add New Sidemark Button */}
                        <div className="d-flex justify-content-between mb-4">
                            <button className="btn btn-primary" onClick={() => setShowAddSidemarkModal(true)}>
                                Add New Sidemark
                            </button>
                        </div>

                        {/* Sidemark Dropdown */}
                        <div className="sidemark-section mb-4">
                            <h6>Select a Sidemark</h6>
                            <select className="form-control" onChange={(e) => fetchWorkorders(e.target.value)}>
                                <option value="">Select Sidemark</option>
                                {sidemarks.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Workorders Table */}
                        {selectedSidemark && orders.length > 0 && (
                            <div className="orders-section mt-4">
                                <h6>Workorders for Sidemark</h6>
                                <table className="table table-bordered table-hover">
                                    <thead className="thead-light">
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
                                                <button className="btn btn-sm btn-info"
                                                        onClick={() => openInventoryModal(order.id)}>
                                                    View Inventory
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Loading Indicator */}
                        {loading && <div className="loading-indicator">Loading...</div>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>

            {/* Render the View Inventory Modal */}
            {inventoryModalVisible && (
                <ViewInventoryModal
                    workorderId={selectedWorkorder}
                    closeModal={closeInventoryModal}
                />
            )}

            {/* Add Sidemark Modal */}
            {showAddSidemarkModal && (
                <AddSidemarkModal
                    closeAddSidemarkModal={closeAddSidemarkModal}
                    setSidemarks={setSidemarks}
                    sidemarks={sidemarks}
                    setMessage={setMessage}  // Passed the state control functions
                />
            )}
        </div>
    );
}

export default DesignerOrdersModal;