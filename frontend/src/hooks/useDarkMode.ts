import { useEffect, useState } from 'react'
import { DARK_MODE } from '~/constants'
import { Mode } from '~/constants/enum'
import { getStore, setStore } from '~/utils'

export const useDarkMode = () => {
  const mode = getStore(DARK_MODE)
  const [darkMode, setDarkMode] = useState<boolean>(mode === Mode.DARK)
  const element = document.documentElement

  const updateDarkMode = (value: Mode) => {
    if (value === Mode.DARK) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
    setStore(DARK_MODE, value)
  }

  useEffect(() => {
    if (darkMode) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }, [darkMode])

  return { darkMode, updateDarkMode }
}
