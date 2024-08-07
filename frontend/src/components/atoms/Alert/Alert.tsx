import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  WarningOutlined
} from '@ant-design/icons'
import { memo } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '~/utils'

const alertVariants = cva(
  'w-[400px] flex justify-between items-start p-5 rounded-xl fixed top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white',
  {
    variants: {
      type: {
        error: 'bg-error',
        warning: 'bg-warning',
        success: 'bg-success',
        info: 'bg-info'
      }
    },
    defaultVariants: {
      type: 'info'
    }
  }
)

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  content: string
  open: boolean
  onClose: () => void
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

const Alert: React.FC<AlertProps> = memo(({ content, type, className, open, onClose, ...props }) => {
  if (!open) {
    return null // Render nothing if the alert is closed
  }

  return (
    <div className={cn(alertVariants({ type, className }))} {...props}>
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-dark bg-opacity-5 text-xl text-white'>
        {renderIcon(type!)}
      </div>
      <div className='w-[250px] break-words'>
        <h4 className='text-lg font-medium first-letter:uppercase'>{type} Message</h4>
        <p className='text-xs font-light'>{content}</p>
      </div>
      <button className='w-10 hover:text-dark' onClick={onClose}>
        <CloseOutlined />
      </button>
    </div>
  )
})

export default Alert
