import { useContext, useRef, useState } from 'react'
import { ToastType } from '~/@types/hook.type'
import { ToastsContext } from '~/contexts/toastsContext'

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
