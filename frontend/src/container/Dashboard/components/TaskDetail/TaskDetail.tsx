import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Task, TaskStatus } from '~/@types/task.type'
import { ICONS } from '~/assets/icons'
import { mockTasks } from '~/mocks/tasks'
import { renderStatus } from '../TaskList/TaskList'
import { Button } from '~/components'

const TaskDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<Task>()

  useEffect(() => {
    setData(mockTasks.find((task) => task._id === id))
    return () => {}
  }, [data])

  const renderButtonWithStatus = (status: string) => {
    switch (status) {
      case TaskStatus.PENDING:
        return <Button>Work on it Now</Button>
      case TaskStatus.IN_PROGRESS:
        return <Button className='bg-success'>Mark As Done</Button>
      case TaskStatus.COMPLETED:
        return (
          <Button className='px-0 text-success' variant={'tertiary'} disabled>
            <img src={ICONS.checkCircle} alt='check' className='mr-3' />
            <span>This task has been completed</span>
          </Button>
        )
    }
  }

  return (
    <>
      <button
        className='flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50'
        onClick={() => navigate('/tasks')}
      >
        <img src={ICONS.arrowRight} alt='arrow' className='rotate-180' />
      </button>
      {!data ? (
        <p className='mt-2'>Task not found!</p>
      ) : (
        <div className='mt-4 rounded-3xl bg-white p-8'>
          <div className='flex flex-col lg:flex-row'>
            <div className='mb-4 flex flex-col gap-3 lg:flex-[0.7]'>
              <h3 className='text-2xl font-medium text-black'>{data.name}</h3>
              <div>{renderStatus(data.status)}</div>
              <p className='text-base font-normal text-zinc-500'>{data.description}</p>
            </div>
            <div className='relative flex justify-between lg:flex-[0.3] lg:flex-col'>
              <div className='z-10 flex flex-col items-center justify-center gap-2 lg:flex-row-reverse'>
                <div className='h-7 w-7 rounded-full border border-primary bg-white'></div>
                <div className='text-center'>
                  <span className='text-xs font-normal text-neutral-400'>Date Created</span>
                  <br />
                  <span className='text-sm font-bold text-zinc-900'>{data.createdAt.toString()}</span>
                </div>
              </div>
              <hr className='absolute left-10 right-10 top-[0.75rem] z-0 border border-gray-300 lg:bottom-0 lg:left-[86px] lg:top-24 lg:w-36 lg:rotate-90' />
              <div className='z-10 flex flex-col items-center justify-center gap-2 lg:flex-row-reverse'>
                <div className='flex h-7 w-7 items-center justify-center rounded-full border border-primary bg-white'>
                  <div className='h-5 w-5 rounded-full bg-primary'></div>
                </div>
                <div className='text-center'>
                  <span className='text-xs font-normal text-neutral-400'>Due Date</span>
                  <br />
                  <span className='text-sm font-bold text-zinc-900'>{data.dueDate.toString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2 flex gap-3'>
            {renderButtonWithStatus(data.status)}
            <button className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 p-3'>
              <img src={ICONS.deleteOutlined} alt='' />
            </button>
            <button className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 p-3'>
              <img src={ICONS.editSquare} alt='' />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskDetail
