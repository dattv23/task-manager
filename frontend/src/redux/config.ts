import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import { authReducer } from '~/redux/reducers'
import { apiAuth, apiProfile, apiTask } from '~/apis'

const reducers = combineReducers({
  auth: authReducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiProfile.reducerPath]: apiProfile.reducer,
  [apiTask.reducerPath]: apiTask.reducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['apiAuth', 'apiProfile', 'apiTask']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiAuth.middleware, apiProfile.middleware, apiTask.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export const persistor = persistStore(store)
