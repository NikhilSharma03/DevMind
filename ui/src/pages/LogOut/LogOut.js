import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as actionCreators from "./../../store/actions/user"
import { useDispatch } from "react-redux"

const LogOut = () => {
  const dispatch = useDispatch()

  const onLogOutHandler = () => dispatch(actionCreators.LogOutHandler())
  
  useEffect(() => {
    onLogOutHandler()
  }, [])

  return (
    <Redirect to="login" />
  );
};

export default LogOut;
