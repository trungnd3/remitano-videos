import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  user: string;
}

const initialState: IAuthState = {
  user: '',
};

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
