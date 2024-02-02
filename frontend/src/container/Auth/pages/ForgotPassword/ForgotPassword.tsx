import { Form, Input, Steps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { NewPassword, SendOTP, Verification } from '../../components'
import { Button, FormItem } from '~/components'
import { useState } from 'react'

const steps = [
  {
    title: 'Send OTP',
    content: <SendOTP />
  },
  {
    title: 'Verification',
    content: <Verification />
  },
  {
    title: 'New Password',
    content: <NewPassword />
  }
]

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  return (
    <div className='flex h-screen w-screen items-center justify-center px-5'>
      <Button onClick={() => navigate('/register')} variant={'secondary'} className='fixed right-8 top-14'>
        Create Account
      </Button>
      <div className='w-96'>
        <div>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button variant='primary' onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button variant='primary' onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
