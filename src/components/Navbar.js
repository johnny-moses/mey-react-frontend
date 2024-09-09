import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      <a className="btn btn-primary btn-sm" href="/logout">Logout</a>
    </nav>
  );
}

export default Navbar;
