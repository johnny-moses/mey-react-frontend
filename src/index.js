import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';

const container = document.getElementById('root');

const root = createRoot(container);

// Initial render
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);