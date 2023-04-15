import { Link } from 'react-router-dom'

const PageNavbar = () => {

  return (
    <nav>
      <Link to='/'>Home</Link>
      {/* <Link to='/profile'>Profile</Link>
      <Link to='/'>Logout</Link> */}
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </nav>
  )
}


export default PageNavbar