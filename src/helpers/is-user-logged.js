import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function IsUserLogged({ user, loggedPath, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedPath,
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}

IsUserLogged.propTypes = {
  user: PropTypes.object,
  loggedPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
