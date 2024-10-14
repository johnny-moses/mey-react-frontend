import React, { useState } from 'react';
import '../assets/styles/Tab.css';
import Table from './Table';
import DesignerOrders from './DesignerOrdersModal';

function Dashboard({ designers }) {
    const [openTabs, setOpenTabs] = useState([]);
    const [activeTab, setActiveTab] = useState('table');
    const [tabStates, setTabStates] = useState({});

    const handleDesignerClick = (designer) => {
        if (!openTabs.some(tab => tab.id === designer.id)) {
            setOpenTabs([...openTabs, designer]);
        }
        setActiveTab(designer.id);
    };

    const closeTab = (id) => {
        const updatedTabs = openTabs.filter(tab => tab.id !== id);
        setOpenTabs(updatedTabs);
        if (activeTab === id) {
            setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : 'table');
        }
        // Optionally clean up the state of the closed tab
        const updatedTabStates = { ...tabStates };
        delete updatedTabStates[id];
        setTabStates(updatedTabStates);
    };

    const updateTabState = (id, newState) => {
        setTabStates(prevState => ({
            ...prevState,
            [id]: newState,
        }));
    };

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
                                    state={tabStates[tab.id] || {}}
                                    updateState={(newState) => updateTabState(tab.id, newState)}
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