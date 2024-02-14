import { Form } from 'antd'
import { ResendOTPField } from '~/@types/form.type'
import { useResendOTPMutation } from '~/apis/api'
import { Button, FormItem } from '~/components'
import { useToasts } from '~/hooks/useToasts'
import { emailRegex } from '~/utils/regex'

type SendOTPProps = {
  saveMail: (email: string) => void
  next: () => void
}

const SendOTP: React.FC<SendOTPProps> = ({ saveMail, next }) => {
  const [resendOTP, { isLoading }] = useResendOTPMutation()
  const { addToast } = useToasts()

  const handleSubmit = async (values: ResendOTPField) => {
    const { email } = values
    const res = await resendOTP({ email })
    if ('data' in res) {
      saveMail(email)
      next()
    }
    if ('error' in res) {
      if ('status' in res.error) {
        if (res.error.status === 404 && 'data' in res.error) {
          addToast({
            title: 'Warning',
            message: res.error.data.message,
            type: 'warning'
          })
        }
      } else {
        addToast({
          title: 'Error',
          message: 'Please try again later!',
          type: 'error'
        })
      }
    }
  }

  return (
    <>
      <h3 className=' mb-3 text-2xl font-semibold text-black'>Forgot Password?</h3>
      <p className='mb-10 text-sm font-normal text-stone-500'>
        We are sorry to hear that happen. Don’t be sad we could help you get back to productivity in no time.
      </p>
      <Form name='basic' onFinish={handleSubmit}>
        <FormItem
          label='Email Address'
          name='email'
          rules={[
            { required: true, message: 'Please input your email address!' },
            { pattern: emailRegex, message: 'Email not valid!' }
          ]}
        />
        <Form.Item>
          <Button type='submit' className='my-3 w-[204px]'>
            {isLoading ? 'Loading...' : 'Next'}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SendOTP
