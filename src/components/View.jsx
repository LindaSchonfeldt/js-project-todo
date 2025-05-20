// Four different views
// 1. Current tasks
// 2. Upcoming tasks
// 3. Completed tasks
// 4. All tasks

import styled from 'styled-components'
import { useState } from 'react'
import { useTaskStore } from '../stores/useTaskStore'

const StyledView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ViewTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#4a90e2' : '#e0e0e0')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#4a90e2' : '#d0d0d0')};
  }
`

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const View = () => {
  const [activeView, setActiveView] = useState('current')
  const { tasks, completedTasks } = useTaskStore()

  // Get filtered tasks based on active view
  const getFilteredTasks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (activeView) {
      case 'current':
        return tasks.filter((task) => {
          // Tasks with no due date or due today/past
          if (!task.dueDate) return true
          const dueDate = new Date(task.dueDate)
          return dueDate <= today
        })

      case 'upcoming':
        return tasks.filter((task) => {
          // Tasks with future due date
          if (!task.dueDate) return false
          const dueDate = new Date(task.dueDate)
          return dueDate > today
        })

      case 'completed':
        return completedTasks

      case 'all':
        return [...tasks, ...completedTasks]

      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks()

  return (
    <StyledView>
      <ViewTabs>
        <Tab
          active={activeView === 'current'}
          onClick={() => setActiveView('current')}
        >
          Current
        </Tab>
        <Tab
          active={activeView === 'upcoming'}
          onClick={() => setActiveView('upcoming')}
        >
          Upcoming
        </Tab>
        <Tab
          active={activeView === 'completed'}
          onClick={() => setActiveView('completed')}
        >
          Completed
        </Tab>
        <Tab active={activeView === 'all'} onClick={() => setActiveView('all')}>
          All
        </Tab>
      </ViewTabs>

      <TaskList>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <EmptyState view={activeView} />
        )}
      </TaskList>
    </StyledView>
  )
}

// Empty state message
const EmptyState = ({ view }) => {
  const messages = {
    current: "You don't have any current tasks.",
    upcoming: "You don't have any upcoming tasks.",
    completed: "You haven't completed any tasks yet.",
    all: "You don't have any tasks yet."
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p>{messages[view]}</p>
    </div>
  )
}
