import { Dropdown } from '../components/Dropdown'
import { TaskForm } from '../components/TaskForm'
import { View } from '../components/View'
import { appContentStore } from '../stores/appContentStore'

export const Home = () => {
  const { appContent } = appContentStore() // Accessing (de-constructing) the appContent from Zustand store

  return (
    <>
      <h1>{appContent.heading}</h1>
      <TaskForm />
      <View />
      <Dropdown />
    </>
  )
}
