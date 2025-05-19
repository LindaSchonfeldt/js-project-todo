import { create } from 'zustand'

export const appContentStore = create((set) => ({
  // App content
  appContent: {
    heading: 'To do List',
    description:
      'A simple to-do list application built with React and Zustand for state management.'
  },

  // State
  isLoading: false,
  isError: false,
  errorMessage: '',
  data: null,

  // Actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError, errorMessage) => set({ isError, errorMessage }),
  setData: (data) => set({ data })
}))
