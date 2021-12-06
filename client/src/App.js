import React, { useEffect } from "react";
import "./App.css";

import Layout from "./components/Layout/Layout";
import {
  Home,
  Login,
  SignUp,
  AddPost,
  UpdatePost,
  UserProfile,
  Feed,
  Comment,
  MyProfile,
  LogOut
} from "./pages/PageSrc";
import { Switch, Route } from "react-router-dom";
import * as actionCreators from "./store/actions/user"
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const autoAuthHandler = () => dispatch(actionCreators.AutoAuthHandler())

  useEffect(() => {
    autoAuthHandler()
  }, [])

  return (
    <Layout>
      <Switch>
        <Route exact path="/comment/:id" component={Comment} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/my_profile" component={MyProfile} />
        <Route exact path="/profile/:id" component={UserProfile} />
        <Route exact path="/update_post/:id" component={UpdatePost} />
        <Route exact path="/create_post" component={AddPost} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={LogOut} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
