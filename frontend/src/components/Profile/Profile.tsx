import { Avatar, Modal } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import { IMAGES } from '~/assets/images'
import { cn } from '~/utils'
import Button from '../Button'
import './style.scss'
import { APIErrorResult, usePostAvatarMutation } from '~/apis/api'
import { useToasts } from '~/hooks/useToasts'
import { PostAvatarResult } from '~/@types/api.type'
import { useProfile } from '~/hooks/useProfile'
import { ProfileType } from '~/@types/response.type'

const Profile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File>()
  const { addToast } = useToasts()
  const [postAvatar] = usePostAvatarMutation()
  const { profile, updateProfile } = useProfile()

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    if (!file) {
      return addToast({ title: 'Warning', message: 'Please select file image to upload!', type: 'warning' })
    }
    setConfirmLoading(true)

    const formData = new FormData()
    formData.append('image', file)

    const res = await postAvatar(formData)

    if ('data' in res) {
      const { url } = res.data as PostAvatarResult
      const newProfile: ProfileType = { ...profile, avatar: url }
      updateProfile(newProfile)
      addToast({
        title: 'Success',
        message: 'Upload avatar successfully',
        type: 'success',
        progress: true,
        timeOut: 5
      })
    }
    if ('error' in res) {
      addToast({
        title: 'Upload avatar failed',
        message: 'Please try again later!',
        type: 'error',
        progress: true,
        timeOut: 5
      })
      return
    }
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const selectedFile = event.target.files[0]

    // Checking if the file type is allowed or not
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(selectedFile?.type)) {
      addToast({
        title: 'File type not allowed!',
        message: 'Only JPEG, PNG, and GIF images are allowed.',
        type: 'warning',
        progress: true,
        timeOut: 5
      })
      return
    }

    setFile(selectedFile)
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <button onClick={showModal}>
          {profile?.avatar ? (
            <Avatar src={profile.avatar} shape='square' size={90} key={profile.avatar} />
          ) : (
            <Avatar src={IMAGES.profile} shape='square' size={90} className='bg-black' />
          )}
        </button>
        <h3 className='mt-6 text-xl font-bold text-blue-950'>{profile.fullName}</h3>
        <p className='mb-5 text-sm font-normal text-stone-500'>{profile.email}</p>
        <Button>My Profile</Button>
      </div>
      <Modal
        title='Upload your avatar'
        centered
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={460}
        styles={{ header: { marginTop: '12px' } }}
        footer={
          <Button
            className={cn('w-full', confirmLoading && 'opacity-20 hover:opacity-20')}
            onClick={handleOk}
            disabled={confirmLoading}
          >
            {!confirmLoading ? 'Upload file' : 'Uploading...'}
          </Button>
        }
      >
        <div className='relative h-[380px]'>
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt='avatar'
              className='h-full w-full rounded-2xl object-fill'
              key={profile.avatar}
            />
          ) : (
            <div className='absolute bottom-0 left-0 right-0 top-0 mt-8 flex flex-col items-center justify-center rounded-2xl bg-black'>
              <img src={IMAGES.profile} className='h-[200px]' />
            </div>
          )}
          <div className='absolute bottom-6 h-11 w-full'>
            <input
              type='file'
              id='image'
              className='absolute bottom-0 left-1/2 top-0 -translate-x-1/2 opacity-0'
              onChange={handleFileChange}
            />
            <div className='absolute bottom-0 left-1/2 top-0 -translate-x-1/2 cursor-pointer rounded-xl bg-gray-500 p-3 text-base'>
              <label htmlFor='image' className='cursor-pointer text-white'>
                Tap to select picture
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Profile
