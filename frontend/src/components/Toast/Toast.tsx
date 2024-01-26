import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  WarningOutlined
} from '@ant-design/icons'
import { VariantProps, cva } from 'class-variance-authority'
import React, { useEffect, useState } from 'react'
import { cn } from '~/utils'
import Progressbar from '../Progressbar/Progressbar'

const toastVariants = cva('w-[400px] flex justify-between items-start p-5 rounded-xl fixed top-5 right-5 border', {
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
      <div className='w-10 h-10 bg-dark bg-opacity-5 rounded-full flex justify-center items-center text-xl'>
        {renderIcon(type!)}
      </div>
      <div className='w-[250px] break-words'>
        <h4 className='first-letter:uppercase text-lg font-medium'>{title}</h4>
        <p className='text-xs font-light mb-2'>{description}</p>
        {progress && <Progressbar time={10000} />}
      </div>
      <button className='w-10 hover:text-dark' onClick={onClose}>
        <CloseOutlined />
      </button>
    </div>
  )
}

export default Toast
