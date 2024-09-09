import React from 'react';
import Card from './Card';
import Table from './Table';

function Dashboard() {
  const data = [
    { id: 1, workorder_id: '123', designer_name: 'Designer A', items_count: 5 },
    { id: 2, workorder_id: '456', designer_name: 'Designer B', items_count: 10 },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <Card title="Unique SKUs in Inventory" value={100} icon="fa-boxes" color="primary" />
        <Card title="Designers" value={10} icon="fa-users" color="success" />
        <Card title="Active Orders" value={5} icon="fa-shopping-cart" color="info" />
      </div>
      <div className="row">
        <Table data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
