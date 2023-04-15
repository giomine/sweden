import { Link } from 'react-router-dom'

const PageNavbar = () => {

  return (
    <nav>
      <div className='nav-container'>
        <div>
          <Link to='/'>Home</Link>
        </div>

        <div>
          {/* <Link className='margin' to='/profile'>Profile</Link>
          <Link to='/'>Logout</Link> */}
          <Link className='margin' to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </nav>
  )
}


export default PageNavbar