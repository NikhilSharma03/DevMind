import { Switch, Route } from 'react-router-dom'

import {
  Comment,
  UpdatePost,
  AddPost,
  UserProfile,
  MyProfile,
  Feed,
  LogOut,
  Login,
  SignUp,
  Home,
} from './../../pages'

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/comment/:id" component={Comment} />
      <Route exact path="/update_post/:id" component={UpdatePost} />
      <Route exact path="/create_post" component={AddPost} />
      <Route exact path="/profile/:id" component={UserProfile} />
      <Route exact path="/my_profile" component={MyProfile} />
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/logout" component={LogOut} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/" component={Home} />
    </Switch>
  )
}

export default AppRouter
