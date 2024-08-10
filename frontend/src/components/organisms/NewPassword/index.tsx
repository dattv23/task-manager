import { useDispatch } from 'react-redux'
import { Alert, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/atoms'
import { FormItem } from '~/components/molecules'
import { useToasts } from '~/hooks'
import { verifyAction } from '~/redux/reducers/auth.reducers'
import { handleAPIError } from '~/utils/handleAPIError'
import { passwordRegex } from '~/utils/regex'
import { useResetPasswordMutation } from '~/apis'
import { NewPasswordField } from '~/@types'

type NewPasswordProps = {
  email: string
}

const NewPassword: React.FC<NewPasswordProps> = ({ email }) => {
  const navigate = useNavigate()
  const [resetPassword] = useResetPasswordMutation()
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  // Function to handle form submission
  const handleSubmit = async (values: NewPasswordField) => {
    const { password } = values
    const res = await resetPassword({ email, password })
    if ('data' in res) {
      addToast({
        title: 'Success',
        message: 'Create new password successfully!',
        type: 'success',
        progress: true,
        timeOut: 5
      })
      dispatch(verifyAction(0))
      navigate('/login')
    }
    if ('error' in res) {
      const { message } = handleAPIError(res.error)
      addToast({
        title: 'Create new password failed!',
        message: message,
        type: 'error',
        progress: true,
        timeOut: 5
      })
    }
  }
  return (
    <>
      <h3 className=' mb-3 text-2xl font-semibold text-black'>Enter New Password</h3>
      <p className='mb-10 text-sm font-normal text-stone-500'>
        Your account has been recovered. Enter your new password to gain full control of your account.
      </p>
      <Form name='basic' onFinish={handleSubmit}>
        <FormItem
          label='Password'
          name='password'
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
          children={
            <Input.Password
              placeholder='johnDoe@123'
              className='h-12 w-full border-[2px] border-primary border-opacity-80 py-2 text-base font-normal focus:border-opacity-100'
              classNames={{ input: 'text-md font-normal font-popins' }}
            />
          }
        />
        <Form.Item>
          <Button type='submit' className='my-3 w-[204px]'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default NewPassword
