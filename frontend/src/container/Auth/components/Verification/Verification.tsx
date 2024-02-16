import { Form, Input } from 'antd'
import { VerificationField } from '~/@types/form.type'
import { useResendOTPMutation, useVerifyOTPMutation } from '~/apis/api'
import { Button, FormItem } from '~/components'
import { useToasts } from '~/hooks/useToasts'
import { clearStore, mergeValues } from '~/utils'
import { Statistic } from 'antd'
import { useEffect, useState } from 'react'
const { Countdown } = Statistic

type VerificationProps = {
  email: string
  next: () => void
}

const Verification: React.FC<VerificationProps> = ({ email, next }) => {
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation()
  const [resendOTP] = useResendOTPMutation()
  const { addToast } = useToasts()
  const [deadline, setDeadline] = useState<number>(Date.now() + 1000 * 60 * 5)

  useEffect(() => {}, [])

  const handleSubmit = async (values: VerificationField) => {
    const code = mergeValues(values)
    const res = await verifyOTP({ email, code })
    if ('data' in res) {
      clearStore('remainingTime')
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
  const handleResendOTP = async () => {
    const res = await resendOTP({ email })
    if ('data' in res) {
      addToast({
        title: 'Resend OTP',
        message: `OTP has been send to address ${email}!`,
        type: 'success',
        progress: true,
        timeOut: 5
      })
      setDeadline(Date.now() + 1000 * 60 * 5)
    }
    if ('error' in res) {
      addToast({
        title: 'Resend OTP failed',
        message: 'Please try again later!',
        type: 'error',
        progress: true,
        timeOut: 5
      })
    }
  }

  return (
    <div className='text-center'>
      <h3 className='mb-3 text-2xl font-semibold text-black'>Verification Email</h3>
      <p className='mb-2 text-sm font-normal text-stone-500'>
        Please enter the OTP sent to your registered email address to complete the verification process.
      </p>
      <div className='mb-4 text-center'>
        <Countdown value={deadline} format='mm:ss' />
      </div>
      <Form name='basic' onFinish={handleSubmit}>
        <div className='flex justify-between'>
          {['1', '2', '3', '4', '5', '6'].map((item, id) => (
            <FormItem name={item} key={id}>
              <Input
                type='text'
                className='mr-2 h-12 w-10 rounded-md text-center text-xl lg:mr-4 lg:h-14 lg:w-14'
                autoComplete='one-time-code'
                inputMode='numeric'
                pattern='\d{1}'
                maxLength={1}
              />
            </FormItem>
          ))}
        </div>
        <Form.Item className='flex justify-center'>
          <Button type='submit' className='my-3 w-full lg:w-[204px]'>
            {isLoading ? 'Verifying...' : 'Recover Account.'}
          </Button>
        </Form.Item>
      </Form>
      <Button variant={'tertiary'} className='-mt-8' onClick={handleResendOTP}>
        Resend OTP
      </Button>
    </div>
  )
}

export default Verification
