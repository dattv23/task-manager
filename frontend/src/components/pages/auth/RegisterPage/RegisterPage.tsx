import React from 'react'
import { Alert, Form, Input } from 'antd'
import Button from '~/components/atoms/Button'
import { useNavigate } from 'react-router-dom'
import { passwordRegex } from '~/utils/regex'
import { InputProps, RegisterField } from '~/@types/form.type'
import { useRegisterMutation } from '~/apis/auth.api'
import { useToasts } from '~/hooks/useToasts'
import { RegisterResult } from '~/@types/api.type'
import { setStore } from '~/utils'
import { handleAPIError } from '~/utils/handleAPIError'
import { FormItem } from '~/components'

const RegisterPage: React.FC = () => {
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
      const { message } = handleAPIError(res.error)
      addToast({ title: 'Register Failed', message, type: 'error', progress: true, timeOut: 5 })
    }
  }

  const formRegisterInputs: InputProps[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      placeholder: 'John Doe',
      rules: [
        {
          min: 6,
          max: 30,
          message: (
            <Alert
              className='bg-transparent text-base text-red-700'
              message='Full name must be length from 6 to 30 characters.'
              banner
              type='error'
            />
          )
        }
      ]
    },
    {
      name: 'email',
      label: 'Email Address',
      placeholder: 'johndoe@example.com',
      rules: [
        {
          type: 'email',
          message: (
            <Alert className='bg-transparent text-base text-red-700' message='Email not valid!' banner type='error' />
          )
        }
      ]
    },
    {
      name: 'password',
      label: 'Password',
      rules: [
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
      ],
      children: (
        <Input.Password
          placeholder='johnDoe@123'
          className='h-12 w-full border-[2px] border-primary border-opacity-80 py-2 text-base font-normal focus:border-opacity-100'
          classNames={{ input: 'text-md font-normal font-popins' }}
        />
      )
    }
  ]

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 overflow-y-auto'>
      <div className='flex min-h-screen overflow-y-auto p-5'>
        <div className='relative hidden rounded-[32px] bg-primary lg:flex lg:items-center lg:justify-center lg:px-[100px] xl:w-1/2'>
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
        <div className='z-10 flex w-full items-center justify-center bg-white xl:w-1/2'>
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
              {formRegisterInputs.map((item, index) => (
                <FormItem
                  key={index}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  required={item.required}
                  rules={item.rules}
                  children={item.children}
                />
              ))}
              <Form.Item>
                <Button type='submit' className='mt-6 w-full lg:mt-12'>
                  {isLoading ? 'Creating...' : 'Create Account'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
