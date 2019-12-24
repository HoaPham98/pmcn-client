import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

const PrivateRoute = ({ cookies, component: Component, ...rest }) => {
  const { accessToken } = cookies.cookies;

  return (
    <Route
      {...rest}
      render={props => {
        if (accessToken && accessToken !== '') {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default withCookies(PrivateRoute);
