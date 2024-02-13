import React from 'react'
import { Button } from '~/components'
import { useAuth } from '~/hooks/useAuth'

const MainDashboard: React.FC = () => {
  const { logoutUser } = useAuth()
  return (
    <div className='flex gap-1'>
      MainDashboard
      <Button onClick={logoutUser}>Log out</Button>
    </div>
  )
}

export default MainDashboard
