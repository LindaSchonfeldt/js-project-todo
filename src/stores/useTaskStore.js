import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  tasks: [],
  completedTasks: [], // Array to store completed tasks

  // Add a task
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task]
    })),

  // Remove a task
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId)
    })),

  // Edit a task
  editTask: (editedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      )
    })),

  // Complete a task
  completeTask: (taskId) =>
    set((state) => {
      const taskToComplete = state.tasks.find((task) => task.id === taskId)

      if (!taskToComplete) return state

      const updatedTask = {
        ...taskToComplete,
        completed: !taskToComplete.completed
      }

      if (updatedTask.completed) {
        // If the task is being marked as complete, move it to completedTasks
        return {
          tasks: state.tasks.filter((task) => task.id !== taskId),
          completedTasks: [...state.completedTasks, updatedTask]
        }
      } else {
        // If the task is being marked as incomplete, move it back to tasks
        return {
          completedTasks: state.completedTasks.filter(
            (task) => task.id !== taskId
          ),
          tasks: [...state.tasks, updatedTask]
        }
      }
    }),

  // Get next ID for a new task
  getNextId: () =>
    set((state) => {
      const maxId = Math.max(
        0,
        ...state.tasks.map((t) => t.id),
        ...state.completedTasks.map((t) => t.id)
      )
      return maxId + 1
    })
}))
