import { VariantProps, cva } from 'class-variance-authority'

export const alertDialogVariants = cva(
  'w-[350px] h-[81px] p-5 rounded-xl justify-between items-start inline-flex',
  {
    variants: {
      type: {
        error: 'bg-error border-error text-error',
        warning: 'bg-warning border-warning text-warning',
        success: 'bg-success border-success text-success',
        info: 'bg-info border-info text-info'
      },
      form: {
        filled: 'text-white',
        stroked: 'bg-neutral-50 border-2'
      }
    },
    defaultVariants: {
      type: 'info',
      form: 'filled'
    }
  }
)

export interface IAlertDialog
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertDialogVariants> {
  title: string,
  description: string
}