import { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

import { cn } from '~/utils'
import { IMAGES } from '~/assets/images'
import { Button, DarkMode } from '~/components/atoms'
import { MultiLanguage } from '~/components/organisms'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState(false)

  return (
    <div className='p-4 lg:px-10'>
      <div className={cn('relative z-10 flex h-16 items-center justify-between ')}>
        <Link to={'/'} className='font-popins text-4xl font-semibold text-sky-400'>
          Alliance.
        </Link>
        <Button variant={'secondary'} className='block lg:hidden' onClick={() => setCollapse((pre) => !pre)}>
          <MenuOutlined className='text-xl' />
        </Button>
        <div
          className={cn('hidden gap-8 lg:flex', collapse && 'absolute top-16 z-10 flex w-full flex-col gap-2 bg-white')}
        >
          <div className='flex justify-between gap-8'>
            <DarkMode />
            <MultiLanguage />
          </div>
          <div className='flex justify-between gap-2'>
            <Button onClick={() => navigate('/register')} className={cn(collapse && 'w-full')}>
              Sign Up
            </Button>
            <Button onClick={() => navigate('/login')} className={cn(collapse && 'w-full')} variant={'secondary'}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className={cn('flex justify-center gap-10', collapse && 'opacity-25 ')}>
        <div className='mt-16 w-full lg:mt-24'>
          <div className='px-2 lg:w-[480px]'>
            <h1 className='mb-9 font-popins text-4xl font-semibold text-zinc-800'>Task Management & To-Do List</h1>
            <p className='text-lg text-zinc-500'>
              This productive tool is designed to help you better manage your task project-wise conveniently!
            </p>
            <Button className='mt-20 w-full' onClick={() => navigate('/dashboard')}>
              Let’s Start{' '}
              <span>
                <i className='icon ion-md-arrow-round-forward ml-1'></i>
              </span>
            </Button>
          </div>
        </div>
        <div className='z-10 hidden w-full lg:block'>
          <img src={IMAGES.description} alt='' className='h-[620px] w-[620px]' />
        </div>
        <img src={IMAGES.vector} alt='' className='fixed bottom-0 left-0 right-0 hidden lg:block' />
      </div>
    </div>
  )
}

export default HomePage
