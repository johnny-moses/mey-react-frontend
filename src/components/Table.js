import React from 'react';

function Table({ data }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 bg-warning text-white">
        <h6 className="m-0 font-weight-bold">Recent Work Orders</h6>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Workorder ID</th>
              <th scope="col">Designer Name</th>
              <th scope="col">Items Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((workorder) => (
              <tr key={workorder.id}>
                <td>{workorder.workorder_id}</td>
                <td>{workorder.designer_name}</td>
                <td>{workorder.items_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
