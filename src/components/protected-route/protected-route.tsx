import React, { useEffect, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
} from '../../services/actions/current-user';

const ProtectedRoute: FC<RouteProps & { children?: React.ReactNode }> = ({ children, ...rest }) => {
  const dispatch = useDispatch<any>();

  const currentUser = useSelector((state: any) => state.currentUser.currentUser);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Route
      {...rest}

      render={({ location }) =>
        currentUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;