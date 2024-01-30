import { Form } from 'antd'
import { useState } from 'react'
import Button from '~/components/Button'
import Toast from '~/components/Toast'
import FormItem from '~/components/FormItem'
import { Link } from 'react-router-dom'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Login: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  return (
    <>
      <div className='flex h-screen p-5'>
        <div className='z-10 flex h-full w-full flex-col items-center justify-center bg-white  xl:w-1/2'>
          <div className='w-full lg:px-8 xl:px-40'>
            {!isLogin ? (
              <h3 className='mb-8 text-left text-[32px] font-bold text-black'>Welcome Back.</h3>
            ) : (
              <div>
                <h3 className='mb-1 text-left text-[32px] font-normal text-black'>Welcome Back</h3>
                <p className='mb-4 text-3xl font-bold text-black'>Mano!</p>
              </div>
            )}
            <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed}>
              {!isLogin && (
                <FormItem
                  name='email'
                  label='Email Address'
                  placeholder='johndoe@gmail.com'
                  rules={[{ required: true, message: 'Please input your email address!' }]}
                />
              )}

              <FormItem
                name='password'
                label='Enter Your Password'
                rules={[{ required: true, message: 'Please input your password!' }]}
                type='password'
              />

              <Form.Item>
                <Button type='submit' className='my-3 w-[204px]' onClick={() => setToastOpen(true)}>
                  Log In
                </Button>
              </Form.Item>
            </Form>
            <Link
              to='/forgot-password'
              className='w-full text-left text-lg font-semibold text-blue-700 hover:opacity-80'
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className='relative hidden flex-col items-center justify-center rounded-[32px] bg-primary px-[100px] lg:flex xl:w-1/2'>
          <Button variant={'secondary'} className='absolute right-8 top-8 w-fit'>
            Create Account
          </Button>
          <div className='z-10 w-full'>
            <h2 className='z-10 mb-32 text-right text-[56px] font-semibold leading-[66px] text-white'>
              Take your productivity to the next level.
            </h2>
            <div className='relative float-right flex w-[384px] gap-4 rounded-2xl border p-4'>
              <p className='absolute -top-3 bg-primary px-2 text-white'>Get the Mobile App</p>
              <Button className='bg-secondary p-4 text-xs font-medium text-primary'>Download on Apple</Button>
              <Button className=' bg-white p-4 text-xs font-medium text-primary'>Download on Android</Button>
            </div>
          </div>
          <div className='absolute right-3/4 z-0 h-[460px] w-[460px] overflow-hidden rounded-full border-[72px] border-[#FBBE37]'></div>
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

export default Login
