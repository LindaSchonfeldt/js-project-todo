import styled from 'styled-components'
import { useTaskStore } from '../stores/useTaskStore'
import { useTaskFormStore } from '../stores/useTaskFormStore'
import { appContentStore } from '../stores/appContentStore'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }

  button {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`

export const TaskForm = () => {
  const { addTask, getNextId, saveToLocalStorage } = useTaskStore()
  const { dueDate, title, description, priority, setField, resetForm } =
    useTaskFormStore()
  const { appContent } = appContentStore() // Accessing (de-constructing) the appContent from Zustand store

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTask = {
      id: getNextId(),
      dueDate: dueDate,
      title,
      description,
      priority,
      completed: false
    }
    console.log('New Task:', newTask)
    // Add the new task to the store
    addTask(newTask)
    // Save to localStorage AFTER adding the task
    saveToLocalStorage()
    resetForm()
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type='date'
        id='dueDate'
        name='dueDate'
        value={dueDate || ''}
        onChange={(e) => setField('dueDate', e.target.value)}
        onClick={(e) => e.currentTarget.showPicker()} // Force open the date picker on click
      />
      <input
        type='text'
        id='title'
        name='title'
        placeholder={appContent.taskTitlePlaceholder || 'Title'}
        value={title}
        onChange={(e) => setField('title', e.target.value)}
        required
      />
      <div>
        <textarea
          id='description'
          placeholder={appContent.taskDescriptionPlaceholder || 'Description'}
          value={description}
          onChange={(e) => setField('description', e.target.value)}
        />
      </div>
      <div>
        <select
          id='priority'
          placeholder='Priority'
          value={priority || 'low'}
          onChange={(e) => setField('priority', e.target.value)}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>
      <button type='submit'>{appContent.addTaskButton || 'Add'}</button>
    </StyledForm>
  )
}
