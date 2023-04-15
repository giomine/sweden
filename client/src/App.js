import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageNavbar from './components/PageNavbar'
// import Card from './components/Card'
import Home from './components/Home'
import CityPage from './components/CityPage'
import ProfilePage from './components/ProfilePage'
import Register from './components/Register'
import Login from './components/Login'
import Footer from './components/Footer'


const App = () => {

  return (
    <div>
      <BrowserRouter>
        <PageNavbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/city' element={<CityPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
