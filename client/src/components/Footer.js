import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className='footer'>
      <div className='footer-container'>
        <Link to='/'>Brand</Link>
        <Link to='/'>About</Link>
        <Link to='/'>Careers</Link>
        <Link to='/'>UK</Link>
        <div className='socials'>
          <Link to='/'><i className="fa-brands fa-facebook-square"></i></Link>
          <Link to='/'><i className="fa-brands fa-instagram"></i></Link>
          <Link target="_blank" to='https://github.com/giomine/sweden'><i className="fa-brands fa-github-square"></i></Link>
        </div>
      </div>
    </div>
  )
}


export default Footer