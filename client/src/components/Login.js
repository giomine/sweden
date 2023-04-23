import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../helpers/auth'


const Login = () => {
  const navigate = useNavigate()

  const [ formFields, setFormFields ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(formFields)
      const response = await axios.post('api/auth/login/', formFields)
      // console.log(response.data.token)
      setToken(response.data.token)
      navigate('/profile/')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='register'>
      <div className='register-border'>
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="email"></label>
          <input type="text" name="email" placeholder="email" onChange={handleChange} value={formFields.email} />
          <label htmlFor="password"></label>
          <input type="password" name="password" placeholder="password" onChange={handleChange} value={formFields.password} />
          <button>Log in</button>
        </form>     
      </div>
    </div>
  )
}


export default Login