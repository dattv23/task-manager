import { useState } from 'react'
import Alert from './components/Alert'

const App = () => {
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  const handleShowAlert = () => {
    setAlertOpen(true)
  }

  return (
    <div>
      <button onClick={handleShowAlert}>Show Alert</button>

      <Alert
        open={alertOpen}
        content='This is a custom alert created using React and TypeScript.'
        onClose={handleAlertClose}
        type={'info'}
      />
    </div>
  )
}

export default App
