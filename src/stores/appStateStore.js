import { create } from 'zustand'

export const appStateStore = create(() => ({
  // App state
  appState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: null
  }
}))

export const useAppStateStore = () => {
  const { appState, setAppState } = appStateStore()
  return {
    appState,
    setAppState
  }
}
