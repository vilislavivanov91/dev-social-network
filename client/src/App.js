import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import Navigation from './components/layout/Navigation';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/common/private-route/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import CreateProfile from './components/create-profile/CreateProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';

import { setCurrentUser, logoutUser } from './actions/auth';
import store from './store';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (sessionStorage.getItem('token')) {
  setAuthToken(sessionStorage.getItem('token'));

  const payload = jwtDecode(sessionStorage.getItem('token'));

  store.dispatch(setCurrentUser(payload));
  // Check if token is expired      TODO: Remove this check here or the one in actions/auth/ with setTimeout
  if (payload.exp < Date.now() / 1000) {
    // Dispatch a logout
    store.dispatch(logoutUser());
    // Remove token from session storage
    sessionStorage.removeItem('token');
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navigation />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile/:handle" component={Profile} />
              <Route path="/post/:postId" component={Post} />
              <Route path="/profiles" component={Profiles} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/posts" component={Posts} />
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              <PrivateRoute path="/edit-profile" component={CreateProfile} />
              <PrivateRoute path="/add-experience" component={AddExperience} />
              <PrivateRoute path="/add-education" component={AddEducation} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
