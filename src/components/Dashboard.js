import React from 'react';

function Dashboard() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center flex-wrap" style={{ height: '100vh' }}>
            <button className="btn btn-primary btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Add Inventory
            </button>
            <button className="btn btn-secondary btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                View All Inventory
            </button>
            <button className="btn btn-success btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Update Inventory
            </button>
            <button className="btn btn-danger btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Remove Inventory
            </button>
            <button className="btn btn-warning btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Inventory Reports
            </button>
            <button className="btn btn-info btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Inventory Alerts
            </button>
            <button className="btn btn-dark btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Inventory Transfers
            </button>
            <button className="btn btn-light btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Inventory Audits
            </button>
            <button className="btn btn-primary btn-lg shadow m-2" style={{ padding: '20px 40px', fontSize: '24px' }}>
                Inventory Settings
            </button>
        </div>
    );
}

export default Dashboard;