import { NavLink, useLocation } from "react-router-dom"
import React from 'react'

function Navbar(props) {
    const routes = [
        { path: "/", name: "Main" },
        { path: "/save/", name: "Save" },
    ]

    const path = useLocation()
    return (
        <div className="navbar">
            <div className="m_container" />
            <div className="navbar_main b_container">
                {routes.map(r => (
                    <NavLink to={r.path} key={r.name} className="navbar_link" >
                        {r.name}
                    </NavLink>
                ))}
            </div>
            <div className="m_container" />
        </div>
    )
}

export default Navbar