import { Avatar } from 'antd'
import React from 'react'
import { IMAGES } from '~/assets/images'
import { getStore } from '~/utils'
import Button from '../Button'

const Profile: React.FC = () => {
  const fullName = getStore('fullName')
  const email = getStore('email')
  return (
    <>
      <div className='flex flex-col items-center'>
        <Avatar src={IMAGES.avatar} shape='square' size={90} />
        <h3 className='mt-6 text-xl font-bold text-blue-950'>{fullName}</h3>
        <p className='mb-5 text-sm font-normal text-stone-500'>{email}</p>
        <Button>My Profile</Button>
      </div>
    </>
  )
}

export default Profile
