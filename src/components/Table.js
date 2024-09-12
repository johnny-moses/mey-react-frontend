import React from 'react';

function Table({ data = [], onDesignerClick }) {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 bg-warning text-white">
        <h6 className="m-0 font-weight-bold">Designer List</h6>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark sticky-header">
            <tr>
              <th scope="col">Designer ID</th>
              <th scope="col">Designer Name</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((designer) => (
                <tr key={designer.id} onClick={() => onDesignerClick(designer.id)} style={{ cursor: 'pointer' }}>
                  <td>{designer.id}</td>
                  <td>{designer.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No designers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
