import {
  Store,
  Action,
  ThunkDispatch,
  combineReducers,
} from '@reduxjs/toolkit';
// import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import { authSlice } from '@/store/auth';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, undefined, Action>;
export const useAppDispatch = (): AppThunkDispatch =>
  useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = Omit<Store<RootState, Action>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};
