import { memo } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '~/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl px-6 text-base font-medium hover:opacity-80',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-white border-2 border-primary text-primary',
        tertiary: 'text-primary'
      },
      size: {
        default: 'h-12',
        sm: 'h-10',
        lg: 'h-14'
      },
      state: {
        default: 'opacity-100',
        disabled: 'opacity-15'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      state: 'default'
    }
  }
)
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button: React.FC<ButtonProps> = memo(({ variant, size, className, children, ...props }) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  )
})

export default Button
