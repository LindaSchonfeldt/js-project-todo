import styled from 'styled-components'
import { useTaskStore } from '../stores/useTaskStore'

const StyledCounter = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem 0 2rem;
  gap: 1rem;
`

const CountItem = styled.div`
  background-color: var(--color-surface);
  border-radius: 8px;
  padding: 0.75rem;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .count {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => {
      switch (props.$type) {
        case 'today':
          return 'var(--color-primary-dark)'
        case 'upcoming':
          return 'var(--color-accent)'
        case 'completed':
          return 'var(--color-success)'
        default:
          return 'var(--color-text)'
      }
    }};
    margin-bottom: 0.25rem;
  }

  .label {
    font-size: 0.875rem;
    color: var(--color-text-light);
  }
`

// Then create the CountBadge component that's used in View.jsx
export const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  opacity: 0.8;
  margin-left: 4px;
  color: inherit;
`

export const Counter = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const completedTasks = useTaskStore((state) => state.completedTasks)

  // Get today's date at midnight
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Count today's tasks
  const todayCount = tasks.filter((task) => {
    if (!task.dueDate) return false
    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate.getTime() === today.getTime()
  }).length

  // Count upcoming tasks
  const upcomingCount = tasks.filter((task) => {
    if (!task.dueDate) return false
    const dueDate = new Date(task.dueDate)
    dueDate.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const oneWeekFromToday = new Date(today)
    oneWeekFromToday.setDate(today.getDate() + 7)

    return (
      dueDate.getTime() >= tomorrow.getTime() &&
      dueDate.getTime() <= oneWeekFromToday.getTime()
    )
  }).length

  return (
    <StyledCounter>
      <CountItem $type='today'>
        <div className='count'>{todayCount}</div>
        <div className='label'>Today</div>
      </CountItem>

      <CountItem $type='upcoming'>
        <div className='count'>{upcomingCount}</div>
        <div className='label'>Upcoming</div>
      </CountItem>

      <CountItem $type='completed'>
        <div className='count'>{completedTasks.length}</div>
        <div className='label'>Completed</div>
      </CountItem>
    </StyledCounter>
  )
}
