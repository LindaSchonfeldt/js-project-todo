import { Dropdown } from '../components/Dropdown'
import { TaskForm } from '../components/TaskForm'
import { View } from '../components/View'
import { appContentStore } from '../stores/appContentStore'
import { Counter } from '../components/CountBadge'

export const Home = () => {
  const { appContent } = appContentStore() // Accessing (de-constructing) the appContent from Zustand store

  return (
    <main aria-labelledby='page-heading'>
      <h1 id='page-heading'>{appContent.heading}</h1>
      <section aria-label='Add new task'>
        <TaskForm />
      </section>
      <section aria-label='Task list view'>
        <View />
      </section>
    </main>
  )
}
