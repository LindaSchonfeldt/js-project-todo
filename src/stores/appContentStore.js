import { create } from 'zustand'

export const appContentStore = create(() => ({
  appContent: {
    heading: 'Remind Me',
    addTaskButton: 'Add task',
    editTaskButton: 'Edit',
    deleteTaskButton: 'Delete',
    // Form Labels
    dueDateLabel: 'Due Date',
    titleLabel: 'Title',
    descriptionLabel: 'Description',
    priorityLabel: 'Priority',
    // Placeholders
    taskTitlePlaceholder: 'Title',
    taskDescriptionPlaceholder: 'Description',
    // Priority options
    priorityPlaceholder: 'Priority',
    lowPriority: 'Low',
    mediumPriority: 'Medium',
    highPriority: 'High'
  }
}))
