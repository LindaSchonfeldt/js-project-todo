import styled from 'styled-components'
import { useTaskStore } from '../stores/useTaskStore'
import { CiSquareCheck } from 'react-icons/ci'
import { FaTrash } from 'react-icons/fa'

const StyledTaskItem = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
      color: #666;
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
    switch (props.priority) {
      case 'high':
        return '#ff5252'
      case 'medium':
        return '#ffb142'
      default:
        return '#69c0ff'
    }
  }};
  color: white;
`

const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff5252;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem 0.5rem 0;

  &:hover {
    color: #ff1744;
  }
`
const StyledCompleteButton = styled.button`
  background-color: transparent;
  color: #45a049;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #45a049;
    svg {
      transform: scale(1.1); /* Makes the icon slightly larger on hover */
    }
  }

  svg {
    transition: transform 0.2s ease;
  }
`

export const TaskItem = ({ task }) => {
  const { completeTask, removeTask } = useTaskStore()

  return (
    <StyledTaskItem completed={task.completed}>
      <div className='topRow'>
        {task.dueDate && (
          <p>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : '--/--/--'}
          </p>
        )}
        <StyledBadge priority={task.priority}>{task.priority}</StyledBadge>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}

      <div className='bottomRow'>
        <StyledDeleteButton onClick={() => removeTask(task.id)}>
          <FaTrash size={16} />
        </StyledDeleteButton>

        {!task.completed && (
          <StyledCompleteButton onClick={() => completeTask(task.id)}>
            <CiSquareCheck size={32} />
          </StyledCompleteButton>
        )}
      </div>
    </StyledTaskItem>
  )
}
