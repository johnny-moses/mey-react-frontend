import React from 'react';
import '../assets/styles/Sidebar.css';  // Add custom CSS for sidebar styling

function Sidebar() {
  return (
    <div className="sidebar bg-dark">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-boxes"></i></div>
        <div className="sidebar-brand-text mx-3">Meyers Delivery</div>
      </a>
      <hr className="sidebar-divider my-0" />
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link text-white" href="/dashboard">
            <i className="fas fa-fw fa-table"></i>
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/designers">
            <i className="fas fa-fw fa-users"></i>
            Designers
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
