import { Form, Input } from 'antd'
import { Button, FormItem } from '~/components'

const Verification: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <>
      <h3 className=' mb-3 text-2xl font-semibold text-black'>Verification Email</h3>
      <p className='mb-10 text-sm font-normal text-stone-500'>
        Please enter the One-Time Password (OTP) sent to your registered email address to complete the verification
        process.
      </p>
      <Form name='basic' onFinish={onFinish}>
        <div className='flex'>
          {['1', '2', '3', '4', '5', '6'].map((item, id) => (
            <FormItem name={item} key={id}>
              <Input type='number' className='mr-4 h-14 w-14 rounded-md text-center text-xl' />
            </FormItem>
          ))}
        </div>
        <Form.Item>
          <Button type='submit' className='my-3 w-[204px]'>
            Recover Account.
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Verification
