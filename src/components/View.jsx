import styled from 'styled-components'
import { useState } from 'react'
import { useTaskStore } from '../stores/useTaskStore'
import { TaskItem } from './TaskItem'
import { Dropdown } from './Dropdown'
import { Tabs, Tab } from './Tabs'

const StyledView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--color-text-light)'
      }}
    >
      <p>{messages[view]}</p>
    </div>
  )
}

export const View = () => {
  const [activeView, setActiveView] = useState('all')
  const { tasks, completedTasks } = useTaskStore()

  // Add the handleViewChange function here
  const handleViewChange = (e) => {
    setActiveView(e.target.value)
  }

  // Function to sort tasks by priority
  const sortTasksByPriority = (tasksToSort) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 }

    return [...tasksToSort].sort((a, b) => {
      // First sort by priority
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }

      // If priorities are the same, sort by due date (if available)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }

      // Tasks with due dates come before tasks without due dates
      if (a.dueDate && !b.dueDate) return -1
      if (!a.dueDate && b.dueDate) return 1

      // If all else is equal, sort by title alphabetically
      return a.title.localeCompare(b.title)
    })
  }

  // Get filtered tasks based on active view
  const getFilteredTasks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let filteredTasks

    switch (activeView) {
      case 'all':
        filteredTasks = [...(tasks || []), ...(completedTasks || [])]
        break

      case 'today':
        filteredTasks = tasks.filter((task) => {
          // Tasks with no due date or due today/past
          if (!task.dueDate) return true
          const dueDate = new Date(task.dueDate)
          dueDate.setHours(0, 0, 0, 0)
          // Use getTime() for date comparison
          return dueDate.getTime() === today.getTime()
        })
        break

      case 'next seven days':
        filteredTasks = tasks.filter((task) => {
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
        break

      case 'completed':
        filteredTasks = completedTasks || []
        break

      default:
        filteredTasks = tasks || []
    }

    // Apply priority sorting to the filtered tasks
    return sortTasksByPriority(filteredTasks)
  }

  const filteredTasks = getFilteredTasks()

  const sortingOptions = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Next seven days', value: 'next seven days' },
    { label: 'Completed', value: 'completed' }
  ]

  return (
    <StyledView>
      {/* Dropdown view for mobile and tablet */}
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

      <Tabs>
        <Tab
          $active={activeView === 'all'}
          onClick={() => setActiveView('all')}
        >
          All
        </Tab>
        <Tab
          $active={activeView === 'today'}
          onClick={() => setActiveView('today')}
        >
          Today
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
      </Tabs>

      <TaskList>
        {/* Render tasks */}
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <EmptyState view={activeView} />
        )}
      </TaskList>
    </StyledView>
  )
}
