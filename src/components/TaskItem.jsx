import { FaTrash } from 'react-icons/fa'
import { FaRegSquare, FaRegSquareCheck } from 'react-icons/fa6'
import styled from 'styled-components'

import { useTaskStore } from '../stores/useTaskStore'
import { formatDate } from '../utils/dateUtils'
import { PriorityBadge } from './PriorityBadge'

const StyledTaskItem = styled.div`
  padding: 1rem;
  background-color: var(--color-surface);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(var(--color-text-rgb, 0, 0, 0), 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  /* Add overdue styling */
  ${(props) =>
    props.$overdue &&
    !props.$completed &&
    `
    border-left: 4px solid var(--color-danger);
    background-color: rgba(var(--color-danger-rgb, 220, 53, 69), 0.05);
  `}

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
      color: ${(props) =>
        props.$overdue && !props.$completed
          ? 'var(--color-danger)'
          : 'var(--color-text-light)'};
      font-weight: ${(props) =>
        props.$overdue && !props.$completed ? 'bold' : 'normal'};
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
const StyledOverdueBadge = styled.span`
  background-color: rgba(220, 53, 69, 0.1);
  color: var(--color-danger);
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`

export const TaskItem = ({ task }) => {
  const { completeTask, uncompleteTask, removeTask } = useTaskStore()

  const handleToggleComplete = () => {
    if (task.completed) {
      uncompleteTask(task.id)
    } else {
      completeTask(task.id)
    }
  }

  // Add defensive check for task properties
  if (!task) return null

  const isOverdue = (dueDate) => {
    if (!dueDate) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const taskDue = new Date(dueDate)
    taskDue.setHours(0, 0, 0, 0)

    return taskDue.getTime() < today.getTime()
  }

  const taskIsOverdue = isOverdue(task.dueDate)

  return (
    <StyledTaskItem $completed={task.completed} $overdue={taskIsOverdue}>
      <div className='topRow'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>{task.dueDate ? formatDate(task.dueDate) : 'No due date'}</p>
          {taskIsOverdue && <StyledOverdueBadge>⚠️ Overdue</StyledOverdueBadge>}
        </div>
        {/* Only show PriorityBadge if there's a due date */}
        {task.dueDate && <PriorityBadge priority={task.priority} />}
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
          onClick={handleToggleComplete}
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
