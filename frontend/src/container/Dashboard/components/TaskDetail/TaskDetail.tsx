import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Task, TaskStatus } from '~/@types/task.type'
import { ICONS } from '~/assets/icons'
import { renderStatus } from '../TaskList/TaskList'
import { Button } from '~/components'
import { useGetTaskByIdQuery } from '~/apis/api'
import { formatDate } from 'date-fns'

const TaskDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task>()
  const { data, isFetching } = useGetTaskByIdQuery(id)

  useEffect(() => {
    console.log('====================================')
    console.log(data)
    console.log('====================================')
    if (data) {
      setTask(data)
    }
  }, [data, isFetching])

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
      {!task ? (
        <p className='mt-2'>Task not found!</p>
      ) : (
        <div className='mt-4 h-[316px] rounded-3xl bg-white p-8'>
          <div className='flex h-full flex-col justify-between gap-2 lg:flex-row'>
            <div className='flex h-full flex-col justify-between'>
              <div className='flex flex-col gap-2'>
                <h3 className='text-2xl font-medium text-black'>{task.name}</h3>
                <div>{renderStatus(task.status)}</div>
                <p className='text-base font-normal text-zinc-500'>{task.description}</p>
              </div>
              <div className='mt-2 flex w-full gap-3'>
                <div>{renderButtonWithStatus(task.status)}</div>
                <button className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 p-3'>
                  <img src={ICONS.deleteOutlined} alt='' />
                </button>
                <button className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 p-3'>
                  <img src={ICONS.editSquare} alt='' />
                </button>
              </div>
            </div>
            <div className='lg:flex lg:flex-row'>
              <div className='flex items-center justify-between gap-2 lg:flex-col'>
                <div className='text-center'>
                  <span className='text-xs font-normal text-neutral-400'>Start Date</span>
                  <br />
                  <span className='text-sm font-bold text-zinc-900'>{formatDate(task.startDate, 'dd-MM-yyyy')}</span>
                </div>
                <div className='text-center'>
                  <span className='text-xs font-normal text-neutral-400'>Due Date</span>
                  <br />
                  <span className='text-sm font-bold text-zinc-900'>{formatDate(task.dueDate, 'dd-MM-yyyy')}</span>
                </div>
              </div>
              <div className='relative flex flex-1 items-center justify-between gap-2 px-7 lg:flex-col'>
                <div className='z-10 h-7 w-7 rounded-full border border-primary bg-white'></div>
                <hr className='absolute left-10 right-10 top-[0.75rem] z-0 border border-gray-300 lg:bottom-0 lg:h-[90%] lg:bg-slate-400' />
                <div className='z-10 flex h-7 w-7 items-center justify-center rounded-full border border-primary bg-white'>
                  <div className='h-5 w-5 rounded-full bg-primary'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskDetail
