import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { LogOutHandler } from './../../redux/actions/user'

const LogOut = () => {
  const dispatch = useDispatch()

  const onLogOutHandler = () => dispatch(LogOutHandler())

  useEffect(() => {
    onLogOutHandler()
  }, [])

  return <Redirect to="/login" />
}

export default LogOut
