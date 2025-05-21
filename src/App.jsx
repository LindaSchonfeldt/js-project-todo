import { GlobalStyle } from './styles/GlobalStyle'
import { Home } from './pages/Home'
import { useTaskStore } from './stores/useTaskStore'
import { useEffect } from 'react'

export const App = () => {
  const { loadFromLocalStorage } = useTaskStore()

  // Load tasks when the app starts
  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  )
}
