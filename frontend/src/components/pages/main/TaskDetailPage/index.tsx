import { Modal } from 'antd'
import { formatDate } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Task } from '~/@types'
import { ICONS } from '~/assets/icons'
import { useToasts } from '~/hooks/useToasts'
import { TaskStatus } from '~/constants/enum'
import { handleAPIError } from '~/utils/handleAPIError'
import { useDeleteTaskMutation, useEditTaskMutation, useGetTaskQuery } from '~/apis'

import { Badges, Button } from '~/components/atoms'
const TaskModelEditor = React.lazy(() => import('~/components/organisms/Modals/TaskModalEditor'))
const { confirm } = Modal

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

const TaskDetailPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isSuccess } = useGetTaskQuery(id!)
  const [editTask] = useEditTaskMutation()
  const { addToast } = useToasts()
  const [deleteTask] = useDeleteTaskMutation()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)

  const handleUpdateStatus = async (newStatus: TaskStatus) => {
    if (!data) return
    const res = await editTask({ ...data, status: newStatus, id: id! })
    if ('data' in res) {
      addToast({
        title: 'Success',
        message: 'Update status task successfully!',
        progress: true,
        timeOut: 3,
        type: 'success'
      })
    }
    if ('error' in res) {
      const { message } = handleAPIError(res.error)
      addToast({
        title: 'Error',
        message: message,
        progress: true,
        timeOut: 3,
        type: 'error'
      })
    }
  }

  const renderButtonWithStatus = (status: string) => {
    switch (status) {
      case TaskStatus.PENDING:
        return <Button onClick={() => handleUpdateStatus(TaskStatus.IN_PROGRESS)}>Work on it Now</Button>
      case TaskStatus.IN_PROGRESS:
        return (
          <Button onClick={() => handleUpdateStatus(TaskStatus.COMPLETED)} className='bg-success'>
            Mark As Done
          </Button>
        )
      case TaskStatus.COMPLETED:
        return (
          <Button className='px-0 text-success' variant={'tertiary'} disabled>
            <img src={ICONS.checkCircle} alt='check' className='mr-3' />
            <span>This task has been completed</span>
          </Button>
        )
    }
  }

  const handleDeleteTask = async (task: Task) => {
    const handleClickCancel = () => {
      Modal.destroyAll()
    }
    confirm({
      title: <p className='text-lg font-bold'>Delete Task</p>,
      content: (
        <p>
          Are you sure you want to delete the task <strong>'{task.name}'</strong>? This task is {task.status}?
        </p>
      ),
      centered: true,
      footer: (
        <div className='mt-2 flex justify-start gap-2'>
          <Button className='h-10' onClick={handleClickCancel}>
            No
          </Button>
          <Button
            className='h-10 bg-rose-50 text-red-600'
            onClick={async () => {
              const res = await deleteTask({ params: { id: id! } })
              if ('data' in res) {
                addToast({
                  title: 'Success',
                  message: 'Delete task successfully!',
                  progress: true,
                  timeOut: 3,
                  type: 'success'
                })
                navigate(-1)
              }
              if ('error' in res) {
                const { message } = handleAPIError(res.error)
                addToast({
                  title: 'Error',
                  message: message,
                  progress: true,
                  timeOut: 3,
                  type: 'error'
                })
              }
              Modal.destroyAll()
            }}
          >
            Yes
          </Button>
        </div>
      ),
      icon: null
    })
  }

  const handleClickEditTask = () => {
    setOpenModalEdit(true)
  }

  const handleClickDeleteTask = () => {
    if (!data) return
    handleDeleteTask(data)
  }

  useEffect(() => {
    if (!isLoading && !isSuccess) {
      navigate('/not-found')
    }
  }, [isLoading, isSuccess])

  return (
    <>
      {isLoading && <p className='mt-2'>Loading...</p>}
      {!isLoading && (
        <>
          <div className='task-detail'>
            <button
              className='flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50'
              onClick={() => navigate(-1)}
            >
              <img src={ICONS.arrowRight} alt='arrow' className='rotate-180' />
            </button>
            {isSuccess && (
              <>
                <div className='mt-4 h-[316px] rounded-3xl bg-white p-8'>
                  <div className='flex h-full flex-col justify-between gap-2 lg:flex-row'>
                    <div className='flex h-full flex-col justify-between'>
                      <div className='flex flex-col gap-2'>
                        <h3 className='text-2xl font-medium text-black'>{data.name}</h3>
                        <div>{renderStatus(data.status)}</div>
                        <p className='text-base font-normal text-zinc-500'>{data.description}</p>
                      </div>
                      <div className='mt-2 flex w-full gap-3'>
                        <div>{renderButtonWithStatus(data.status)}</div>
                        <button
                          className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 p-3'
                          onClick={handleClickDeleteTask}
                        >
                          <img src={ICONS.deleteOutlined} alt='' />
                        </button>
                        <button
                          className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 p-3'
                          onClick={handleClickEditTask}
                        >
                          <img src={ICONS.editSquare} alt='' />
                        </button>
                      </div>
                    </div>
                    <div className='lg:flex lg:flex-row'>
                      <div className='flex items-center justify-between gap-2 lg:flex-col'>
                        <div className='text-center'>
                          <span className='text-xs font-normal text-neutral-400'>Start Date</span>
                          <br />
                          <span className='text-sm font-bold text-zinc-900'>
                            {formatDate(data.startDate, 'dd-MM-yyyy')}
                          </span>
                        </div>
                        <div className='text-center'>
                          <span className='text-xs font-normal text-neutral-400'>Due Date</span>
                          <br />
                          <span className='text-sm font-bold text-zinc-900'>
                            {formatDate(data.dueDate, 'dd-MM-yyyy')}
                          </span>
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
                <TaskModelEditor
                  openModalEdit={openModalEdit}
                  setOpenModalEdit={setOpenModalEdit}
                  id={data._id}
                  task={data}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default TaskDetailPage
