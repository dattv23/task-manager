import { Card } from 'antd'
import React, { useEffect, useState } from 'react'

import { Badges } from '~/components'
import { ICONS } from '~/assets/icons'
import { Task } from '~/@types/task.type'
import { TaskStatus } from '~/constants/enum'
import { useNavigate } from 'react-router-dom'

type TaskListProps = {
  tasks: Task[]
}

const renderStatus = (status: string) => {
  switch (status) {
    case TaskStatus.PENDING:
      return <Badges type={'pending'}>{status}</Badges>
    case TaskStatus.IN_PROGRESS:
      return <Badges type={'in_progress'}>{status}</Badges>
    case TaskStatus.COMPLETED:
      return <Badges type={'completed'}>{status}</Badges>
  }
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <div className='flex flex-wrap gap-2'>
        {tasks.map((task, index) => (
          <Card key={index} loading={loading} className='w-full lg:w-[248px]'>
            <div className='flex justify-between'>
              <span className='text-sm font-semibold text-zinc-400'>{`T - ${String(index + 1).padStart(2, '0')}`}</span>
              {renderStatus(task.status)}
            </div>
            <p className='my-4 text-base font-medium text-zinc-900'>{task.name}</p>
            <button
              className='mt-4 flex w-28 items-center justify-between hover:opacity-70'
              onClick={() => navigate(`/tasks/${task._id}`)}
            >
              <span className='cursor-pointer text-base font-semibold text-primary'>View Task</span>
              <img src={ICONS.arrowRight} alt='' />
            </button>
          </Card>
        ))}
      </div>
    </>
  )
}

export default TaskList
