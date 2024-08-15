import { LogoutOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '~/assets/images'
import Button from '~/components/atoms/Button'
import Navbar from '~/components/atoms/Navbar'
import { useAuth } from '~/hooks/useAuth'
import { useProfile } from '~/hooks/useProfile'
import { cn } from '~/utils'

type SidebarLeftProps = {
  collapse: boolean
  setCollapse: (val: boolean) => void
}
const SidebarLeft: React.FC<SidebarLeftProps> = ({ collapse, setCollapse }) => {
  const { logoutUser } = useAuth()
  const { profile } = useProfile()
  const navigate = useNavigate()

  const handleClickLogout = () => {
    logoutUser()
    navigate('/login')
  }
  return (
    <aside className='fixed left-0 top-0 z-50 flex min-h-screen'>
      <div className='after:1translate-x-1/2 z-50 w-20 bg-primary px-4 py-24'>
        <div>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-[#FBBE37] text-2xl'>
            {profile?.avatar ? (
              <Avatar shape='square' size={38} src={profile.avatar} key={profile.avatar} />
            ) : (
              <Avatar shape='square' size={38} src={IMAGES.profile} className='bg-black' />
            )}
          </div>
          <Button className='mt-4 h-[38px] w-[38px] rounded-md bg-slate-400 text-white '>
            <PlusOutlined className='text-xl' />
          </Button>
          <Button
            className={cn('mt-4 h-[38px] w-[38px] rounded-md bg-slate-400 text-white lg:hidden')}
            onClick={() => setCollapse(!collapse)}
          >
            <MenuOutlined />
          </Button>
        </div>
        <Button variant={'secondary'} onClick={handleClickLogout} className='fixed bottom-10 w-[38px]'>
          <LogoutOutlined />
        </Button>
      </div>
      <nav
        className={cn(
          'animate__animated hidden w-[200px] px-4 py-24 lg:block',
          collapse && 'animate__fadeInLeft fixed bottom-0 left-20 top-0 z-40 block bg-stone-300 text-white'
        )}
      >
        <h3 className='text-xl font-bold text-blue-950'>My Space</h3>
        <p className='mb-16 text-sm font-normal text-stone-500'>Workspace Title</p>
        <Navbar />
      </nav>
    </aside>
  )
}

export default SidebarLeft
