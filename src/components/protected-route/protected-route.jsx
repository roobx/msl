import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
} from '../../services/actions/actions';
import PropTypes from 'prop-types';


function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.currentUser.currentUser);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Route
      {...rest}
      render={() =>
        currentUser.email ? (
          children
        ) : (

          <Redirect
            to='/login'
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
}

export default ProtectedRoute;