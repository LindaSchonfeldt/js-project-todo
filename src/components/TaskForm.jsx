import { useTaskStore } from '../stores/useTaskStore'
import { useTaskFormStore } from '../stores/useTaskFormStore'

export const TaskForm = () => {
  const { addTask, getNextId } = useTaskStore()
  const { dueDate, title, description, priority, setField, resetForm } =
    useTaskFormStore()

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

    addTask(newTask)
    resetForm()
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='date'>Due date</label>
      <input
        type='date'
        id='dueDate'
        value={dueDate}
        onChange={(e) => setField('dueDate', e.target.value)}
        required
      />
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={title}
        onChange={(e) => setField('title', e.target.value)}
        required
      />
      <div>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setField('description', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='priority'>Priority</label>
        <select
          id='priority'
          value={priority}
          onChange={(e) => setField('priority', e.target.value)}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>
      <button type='submit'>Add Task</button>
    </form>
  )
}
