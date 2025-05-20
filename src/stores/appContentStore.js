import { create } from 'zustand'

export const appContentStore = create(() => ({
  appContent: {
    heading: 'To do List',
    addTaskButton: 'Add',
    editTaskButton: 'Edit',
    deleteTaskButton: 'Delete',
    completeTaskButton: 'Complete Task'
  }
}))
