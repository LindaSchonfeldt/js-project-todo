# TODO App - Task Management Made Simple

A modern, responsive todo application built with React and styled-components that helps users organize and track their daily tasks efficiently.

## 🌟 Features

### Task Management

- **Create Tasks**: Add new tasks with title, description, due date, and priority levels (High, Medium, Low)
- **Complete/Uncomplete Tasks**: Mark tasks as complete or reactivate completed tasks with visual feedback
- **Delete Tasks**: Remove unwanted tasks from your list
- **Priority System**: Organize tasks by priority with color-coded indicators
- **Overdue Detection**: Visual warnings for tasks past their due date

### Smart Filtering & Views

- **All Tasks**: View all active (incomplete) tasks
- **Today**: See tasks due today
- **Upcoming**: Display tasks due within the next 7 days
- **Completed**: Review and manage finished tasks
- **No Date**: Tasks without assigned due dates
- **Task Counters**: Real-time count badges show the number of tasks in each category

### User Experience

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Clean Interface**: Modern UI with intuitive navigation
- **Visual Feedback**: Color-coded priority indicators, completion states, and overdue warnings
- **Form Validation**: Real-time validation with helpful error messages
- **Accessibility**: ARIA labels and semantic HTML for screen readers
- **Empty States**: Contextual messages when no tasks are available
- **Local Storage**: Tasks persist between browser sessions

### Visual Indicators

- **Priority Badges**: Color-coded badges for task priorities (only shown when due date exists)
- **Overdue Alerts**: Warning badges and styling for tasks past their due date
- **Completion States**: Visual feedback for completed vs. active tasks
- **Count Badges**: Dynamic counters in navigation tabs

## 🛠️ Technical Stack

- **Frontend**: React 18 with modern hooks (useState, useEffect)
- **Styling**: Styled-components for component-based CSS
- **State Management**: Zustand for lightweight, efficient state handling
- **Icons**: React Icons (FontAwesome)
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Netlify for seamless CI/CD
- **Data Persistence**: Browser localStorage for data persistence

## 🎨 Design Philosophy

The app follows a mobile-first approach with:

- **Minimalist Design**: Clean, distraction-free interface
- **Color-Coded Organization**: Visual hierarchy through consistent color schemes
- **Responsive Breakpoints**: Adaptive layout for all screen sizes
- **Performance Optimized**: Fast loading and smooth interactions
- **Accessibility First**: Screen reader support and keyboard navigation

## 🚀 Key Components

- **TaskForm**: Dynamic form with real-time validation for creating tasks
- **TaskItem**: Individual task display with completion, deletion, and priority indicators
- **View**: Filtered task displays with sorting by priority and due date
- **Counter**: Dashboard showing task counts by category
- **CountBadge**: Real-time task counters in navigation tabs
- **PriorityBadge**: Color-coded priority indicators
- **EmptyState**: Contextual messages for different view states
- **Button**: Reusable button component with multiple variants

## 📱 Responsive Features

- **Mobile**: Dropdown-based navigation for small screens
- **Desktop**: Tab-based navigation for larger screens
- **Adaptive UI**: Components that scale and reorganize based on viewport
- **Touch-Friendly**: Optimized button sizes for mobile interaction

## 🎯 Task States & Logic

- **Active Tasks**: Stored in main tasks array, shown in All/Today/Upcoming views
- **Completed Tasks**: Moved to separate completedTasks array, shown only in Completed view
- **Overdue Detection**: Automatic detection of tasks past their due date
- **Priority Sorting**: Tasks automatically sorted by priority (High → Medium → Low)

## 🔧 Form Validation

- **Required Fields**: Title is required for task creation
- **Real-time Validation**: Immediate feedback as users type
- **Disabled States**: Submit button disabled until form is valid
- **Error Messages**: Clear, contextual error messages

## Live Demo

Experience the app live at: [https://keen-tulumba-cda346.netlify.app/](https://keen-tulumba-cda346.netlify.app/)

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## 📂 Project Structure

```
/public
  └── index.html
/src
  ├── components
  │   ├── TaskForm.jsx
  │   ├── TaskItem.jsx
  │   ├── View.jsx
  │   ├── Counter.jsx
  │   ├── CountBadge.jsx
  │   ├── PriorityBadge.jsx
  │   └── EmptyState.jsx
  ├── hooks
  │   └── useTasks.js
  ├── styles
  │   └── GlobalStyle.js
  ├── App.jsx
  ├── index.jsx
  └── vite.config.js
```

---

_Built with ❤️ using modern web technologies for an optimal user experience._
