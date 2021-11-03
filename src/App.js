import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { isLoggedIn } from "./actions/user";

import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";

import "antd/dist/antd.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
};

export default App;
