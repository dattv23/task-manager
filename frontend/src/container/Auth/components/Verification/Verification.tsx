import { Form, Input } from 'antd'
import { VerificationField } from '~/@types/form.type'
import { Button, FormItem } from '~/components'

type VerificationProps = {
  onFinish: (values: VerificationField) => void
}

const Verification: React.FC<VerificationProps> = ({ onFinish }) => {
  return (
    <>
      <h3 className='mb-3 text-2xl font-semibold text-black'>Verification Email</h3>
      <p className='mb-10 text-sm font-normal text-stone-500'>
        Please enter the OTP sent to your registered email address to complete the verification process.
      </p>
      <Form name='basic' onFinish={onFinish}>
        <div className='flex'>
          {['1', '2', '3', '4', '5', '6'].map((item, id) => (
            <FormItem name={item} key={id}>
              <Input
                minLength={1}
                maxLength={1}
                type='number'
                className='mr-2 h-12 w-10 rounded-md text-center text-xl lg:mr-4 lg:h-14 lg:w-14'
              />
            </FormItem>
          ))}
        </div>
        <Form.Item className='flex justify-center'>
          <Button type='submit' className='my-3 w-full lg:w-[204px]'>
            Recover Account.
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Verification
