import { Form, Input } from 'antd'
import { Button, FormItem } from '~/components'

const NewPassword: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }
  return (
    <>
      <h3 className=' mb-3 text-2xl font-semibold text-black'>Enter New Password</h3>
      <p className='mb-10 text-sm font-normal text-stone-500'>
        Your account has been recovered. Enter your new password to gain full control of your account.
      </p>
      <Form name='basic' onFinish={onFinish}>
        <FormItem
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
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
