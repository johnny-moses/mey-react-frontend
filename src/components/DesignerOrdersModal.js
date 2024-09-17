import React, {useState, useEffect} from 'react';
import ViewInventoryModal from '../components/ViewInventoryModal';  // Import the View Inventory Modal
import '../assets/styles/DesignerOrdersModal.css';  // Optional: Custom styling for the modal

function DesignerOrdersModal({designerId, closeModal}) {
    const [sidemarks, setSidemarks] = useState([]);  // List of sidemarks
    const [orders, setOrders] = useState([]);        // Orders for selected sidemark
    const [selectedSidemark, setSelectedSidemark] = useState(null);  // Track selected sidemark
    const [selectedWorkorder, setSelectedWorkorder] = useState(null);  // Track selected workorder
    const [inventoryModalVisible, setInventoryModalVisible] = useState(false);  // Control inventory modal visibility
    const [loading, setLoading] = useState(false);   // Loading state for data fetching

    // Fetch sidemarks when modal opens
    useEffect(() => {
        const fetchSidemarks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/designer/${designerId}/sidemarks`);
                const data = await response.json();
                setSidemarks(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch sidemarks", error);
                setLoading(false);
            }
        };

        fetchSidemarks();
    }, [designerId]);

    // Fetch orders for selected sidemark
    const fetchOrders = async (sidemarkId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/designer/${designerId}/sidemark/${sidemarkId}/orders`);
            const data = await response.json();
            setOrders(data);
            setSelectedSidemark(sidemarkId);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            setLoading(false);
        }
    };

    // Open inventory modal
    const openInventoryModal = (workorderId) => {
        setSelectedWorkorder(workorderId);
        setInventoryModalVisible(true);
    };

    // Close inventory modal
    const closeInventoryModal = () => {
        setSelectedWorkorder(null);
        setInventoryModalVisible(false);
    };

    return (
        <div className="modal show designer-orders-modal" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-xl" style={{maxWidth: '90vw'}}>  {/* Larger modal */}
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Command Center for Designer {designerId}</h5>
                        <button type="button" className="close" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between mb-4">
                            <button className="btn btn-primary" onClick={() => console.log('Add New Sidemark')}>
                                Add New Sidemark
                            </button>
                            <button className="btn btn-success" onClick={() => console.log('Create New Workorder')}>
                                Create New Workorder
                            </button>
                        </div>
                        {/* Sidemark Section */}
                        <div className="sidemark-section mb-4">
                            <h6>Select a Sidemark</h6>
                            <select className="form-control" onChange={(e) => fetchOrders(e.target.value)}>
                                <option value="">Select Sidemark</option>
                                {sidemarks.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Orders Section */}
                        {selectedSidemark && (
                            <div className="orders-section mb-4">
                                <h6>Orders for Sidemark</h6>
                                {orders.length > 0 ? (
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
                                                    <button className="btn btn-sm btn-info" onClick={() => openInventoryModal(order.id)}>
                                                        View Inventory
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No orders available for this sidemark.</p>
                                )}
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
        </div>
    );
}

export default DesignerOrdersModal;
