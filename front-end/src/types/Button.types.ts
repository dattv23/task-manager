import { VariantProps, cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'rounded-xl text-base font-medium hover:opacity-80 disabled:opacity-20 inline-flex justify-center items-center',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'border-primary border-2 text-primary',
        tetiary: 'text-primary'
      },
      size: {
        sm: 'w-48 h-10',
        md: 'w-[188px] h-12',
        lg: 'w-[188px] h-14'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg'
    }
  }
)

export interface IButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  to?: string
}