import FormItem from 'antd/es/form/FormItem'
import type { DragEndEvent } from '@dnd-kit/core'
import React, { Suspense, useEffect, useState } from 'react'
import { DatePicker, Form, Input, Modal, Select, Tabs } from 'antd'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import './style.scss'
import { ICONS } from '~/assets'
import { useToasts } from '~/hooks'
import { Task, CreateTaskField } from '~/@types'
import { handleAPIError } from '~/utils/handleAPIError'
import { TaskPriority, TaskStatus } from '~/constants/enum'
import { useAddTaskMutation, useGetTasksQuery } from '~/apis'

import { Button, DraggableTab } from '~/components/atoms'
const TaskList = React.lazy(() => import('~/components/organisms/TaskList'))

type TabItemType = {
  key: string
  label: JSX.Element
  children: JSX.Element
}

const TaskPage: React.FC = () => {
  const [openModalAddTask, setOpenModalAddTask] = useState<boolean>(false)
  const { addToast } = useToasts()
  const { data, isLoading, isSuccess } = useGetTasksQuery()
  const [addTask] = useAddTaskMutation()

  const countTaskWithStatus = (tasks: Task[], status: string) => {
    if (status === 'All') {
      return tasks.length
    }
    return tasks.reduce((acc, task) => {
      if (task.status === status) {
        return acc + 1
      }
      return acc
    }, 0)
  }

  const [items, setItems] = useState<TabItemType[]>([])


  useEffect(() => {
    if (isSuccess) {
      setItems([
        {
          key: '1',
          label: (
            <p>
              All Task
              <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
                {countTaskWithStatus(data, 'All')}
              </span>
            </p>
          ),
          children: (
            <Suspense fallback={'Loading'}>
              <TaskList tasks={data} />
            </Suspense>
          )
        },
        {
          key: '2',
          label: (
            <p>
              Pending
              <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
                {countTaskWithStatus(data, TaskStatus.PENDING)}
              </span>
            </p>
          ),
          children: (
            <Suspense fallback={'Loading'}>
              <TaskList tasks={data.filter((item) => item.status === TaskStatus.PENDING)} />
            </Suspense>
          )
        },
        {
          key: '3',
          label: (
            <p>
              In Progress
              <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
                {countTaskWithStatus(data, TaskStatus.IN_PROGRESS)}
              </span>
            </p>
          ),
          children: (
            <Suspense fallback={'Loading'}>
              <TaskList tasks={data.filter((item) => item.status === TaskStatus.IN_PROGRESS)} />
            </Suspense>
          )
        },
        {
          key: '4',
          label: (
            <p>
              Completed
              <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
                {countTaskWithStatus(data, TaskStatus.COMPLETED)}
              </span>
            </p>
          ),
          children: (
            <Suspense fallback={'Loading'}>
              <TaskList tasks={data.filter((item) => item.status === TaskStatus.COMPLETED)} />
            </Suspense>
          )
        }
      ])
    }
  }, [data])

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 }
  })

  const handleSubmit = async (values: CreateTaskField) => {
    const { name, description, priority, dueDate } = values
    const startDate = new Date()
    const status = TaskStatus.PENDING
    const res = await addTask({ name, description, priority, status, startDate, dueDate })
    if ('data' in res) {
      addToast({ title: 'Success', message: 'Add task successfully!', progress: true, timeOut: 3, type: 'success' })
    }
    if ('error' in res) {
      const { message } = handleAPIError(res.error)
      addToast({ title: 'Add Task Failed', message: message, progress: true, timeOut: 3, type: 'error' })
    }
    setOpenModalAddTask(false)
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id)
        const overIndex = prev.findIndex((i) => i.key === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }

  return (
    <>
      <div className='flex w-full flex-col justify-between gap-2 lg:flex-row '>
        <div>
          <h2 className='text-[32px] font-semibold text-blue-950 '>Task</h2>
          <p className='text-xl font-normal text-zinc-600'>Your tasks in your space</p>
        </div>
        <Button onClick={() => setOpenModalAddTask(true)}>Create a new task</Button>
      </div>
      <div className='my-10'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data?.length == 0 ? (
              <div className='flex flex-col items-center justify-center py-16 text-center'>
                <img src={ICONS.tasks} />
                <h4 className='mt-4 text-[28px] font-semibold text-black opacity-80'>No Tasks Yet</h4>
                <p className='mt-3 text-base font-normal text-neutral-500'>
                  You have no task created in your workspace yet.
                </p>
                <p className='mb-6 text-base font-normal text-neutral-500'>Get productive. Create a Task Now.</p>
                <Button onClick={() => setOpenModalAddTask(true)}>Create a Task</Button>
              </div>
            ) : (
              <Tabs
                defaultActiveKey='1'
                items={items}
                renderTabBar={(tabBarProps, DefaultTabBar) => (
                  <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                    <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                      <DefaultTabBar {...tabBarProps}>
                        {(node) => (
                          <DraggableTab {...node.props} key={node.key}>
                            {node}
                          </DraggableTab>
                        )}
                      </DefaultTabBar>
                    </SortableContext>
                  </DndContext>
                )}
              />
            )}
          </div>
        )}
      </div>
      <Modal
        title='Create Task'
        centered
        open={openModalAddTask}
        onCancel={() => setOpenModalAddTask(false)}
        width={460}
        styles={{ header: { marginTop: '12px' } }}
        footer={null}
      >
        <Form
          onFinish={handleSubmit}
          fields={[{ name: 'priority', value: TaskPriority.IMPORTANT }]}
          className='text-base font-normal'
        >
          <label className='text-gray-800' htmlFor='name'>
            Task Name
          </label>
          <FormItem name='name' rules={[{ required: true, message: 'Task name is required!' }]}>
            <Input className='h-12 text-base font-normal' id='name' />
          </FormItem>
          <div className='flex gap-2'>
            <div className='w-full'>
              <label className='text-gray-800' htmlFor='priority'>
                Task Priority
              </label>
              <FormItem name='priority'>
                <Select className='h-12 text-base font-normal'>
                  <Select.Option value={TaskPriority.LESS_IMPORTANT}>Less Important</Select.Option>
                  <Select.Option value={TaskPriority.IMPORTANT}>Important</Select.Option>
                  <Select.Option value={TaskPriority.VERY_IMPORTANT}>Very Important</Select.Option>
                </Select>
              </FormItem>
            </div>
            <div className='w-full'>
              <label className='text-gray-800' htmlFor='dueDate'>
                Due Date
              </label>
              <FormItem
                name='dueDate'
                rules={[
                  {
                    required: true,
                    message: 'Due Date is required!'
                  },
                  {
                    validator(_, value) {
                      if (new Date(value) > new Date()) {
                        return Promise.resolve()
                      }
                      return Promise.reject()
                    },
                    message: 'Due Date is not a valid!'
                  }
                ]}
              >
                <DatePicker
                  className='h-12 w-full text-base font-normal'
                  placeholder='Today'
                  suffixIcon={<img src={ICONS.calendar} />}
                  format={'DD/MM/YYYY'}
                />
              </FormItem>
            </div>
          </div>
          <label className='text-gray-800' htmlFor='description'>
            Task Description
          </label>
          <Form.Item name='description'>
            <Input.TextArea
              className='h-12 p-2 text-base font-normal'
              placeholder='Type your content here...'
              rows={5}
            />
          </Form.Item>
          <Form.Item>
            <Button type='submit' className='my-3 w-full'>
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TaskPage
