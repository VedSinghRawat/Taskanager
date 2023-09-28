import { FC } from 'react'
import Header from './Components/UI/Header'
import { Outlet, useParams } from 'react-router-dom'

const App: FC = () => {
  const { history } = useParams()

  return (
    <div className={`bg-primary-600 ${history ? 'min-h-screen' : 'min-h-[calc(100vh-0.5rem)] '} relative w-fit min-w-full flex flex-col`}>
      <Header />

      <Outlet />
    </div>
  )
}

export default App
