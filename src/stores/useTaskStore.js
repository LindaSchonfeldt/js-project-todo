import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useTaskStore = create(
  devtools((set, get) => ({
    tasks: [],
    completedTasks: [],

    // Save to local storage
    saveToLocalStorage: () => {
      const state = get()
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
      localStorage.setItem(
        'completedTasks',
        JSON.stringify(state.completedTasks)
      )
    },

    // Load from local storage
    loadFromLocalStorage: () => {
      try {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        const completedTasks =
          JSON.parse(localStorage.getItem('completedTasks')) || []
        set({ tasks, completedTasks })
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
        set({ tasks: [], completedTasks: [] })
      }
    },

    // Add a task
    addTask: (task) => {
      if (!task) return

      // Validate due date
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

      // Save to localStorage after updating state
      get().saveToLocalStorage()
    },

    // Remove a task
    removeTask: (taskId) => {
      if (!taskId) return

      set((state) => {
        // Check if task is in active tasks
        const updatedTasks = state.tasks.filter((task) => task.id !== taskId)

        // Also check completed tasks
        const updatedCompletedTasks = state.completedTasks.filter(
          (task) => task.id !== taskId
        )

        // Return the new state
        return {
          tasks: updatedTasks,
          completedTasks: updatedCompletedTasks
        }
      })

      // Save to localStorage after updating state
      get().saveToLocalStorage()
    },

    // Edit a task
    editTask: (editedTask) => {
      if (!editedTask || !editedTask.id) return

      set((state) => {
        // Check if the task is in active tasks
        const isInActiveTasks = state.tasks.some(
          (task) => task.id === editedTask.id
        )

        if (isInActiveTasks) {
          return {
            tasks: state.tasks.map((task) =>
              task.id === editedTask.id ? editedTask : task
            )
          }
        } else {
          // Check if task is in completed tasks
          return {
            completedTasks: state.completedTasks.map((task) =>
              task.id === editedTask.id ? editedTask : task
            )
          }
        }
      })

      // Save to localStorage after updating state
      get().saveToLocalStorage()
    },

    // Complete a task
    completeTask: (taskId) => {
      if (!taskId) return

      set((state) => {
        // Find the task to complete - check both active and completed tasks
        const taskFromActive = state.tasks.find((task) => task.id === taskId)
        const taskFromCompleted = state.completedTasks.find(
          (task) => task.id === taskId
        )

        // Determine which array contains the task
        const taskToComplete = taskFromActive || taskFromCompleted

        if (!taskToComplete) return state

        const updatedTask = {
          ...taskToComplete,
          completed: !taskToComplete.completed
        }

        if (taskFromActive) {
          // Move from active to completed
          return {
            tasks: state.tasks.filter((task) => task.id !== taskId),
            completedTasks: [...state.completedTasks, updatedTask]
          }
        } else {
          // Move from completed to active
          return {
            completedTasks: state.completedTasks.filter(
              (task) => task.id !== taskId
            ),
            tasks: [...state.tasks, { ...updatedTask, completed: false }]
          }
        }
      })

      // Save to localStorage after updating state
      get().saveToLocalStorage()
    },

    // Get next ID for a new task
    getNextId: () => {
      const state = get()
      const taskIds = state.tasks.map((t) => t.id) || []
      const completedTaskIds = state.completedTasks.map((t) => t.id) || []
      const allTaskIds = [...taskIds, ...completedTaskIds]
      return allTaskIds.length > 0 ? Math.max(...allTaskIds) + 1 : 1
    }
  }))
)
