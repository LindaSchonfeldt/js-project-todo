import styled from 'styled-components'
import { useTaskStore } from '../stores/useTaskStore'

const StyledTaskItem = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  &:hover {
    color: #ff1744;
  }
`

export const TaskItem = ({ task }) => {
  const { completeTask, removeTask } = useTaskStore()

  return (
    <StyledTaskItem completed={task.completed}>
      <div>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
        <StyledDeleteButton onClick={() => removeTask(task.id)}>
          Delete
        </StyledDeleteButton>
        <StyledBadge priority={task.priority}>{task.priority}</StyledBadge>
      </div>

      <div>
        {!task.completed && (
          <button onClick={() => completeTask(task.id)}>Complete</button>
        )}
      </div>
    </StyledTaskItem>
  )
}
