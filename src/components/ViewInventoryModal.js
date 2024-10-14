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
                    <th>Item Name</th>
                    <th>SKU</th>
                    <th>Manufacture</th>
                    <th>Quantity</th>
                    <th>Length</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.item_name}</td>
                        <td>{item.sku}</td>
                        <td>{item.manufacture}</td>
                        <td>{item.quantity}</td>
                        <td>{item.length}</td>
                        <td>{item.width}</td>
                        <td>{item.height}</td>
                        <td>{item.weight}</td>
                        <td>{item.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewInventoryModal;