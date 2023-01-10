import React, { useEffect, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  getUser,
} from '../../services/actions/current-user';

const ProtectedRoute: FC<RouteProps & { children?: React.ReactNode }> = ({ children, ...rest }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser.currentUser);

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