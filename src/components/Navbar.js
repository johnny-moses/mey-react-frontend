import React from 'react';
import '../assets/styles/Navbar.css';  // Ensure custom CSS is loaded

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <div className="d-flex flex-grow-1">
        {/* Search bar on the left */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="search"
              className="form-control bg-light border-0 small rounded-left"  // Rounded left corners
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary rounded-right" type="button"
                style={{ padding: '0.5rem 1rem' }}  // Adjust padding for button
              >
                Search  {/* Replaced the icon with the text "Search" */}
              </button>
            </div>
          </div>
        </form>

        {/* Title in the center */}
        <h1 className="h3 mb-0 text-gray-800 mx-auto">Dashboard</h1>

        {/* Logout button on the right */}
        <a className="btn btn-primary btn-sm ml-auto" href="/logout"
          style={{ padding: '0.375rem 0.75rem' }}  // Adjusted padding for smaller logout button
        >
          Logout
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
