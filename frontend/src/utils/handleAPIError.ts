export const handleAPIError = (error: { status?: number; data: any }) => {
  const { status, data } = error
  const { message, errors } = data as { message: string; errors?: [{ path: string; message: string }] }
  if (status == 422 && errors) {
    return { title: 'Error', message: errors[0].message, status }
  }
  return { title: 'Error', message, status }
}
