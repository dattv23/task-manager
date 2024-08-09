import { v4 as uuidv4 } from 'uuid'
import { createContext, memo, useState } from 'react'

import { ToastType, ToastsContextType, ToastProviderType } from '~/@types/hook.type'
import { Toast } from '~/components/molecules'

export const ToastsContext = createContext<ToastsContextType | undefined>(undefined)

const ToastWrapper: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <div className='fixed right-5 top-5 z-20 flex flex-col gap-1'>{children}</div>
})

const ToastProvider: React.FC<ToastProviderType> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const addToast = (toast: ToastType): string => {
    const id = uuidv4()
    setToasts((prevToasts) => [{ ...toast, id }, ...prevToasts])
    return id
  }

  const dismissToast = (id: string): void => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastsContext.Provider value={{ toasts, addToast, dismissToast }}>
      <ToastWrapper>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} handleDismiss={() => dismissToast(toast.id!)} />
        ))}
      </ToastWrapper>
      {children}
    </ToastsContext.Provider>
  )
}

export default ToastProvider
