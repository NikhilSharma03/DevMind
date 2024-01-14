import React from 'react'
import { useSelector } from 'react-redux'
import './NavList.css'

import NavItem from './../NavItem/NavItem'

const NavList = () => {
  const token = useSelector((state) => state.user.token)

  return (
    <ul className="nav__ul">
      {token && <NavItem href="/feed">Feed</NavItem>}
      {token && <NavItem href="/create_post">Create</NavItem>}
      {token && <NavItem href="/my_profile">Profile</NavItem>}
      <NavItem href={token ? '/logout' : '/login'} login={true}>
        {token ? 'LOGOUT' : 'LOGIN'}
      </NavItem>
    </ul>
  )
}

export default NavList
