import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'animate.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/config.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Spin } from 'antd'
import ToastsProvider from './contexts/toastsContext.tsx'
import AuthProvider from './contexts/authContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spin size='large' />}>
        <ToastsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastsProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
