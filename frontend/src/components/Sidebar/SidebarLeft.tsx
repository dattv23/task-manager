import { LogoutOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { IMAGES } from '~/assets/images'
import Button from '../Button'
import Navbar from '../Navbar'
import { useAuth } from '~/hooks/useAuth'
import { useProfile } from '~/hooks/useProfile'

const SidebarLeft: React.FC = () => {
  const { logoutUser } = useAuth()
  const { profile } = useProfile()

  return (
    <>
      <div className='flex w-20 flex-col justify-between bg-primary px-4 py-24'>
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
        </div>
        <Button variant={'secondary'} onClick={logoutUser}>
          <LogoutOutlined />
        </Button>
      </div>
      <div className='w-[200px] px-4 py-24'>
        <h3 className='text-xl font-bold text-blue-950'>My Space</h3>
        <p className='mb-16 text-sm font-normal text-stone-500'>Workspace Title</p>
        <Navbar />
      </div>
    </>
  )
}

export default SidebarLeft
