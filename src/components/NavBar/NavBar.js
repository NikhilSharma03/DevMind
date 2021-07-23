import React from 'react'
import "./NavBar.css"

import NavList from './../NavList/NavList'

const NavBar = () => {
    return (
        <header className="navbar__main">
            <h1 className="navbar__title">DEV<span>MIND</span></h1>
            {/* <div>SD BTN</div> */}
            <nav className="navbar__nav">
                <NavList />
            </nav>
        </header>
    )
}

export default NavBar
