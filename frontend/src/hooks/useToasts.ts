import { useContext, useRef, useState } from 'react'
import { ToastType } from '~/@types/hook.type'
import { ToastsContext } from '~/contexts/toastsContext'

export const useToasts = () => {
  const [toastIds, setToastIds] = useState<string[]>([])
  const toastIdsRef = useRef(toastIds)
  const context = useContext(ToastsContext)

  if (!context) {
    throw new Error('useToasts must be used within a ToastsProvider')
  }

  const { addToast, dismissToast } = context

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
