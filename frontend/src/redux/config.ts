import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { api } from '~/apis/api'
import { authReducer } from './reducers'

const reducers = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['api']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export const persistor = persistStore(store)
