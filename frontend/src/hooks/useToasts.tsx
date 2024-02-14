import React, { createContext, useContext, useRef, useState } from 'react'
import { ToastType, ToastsContextType, ToastsProviderType } from '~/@types/hook.type'
import { v4 as uuidv4 } from 'uuid'
import { Toast, ToastsWrapper } from '~/components'

const ToastsContext = createContext<ToastsContextType | undefined>(undefined)

const ToastsProvider: React.FC<ToastsProviderType> = ({ children }) => {
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
      <ToastsWrapper>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} handleDismiss={() => dismissToast(toast.id!)} />
        ))}
      </ToastsWrapper>
      {children}
    </ToastsContext.Provider>
  )
}

export const useToasts = () => {
  const [toastIds, setToastIds] = useState<string[]>([])
  const toastIdsRef = useRef(toastIds)
  const { addToast, dismissToast } = useContext(ToastsContext)! // Non-null assertion

  const addToastWithId = (toast: ToastType): void => {
    const id = addToast(toast)
    toastIdsRef.current.push(id)
    setToastIds([...toastIdsRef.current])
  }

  const clearToasts = (): void => {
    toastIdsRef.current.forEach((id) => dismissToast(id))
    toastIdsRef.current = []
    setToastIds([])
  }

  return { addToast: addToastWithId, clearToasts }
}

export default ToastsProvider
