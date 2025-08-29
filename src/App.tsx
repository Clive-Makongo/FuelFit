import { PageProvider } from './components/manual/Context/pageContext'
import { Route, Routes } from "react-router-dom"
import Home from './containers/Home'
import Meal from './containers/Meal'
import Workout from './containers/Workout'
import SelfCare from './containers/SelfCare'
import Navbar from './components/manual/Navbar/Navbar'
import { useWindowSize } from './utils/useWindowSize'
import { MealProvider } from './components/manual/Context/MealContext'
import './index.css'

function App() {
  const { width } = useWindowSize();
  const isMobile: boolean = width < 768
  return (
    <>
      <MealProvider>
        <PageProvider>
          {!isMobile && <Navbar />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/meal' element={<Meal />} />
            <Route path='/workout' element={<Workout />} />
            <Route path='/selfCare' element={<SelfCare />} />
          </Routes>

          {/* <Home /> */}
        </PageProvider>
      </MealProvider>
    </>
  )
}

export default App
