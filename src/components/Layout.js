import React from 'react';
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import './Layout.css'

function Layout(props) {
    return (
        <div>
            <div style={{display: "flex"}}>
                <Sidebar history={props.history}/>
                <div className='Outer'>
                    {/* <Nav/> */}
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;