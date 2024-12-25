import './App.css'
import HomePage from './pages/HomePage'
import { ThreatsProvider } from './service/context'

function App() {

  return (
    <>
      <ThreatsProvider>
      <HomePage/>
    </ThreatsProvider>
    </>
  )
}

export default App
