import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '~/components/atoms'
import { DispatchType, RootState } from '~/redux/config'
import { updateEmailAction, verifyAction } from '~/redux/reducers/auth.reducers'

const SendOTP = React.lazy(() => import('~/components/organisms/SendOTP'))
const Verification = React.lazy(() => import('~/components/organisms/Verification'))
const NewPassword = React.lazy(() => import('~/components/organisms/NewPassword'))

/**
 * ForgotPassword Component
 * This component handles the Forgot Password flow.
 */
const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate() // Initialize useNavigate hook
  const { stepVerify, email } = useSelector((state: RootState) => state.auth) // Initialize state from Redux
  const dispatch: DispatchType = useDispatch() // Initialize useDispatch hook

  /**
   * handleEmailChange Function
   * This function dispatches the updateEmailAction to update the email in the state.
   * @param email {string} - The user's email address.
   */
  const handleEmailChange = (email: string) => {
    dispatch(updateEmailAction(email))
  }

  /**
   * handleNext Function
   * This function dispatches the verifyAction to move to the next step in the Forgot Password flow.
   */
  const handleNext = () => {
    dispatch(verifyAction(stepVerify + 1))
  }

  /**
   * steps Array
   * This array contains objects with title and content properties that define the steps in the Forgot Password flow.
   */
  const steps = [
    {
      title: 'Send OTP',
      content: <SendOTP saveMail={handleEmailChange} next={handleNext} />
    },
    {
      title: 'Verification',
      content: <Verification email={email} next={handleNext} />
    },
    {
      title: 'New Password',
      content: <NewPassword email={email} />
    }
  ]

  return (
    <div className='flex h-screen w-screen items-center justify-center px-5'>
      <Button onClick={() => navigate('/register')} variant={'secondary'} className='fixed right-8 top-14'>
        Create Account
      </Button>
      <div className=''>
        <div>{steps[stepVerify].content}</div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
