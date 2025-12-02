import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated, logout as logoutAction } from '../store/auth.reducer';
import { logoutUser } from '../helpers/authHelpers';

export function useAuth() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await logoutUser();
      dispatch(logoutAction());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    isAuthenticated,
    logout,
  };
}

