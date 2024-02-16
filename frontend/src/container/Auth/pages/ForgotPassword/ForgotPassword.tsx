import { useNavigate } from 'react-router-dom'
import { NewPassword, SendOTP, Verification } from '../../components'
import { Button } from '~/components'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '~/redux/config'
import { updateEmailAction, verifyAction } from '~/redux/reducers/user.reducers'

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const { stepVerify, email } = useSelector((state: RootState) => state.user)
  const dispatch: DispatchType = useDispatch()

  const saveMail = (email: string) => {
    dispatch(updateEmailAction(email))
  }

  const next = () => {
    dispatch(verifyAction(stepVerify + 1))
  }

  const steps = [
    {
      title: 'Send OTP',
      content: <SendOTP saveMail={saveMail} next={next} />
    },
    {
      title: 'Verification',
      content: <Verification email={email} next={next} />
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
      <div className='w-96'>
        <div>{steps[stepVerify].content}</div>
      </div>
    </div>
  )
}

export default ForgotPassword
