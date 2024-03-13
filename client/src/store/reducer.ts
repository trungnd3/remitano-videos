import {
  Store,
  Action,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import { authSlice } from '@/src/store/auth';
import { videoSlice } from '@/src/store/video';

export * from '@/src/store/auth';
export * from '@/src/store/video';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  video: videoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
export type AppThunkDispatch = ThunkDispatch<RootState, undefined, Action>;
export const useAppDispatch = (): AppThunkDispatch =>
  useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = Omit<Store<RootState, Action>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};
