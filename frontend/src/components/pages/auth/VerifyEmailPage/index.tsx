import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Verification from '~/components/organisms/Verification'

const VerifyEmailPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      navigate('/')
    }
  }, [])

  return (
    <div className='flex h-full flex-col items-center justify-center p-5'>
      <Verification email={location.state.email} next={() => navigate('/login')} />
    </div>
  )
}

export default VerifyEmailPage
