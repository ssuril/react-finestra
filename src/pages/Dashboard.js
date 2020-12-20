import React from 'react';
import './Dashboard.css'
import FeeTemplate from './FeeTemplate'
import CustomerTxnFee from './CustomerTxnFee'


function Dashboard(props) {
    console.log("Dashboard props", props);
    return (
        <div className="dashboard">
            <div className="custsetup">
                 <h1 className="headertext"> Setup Customer Fee and Individual Transaction Fee </h1>
                <FeeTemplate/>
             </div>
             <div className="fetchcustinfo">
                 <h1 className="headertext"> Fetch Customer Fee and Individual Transaction Fee </h1>
                <CustomerTxnFee/>
             </div>
        </div>
    );
}

export default Dashboard;