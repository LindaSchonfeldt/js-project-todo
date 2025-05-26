import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useTaskFormStore = create(
  devtools((set, get) => ({
    // Form state
    id: 0,
    dueDate: null,
    title: '',
    priority: '',
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

    // Update form field values in the store
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
    validateField: (field) => {
      set((state) => {
        const newErrors = { ...state.errors }

        switch (field) {
          case 'title':
            if (!state.title.trim()) {
              newErrors.title = 'Title is required'
            } else {
              delete newErrors.title
            }
            break

          case 'description':
            if (state.description.length > 500) {
              newErrors.description =
                'Description must be less than 500 characters'
            } else {
              delete newErrors.description
            }
            break

          case 'dueDate':
            if (state.dueDate !== null) {
              const today = new Date()
              today.setHours(0, 0, 0, 0)

              if (new Date(state.dueDate) < today) {
                newErrors.dueDate = 'Due date cannot be in the past'
              } else {
                delete newErrors.dueDate
              }
            }
            break

          // Remove priority validation case entirely

          default:
            break
        }

        return { errors: newErrors }
      })
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
)
