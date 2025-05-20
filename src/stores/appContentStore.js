import { create } from 'zustand'

export const appContentStore = create(() => ({
  appContent: {
    heading: 'To do List',
    description:
      'A simple to-do list application built with React and Zustand for state management.'
  }
}))
