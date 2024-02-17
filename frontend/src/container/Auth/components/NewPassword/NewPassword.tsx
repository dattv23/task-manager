import { Form } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NewPasswordField } from '~/@types/form.type'
import { useResetPasswordMutation } from '~/apis/api'
import { Button, FormItem } from '~/components'
import { useToasts } from '~/hooks/useToasts'
import { verifyAction } from '~/redux/reducers/auth.reducers'
import { passwordRegex } from '~/utils/regex'

type NewPasswordProps = {
  email: string
}

const NewPassword: React.FC<NewPasswordProps> = ({ email }) => {
  const navigate = useNavigate()
  const [resetPassword] = useResetPasswordMutation()
  const { addToast } = useToasts()
  const dispatch = useDispatch()

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
      addToast({
        title: 'Error',
        message: 'Please try again later!',
        type: 'error'
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
            { required: true, message: 'Please input your password!' },
            {
              pattern: passwordRegex,
              message: 'Over 8 characters and under 16 characters with an Uppercase, symbol and number!'
            }
          ]}
          type='password'
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
