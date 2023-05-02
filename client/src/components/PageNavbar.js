import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout } from '../helpers/auth'
import { useEffect, useState } from 'react'
import { getToken } from '../helpers/auth'
import axios from 'axios'

const PageNavbar = () => {

  const navigate = useNavigate()
  const [ profile, setProfile ] = useState()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])

  return (
    <nav>
      <div className='nav-container'>
        <div>
          <Link className='flex' to='/'><div className='profile-image brand'></div><div>Discover</div></Link>
        </div>

        <div className='flex'>

          { isAuthenticated() ?
            profile &&
            <>
              <Link className='margin' to='/profile/'><div className='profile-image' style={{ backgroundImage: `url('${profile.profile_image}')` }}></div></Link>
              <Link to='/' onClick = {() => handleLogout(navigate)}>Logout</Link>
            </>
            :
            <>
              <Link className='margin' to='/register/'>Register</Link>
              <Link to='/login/'>Login</Link>
            </>
          }
        </div>
      </div>
    </nav>
  )
}


export default PageNavbar