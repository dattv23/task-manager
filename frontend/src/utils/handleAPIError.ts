import { APIErrorResult } from '~/apis/api'

export const handleAPIError = (error: unknown) => {
  const { status, data } = error as APIErrorResult

  if (!status) {
    return { title: 'Error', message: 'Please try again later!', status: status }
  }

  if (typeof data === 'string') {
    return { title: 'Error', message: data, status: status }
  } else {
    return { title: 'Error', message: data.message, status: status }
  }
}
