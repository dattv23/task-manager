import { Avatar, GetProp, Modal, Upload, UploadProps, message } from 'antd'
import React, { useState } from 'react'
import { IMAGES } from '~/assets/images'
import { getStore } from '~/utils'
import Button from '../Button'
import './style.scss'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const Profile: React.FC = () => {
  const fullName = getStore('fullName')
  const email = getStore('email')
  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setConfirmLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setConfirmLoading(false)
        setImageUrl(url)
      })
    }
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <button onClick={showModal}>
          <Avatar src={IMAGES.avatar} shape='square' size={90} />
        </button>
        <h3 className='mt-6 text-xl font-bold text-blue-950'>{fullName}</h3>
        <p className='mb-5 text-sm font-normal text-stone-500'>{email}</p>
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
          <Button className='w-full' onClick={handleOk}>
            {!confirmLoading ? 'Upload file' : 'Uploading'}
          </Button>
        }
      >
        <div className='relative h-[380px]'>
          {imageUrl ? (
            <img src={imageUrl} alt='avatar' className='h-[380px] w-full rounded-2xl' />
          ) : (
            <div className='absolute bottom-0 left-0 right-0 top-0 mt-8 flex flex-col items-center justify-center rounded-2xl bg-black'>
              <img src={IMAGES.profile} className='h-[200px]' />
            </div>
          )}
          <Upload
            action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
            beforeUpload={beforeUpload}
            onChange={handleChange}
            name='avatar'
            className='absolute bottom-6 w-full text-center'
            showUploadList={false}
          >
            <button className='rounded-xl bg-gray-500 p-3  text-base text-white'>Tap to select picture</button>
          </Upload>
        </div>
      </Modal>
    </>
  )
}

export default Profile
