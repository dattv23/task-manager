import { CountdownProps } from 'antd'
import { useResendOTPMutation, useVerifyOTPMutation } from '~/apis/api'
import { Button } from '~/components'
import { useToasts } from '~/hooks/useToasts'
import { clearStore, getStore, setStore } from '~/utils'
import { Statistic } from 'antd'
import { ChangeEvent, ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { handleAPIError } from '~/utils/handleAPIError'
const { Countdown } = Statistic

interface VerificationFormProps {
  email: string
  next: () => void
}

const Verification: React.FC<VerificationFormProps> = ({ email, next }) => {
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation()
  const [resendOTP] = useResendOTPMutation()
  const { addToast } = useToasts()
  const [deadline, setDeadline] = useState<number>(Date.now() + 1000 * 60 * 5) // Setting deadline for OTP verification
  const [disableResendOTP, setDisableResendOTP] = useState<boolean>(false) // Setting whether to disable OTP resending
  const [OTP, setOTP] = useState<string[]>(Array(6).fill('')) // Setting OTP as an array of 6 empty strings
  const inputRef = useRef<HTMLInputElement[]>(Array(6).fill(null)) // Creating a ref for input elements

  // Initial effect to set deadline based on remaining time from the store
  useEffect(() => {
    const remainingTime = getStore('remainingTime')
    if (remainingTime) {
      setDeadline(Date.now() + parseInt(remainingTime))
    } else {
      setDeadline(Date.now() + 1000 * 60 * 5)
    }
  }, [])

  // Function to handle OTP verification
  const handleSendOTP = async () => {
    setDisableResendOTP(true)
    const code = OTP.join('')
    const res = await verifyOTP({ email, code })
    if ('data' in res) {
      addToast({
        title: 'Verification successful',
        message: 'Please login again!',
        type: 'success',
        progress: true,
        timeOut: 5
      })
      clearStore('remainingTime')
      next()
    }
    if ('error' in res) {
      const { message } = handleAPIError(res.error)
      addToast({ title: 'Verify email failed', message, type: 'error', progress: true, timeOut: 5 })
    }
    setDisableResendOTP(false)
  }

  // Function to handle OTP resending
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

  // Event handler for Countdown component's onChange event
  const onChange: CountdownProps['onChange'] = (val) => {
    if (typeof val === 'number') {
      setStore('remainingTime', val)
    }
  }

  // Handling text change in the input fields const
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const input = event.target.value
    if (isNaN(parseInt(input, 10))) {
      event.target.value = ''
    } else {
      const newOTP = [...OTP]
      newOTP[index] = input
      setOTP(newOTP)
      if (index + 1 < newOTP.length) {
        inputRef.current[index + 1].focus()
      }
    }
  }

  // Handling keyboard events for the input fields const
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = event
    if (key === 'Backspace') {
      if (OTP[index].length === 1) {
        const newOTP = [...OTP]
        newOTP[index] = ''
        setOTP(newOTP)
      } else {
        if (index > 0) {
          inputRef.current[index - 1].focus()
        }
      }
    }
  }

  // Handling paste events for the input fields
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const paste = event.clipboardData.getData('text')
    if (paste.match(/^\d{6}$/)) {
      const newOTP = paste.split('').map((digit) => digit.padStart(1, '0'))
      setOTP(newOTP)
    }
  }

  return (
    <div className='text-center'>
      <h3 className='mb-3 text-2xl font-semibold text-black'>Verification Email</h3>
      <p className='mb-2 text-sm font-normal text-stone-500'>
        Please enter the OTP sent to your registered email address to complete the verification process.
      </p>
      <div className='mb-4 text-center'>
        <Countdown value={deadline} format='mm:ss' onChange={onChange} />
      </div>
      <div className='flex justify-between'>
        {OTP.map((number, id) => (
          <input
            key={id}
            ref={(ref) => (inputRef.current[id] = ref as HTMLInputElement)}
            type='text'
            className='mr-2 h-12 w-10 rounded-md border text-center text-xl lg:mr-4 lg:h-24 lg:w-24 lg:text-4xl'
            autoComplete='one-time-code'
            inputMode='numeric'
            pattern='\d{1}'
            value={number}
            maxLength={1}
            onChange={(event) => handleTextChange(event, id)}
            onKeyDown={(event) => handleKeyDown(event, id)}
            onPaste={(event) => handlePaste(event)}
          />
        ))}
      </div>
      <Button onClick={handleSendOTP} className='my-3 w-full'>
        {isLoading ? 'Verifying...' : 'Recover Account.'}
      </Button>
      <Button
        variant={'tertiary'}
        state={disableResendOTP ? 'disabled' : 'default'}
        className='-mt-8'
        onClick={handleResendOTP}
        disabled={disableResendOTP}
      >
        Resend OTP
      </Button>
    </div>
  )
}

export default Verification
