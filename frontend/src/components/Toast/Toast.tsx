import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  WarningOutlined
} from '@ant-design/icons'
import { VariantProps, cva } from 'class-variance-authority'
import React, { useEffect } from 'react'
import { cn } from '~/utils'
import Progressbar from '../Progressbar/Progressbar'

const toastVariants = cva('w-[400px] p-5 rounded-xl fixed top-5 right-5 border-2 bg-white', {
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

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title: string
  description: string
  open: boolean
  onClose: () => void
  progress?: boolean
  colorProgress?: string
  time?: number // milliseconds
}

const renderIcon = (type: string) => {
  switch (type) {
    case 'error':
      return <CloseCircleOutlined />
    case 'warning':
      return <WarningOutlined />
    case 'success':
      return <CheckCircleOutlined />
    default:
      return <InfoCircleOutlined />
  }
}

const Toast: React.FC<ToastProps> = ({
  type,
  className,
  open,
  onClose,
  title,
  description,
  progress,
  colorProgress,
  time = 3000,
  ...props
}) => {
  useEffect(() => {
    let timerId: NodeJS.Timeout

    if (progress) {
      timerId = setTimeout(() => {
        onClose()
      }, time)
    }

    return () => {
      // Clear the timer when the component unmounts or when progress is complete
      clearTimeout(timerId)
    }
  }, [open])

  if (!open) {
    return null // Render nothing if the alert is closed
  }

  return (
    <div className={cn(toastVariants({ type, className }))} {...props}>
      <div className='flex items-start justify-between'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-dark bg-opacity-5 text-xl'>
          {renderIcon(type!)}
        </div>
        <div className='w-[250px] break-words'>
          <h4 className='text-lg font-medium first-letter:uppercase'>{title}</h4>
          <p className='mb-2 text-xs font-light'>{description}</p>
        </div>
        <button className='w-10 hover:text-dark' onClick={onClose}>
          <CloseOutlined />
        </button>
      </div>
      <div className='absolute bottom-0 left-0 right-0'>
        {progress && <Progressbar time={time} color={colorProgress} className='rounded-b-[24px] rounded-r-[20px]' />}
      </div>
    </div>
  )
}

export default Toast
