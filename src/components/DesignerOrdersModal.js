import React, { useState, useEffect } from 'react';
import ViewInventoryModal from './ViewInventoryModal';
import AddSidemarkModal from './AddSidemarkModal';
import '../assets/styles/DesignerOrdersModal.css';

function DesignerOrders({ designer }) {
    const [sidemarks, setSidemarks] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedSidemark, setSelectedSidemark] = useState(null);
    const [selectedWorkorder, setSelectedWorkorder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAddSidemarkModal, setShowAddSidemarkModal] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchSidemarks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/designer/${designer.id}/sidemarks`);
                const data = await response.json();
                setSidemarks(data);
            } catch (error) {
                console.error('Failed to fetch sidemarks', error);
            }
        };

        fetchSidemarks();
    }, [designer.id]);

    const fetchWorkorders = async (sidemarkId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/designer/${designer.id}/sidemark/${sidemarkId}/orders`);
            const data = await response.json();
            setOrders(data);
            setSelectedSidemark(sidemarkId);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch workorders', error);
            setLoading(false);
        }
    };

    const openInventoryModal = (workorderId) => {
        setSelectedWorkorder(workorderId);
    };

    const closeInventoryModal = () => {
        setSelectedWorkorder(null);
    };

    const closeAddSidemarkModal = () => {
        setShowAddSidemarkModal(false);
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-4">
                <button className="btn btn-primary" onClick={() => setShowAddSidemarkModal(true)}>
                    Add New Sidemark
                </button>
            </div>

            <div className="sidemark-section mb-4">
                <h6>Select a Sidemark</h6>
                <select className="form-control" onChange={(e) => fetchWorkorders(e.target.value)}>
                    <option value="">Select Sidemark</option>
                    {sidemarks.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </div>

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

            {loading && <div className="loading-indicator">Loading...</div>}

            {selectedWorkorder && (
                <ViewInventoryModal
                    workorderId={selectedWorkorder}
                    closeModal={closeInventoryModal}
                />
            )}

            {showAddSidemarkModal && (
                <AddSidemarkModal
                    closeAddSidemarkModal={closeAddSidemarkModal}
                    setSidemarks={setSidemarks}
                    sidemarks={sidemarks}
                    setMessage={setMessage}
                />
            )}
        </div>
    );
}

export default DesignerOrders;