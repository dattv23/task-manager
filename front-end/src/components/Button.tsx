import * as React from 'react'
import { VariantProps, cva } from "class-variance-authority";
import { Link } from 'react-router-dom';
import { cn } from '../utils';

const buttonVariants = cva(
      "rounded-xl text-base font-medium font-['Gelion'] hover:opacity-80 disabled:opacity-20 inline-flex justify-center items-center",
      {
            variants: {
                  variant: {
                        primary: "bg-primary text-white",
                        secondary: "border-primary border-2 text-primary",
                        tetiary: "text-primary"
                  },
                  size: {
                        sm: "w-48 h-10",
                        md: "w-[188px] h-12",
                        lg: "w-[188px] h-14",
                  },
            },
            defaultVariants: {
                  variant: 'primary',
                  size: 'lg',
            },
      }
)

export interface ButtonProps
      extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
      to?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

export { Button, buttonVariants }