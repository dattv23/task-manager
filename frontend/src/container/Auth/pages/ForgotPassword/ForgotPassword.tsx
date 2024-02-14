import { useNavigate } from 'react-router-dom'
import { NewPassword, SendOTP, Verification } from '../../components'
import { Button } from '~/components'
import { useState } from 'react'

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [email, setEmail] = useState('')

  const saveMail = (email: string) => {
    setEmail(email)
  }

  const next = () => {
    setCurrent(current + 1)
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
        <div>{steps[current].content}</div>
      </div>
    </div>
  )
}

export default ForgotPassword
