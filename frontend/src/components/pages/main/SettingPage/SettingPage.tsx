import { Switch } from 'antd'
import React from 'react'
import { ICONS } from '~/assets/icons'
import { Button } from '~/components'
import { EMAIL, FULL_NAME } from '~/constants'
import { Mode, useDarkMode } from '~/hooks/useDarkMode'
import { getStore } from '~/utils'

const SettingPage: React.FC = () => {
  const email = getStore(EMAIL)
  const fullName = getStore(FULL_NAME)
  const { darkMode, updateDarkMode } = useDarkMode()

  const handleChangeDarkMode = (checked: boolean) => {
    if (checked) {
      updateDarkMode(Mode.DARK)
    } else {
      updateDarkMode(Mode.LIGHT)
    }
  }

  return (
    <div className='flex flex-col gap-5 py-3'>
      <h3 className='text-3xl font-semibold text-blue-950'>Settings</h3>
      <div>
        <h4 className='text-xl font-normal text-blue-950'>Account Settings</h4>
        <div className='mt-2 flex flex-col gap-2 rounded-lg bg-white p-4'>
          <div className='flex gap-2 rounded-lg border border-neutral-300 p-2'>
            <img src={ICONS.profile} alt='' />
            <div>
              <p>Full Name</p>
              <p>
                <strong>{fullName}</strong>
              </p>
            </div>
          </div>
          <div className='flex gap-2 rounded-lg border border-neutral-300 p-2'>
            <img src={ICONS.email} alt='' />
            <div>
              <p>Email Address</p>
              <p>
                <strong>{email}</strong>
              </p>
            </div>
          </div>
          <Button>Edit</Button>
        </div>
      </div>
      <div>
        <h4 className='text-xl font-normal text-blue-950'>Notification Settings</h4>
        <div className='mt-2 flex flex-col gap-2 rounded-lg bg-white p-4'>
          <div className='flex justify-between gap-2 rounded-lg border border-neutral-300 p-2'>
            <p className='text-base font-medium'>Allow Desktop Notifications</p>
            <Switch className='bg-slate-400' />
          </div>
          <div className='flex justify-between gap-2 rounded-lg border border-neutral-300 p-2'>
            <p className='text-base font-medium'>Send Critical Notifications to My Email</p>
            <Switch className='bg-slate-400' />
          </div>
        </div>
      </div>
      <div>
        <h4 className='text-xl font-normal text-blue-950'>Accessibility Settings</h4>
        <div className='mt-2 flex flex-col gap-2 rounded-lg bg-white p-4'>
          <div className='flex justify-between gap-2 rounded-lg border border-neutral-300 p-2'>
            <p className='text-base font-medium'>Enable Dark Mode</p>
            <Switch className='bg-slate-400' checked={darkMode} onChange={handleChangeDarkMode} />
          </div>
        </div>
      </div>
      <Button className='bg-red-700 opacity-80'>Log Out</Button>
    </div>
  )
}

export default SettingPage
