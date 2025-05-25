import styled from 'styled-components'
import { useTaskStore } from '../stores/useTaskStore'
import { FaRegSquare, FaRegSquareCheck } from 'react-icons/fa6'
import { FaTrash } from 'react-icons/fa'
import { formatDate } from '../utils/dateUtils'

const StyledTaskItem = styled.div`
  padding: 1rem;
  background-color: var(--color-surface);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(var(--color-text-rgb, 0, 0, 0), 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .topRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.5rem;
    p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--color-text-light);
    }
  }
  .bottomRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.5rem;
  }
`

// Badge for priority
const StyledBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${(props) => {
    switch (props.$priority) {
      case 'high':
        return 'var(--color-priority-high)'
      case 'medium':
        return 'var(--color-priority-medium)'
      default:
        return 'var(--color-priority-low)'
    }
  }};
  color: var(--color-surface);
`

const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-error);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem 0.5rem 0;

  &:hover {
    color: var(--color-accent-dark);
  }
`
const StyledCompleteButton = styled.button`
  background-color: transparent;
  color: ${(props) =>
    props.completed ? 'var(--color-success)' : 'var(--color-secondary)'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make the icon bolder/filled when task is completed */
  svg {
    transition: transform 0.2s ease, color 0.2s ease;
    transform: ${(props) => (props.completed ? 'scale(1.1)' : 'scale(1)')};
  }

  &:hover {
    color: var(--color-secondary-dark);
    svg {
      transform: scale(1.1);
    }
  }
`

export const TaskItem = ({ task }) => {
  console.log('Task in TaskItem:', task)

  const { completeTask, removeTask } = useTaskStore()

  // Add defensive check for task properties
  if (!task) return null
  return (
    <StyledTaskItem $completed={task.completed}>
      <div className='topRow'>
        <p>{task.dueDate ? formatDate(task.dueDate) : 'No due date'}</p>
        <StyledBadge $priority={task.priority || 'low'}>
          {task.priority || 'low'}
        </StyledBadge>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}

      <div className='bottomRow'>
        <StyledDeleteButton
          onClick={() => removeTask(task.id)}
          aria-label='Delete task'
        >
          <FaTrash size={16} />
        </StyledDeleteButton>

        <StyledCompleteButton
          onClick={() => completeTask(task.id)}
          aria-label={
            task.completed ? 'Mark as incomplete' : 'Mark as complete'
          }
          $completed={task.completed}
        >
          {task.completed ? (
            <FaRegSquareCheck size={32} />
          ) : (
            <FaRegSquare size={32} />
          )}
        </StyledCompleteButton>
      </div>
    </StyledTaskItem>
  )
}
