import { Form, Input } from 'antd'
import { useState } from 'react'
import Button from '~/components/Button'
import Toast from '~/components/Toast'
import './style.scss'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Register: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false)
  return (
    <>
      <div className='register flex h-screen p-5'>
        <div className='w-0 bg-black xl:w-1/2'></div>
        <div className='flex h-full w-full flex-col  p-5 xl:w-1/2'>
          <div className='mb-[135px] flex justify-end'>
            <Button variant={'secondary'}>Log in</Button>
          </div>
          <div className='px-10 lg:px-[126px]'>
            <h3 className='text-[32px] font-bold text-black'>Create an Account</h3>
            <p className='mb-12 text-base font-normal text-gray-500'>It's Simple and Easy!!</p>
            <Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item
                label='Fullname'
                name='fullname'
                rules={[{ required: true, message: 'Please input your full name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Email Address'
                name='email'
                rules={[{ required: true, message: 'Please input your email address!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type='submit' className='w-full' onClick={() => setToastOpen(true)}>
                  Submit
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
