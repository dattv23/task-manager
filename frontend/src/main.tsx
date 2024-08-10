import React from 'react'
import { Spin } from 'antd'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'

import '~/index.scss'
import 'animate.css'
import App from '~/App.tsx'
import { persistor, store } from './redux/config.ts'
import { AuthProvider, ToastProvider } from '~/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spin size='large' />}>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
