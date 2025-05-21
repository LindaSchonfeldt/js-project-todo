import { create } from 'zustand'

export const useTaskStore = create((set, get) => ({
  tasks: [],
  completedTasks: [],

  // Save to local storage
  saveToLocalStorage: () => {
    const state = get()
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
    localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks))
  },

  // Load from local storage
  loadFromLocalStorage: () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    const completedTasks =
      JSON.parse(localStorage.getItem('completedTasks')) || []
    set({ tasks, completedTasks })
  },

  // Add a task
  addTask: (task) => {
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Reset time to start of day

      if (dueDate < today) {
        task.dueDate = null
      }
    }

    set((state) => ({
      tasks: [...state.tasks, task]
    }))

    // Then save to localStorage
    get().saveToLocalStorage()
  },

  // Remove a task
  removeTask: (taskId) =>
    set((state) => {
      // First filter out the task
      const updatedTasks = state.tasks.filter((task) => task.id !== taskId)

      // Save to local storage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))

      // Return the new state
      return {
        tasks: updatedTasks
      }
    }),

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
    }, get().saveToLocalStorage()),

  // Get next ID for a new task
  getNextId: () => {
    const state = get()
    const taskIds = state.tasks.map((t) => t.id) || []
    const completedTaskIds = state.completedTasks.map((t) => t.id) || []
    const allTaskIds = [...taskIds, ...completedTaskIds]
    return allTaskIds.length > 0 ? Math.max(...allTaskIds) + 1 : 1
  }
}))
