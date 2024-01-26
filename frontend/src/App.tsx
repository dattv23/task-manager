import { cn } from '~/utils'

const App = () => {
  return (
    <div>
      <h1 className={cn('font-bold', 'text-red-200', 1 > 2 && 'border')}>Hello world!</h1>
    </div>
  )
}

export default App
