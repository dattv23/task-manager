import { DatePicker, Form, Input, Modal, Select, Tabs, TabsProps } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React, { useState } from 'react'
import { CreateTaskField } from '~/@types/form.type'
import { Task, TaskPriority, TaskStatus } from '~/@types/task.type'
import { ICONS } from '~/assets/icons'
import { Button } from '~/components'
import { formatDate } from 'date-fns'
import { useToasts } from '~/hooks/useToasts'
import ListTask from '../../components/ListTask'
import { mockTasks } from '~/mocks/tasks'
import './style.scss'

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { addToast } = useToasts()

  /**
   * Function for showing modal
   */
  const showModal = () => {
    setOpen(true)
  }

  /**
   * Function for handling modal Cancel button click
   */
  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = (values: CreateTaskField) => {
    const { name, description, priority, dueDate } = values
    setTasks([
      ...tasks,
      {
        _id: crypto.randomUUID(),
        name,
        description,
        priority,
        dueDate,
        createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
        status: TaskStatus.PENDING
      }
    ])
    addToast({ title: 'Success', message: 'Add task successfully!', progress: true, timeOut: 3000, type: 'success' })
    handleCancel()
  }

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

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <p>
          All Task
          <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
            {countTaskWithStatus(tasks, 'All')}
          </span>
        </p>
      ),
      children: <ListTask tasks={tasks} />
    },
    {
      key: '2',
      label: (
        <p>
          Pending
          <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
            {countTaskWithStatus(tasks, TaskStatus.PENDING)}
          </span>
        </p>
      ),
      children: <ListTask tasks={tasks.filter((item) => item.status === TaskStatus.PENDING)} />
    },
    {
      key: '3',
      label: (
        <p>
          In Progress
          <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
            {countTaskWithStatus(tasks, TaskStatus.IN_PROGRESS)}
          </span>
        </p>
      ),
      children: <ListTask tasks={tasks.filter((item) => item.status === TaskStatus.IN_PROGRESS)} />
    },
    {
      key: '4',
      label: (
        <p>
          Completed
          <span className='ml-3 inline-block h-6 w-6 rounded-full bg-slate-100 text-center'>
            {countTaskWithStatus(tasks, TaskStatus.COMPLETED)}
          </span>
        </p>
      ),
      children: <ListTask tasks={tasks.filter((item) => item.status === TaskStatus.COMPLETED)} />
    }
  ]

  return (
    <>
      <div className='flex w-full flex-col justify-between gap-2 lg:flex-row '>
        <div>
          <h2 className='text-[32px] font-semibold text-blue-950 '>Task</h2>
          <p className='text-xl font-normal text-zinc-600'>Your tasks in your space</p>
        </div>
        {tasks.length == 0 ? null : <Button onClick={showModal}>Create a Task</Button>}
      </div>
      <div className='my-10'>
        {tasks.length == 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <img src={ICONS.tasks} />
            <h4 className='mt-4 text-[28px] font-semibold text-black opacity-80'>No Tasks Yet</h4>
            <p className='mt-3 text-base font-normal text-neutral-500'>
              You have no task created in your workspace yet.
            </p>
            <p className='mb-6 text-base font-normal text-neutral-500'>Get productive. Create a Task Now.</p>
            <Button onClick={showModal}>Create a Task</Button>
          </div>
        ) : (
          <Tabs defaultActiveKey='1' items={items} />
        )}
      </div>
      <Modal
        title='Create Task'
        centered
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
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
          <FormItem name='name'>
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
              <FormItem name='dueDate'>
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

export default Tasks
