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
          
          {/* TEMPORARY LINKS FOR DEBUGGING */}
          <Link style={{ color: 'black', marginRight: '5px' }} to='/city'>Sgl</Link>
          <Link style={{ color: 'black', marginRight: '5px' }} to='/profile'>Prof</Link>
          <Link style={{ color: 'black', marginRight: '5px' }} to='/createcity'>CrCi</Link>
          <Link style={{ color: 'black', marginRight: '5px' }} to='/createattraction'>CrAtt</Link>


          <Link className='margin' to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </nav>
  )
}


export default PageNavbar