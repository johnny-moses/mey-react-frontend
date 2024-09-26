import React from 'react';

function DesignerOrders({ designer }) {
    return (
        <div>
            <h2>{designer.designer_name}</h2>
            <p>Company: {designer.company}</p>
            <p>Email: {designer.email}</p>
            <p>Phone: {designer.phone}</p>
        </div>
    );
}

export default DesignerOrders;