import React from "react";
import "./App.css";

import Layout from "./components/Layout/Layout";
import {
  Home,
  Login,
  SignUp,
  AddPost,
  UpdatePost,
  UserProfile,
} from "./pages/PageSrc";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/update_post" component={UpdatePost} />
        <Route exact path="/create_post" component={AddPost} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
