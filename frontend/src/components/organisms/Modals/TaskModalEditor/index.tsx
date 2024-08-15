import dayjs from 'dayjs'
import { useCallback } from 'react'
import { Alert, DatePicker, Form, Input, Modal, Select } from 'antd'

import { useToasts } from '~/hooks'
import { useEditTaskMutation } from '~/apis'
import { EditTaskField, Task } from '~/@types'
import { TaskPriority } from '~/constants/enum'
import { handleAPIError } from '~/utils/handleAPIError'

import { ICONS } from '~/assets'
import { Button } from '~/components/atoms'
import { FormItem } from '~/components/molecules'

type TaskModalEditorProps = {
  id: string
  openModalEdit: boolean
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>
  task: Task | undefined
}

const TaskModalEditor: React.FC<TaskModalEditorProps> = ({ id, openModalEdit, task, setOpenModalEdit }) => {
  const [editTask] = useEditTaskMutation()
  const { addToast } = useToasts()

  const handleEditTask = useCallback(async (values: EditTaskField) => {
    const res = await editTask({ ...values, id: id! })
    if ('data' in res) {
      addToast({
        title: 'Success',
        message: 'Edit task successfully!',
        progress: true,
        timeOut: 3,
        type: 'success'
      })
      setOpenModalEdit(false)
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
  }, [])

  return (
    <Modal
      title='Edit Task'
      centered
      open={openModalEdit}
      onCancel={() => setOpenModalEdit(false)}
      width={460}
      styles={{ header: { marginTop: '12px' } }}
      footer={null}
    >
      <Form
        onFinish={handleEditTask}
        fields={[
          { name: 'name', value: task?.name },
          { name: 'priority', value: task?.priority },
          { name: 'dueDate', value: dayjs(task?.dueDate) },
          { name: 'description', value: task?.description }
        ]}
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
            <FormItem
              name='dueDate'
              required={false}
              rules={[
                {
                  validator(_, value) {
                    if (new Date(value) > new Date()) {
                      return Promise.resolve()
                    }
                    return Promise.reject()
                  },
                  message: (
                    <Alert
                      className='bg-transparent text-base text-red-700'
                      message={`Due date not valid!`}
                      banner
                      type='error'
                    />
                  )
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
        <FormItem
          name='description'
          required={false}
          children={
            <Input.TextArea
              className='h-12 p-2 text-base font-normal'
              placeholder='Type your content here...'
              rows={5}
            />
          }
        />
        <Form.Item>
          <Button type='submit' className='my-3 w-full'>
            Edit Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TaskModalEditor
