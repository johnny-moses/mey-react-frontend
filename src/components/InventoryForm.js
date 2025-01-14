import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function InventoryForm({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group controlId="formWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="text" placeholder="Enter weight" />
                    </Form.Group>
                    <Form.Group controlId="formDimensions">
                        <Form.Label>Dimensions</Form.Label>
                        <Form.Control type="text" placeholder="Enter dimensions" />
                    </Form.Group>
                    <Form.Group controlId="formSKU">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control type="text" placeholder="Enter SKU" />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Enter quantity" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InventoryForm;