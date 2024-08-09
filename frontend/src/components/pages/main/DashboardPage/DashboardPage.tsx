import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import { ICONS } from '~/assets/icons'
import { IMAGES } from '~/assets/images'
import { Button } from '~/components'
import { getStore } from '~/utils'

type CardType = {
  icon: string
  title: string
}
const cards: CardType[] = [
  {
    icon: ICONS.onboarding,
    title: 'Hey Faith, Update your Profile Picture'
  },
  {
    icon: ICONS.workspace,
    title: 'Create your First Task in your Workspace'
  }
]

const DashboardPage: React.FC = () => {
  const fullName = getStore('fullName')
  return (
    <>
      <div className='flex w-full'>
        <p className='text-[56px] font-semibold'>👋</p>
        <div>
          <h2 className='h-10 text-3xl font-bold text-black'>
            Hi {fullName ? fullName.substring(fullName.lastIndexOf(' ')) : ''},
          </h2>
          <p className='text-lg font-normal text-zinc-600'>Welcome to Alliance Task Management</p>
        </div>
      </div>
      <div className='relative mt-2 h-36 w-full'>
        <img src={IMAGES.overview} alt='motivation' className='absolute bottom-0 left-0 right-0 top-0 h-36 w-full' />
        <h3 className='absolute left-8 top-8 z-10 w-40 text-base font-semibold leading-7 text-white'>
          Motivation to help you work.
        </h3>
        <div className='absolute bottom-8 right-8 top-8 flex  flex-col justify-between gap-2 text-white'>
          <button className='text-right'>
            <CloseOutlined />
          </button>
          <Button className='max-h-10 text-base'>Get Started</Button>
        </div>
      </div>
      <div className='my-4 flex flex-col gap-5'>
        <h4 className='text-xl font-bold text-black'>Let’s get you started</h4>
        {cards.map((item, id) => (
          <div
            key={id}
            className='flex justify-between gap-4 rounded-md bg-white p-3 text-stone-500 hover:border-2 hover:border-primary hover:text-primary'
          >
            <div className='flex items-center gap-2 '>
              <div className='flex h-12 w-12 items-center justify-center rounded-md bg-slate-100'>
                <img src={item.icon} alt='' sizes='24' />
              </div>
              <p className='text-base font-semibold'>{item.title}</p>
            </div>
            <button className='flex w-32 items-center justify-between '>
              <span className='cursor-pointer text-base font-semibold'>Get Started</span>
              <img src={ICONS.arrowRight} alt='' />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default DashboardPage
