import { Form } from 'antd'
import Button from '~/components/Button'
import FormItem from '~/components/FormItem'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation, useResendOTPMutation } from '~/apis/api'
import { getStore } from '~/utils'
import { useEffect } from 'react'
import { useAuth } from '~/hooks/useAuth'
import { ErrorValidation, LoginResult } from '~/@types/api.type'
import { emailRegex, passwordRegex } from '~/utils/regex'
import { useToasts } from '~/hooks/useToasts'
import { LoginField } from '~/@types/form.type'

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [resendOTP] = useResendOTPMutation()
  const email = getStore('email')
  const fullName = getStore('fullName')
  const { isAuthenticated, loginUser } = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToasts()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [])

  const onFinish = async (values: LoginField) => {
    const { password } = values
    const emailUser = email ? email : values.email
    const res = await login({ email: emailUser, password })
    if ('data' in res) {
      const data = res.data.data as LoginResult
      loginUser(data)
      navigate('/dashboard')
    }
    if ('error' in res) {
      if ('status' in res.error && 'data' in res.error) {
        const status = res.error.status
        if (status === 422 && 'errors' in res.error.data) {
          const errors = res.error.data.errors as ErrorValidation[]
          errors.map((err) =>
            addToast({
              title: 'Login failed',
              message: err.message,
              type: 'error',
              progress: true,
              timeOut: 5
            })
          )
        } else {
          addToast({
            title: 'Login failed',
            message: res.error.data.message,
            type: 'error',
            progress: true,
            timeOut: 3
          })
          if (status === 401) {
            const res = await resendOTP({ email: emailUser })
            if ('data' in res) {
              addToast({
                title: 'Resend OTP',
                message: `OTP has been send to address ${emailUser}!`,
                type: 'success',
                progress: true,
                timeOut: 5
              })
              navigate('/verify-email', { state: { email: emailUser } })
            }
          }
        }
      } else {
        addToast({
          title: 'Login failed',
          message: 'Please try again later!',
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
        <div className='z-10 flex h-full w-full flex-col items-center justify-center bg-white  xl:w-1/2'>
          <div className='w-full lg:px-8 xl:px-40'>
            {!email || isAuthenticated ? (
              <h3 className='mb-8 text-left text-[32px] font-bold text-black'>Welcome Back.</h3>
            ) : (
              <div>
                <h3 className='mb-1 text-left text-[32px] font-normal text-black'>Welcome Back</h3>
                <p className='mb-4 text-3xl font-bold text-black'>{fullName}!</p>
              </div>
            )}
            <Form name='basic' onFinish={onFinish}>
              {!email || isAuthenticated ? (
                <FormItem
                  name='email'
                  label='Email Address'
                  placeholder='johndoe@gmail.com'
                  rules={[
                    { required: true, message: 'Please input your email address!' },
                    { pattern: emailRegex, message: 'Email not valid!' }
                  ]}
                />
              ) : null}

              <FormItem
                name='password'
                label='Enter Your Password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    pattern: passwordRegex,
                    message: 'Over 8 characters and under 16 characters with an Uppercase, symbol and number!'
                  }
                ]}
                type='password'
              />

              <Form.Item>
                <Button type='submit' className='my-3 w-full lg:w-[204px]'>
                  {isLoading ? 'Loading...' : 'Log In'}
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
          <Button variant={'secondary'} className='absolute right-8 top-8' onClick={() => navigate('/register')}>
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
    </>
  )
}

export default Login
