import React from 'react';
import Table from './Table';

function Dashboard() {
  // Initialize data array, even if empty
  const data = [
    { id: 1, workorder_id: '123', designer_name: 'Designer A', items_count: 5 },
    { id: 2, workorder_id: '456', designer_name: 'Designer B', items_count: 10 }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
