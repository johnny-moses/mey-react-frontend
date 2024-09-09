import React from 'react';

function Card({ title, value, icon, color }) {
  return (
    <div className="col-xl-4 col-md-6 mb-4">
      <div className={`card text-white bg-${color} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-uppercase mb-1">{title}</div>
              <div className="h5 mb-0 font-weight-bold">{value}</div>
            </div>
            <div className="col-auto">
              <i className={`fas ${icon} fa-2x`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
