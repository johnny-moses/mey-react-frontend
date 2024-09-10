import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from "./components/Dashboard";



function App() {
  return (
      <div>
          <Sidebar/> {/* Sidebar will remain fixed */}
          <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                  <Navbar/>
                  <Dashboard/>
              </div>
          </div>
      </div>
  );
}

export default App;
