import { useCallback, useEffect } from 'react';

import { calculateRemainingTime, retreiveStoredToken } from '@/src/lib/utils';
import {
  IUser,
  authActions,
  signInUser,
  useAppDispatch,
  useAppSelector,
} from '@/src/store';

let logoutTimer: NodeJS.Timeout;

export function useAuth() {
  const dispatch = useAppDispatch();

  const tokenData = retreiveStoredToken();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('user');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (username: string, password: string) => {
    dispatch(
      signInUser(username, password, (user) => {
        dispatch(authActions.login({ user }));
        localStorage.setItem('user', JSON.stringify(user));

        const remainingTime = calculateRemainingTime(user.tokenExpiresAt);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
      })
    );
  };

  let user = useAppSelector((state) => state.auth.user);
  const authCheck = useCallback(() => {
    if (!user.token) {
      const storedUser = localStorage.getItem('user');
      if (!!storedUser) {
        const userObj: IUser = JSON.parse(storedUser);
        dispatch(authActions.login({ user: { ...userObj } }));
      }
    }
  }, [user.token]);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler, authActions.login]);

  return {
    loginHandler,
    logoutHandler,
    authCheck,
  };
}
