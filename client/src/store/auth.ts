import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunkDispatch } from '.';
import { toast } from '@/src/components/ui/use-toast';

export interface IAuthState {
  user: string;
}

const initialState: IAuthState = {
  user: '',
};

export function signInUser(username: string, password: string) {
  return async function (dispatch: AppThunkDispatch) {
    try {
      const response = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.code === 200) {
        localStorage.setItem('user', data.data);
        dispatch(
          authActions.login({
            user: data.data,
          })
        );
      } else {
        toast({
          title: 'Cannot sign in',
        });
      }
    } catch (error) {}
  };
}

export function createUser(username: string, password: string) {
  return async function (dispatch: AppThunkDispatch) {
    try {
      console.log('dispatcher - bfore create user', username);
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log('dispatcher - create user', data);
      if (data.code === 200) {
        dispatch(
          authActions.login({
            user: username,
          })
        );
      }
    } catch (error) {}
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IAuthState>) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = '';
    },
  },
});

export const authActions = authSlice.actions;
