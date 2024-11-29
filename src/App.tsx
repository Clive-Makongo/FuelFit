import Home from './containers/Home'
import { PageProvider } from './components/manual/Context/pageContext'
import './index.css'

function App() {
  return (
    <>
      <PageProvider>
        <Home />
      </PageProvider>
    </>
  )
}

export default App
