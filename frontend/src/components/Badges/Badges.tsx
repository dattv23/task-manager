import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/utils'

const badgeVariants = cva('inline-flex items-center justify-center rounded-xl p-[10px] text-xs font-medium h-6', {
  variants: {
    type: {
      pending: 'bg-amber-50 text-amber-500',
      in_progress: 'bg-blue-50 text-blue-700',
      in_review: 'bg-purple-50 text-purple-600',
      completed: 'bg-emerald-50 text-emerald-500',
      unassigned: 'bg-red-50 text-red-700',
      default: 'text-white bg-blue-700'
    }
  },
  defaultVariants: {
    type: 'default'
  }
})

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badges: React.FC<BadgeProps> = ({ type, className, children, ...props }) => {
  return (
    <div className={cn(badgeVariants({ type, className }))} {...props}>
      {children}
    </div>
  )
}

export default Badges
