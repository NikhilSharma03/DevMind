import React from 'react'
import { useSelector } from 'react-redux'
import './SideDrawer.css'

import NavItem from './../NavItem/NavItem'

import ImageSource from './../../shared/ImageSource'

function SideDrawer(props) {
  const token = useSelector((state) => state.user.token)
  const username = useSelector((state) => state.user.username)
  const email = useSelector((state) => state.user.email)
  const avatar = useSelector((state) => state.user.avatar)

  return (
    <div
      className="sidedrawer__container"
      style={{
        transform: props.sdOpen ? 'translateX(0)' : 'translateX(-110%)',
      }}
    >
      <div className="sidedrawer__profile">
        {token && (
          <>
            <figcaption className="sd__profile--imgcont">
              <img src={avatar} alt="profile" />
            </figcaption>
            <h1>{username}</h1>
            <p>{email}</p>
          </>
        )}
      </div>
      <nav className="sidedrawer__nav">
        <ul onClick={props.toggleSD} className="sd__nav--ul">
          {token ? (
            <>
              <NavItem href="/feed">
                <img src={ImageSource.sdFeed} alt="icons" />
                Feed
              </NavItem>
              <NavItem href="/create_post">
                <img src={ImageSource.sdPost} alt="icons" />
                Create
              </NavItem>
              <NavItem href="/my_profile">
                <img src={ImageSource.sdProfile} alt="icons" />
                Profile
              </NavItem>
            </>
          ) : (
            <NavItem href="/login">
              <img src={ImageSource.sdProfile} alt="icons" />
              SignIn
            </NavItem>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default SideDrawer
