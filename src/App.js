import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TestConnection from './components/TestConnection';

function App() {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/designers');  // Fetch from Flask backend
        const data = await response.json();
        setDesigners(data);  // Set the designer data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch designers');
        setLoading(false);
      }
    };

    fetchDesigners();
  }, []);

  return (
    <div>
      <Sidebar /> {/* Sidebar will remain fixed */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Dashboard designers={designers} />
          )}
        </div>
        <TestConnection />
      </div>
    </div>
  );
}

export default App;
