export const handleAPIError = (error: any) => {
  const { status, data } = error as {
    status?: number
    data: { message: string; errors?: [{ path: string; message: string }] }
  }
  if (!status) {
    return { title: 'Error', message: 'Please try again later!' }
  }
  const { message, errors } = data
  if (status == 422 && errors) {
    return { title: 'Error', message: errors[0].message, status }
  }
  return { title: 'Error', message, status }
}
