import { useEffect, FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
} from '../../services/actions/current-user';
import { IProtectedRoute } from '../../utils/types';

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
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