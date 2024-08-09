import { Alert, Form, Input, Spin } from 'antd'
import Button from '~/components/atoms/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation, useResendOTPMutation } from '~/apis/api'
import { getStore } from '~/utils'
import { useState } from 'react'
import { useAuth } from '~/hooks/useAuth'
import { LoginResult } from '~/@types/api.type'
import { emailRegex, passwordRegex } from '~/utils/regex'
import { useToasts } from '~/hooks/useToasts'
import { LoginField } from '~/@types/form.type'
import { handleAPIError } from '~/utils/handleAPIError'
import { FormItem } from '~/components'
import { DOMAIN_API, EMAIL, FULL_NAME } from '~/constants'
import { GoogleOutlined } from '@ant-design/icons'

const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [resendOTP] = useResendOTPMutation()
  const fullName = getStore(FULL_NAME)
  const email = getStore(EMAIL)
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToasts()
  const [isOtherAccount, setIsOtherAccount] = useState<boolean>(false)

  const onSubmitLogin = async (values: LoginField) => {
    const { password } = values
    const emailUser = values.email ? values.email : email!
    const res = await login({ email: emailUser, password })

    if ('data' in res) {
      const data = res.data as LoginResult
      loginUser(data)
      navigate('/dashboard')
    }
    if ('error' in res) {
      const { message, status } = handleAPIError(res.error)
      addToast({ title: 'Login failed', message, type: 'error', progress: true, timeOut: 5 })
      if (status === 403) {
        const response = await resendOTP({ email: emailUser })
        if ('data' in response) {
          addToast({
            title: 'Resend OTP',
            message: `OTP has been send to address ${emailUser}!`,
            type: 'success',
            progress: true,
            timeOut: 5
          })
          navigate('/verify-email', { state: { email: emailUser } })
        }
        return
      }
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      window.location.href = `${DOMAIN_API}/api/auth/google`
    } catch (error) {
      console.error('Error during login with Google:', error)
      addToast({
        title: 'Login with Google failed',
        message: 'Could not initiate login with Google. Please try again.',
        type: 'error',
        progress: true,
        timeOut: 5
      })
    }
  }

  return (
    <>
      <div className='flex h-screen p-5'>
        <div className='z-10 flex h-full w-full flex-col items-center justify-center bg-white  xl:w-1/2'>
          <div className='w-full lg:px-8 xl:px-40'>
            {!email || isOtherAccount ? (
              <h3 className='mb-8 text-left text-[32px] font-bold text-black'>Welcome Back.</h3>
            ) : (
              <div>
                <h3 className='mb-1 text-left text-[32px] font-normal text-black'>Welcome Back</h3>
                <p className='mb-4 text-3xl font-bold text-black'>{fullName}!</p>
              </div>
            )}
            <Form name='basic' onFinish={onSubmitLogin}>
              {!email || isOtherAccount ? (
                <FormItem
                  name='email'
                  label='Email Address'
                  placeholder='johndoe@gmail.com'
                  rules={[
                    {
                      pattern: emailRegex,
                      message: (
                        <Alert
                          className='bg-transparent text-base text-red-700'
                          message='Email not valid!'
                          banner
                          type='error'
                        />
                      )
                    }
                  ]}
                />
              ) : null}
              <FormItem
                name='password'
                label='Enter Your Password'
                rules={[
                  {
                    pattern: passwordRegex,
                    message: (
                      <Alert
                        className='bg-transparent text-base text-red-700'
                        message='Over 8 characters and under 36 characters with an Uppercase, symbol and number!'
                        banner
                        type='error'
                      />
                    )
                  }
                ]}
              >
                <Input.Password
                  placeholder='johnDoe@123'
                  className='h-12 w-full border-[2px] border-primary border-opacity-80 py-2 text-base font-normal focus:border-opacity-100'
                  classNames={{ input: 'text-md font-normal font-popins' }}
                />
              </FormItem>
              <Form.Item className='mb-0'>
                <Button type='submit' className='w-full' onSubmit={(e) => e.preventDefault()}>
                  {isLoading ? <Spin size='large' /> : 'Log In'}
                </Button>
              </Form.Item>
            </Form>
            <div className='my-2 flex w-full items-center justify-center'>
              <hr className='h-2 w-full' />
              <span className='mx-2'>Or</span>
              <hr className='h-2 w-full' />
            </div>
            <Button
              variant={'secondary'}
              className='mb-2 w-full border-orange-500 text-orange-500'
              onClick={handleLoginWithGoogle}
            >
              Login with Google <GoogleOutlined className='mx-2 text-orange-500' />
            </Button>
            <div className='flex w-full items-center justify-between'>
              <Link
                to='/forgot-password'
                className='flex w-[200px] items-center text-left text-lg font-semibold text-blue-700 hover:opacity-80'
              >
                Forgot Password?
              </Link>
              <div className='h-8 border-[2px] border-l'></div>
              <Button
                variant={'tertiary'}
                className='w-[200px] text-left text-lg text-secondary'
                onClick={() => setIsOtherAccount(true)}
              >
                Other Account?
              </Button>
            </div>
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

export default LoginPage
