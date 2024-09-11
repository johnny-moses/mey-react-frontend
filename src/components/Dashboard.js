import React from 'react';
import Table from './Table';

function Dashboard({ designers }) {
  return (
    <div className="container-fluid">
      <h1 className="text-center">Designers</h1>
      <Table data={designers} />  {/* Pass the designer data to the Table component */}
    </div>
  );
}

export default Dashboard;
