import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppstoreOutlined, ScheduleOutlined, SettingOutlined } from '@ant-design/icons'

import { cn } from '~/utils'

const items = [
  { icon: <AppstoreOutlined />, title: 'Overview', path: '/dashboard' },
  {
    icon: <ScheduleOutlined />,
    title: 'Tasks',
    path: '/tasks'
  },
  { icon: <SettingOutlined />, title: 'Settings', path: '/settings' }
]

const Navbar: React.FC = memo(() => {
  const location = useLocation()

  return (
    <ul>
      {items.map((item, id) => (
        <li key={id} className='my-4 flex items-center'>
          <Link to={item.path} className='flex h-8 text-xl text-primary items-center'>
            <span className='w-8'>{item.icon}</span>
            <p
              className={cn(
                'font-popins text-base text-stone-500 hover:text-primary',
                location.pathname.includes(item.path) && 'font-bold text-primary'
              )}
            >
              {item.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
})

export default Navbar
