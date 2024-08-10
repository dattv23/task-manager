import { createApi } from '@reduxjs/toolkit/query/react'
import { DOMAIN_API } from '~/constants'
import { CreateTaskField, EditTaskField, Task } from '~/@types'
import { axiosBaseQuery } from '~/configs'

export const apiTask = createApi({
  reducerPath: 'apiTask',
  baseQuery: axiosBaseQuery({ baseUrl: `${DOMAIN_API}/api` }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({ url: '/tasks', method: 'get' }),
      providesTags: (result = [], _error, _arg) => [
        'Task',
        ...result.map(({ _id }) => ({ type: 'Task', id: _id }) as const)
      ]
    }),
    getTask: builder.query<Task, string>({
      query: (id) => ({ url: `/tasks/${id}`, method: 'get' }),
      providesTags: (_result, _error, arg) => [{ type: 'Task', id: arg }]
    }),
    addTask: builder.mutation<Task, CreateTaskField>({
      query: (data: CreateTaskField) => ({ url: '/tasks', method: 'post', data: data }),
      invalidatesTags: ['Task']
    }),
    editTask: builder.mutation<Task, EditTaskField>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'put',
        data: task
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Task', id: arg.id }]
    }),
    deleteTask: builder.mutation({
      query: ({ params }: { params: { id: string } }) => ({ url: `/tasks/${params.id}`, method: 'delete' }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Task', id: arg.params.id }]
    })
  })
})

export const { useGetTasksQuery, useGetTaskQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } =
  apiTask
