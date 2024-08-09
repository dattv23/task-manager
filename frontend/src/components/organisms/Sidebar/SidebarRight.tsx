import { Button } from "~/components/atoms"
import { Calendar, Profile } from "~/components/molecules"

const SidebarRight: React.FC = () => {
  return (
    <aside className='fixed right-0 top-0 hidden min-h-screen bg-slate-200 py-6 lg:block'>
      <div className='mr-5 h-full w-80 rounded-lg bg-white py-6'>
        <Profile />
        <div className='m-5 mt-16 rounded-lg bg-slate-200 p-4'>
          <div className='flex justify-center rounded-lg '>
            <Button className='h-7 w-fit text-sm'>Calendar</Button>
            <Button variant={'tertiary'} className='h-7 text-sm text-neutral-400'>
              Reminder
            </Button>
          </div>
          <Calendar />
        </div>
      </div>
    </aside>
  )
}

export default SidebarRight
