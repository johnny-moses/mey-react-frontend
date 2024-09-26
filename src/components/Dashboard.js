import React, { useState } from 'react';
import '../assets/styles/Tab.css';
import Table from './Table';
import DesignerOrders from './DesignerOrdersModal';

function Dashboard({ designers }) {
    const [openTabs, setOpenTabs] = useState([]);
    const [activeTab, setActiveTab] = useState('table');

    const handleDesignerClick = (designer) => {
        if (!openTabs.some(tab => tab.id === designer.id)) {
            setOpenTabs([...openTabs, designer]);
        }
        setActiveTab(designer.id);
    }

    const closeTab = (id) => {
        setOpenTabs(openTabs.filter(tab => tab.id !== id));
        if (activeTab === id && openTabs.length > 0) {
            setActiveTab(openTabs.length > 1 ? openTabs[0].id : 'table');
        }
    }

    return (
        <div className="container-fluid">
            <div className="d-flex align-items-center">
                <h1
                    className={`${activeTab === 'table' ? 'header-button active-tab' : 'header-button'} m-0 font-weight-bold`}
                    onClick={() => setActiveTab('table')}
                >
                    Designers
                </h1>
                <ul className="tab-list d-flex ml-3 mb-0">
                    {openTabs.map(tab => (
                        <li
                            key={tab.id}
                            className={`tab-item ${activeTab === tab.id ? 'active-tab' : ''}`}
                        >
                            <span onClick={() => setActiveTab(tab.id)}>{tab.designer_name}</span>
                            <button className="close-button" onClick={() => closeTab(tab.id)}>x</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="card mt-3 shadow mb-4">
                <div className="card-body">
                    {activeTab === 'table' ? (
                        <Table data={designers} onDesignerClick={handleDesignerClick} />
                    ) : (
                        openTabs.map(tab => (
                            activeTab === tab.id && (
                                <DesignerOrders
                                    key={tab.id}
                                    designer={tab}
                                />
                            )
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;