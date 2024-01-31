import { Form } from 'antd'
import { Button, FormItem } from '~/components'

const SendOTP: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }
  return (
    <>
      <h3 className=' mb-3 text-2xl font-semibold text-black'>Forgot Password?</h3>
      <p className='mb-10 text-sm font-normal text-stone-500'>
        We are sorry to hear that happen. Don’t be sad we could help you get back to productivity in no time.
      </p>
      <Form name='basic' onFinish={onFinish}>
        <FormItem label='Email Address' name='email' />
        <Form.Item>
          <Button type='submit' className='my-3 w-[204px]'>
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SendOTP
