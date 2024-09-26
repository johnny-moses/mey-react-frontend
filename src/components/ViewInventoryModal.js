import React, { useState, useEffect } from 'react';

function ViewInventoryModal({ workorderId, closeModal }) {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/workorder/${workorderId}/inventory`);
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                console.error('Failed to fetch inventory', error);
            }
        };

        fetchInventory();
    }, [workorderId]);

    return (
        <div className="mt-4">
            <h6>Inventory for Workorder {workorderId}</h6>
            <button className="btn btn-secondary mb-2" onClick={closeModal}>Close Inventory View</button>
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th>Item ID</th>
                    <th>Quantity</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map(item => (
                    <tr key={item.id}>
                        <td>{item.item_id}</td>
                        <td>{item.quantity}</td>
                        <td>{item.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewInventoryModal;