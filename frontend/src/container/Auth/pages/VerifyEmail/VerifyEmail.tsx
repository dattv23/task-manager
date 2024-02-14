import React, { useEffect } from 'react'
import { Verification } from '../../components'
import { VerificationField } from '~/@types/form.type'
import { useResendOTPMutation, useVerifyOTPMutation } from '~/apis/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorValidation } from '~/@types/api.type'
import { useToasts } from '~/hooks/useToasts'
import { Button } from '~/components'

const VerifyEmail: React.FC = () => {
  const location = useLocation()
  const [verifyOTP] = useVerifyOTPMutation()
  const [resendOTP] = useResendOTPMutation()
  const navigate = useNavigate()
  const { addToast } = useToasts()

  useEffect(() => {
    if (!location.state) {
      navigate('/')
    }
  }, [])

  const handleResendOTP = async () => {
    const email = location.state.email
    const res = await resendOTP({ email })
    if ('data' in res) {
      addToast({
        title: 'Resend OTP',
        message: `OTP has been send to address ${email}!`,
        type: 'success',
        progress: true,
        timeOut: 5
      })
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

  const onFinish = async (values: VerificationField) => {
    const email = location.state.email
    const result: string = Object.entries(values)
      .map((entry) => entry[1]) // Extracting values
      .join('')

    const res = await verifyOTP({ email: email, code: result })
    if ('data' in res) {
      addToast({
        title: 'Verify OTP',
        message: 'Verify OTP successfully!',
        type: 'success',
        progress: true,
        timeOut: 5
      })
      navigate('/login')
    }
    if ('error' in res) {
      if ('status' in res.error && 'data' in res.error) {
        const status = res.error.status
        if (status === 422 && 'errors' in res.error.data) {
          const errors = res.error.data.errors as ErrorValidation[]
          errors.map((err) =>
            addToast({
              title: 'Verify OTP failed',
              message: err.message,
              type: 'error',
              progress: true,
              timeOut: 5
            })
          )
        } else {
          addToast({
            title: 'Verify OTP failed',
            message: res.error.data.message,
            type: 'error',
            progress: true,
            timeOut: 5
          })
        }
      } else {
        addToast({
          title: 'Verify OTP failed',
          message: 'Please try again later!',
          type: 'error',
          progress: true,
          timeOut: 5
        })
      }
    }
  }
  return (
    <div className='flex h-full flex-col items-center justify-center p-5'>
      <Verification onFinish={onFinish} />
      <Button variant={'tertiary'} className='-mt-8' onClick={handleResendOTP}>
        Resend OTP
      </Button>
    </div>
  )
}

export default VerifyEmail
