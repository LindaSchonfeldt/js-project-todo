import styled from 'styled-components'
import { media } from '../styles/media'
import { useState } from 'react'
import { useTaskStore } from '../stores/useTaskStore'
import { TaskItem } from './TaskItem'
import { Dropdown } from './Dropdown'

const StyledView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ViewTabs = styled.div`
  display: none;

  ${media.tablet} {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? '#4a90e2' : '#e0e0e0')};
  color: ${(props) => (props.$active ? 'white' : 'black')};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? '#4a90e2' : '#d0d0d0')};
  }
`

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
`

// Empty state message
const EmptyState = ({ view }) => {
  const messages = {
    today: "Good job! You don't have any current tasks.",
    'next seven days':
      "Work it! You don't have any upcoming tasks these seven next days.",
    completed: "You haven't completed any tasks yet.",
    all: "You don't have any tasks yet."
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p>{messages[view]}</p>
    </div>
  )
}

export const View = () => {
  const [activeView, setActiveView] = useState('today')
  const { tasks, completedTasks } = useTaskStore()

  // Add the handleViewChange function here
  const handleViewChange = (e) => {
    setActiveView(e.target.value)
  }

  // Get filtered tasks based on active view
  const getFilteredTasks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (activeView) {
      case 'today':
        return tasks.filter((task) => {
          // Tasks with no due date or due today/past
          if (!task.dueDate) return true
          const dueDate = new Date(task.dueDate)
          // Use getTime() for date comparison
          return dueDate.getTime() === today.getTime()
        })

      case 'next seven days':
        return tasks.filter((task) => {
          // Tasks due within the next 7 days
          if (!task.dueDate) return false

          const dueDate = new Date(task.dueDate)
          dueDate.setHours(0, 0, 0, 0)

          const oneWeekFromToday = new Date(today)
          oneWeekFromToday.setDate(today.getDate() + 7)

          // Use getTime() for date comparison
          return (
            dueDate.getTime() >= today.getTime() &&
            dueDate.getTime() <= oneWeekFromToday.getTime()
          )
        })

      case 'completed':
        return completedTasks

      case 'all':
        return [...(tasks || []), ...(completedTasks || [])]
      default:
        return tasks || []
    }
  }

  const filteredTasks = getFilteredTasks()

  const sortingOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Next seven days', value: 'next seven days' },
    { label: 'Completed', value: 'completed' },
    { label: 'All', value: 'all' }
  ]

  return (
    <StyledView>
      {/* Dropdown view for mobile */}
      <Dropdown
        options={sortingOptions}
        onChange={handleViewChange}
        value={activeView}
      >
        {sortingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Dropdown>

      <ViewTabs>
        <Tab
          $active={activeView === 'today'}
          onClick={() => setActiveView('today')}
        >
          Current
        </Tab>
        <Tab
          $active={activeView === 'next seven days'}
          onClick={() => setActiveView('next seven days')}
        >
          Upcoming
        </Tab>
        <Tab
          $active={activeView === 'completed'}
          onClick={() => setActiveView('completed')}
        >
          Completed
        </Tab>
        <Tab
          $active={activeView === 'all'}
          onClick={() => setActiveView('all')}
        >
          All
        </Tab>
      </ViewTabs>

      <TaskList>
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <EmptyState view={activeView} />
        )}
      </TaskList>
    </StyledView>
  )
}
