import styled from 'styled-components'
import { useState } from 'react'
import { useTaskStore } from '../stores/useTaskStore'
import { TaskItem } from './TaskItem'
import { Dropdown } from './Dropdown'
import { Tabs, Tab } from './Tabs'
import { CountBadge } from './CountBadge'

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
    all: "You don't have any tasks yet.",
    today: "Good job! You don't have any tasks for today.",
    upcoming:
      "Work it! You don't have any upcoming tasks for the next seven days.",
    completed: "You haven't completed any tasks yet."
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--color-text-light)'
      }}
    >
      <p>{messages[view] || 'No tasks to display.'}</p>
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
        // Show only incomplete tasks in the "all" view
        filteredTasks = [...tasks]
        break

      case 'today':
        filteredTasks = tasks.filter((task) => {
          // Only include incomplete tasks due today
          if (!task.dueDate) return false
          const dueDate = new Date(task.dueDate)
          dueDate.setHours(0, 0, 0, 0)
          return dueDate.getTime() === today.getTime()
        })
        break

      case 'upcoming':
        filteredTasks = tasks.filter((task) => {
          // Tasks due within the next 7 days (excluding today)
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
        })
        break

      case 'completed':
        // Only show completed tasks in the completed view
        filteredTasks = completedTasks || []
        break

      case 'no-date':
        // Only show tasks without dates
        filteredTasks = tasks.filter((task) => !task.dueDate)
        break

      default:
        filteredTasks = tasks
    }

    // Apply priority sorting to the filtered tasks
    return sortTasksByPriority(filteredTasks)
  }

  // Add these functions to calculate counts
  const getAllTasksCount = () => tasks.length + completedTasks.length
  const getTodayTasksCount = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return tasks.filter((task) => {
      if (!task.dueDate) return false
      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)
      return dueDate.getTime() === today.getTime()
    }).length
  }

  const getUpcomingTasksCount = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const oneWeekFromToday = new Date(today)
    oneWeekFromToday.setDate(today.getDate() + 7)

    return tasks.filter((task) => {
      if (!task.dueDate) return false
      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)
      return (
        dueDate.getTime() >= tomorrow.getTime() &&
        dueDate.getTime() <= oneWeekFromToday.getTime()
      )
    }).length
  }

  const getCompletedTasksCount = () => completedTasks.length

  const sortingOptions = [
    { label: `All (${getAllTasksCount()})`, value: 'all' },
    { label: `Today (${getTodayTasksCount()})`, value: 'today' },
    { label: `Upcoming (${getUpcomingTasksCount()})`, value: 'upcoming' },
    { label: `Completed (${getCompletedTasksCount()})`, value: 'completed' }
  ]

  return (
    <StyledView>
      <Dropdown
        options={sortingOptions}
        onChange={handleViewChange}
        value={activeView}
      />

      <Tabs>
        <Tab
          $active={activeView === 'all'}
          onClick={() => setActiveView('all')}
        >
          All{' '}
          <CountBadge>
            {getAllTasksCount() > 0 ? `(${getAllTasksCount()})` : ''}
          </CountBadge>
        </Tab>
        <Tab
          $active={activeView === 'today'}
          onClick={() => setActiveView('today')}
        >
          Today <CountBadge>({getTodayTasksCount()})</CountBadge>
        </Tab>
        <Tab
          $active={activeView === 'upcoming'}
          onClick={() => setActiveView('upcoming')}
        >
          Upcoming <CountBadge>({getUpcomingTasksCount()})</CountBadge>
        </Tab>
        <Tab
          $active={activeView === 'completed'}
          onClick={() => setActiveView('completed')}
        >
          Completed <CountBadge>({getCompletedTasksCount()})</CountBadge>
        </Tab>
      </Tabs>

      {getFilteredTasks().length === 0 ? (
        <EmptyState view={activeView} />
      ) : (
        <TaskList>
          {getFilteredTasks().map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TaskList>
      )}
    </StyledView>
  )
}
