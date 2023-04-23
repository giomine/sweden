import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout } from '../helpers/auth'

const PageNavbar = () => {

  const navigate = useNavigate()

  return (
    <nav>
      <div className='nav-container'>
        <div>
          <Link to='/'>Home</Link>
        </div>

        <div>
          {/* TEMPORARY LINKS FOR DEBUGGING */}
          {/* <Link style={{ color: 'black', marginRight: '5px' }} to='/city/8'>Sgl</Link> */}
          {/* <Link style={{ color: 'black', marginRight: '5px' }} to='/profile'>Prof</Link>
          <Link style={{ color: 'black', marginRight: '5px' }} to='/createcity'>CrCi</Link>
          <Link style={{ color: 'black', marginRight: '5px' }} to='/createattraction'>CrAtt</Link> */}

          { isAuthenticated() ?
            <>
              <Link className='margin' to='/profile'>Profile</Link>
              <Link to='/' onClick = {() => handleLogout(navigate)}>Logout</Link>
            </>
            :
            <>
              <Link className='margin' to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </>
          }
        </div>
      </div>
    </nav>
  )
}


export default PageNavbar