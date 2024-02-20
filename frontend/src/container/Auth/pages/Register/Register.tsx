import { Form } from 'antd'
import Button from '~/components/Button'
import FormItem from '~/components/FormItem'
import { useNavigate } from 'react-router-dom'
import { emailRegex, passwordRegex } from '~/utils/regex'
import { RegisterField } from '~/@types/form.type'
import { APIErrorResult, useRegisterMutation } from '~/apis/api'
import { useToasts } from '~/hooks/useToasts'
import { RegisterResult } from '~/@types/api.type'
import { setStore } from '~/utils'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const { addToast } = useToasts()

  const onFinish = async (values: RegisterField) => {
    const res = await register(values)
    if ('data' in res) {
      const { email, fullName } = res.data as RegisterResult
      setStore('email', email)
      setStore('fullName', fullName)
      navigate('/verify-email', { state: { email: email } })
    }
    if ('error' in res) {
      const { status, data } = res.error as APIErrorResult
      if (!status) {
        addToast({
          title: 'Register failed',
          message: 'Please try again later!',
          type: 'error',
          progress: true,
          timeOut: 5
        })
        return
      }
      if (typeof data === 'string') {
        addToast({
          title: 'Register failed',
          message: data,
          type: 'error',
          progress: true,
          timeOut: 5
        })
      } else {
        addToast({
          title: 'Register failed',
          message: data.message,
          type: 'error',
          progress: true,
          timeOut: 5
        })
      }
    }
  }

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
          <Button
            variant={'secondary'}
            onClick={() => navigate('/login')}
            className='absolute right-8 top-8 hidden sm:block'
          >
            Log in
          </Button>
          <div className='w-full flex-col items-center justify-end lg:px-8 xl:px-40'>
            <h3 className='text-[28px] font-bold text-black lg:text-[32px]'>Create an Account</h3>
            <p className='mb-2 text-base font-normal text-gray-500'>It's Simple and Easy!!</p>
            <Form name='basic' onFinish={onFinish}>
              <FormItem
                name='fullName'
                label='Full name'
                placeholder='John Smith'
                rules={[
                  { required: true, message: 'Please input your full name!' },
                  { min: 6, max: 30, message: 'Full name must be length from 6 to 30 characters.' }
                ]}
              />

              <FormItem
                name='email'
                label='Email Address'
                placeholder='johndoe@gmail.com'
                rules={[
                  { required: true, message: 'Please input your email address!' },
                  { pattern: emailRegex, message: 'Email not valid!' }
                ]}
              />

              <FormItem
                name='password'
                label='Password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    pattern: passwordRegex,
                    message: 'Over 8 characters and under 36 characters with an Uppercase, symbol and number!'
                  }
                ]}
                type='password'
              />

              <Form.Item>
                <Button type='submit' className='mt-6 w-full lg:mt-12'>
                  {isLoading ? 'Creating...' : 'Create Account'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
