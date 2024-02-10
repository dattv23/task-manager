import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'animate.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/config.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Spin } from 'antd'
import ToastsProvider from './hooks/useToasts.tsx'
import { AuthProvider } from './hooks/useAuth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spin size='large' />}>
        <AuthProvider>
          <ToastsProvider>
            <App />
          </ToastsProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
