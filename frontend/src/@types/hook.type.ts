export type ToastsContextType = {
  toasts: ToastType[]
  addToast: (toast: ToastType) => string
  dismissToast: (id: string) => void
}

export type ToastsProviderType = {
  children: React.ReactNode
}

export type ToastType = {
  id?: string
  title: string
  message: string
  type?: 'error' | 'warning' | 'success' | 'info' | null | undefined
  handleDismiss?: () => void
  progress?: boolean
  timeOut?: number // milliseconds
}
