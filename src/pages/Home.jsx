import { appContentStore } from '../stores/appContentStore'

export const Home = () => {
  const { appContent } = appContentStore() // Accessing (de-constructing) the appContent from Zustand store

  return (
    <div>
      <h1>{appContent.heading}</h1>
      <p>{appContent.description}</p>
    </div>
  )
}
