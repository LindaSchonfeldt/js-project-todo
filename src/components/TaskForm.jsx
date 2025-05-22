import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTaskStore } from '../stores/useTaskStore'
import { useTaskFormStore } from '../stores/useTaskFormStore'
import { appContentStore } from '../stores/appContentStore'
import { Button } from './Button'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(var(--color-text-rgb, 0, 0, 0), 0.1);

  input,
  textarea,
  select,
  button {
    font-family: 'DM Sans', sans-serif;
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s ease;
    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb, 74, 144, 226), 0.2);
    }
  }

  button {
    margin-top: 1rem;
    background-color: var(--color-primary);
    color: var(--color-surface);
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-primary-dark);
    }

    &:disabled {
      background-color: var(--color-border);
      cursor: not-allowed;
    }
  }

  .error-message {
    color: var(--color-error);
    font-size: 0.85rem;
    margin-top: -0.25rem;
    margin-bottom: 0.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--color-text);
  }

  h1,
  h2,
  h3 {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700; /* Bold */
  }

  p {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400; /* Regular */
  }

  button {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500; /* Medium */
  }
`

export const TaskForm = () => {
  const { addTask, getNextId } = useTaskStore()
  const {
    dueDate,
    title,
    description,
    priority,
    errors,
    setField,
    resetForm,
    validateField,
    validateForm
  } = useTaskFormStore()
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(validateForm())
  }, [dueDate, title, description, priority, validateForm])

  const { appContent } = appContentStore()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form before submission
    if (!isFormValid) {
      return
    }

    const newTask = {
      id: getNextId(),
      dueDate,
      title,
      description,
      priority,
      completed: false
    }

    // Add the new task to the store (it will automatically save to localStorage)
    addTask(newTask)
    resetForm()
  }

  const handleBlur = (field) => {
    validateField(field)
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='dueDate' className='visually-hidden'>
          {appContent.dueDateLabel || 'Due Date'}
        </label>
        <input
          type='date'
          id='dueDate'
          name='dueDate'
          value={dueDate || ''}
          onChange={(e) => setField('dueDate', e.target.value)}
          onBlur={() => handleBlur('dueDate')}
          lang='en-US'
          data-date-format='MM/DD/YYYY'
          onClick={(e) => {
            try {
              e.currentTarget.showPicker()
            } catch (err) {
              // Fallback for browsers that don't support showPicker
              console.log(
                'Date picker not supported in this browser:',
                err.message
              )
            }
          }}
        />
        {errors.dueDate && <p className='error-message'>{errors.dueDate}</p>}
      </div>
      <div className='form-group'>
        <label htmlFor='title' className='visually-hidden'>
          {appContent.titleLabel || 'Title'}
        </label>
        <input
          type='text'
          id='title'
          name='title'
          placeholder={appContent.taskTitlePlaceholder || 'Enter task title'}
          value={title}
          onChange={(e) => setField('title', e.target.value)}
          onBlur={() => handleBlur('title')}
          required
        />
        {errors.title && <p className='error-message'>{errors.title}</p>}
      </div>{' '}
      <div className='form-group'>
        <label htmlFor='description' className='visually-hidden'>
          {appContent.descriptionLabel || 'Description'}
        </label>
        <textarea
          id='description'
          name='description'
          placeholder={
            appContent.taskDescriptionPlaceholder || 'Enter task description'
          }
          value={description}
          onChange={(e) => setField('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          rows='3'
        />
        {errors.description && (
          <p className='error-message'>{errors.description}</p>
        )}
      </div>
      <div className='form-group'>
        <label htmlFor='priority' className='visually-hidden'>
          {appContent.priorityLabel || 'Priority'}
        </label>
        <select
          id='priority'
          name='priority'
          value={priority || 'low'}
          onChange={(e) => setField('priority', e.target.value)}
          onBlur={() => handleBlur('priority')}
        >
          <option value='low'>{appContent.lowPriority || 'Low'}</option>
          <option value='medium'>
            {appContent.mediumPriority || 'Medium'}
          </option>
          <option value='high'>{appContent.highPriority || 'High'}</option>
        </select>
        {errors.priority && <p className='error-message'>{errors.priority}</p>}
      </div>
      <Button type='submit' disabled={!isFormValid}>
        {appContent.addTaskButton || 'Add Task'}
      </Button>
    </StyledForm>
  )
}
