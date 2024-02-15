import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '~/utils'

const items = [
  { icon: <AppstoreOutlined />, title: 'Overview', path: '/dashboard' },
  {
    icon: <i className='icon ion-md-list-box'></i>,
    title: 'Tasks',
    path: '/tasks'
  },
  { icon: <SettingOutlined />, title: 'Settings', path: '/settings' }
]

const Navbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      {items.map((item, id) => (
        <button key={id} className='my-4 flex items-center justify-center' onClick={() => navigate(item.path)}>
          <div className='flex h-8 w-8 items-center justify-center text-xl text-primary'>{item.icon}</div>
          <p
            className={cn(
              'font-popins text-base text-stone-500 hover:text-primary',
              item.path === location.pathname && 'font-bold text-primary'
            )}
          >
            {item.title}
          </p>
        </button>
      ))}
    </div>
  )
}

export default Navbar
