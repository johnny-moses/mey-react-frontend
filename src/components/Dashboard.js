import React, { useState } from 'react';
import Table from './Table';
import DesignerOrders from './DesignerOrdersModal';

function Dashboard({ designers }) {
    const [openTabs, setOpenTabs] = useState([{ id: 'table', designer_name: 'Designer List' }]);
    const [activeTab, setActiveTab] = useState('table');

    const handleDesignerClick = (designer) => {
        if (!openTabs.some(tab => tab.id === designer.id)) {
            setOpenTabs([...openTabs, designer]);
        }
        setActiveTab(designer.id);  // Set the clicked designer as active tab
    }

    const closeTab = (id) => {
        if (id === 'table') return;  // Prevent the table tab from being closed
        setOpenTabs(openTabs.filter(tab => tab.id !== id));
        if (activeTab === id && openTabs.length > 1) {
            setActiveTab(openTabs.length > 1 ? openTabs[1].id : 'table');
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center">Designers</h1>
            <Table data={designers} onDesignerClick={handleDesignerClick} openTabs={openTabs} activeTab={activeTab} closeTab={closeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

export default Dashboard;