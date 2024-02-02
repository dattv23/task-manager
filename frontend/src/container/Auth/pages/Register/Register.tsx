import { Form } from 'antd'
import { useState } from 'react'
import Button from '~/components/Button'
import Toast from '~/components/Toast'
import FormItem from '~/components/FormItem'
import { useNavigate } from 'react-router-dom'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Register: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <div className='flex h-screen p-5'>
        <div className='relative hidden items-center justify-center rounded-[32px] bg-primary lg:flex lg:px-[100px] xl:w-1/2'>
          <div className='z-10 flex-1'>
            <h2 className='z-20 mb-32 w-[454px] text-[56px] font-semibold leading-[66px] text-white'>
              Take your productivity to the next level.
            </h2>
            <div className='relative flex w-[384px] gap-4 rounded-2xl border p-4'>
              <p className='absolute -top-3 bg-primary px-2 text-white'>Get the Mobile App</p>
              <Button className='bg-secondary p-4 text-xs font-medium text-primary'>Download on Apple</Button>
              <Button className=' bg-white p-4 text-xs font-medium text-primary'>Download on Android</Button>
            </div>
          </div>
          <div className='absolute left-3/4 h-[460px] w-[460px] overflow-hidden rounded-full border-[72px] border-[#FBBE37]'></div>
        </div>
        <div className='relative  z-10 flex h-full w-full items-center  justify-center bg-white xl:w-1/2'>
          <Button variant={'secondary'} onClick={() => navigate('/login')} className='absolute right-8 top-8'>
            Log in
          </Button>
          <div className='w-full flex-col items-center justify-end lg:px-8 xl:px-40'>
            <h3 className='text-[32px] font-bold text-black'>Create an Account</h3>
            <p className='text-base font-normal text-gray-500'>It's Simple and Easy!!</p>
            <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <FormItem
                name='fullname'
                label='Full name'
                placeholder='John Smith'
                rules={[{ required: true, message: 'Please input your full name!' }]}
              />

              <FormItem
                name='email'
                label='Email Address'
                placeholder='johndoe@gmail.com'
                rules={[{ required: true, message: 'Please input your email address!' }]}
              />

              <FormItem
                name='password'
                label='Password'
                rules={[{ required: true, message: 'Please input your password!' }]}
                type='password'
              />

              <Form.Item>
                <Button type='submit' className='mt-12 w-full' onClick={() => setToastOpen(true)}>
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Toast
        open={toastOpen}
        title='Notification'
        description='Create account successfully.'
        onClose={() => setToastOpen(false)}
        type={'info'}
        progress={true}
        colorProgress={'#6684FF'}
      />
    </>
  )
}

export default Register
