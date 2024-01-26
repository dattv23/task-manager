import React, { useEffect, useState } from 'react'
import { cn } from '~/utils'

interface ProgressbarProps {
  time?: number // milliseconds
}

const Progressbar: React.FC<ProgressbarProps> = ({ time = 2500 }) => {
  const [filled, setFilled] = useState(0)
  useEffect(() => {
    if (filled < 100) {
      setTimeout(() => setFilled((prev) => (prev += 2)), time / 50)
    }
  }, [filled])

  return (
    <div className='w-full h-2 rounded-e-md bg-[#eeee]'>
      <div
        className={cn('h-full bg-primary rounded-e-md')}
        style={{
          width: `${filled}%`,
          transition: 'width 0.5s'
        }}
      ></div>
    </div>
  )
}

export default Progressbar
