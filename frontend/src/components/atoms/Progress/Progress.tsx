import { memo, useEffect, useState } from 'react'
import { cn } from '~/utils'

interface ProgressbarProps extends React.HTMLAttributes<HTMLDivElement> {
  time: number // milliseconds
  color?: string // color of progress
}

const Progressbar: React.FC<ProgressbarProps> = memo(({ time, color = '#cccc', className, ...props }) => {
  const [filled, setFilled] = useState(0)
  useEffect(() => {
    if (filled <= 100) {
      const timer = setTimeout(() => setFilled((prev) => (prev += 2)), (time * 1000) / 50)
      return () => clearTimeout(timer)
    }
  }, [filled])

  return (
    <div
      className={cn('z-30 h-1 w-full', className)}
      {...props}
      style={{
        width: `${100 - filled}%`,
        transition: 'width 0.1s',
        backgroundColor: color
      }}
    ></div>
  )
})

export default Progressbar
