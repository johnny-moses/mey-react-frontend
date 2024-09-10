import React from 'react';

function Table({ data = [] }) {  // Default to empty array if data is undefined
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 bg-warning text-white">
        <h6 className="m-0 font-weight-bold">Recent Work Orders</h6>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark sticky-header">
            <tr>
              <th scope="col">Workorder ID</th>
              <th scope="col">Designer Name</th>
              <th scope="col">Items Count</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((workorder) => (
                <tr key={workorder.id}>
                  <td>{workorder.workorder_id}</td>
                  <td>{workorder.designer_name}</td>
                  <td>{workorder.items_count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No work orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
