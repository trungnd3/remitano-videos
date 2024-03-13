import { configureStore } from '@reduxjs/toolkit';

import { AppStore, rootReducer } from '@/store/reducer';

const store: AppStore = configureStore({ reducer: rootReducer });

export * from './reducer';

export default store;
