import React, { useState } from 'react';
import '../assets/styles/AddSidemarkModal.css';

function AddSidemarkModal({ closeAddSidemarkModal, setSidemarks, sidemarks, setMessage }) {
    const [sidemarkName, setSidemarkName] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleAddSidemark = async () => {
        if (!sidemarkName || !companyName) {
            setMessage({ type: 'error', text: 'Both sidemark name and company are required.' });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/add-sidemark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sidemarkName, company: companyName }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setMessage({ type: 'success', text: data.message });
                setSidemarks([...sidemarks, { id: sidemarks.length + 1, name: sidemarkName }]);
                setSidemarkName('');
                setCompanyName('');
                closeAddSidemarkModal();
            } else {
                setMessage({ type: 'error', text: data.message });
            }
        } catch (error) {
            console.error('Failed to add sidemark', error);
            setMessage({ type: 'error', text: 'Failed to add sidemark.' });
        }
    };

    return (
        <div className="modal show add-sidemark-modal" aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Sidemark</h5>
                        <button type="button" className="close" onClick={() => { console.log("Close button clicked"); closeAddSidemarkModal(); }}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Sidemark Name</label>
                            <input type="text" className="form-control" value={sidemarkName} onChange={(e) => setSidemarkName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleAddSidemark}>Submit</button>
                        <button className="btn btn-secondary" onClick={() => { console.log("Close button clicked"); closeAddSidemarkModal(); }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSidemarkModal;