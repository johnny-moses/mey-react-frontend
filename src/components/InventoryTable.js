import React from 'react';
import { Modal, Button, Table, Dropdown } from 'react-bootstrap';
import '../assets/styles/InventoryTable.css';

function InventoryTableModal({ show, handleClose, inventory }) {
    const sampleInventory = [
        {
            name: 'Sample Item',
            sku: '12345',
            quantity: 10,
            location: 'A1',
            length: 10,
            width: 5,
            height: 2
        }
    ];

    const inventoryToDisplay = inventory.length > 0 ? inventory : sampleInventory;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View All Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover className="full-width-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Location</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Height</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryToDisplay.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.sku}</td>
                                <td>{item.quantity}</td>
                                <td>{item.location}</td>
                                <td>{item.length}</td>
                                <td>{item.width}</td>
                                <td>{item.height}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            Edit
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InventoryTableModal;