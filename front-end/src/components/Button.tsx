import * as React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../utils'
import { IButton, buttonVariants } from '../types/Button.types'

const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ className, children, to, variant, size, ...props }, ref) => {
    if (to) {
      return (
        <Link
          to={to}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      )
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }