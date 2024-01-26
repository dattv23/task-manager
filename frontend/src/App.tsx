import { useState } from 'react'
import Toast from '~/components/Toast'

const App = () => {
  const [toastOpen, setToastOpen] = useState(false)

  const handleToastClose = () => {
    setToastOpen(false)
  }

  const handleShowToast = () => {
    setToastOpen(true)
  }

  return (
    <div>
      <button onClick={handleShowToast}>Show Toast</button>

      <Toast
        open={toastOpen}
        title='Notification'
        description='This is a custom alert created using React and TypeScript.'
        onClose={handleToastClose}
        type={'error'}
      />
    </div>
  )
}

export default App
