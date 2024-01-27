import React, { useEffect, useState } from 'react'
import { cn } from '~/utils'

interface ProgressbarProps extends React.HTMLAttributes<HTMLDivElement> {
  time: number // milliseconds
  color?: string // color of progress
}

const Progressbar: React.FC<ProgressbarProps> = ({ time, color = '#cccc', className, ...props }) => {
  const [filled, setFilled] = useState(0)
  useEffect(() => {
    if (filled <= 100) {
      setTimeout(() => setFilled((prev) => (prev += 2)), time / 50)
    }
  }, [filled])

  return (
    <div
      className={cn('h-2 w-full', className)}
      {...props}
      style={{
        width: `${100 - filled}%`,
        transition: 'width 0.1s',
        backgroundColor: color
      }}
    ></div>
  )
}

export default Progressbar
