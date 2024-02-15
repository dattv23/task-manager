import Button from '../Button'
import Calendar from '../Calendar'
import Profile from '../Profile'

const SidebarRight: React.FC = () => {
  return (
    <>
      <div className='h-screen bg-neutral-300 py-4'>
        <div className='mr-5 h-full w-80 rounded-lg bg-white py-24'>
          <Profile />
          <div className='m-5 rounded-lg bg-neutral-300 p-4'>
            <div className='flex justify-center rounded-lg '>
              <Button className='h-7 w-fit text-sm'>Calendar</Button>
              <Button variant={'tertiary'} className='h-7 text-sm text-neutral-400'>
                Reminder
              </Button>
            </div>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarRight
