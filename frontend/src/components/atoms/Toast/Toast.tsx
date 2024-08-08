import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  WarningOutlined
} from '@ant-design/icons'
import { memo, useEffect } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '~/utils'
import Progressbar from '~/components/atoms/Progress'

const toastVariants = cva('w-[400px] p-5 rounded-xl border-2 bg-white', {
  variants: {
    type: {
      error: 'border-error text-error',
      warning: 'border-warning text-warning',
      success: 'border-success text-success',
      info: 'border-info text-info'
    }
  },
  defaultVariants: {
    type: 'info'
  }
})

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title: string
  message: string
  handleDismiss: () => void
  progress?: boolean
  timeOut?: number // milliseconds
}

const icons = {
  error: <CloseCircleOutlined />,
  warning: <WarningOutlined />,
  info: <InfoCircleOutlined />,
  success: <CheckCircleOutlined />
}

const colors = {
  error: '#FB151A',
  warning: '#EBA300',
  info: '#6684FF',
  success: '#00C271'
}

const Toast: React.FC<ToastProps> = memo(
  ({ type, className, handleDismiss = null, title, message, progress, timeOut = 2, ...props }) => {
    useEffect(() => {
      if (timeOut > 0 && handleDismiss) {
        const timer = setTimeout(() => {
          handleDismiss()
        }, timeOut * 1000)
        return () => clearTimeout(timer)
      }
    }, [])

    if (!message) {
      return null
    }

    return (
      <div
        className={cn(toastVariants({ type, className }), 'animate__animated animate__fadeInRight relative')}
        {...props}
      >
        <div className='flex items-start justify-between'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-dark bg-opacity-5 text-xl'>
            {icons[type as keyof typeof icons]}
          </div>
          <div className='w-[250px] break-words'>
            <h4 className='text-lg font-medium first-letter:uppercase'>{title}</h4>
            <p className='mb-2 text-xs font-light'>{message}</p>
          </div>
          {handleDismiss && (
            <button
              className='w-10 hover:text-dark'
              onClick={(e) => {
                e.preventDefault()
                handleDismiss()
              }}
            >
              <CloseOutlined />
            </button>
          )}
        </div>
        <div className='absolute bottom-0 left-1 right-0 h-1'>
          {progress ? (
            <Progressbar
              time={timeOut}
              color={colors[type as keyof typeof colors]}
              className='rounded-b-[28px] rounded-r-[28px]'
            />
          ) : null}
        </div>
      </div>
    )
  }
)

const ToastsWrapper: React.FC<{ children: React.ReactNode }> = memo(({ children }) => {
  return <div className='fixed right-5 top-5 z-20 flex flex-col gap-1'>{children}</div>
})

export { Toast, ToastsWrapper }
