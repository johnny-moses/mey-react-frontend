import React from 'react';

function Table({ data = [] }) {  // Default to empty array if data is undefined
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 bg-warning text-white">
        <h6 className="m-0 font-weight-bold">Designer List</h6>  {/* Changed title */}
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark sticky-header">
            <tr>
              <th scope="col">Designer ID</th>  {/* Changed column header */}
              <th scope="col">Designer Name</th>  {/* Changed column header */}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((designer) => (  // Update mapping for designer data
                <tr key={designer.id}>
                  <td>{designer.id}</td>  {/* Display designer ID */}
                  <td>{designer.name}</td>  {/* Display designer name */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No designers available</td>  {/* Adjusted for 2 columns */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
