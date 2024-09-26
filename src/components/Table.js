import React from 'react';
import DesignerOrders from './DesignerOrdersModal';

function Table({ data = [], onDesignerClick, openTabs, activeTab, closeTab, setActiveTab }) {
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3 bg-warning text-white d-flex justify-content-between align-items-center">
                <h6 className="m-0 font-weight-bold">Designer List</h6>
                <ul className="tab-list mb-0 d-flex">
                    {openTabs.map(tab => (
                        <li key={tab.id} className={`tab-item ml-3 ${activeTab === tab.id ? 'active' : ''}`}>
                            <span onClick={() => setActiveTab(tab.id)}>{tab.designer_name}</span>
                            {tab.id !== 'table' && (<button onClick={() => closeTab(tab.id)}>x</button>)}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card-body">
                {activeTab === 'table' ? (
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="thead-dark sticky-header">
                        <tr>
                            <th scope="col">Designer ID</th>
                            <th scope="col">Designer Name</th>
                            <th scope="col">Company</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.length > 0 ? (
                            data.map((designer) => (
                                <tr key={designer.id} onClick={() => onDesignerClick(designer)} style={{ cursor: 'pointer' }}>
                                    <td>{designer.id}</td>
                                    <td>{designer.designer_name}</td>
                                    <td>{designer.company}</td>
                                    <td>{designer.email}</td>
                                    <td>{designer.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No designers available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                ) : (
                    openTabs.map(tab => (
                        activeTab === tab.id && (
                            <DesignerOrders
                                key={tab.id}
                                designerId={tab.id}
                                designer={tab}
                            />
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default Table;