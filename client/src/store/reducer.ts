import {
  Store,
  Action,
  ThunkDispatch,
  combineReducers,
} from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import { authSlice } from '@/store/auth';
import { videoSlice } from '@/store/video';

export * from '@/store/auth';
export * from '@/store/video';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  video: videoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, undefined, Action>;
export const useAppDispatch = (): AppThunkDispatch =>
  useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = Omit<Store<RootState, Action>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};
