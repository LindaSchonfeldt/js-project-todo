import { create } from 'zustand'

export const appContentStore = create(() => ({
  appContent: {
    heading: 'Remind Me',
    addTaskButton: 'Add',
    editTaskButton: 'Edit',
    deleteTaskButton: 'Delete',
    // Form Labels
    dueDateLabel: 'Due Date',
    titleLabel: 'Title',
    descriptionLabel: 'Description',
    priorityLabel: 'Priority',
    // Placeholders
    taskTitlePlaceholder: 'Enter task title',
    taskDescriptionPlaceholder: 'Enter task description',
    // Priority options
    lowPriority: 'Low',
    mediumPriority: 'Medium',
    highPriority: 'High'
  }
}))
