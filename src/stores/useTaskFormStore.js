import { create } from 'zustand'

export const useTaskFormStore = create((set, get) => ({
  // Form state
  id: 0,
  dueDate: null,
  title: '',
  priority: 'low', // 'low', 'medium', 'high'
  description: '',
  completed: false,

  // Error state
  errors: {
    title: '',
    dueDate: '',
    priority: '',
    description: ''
  },

  // Form validity
  isValid: false,

  // Reset form
  resetForm: () =>
    set({
      id: 0,
      dueDate: null,
      title: '',
      priority: 'low',
      description: '',
      completed: false,
      errors: {
        title: '',
        dueDate: '',
        priority: '',
        description: ''
      },
      isValid: false
    }),

  // Update form field
  setField: (field, value) =>
    set((state) => {
      const newState = {
        ...state,
        [field]: value,
        errors: { ...state.errors }
      }

      // Clear the specific error when the field is updated
      if (field in newState.errors) {
        newState.errors[field] = ''
      }

      return newState
    }),

  // Validate a specific field
  // Validate a specific field
  validateField: (field) => {
    const state = get()
    let errorMessage = ''

    switch (field) {
      case 'title':
        if (!state.title.trim()) {
          errorMessage = 'Title is required'
        } else if (state.title.length > 100) {
          errorMessage = 'Title must be less than 100 characters'
        }
        break

      case 'description':
        if (state.description.length > 500) {
          errorMessage = 'Description must be less than 500 characters'
        }
        break

      case 'dueDate':
        if (state.dueDate !== null) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          if (new Date(state.dueDate) < today) {
            errorMessage = 'Due date cannot be in the past'
          }
        }
        break

      case 'priority':
        if (!['low', 'medium', 'high'].includes(state.priority)) {
          errorMessage = 'Priority must be low, medium, or high'
        }
        break

      default:
        break
    }

    set((state) => ({
      errors: {
        ...state.errors,
        [field]: errorMessage
      }
    }))

    return errorMessage === ''
  },

  // Validate all fields
  validateForm: () => {
    const state = get()
    const fields = ['title', 'description', 'dueDate', 'priority']

    // Validate each field
    const fieldResults = fields.map((field) => state.validateField(field))
    const isFormValid = fieldResults.every((valid) => valid)

    set({ isValid: isFormValid })
    return isFormValid
  },

  // Load task data into form
  loadTask: (task) =>
    set({
      id: task.id || 0,
      dueDate: task.dueDate || null,
      title: task.title || '',
      priority: task.priority || 'low',
      description: task.description || '',
      completed: task.completed || false,
      errors: {
        title: '',
        description: '',
        dueDate: '',
        priority: ''
      },
      isValid: true // Assume loaded tasks are valid
    })
}))
