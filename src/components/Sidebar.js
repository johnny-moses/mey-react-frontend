import React from 'react';

function Sidebar() {
  return (
    <ul className="navbar-nav bg-dark sidebar sidebar-dark accordion">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-boxes"></i></div>
        <div className="sidebar-brand-text mx-3">Meyers Delivery</div>
      </a>
      <li className="nav-item">
        <a className="nav-link text-white" href="/dashboard">
          <i className="fas fa-fw fa-table"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" href="/designers">
          <i className="fas fa-fw fa-users"></i>
          <span>Designers</span>
        </a>
      </li>
    </ul>
  );
}

export default Sidebar;
