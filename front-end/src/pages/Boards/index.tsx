import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'

export const Boards = () => {
  const app = useAppSelector(state => state.app)
  useEffect(() => {
    console.log(app)
  }, [])

  return (
    <div>Boards</div>
  )
}
