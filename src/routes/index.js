import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

const Tables = Loadable({
  loader: () => import('../pages/Tables'),
  loading: Loading,
});

const Chef = Loadable({
  loader: () => import('../pages/Chef'),
  loading: Loading,
});

const routes = [
  {
    path: '/',
    component: Tables,
  },
  {
    path: '/chef',
    component: Chef,
  },
  {
    path: '*',
    component: () => <div>404!</div>,
  }
  

];

export default () => (
  <Switch>
    {routes.map(({ path, component, exact = true, isPrivate }, index) => {
      if (!isPrivate) {
        return (
          <Route key={index} path={path} component={component} exact={exact} />
        );
      } else {
        return (
          <PrivateRoute
            key={index}
            path={path}
            component={component}
            exact={exact}
          />
        );
      }
    })}
  </Switch>
);
