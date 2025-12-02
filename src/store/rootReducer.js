import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.reducer';
import globalReducer from './global.reducer';
import nativeReducer from './native.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    native: nativeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredPaths: ['socket.client'],
      },
    }),
});

export default store;

