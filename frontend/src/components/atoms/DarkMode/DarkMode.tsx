import { memo, useEffect, useState } from 'react'

import { cn } from '~/utils'
import Button from '~/components/atoms/Button'

const DarkMode = memo(() => {
  const [darkMode, setDarkMode] = useState(false)
  const element = document.documentElement

  useEffect(() => {
    if (darkMode) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Button
      variant='secondary'
      className={cn(
        'flex w-24 transition-all duration-1000',
        darkMode ? 'justify-start border-none bg-[#2C2F48]' : 'justify-end border-yellow-200 bg-white'
      )}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <i className='animate__animated animate__fadeInRight icon ion-md-moon text-2xl text-white'></i>
      ) : (
        <i className='animate__animated animate__fadeInLeft icon ion-md-partly-sunny text-2xl text-yellow-400'></i>
      )}
    </Button>
  )
})

export default DarkMode
