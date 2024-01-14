import React, { useState } from 'react'

import NavBar from './../NavBar/NavBar'
import SideDrawer from './../SideDrawer/SideDrawer'
import Footer from './../Footer/Footer'

const Layout = (props) => {
  const [sdOpen, setSDOpen] = useState(false)

  const toggleHandler = () => {
    setSDOpen((prev) => !prev)
  }

  return (
    <>
      <NavBar toggleSD={toggleHandler} sd={sdOpen} />
      <SideDrawer sdOpen={sdOpen} toggleSD={toggleHandler} />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout
