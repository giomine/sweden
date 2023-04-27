import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageNavbar from './components/PageNavbar'
// import Card from './components/Card'
import Home from './components/Home'
import CityPage from './components/CityPage'
import ProfilePage from './components/ProfilePage'
import Register from './components/Register'
import Login from './components/Login'
import Footer from './components/Footer'
import CreateCity from './components/CreateCity'
import CreateAttraction from './components/CreateAttraction'
import EditCity from './components/EditCity'
import EditAttraction from './components/EditAttraction'
import OtherProfiles from './components/OtherProfiles'
import icon from './images/favicon.ico'



const App = () => {
  useEffect(() => {
    const favicon = document.getElementById('favicon')
    favicon.setAttribute('href', icon)
  }, [])
  
  return (
    <div className='page-container'>
      <BrowserRouter>
        <PageNavbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/city/:id' element={<CityPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/:id' element={<OtherProfiles />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createcity' element={<CreateCity />}/>
          <Route path='/editcity/:id' element={<EditCity />}/>
          <Route path='/createattraction' element={<CreateAttraction />}/>
          <Route path='/editattraction/:id' element={<EditAttraction />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
