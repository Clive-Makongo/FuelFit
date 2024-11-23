import Card from './components/manual/card'
import Navbar from './components/manual/Nav/Navbar'
import './index.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-500 p-4 text-white">Test Styling</div>
      <Card/>
    </>
  )
}

export default App
