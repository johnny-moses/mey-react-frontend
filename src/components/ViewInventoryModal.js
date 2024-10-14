import React, { useState, useEffect } from 'react';
import '../assets/styles/ViewInventoryModal.css'; // Ensure you import the CSS file

function ViewInventoryModal({ workorderId, closeModal }) {
    const [inventory, setInventory] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [showSaveButton, setShowSaveButton] = useState(false);

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

    const handleEdit = (id, key, value) => {
        setEditedData(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [key]: value,
            }
        }));
        setShowSaveButton(true);
    };

    const saveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/workorder/${workorderId}/inventory`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (response.ok) {
                alert("Changes saved successfully!");

                // Fetch the updated inventory
                const fetchUpdatedInventory = async () => {
                    const fetchResponse = await fetch(`http://localhost:5000/api/workorder/${workorderId}/inventory`);
                    if (fetchResponse.ok) {
                        const updatedData = await fetchResponse.json();
                        setInventory(updatedData);
                        setEditedData({});
                        setShowSaveButton(false);
                    } else {
                        console.error("Failed to fetch updated inventory");
                    }
                };

                fetchUpdatedInventory();
            } else {
                console.error("Failed to save changes");
                alert("Failed to save changes.");
            }
        } catch (error) {
            console.error('Failed to save changes', error);
            alert("An error occurred while saving changes.");
        }
    };

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6>Inventory for Workorder {workorderId}</h6>
                <div>
                    <button className="btn btn-secondary mr-2" onClick={closeModal}>Close Inventory View</button>
                    <button className="btn btn-secondary mr-2">Send Email</button>
                    <button className="btn btn-secondary">Print Delivery Sheet</button>
                </div>
            </div>
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th>Select</th>
                    <th>Item Name</th>
                    <th>SKU</th>
                    <th>Manufacture</th>
                    <th className="short-column">Quantity</th>
                    <th className="short-column">Length</th>
                    <th className="short-column">Width</th>
                    <th className="short-column">Height</th>
                    <th className="short-column">Weight</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map(item => (
                    <tr key={item.id}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        {["item_name", "sku", "manufacture", "quantity", "length", "width", "height", "weight", "description"].map(key => (
                            <td key={key} className={`${
                                editedData[item.id]?.[key] ? 'table-warning' : ''
                            } ${
                                key === 'item_name' || key === 'description'
                                    ? 'long-column'
                                    : ['quantity', 'length', 'width', 'height'].includes(key)
                                    ? 'short-column'
                                    : ''
                            }`}>
                                {key === "description" || key === "item_name" ? (
                                    <textarea
                                        className="form-control"
                                        defaultValue={item[key]}
                                        rows="3"
                                        onChange={(e) => handleEdit(item.id, key, e.target.value)}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={item[key]}
                                        onChange={(e) => handleEdit(item.id, key, e.target.value)}
                                    />
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {showSaveButton && <button className="btn btn-primary" onClick={saveChanges}>Save Changes</button>}
        </div>
    );
}

export default ViewInventoryModal;