import React, { useEffect, useRef } from 'react'
import { useRouteError } from 'react-router-dom'
import './style.scss'
import Button from '../Button'

const ErrorBoundary: React.FC = () => {
  const error = useRouteError()
  const eyeLeftRef = useRef<HTMLDivElement>(null)
  const eyeRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const eyeLeft = eyeLeftRef.current
      const eyeRight = eyeRightRef.current
      if (eyeLeft) {
        const x = eyeLeft.offsetLeft + eyeLeft.offsetWidth / 2
        const y = eyeLeft.offsetTop + eyeLeft.offsetHeight / 2
        const rad = Math.atan2(event.pageX - x, event.pageY - y)
        const rot = rad * (180 / Math.PI) * -1 + 180

        eyeLeft.style.transform = `rotate(${rot}deg)`
      }

      if (eyeRight) {
        const x = eyeRight.offsetLeft + eyeRight.offsetWidth / 2
        const y = eyeRight.offsetTop + eyeRight.offsetHeight / 2
        const rad = Math.atan2(event.pageX - x, event.pageY - y)
        const rot = rad * (180 / Math.PI) * -1 + 180

        eyeRight.style.transform = `rotate(${rot}deg)`
      }
    }

    // Attach event listener when the component mounts
    document.body.addEventListener('mousemove', handleMouseMove)

    // Remove event listener when the component unmounts
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove)
    }
  }, []) // Empty dependency array means this effect runs only once on mount

  console.error(error) // Log route error

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-[#333] text-white'>
      <div>
        <span className='text-9xl font-extrabold'>5</span>
        <div className='eye' ref={eyeLeftRef}></div>
        <div className='eye' ref={eyeRightRef}></div>
      </div>
      <p className='mt-4 text-xl'>
        Oh eyeballs! Something went wrong. We're <i>looking</i> to see what happened.
      </p>
      <Button variant={'tertiary'} className='mt-12 text-xl font-bold uppercase text-white'>
        Go Back
      </Button>
    </div>
  )
}

export default ErrorBoundary
