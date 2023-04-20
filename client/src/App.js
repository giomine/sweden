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


const App = () => {

  return (
    <div className='page-container'>
      <BrowserRouter>
        <PageNavbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/city/:id' element={<CityPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createcity' element={<CreateCity />}/>
          <Route path='/editcity/:id' element={<EditCity />}/>
          <Route path='/createattraction' element={<CreateAttraction />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
