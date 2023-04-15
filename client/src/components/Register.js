import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate()

  const [ formFields, setFormFields ] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: 'http://localhost.lulu.png',
  })


  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: [e.target.value] })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      formFields.username = formFields.username[0]
      formFields.email = formFields.email[0]
      formFields.password = formFields.password[0]
      formFields.password_confirmation = formFields.password_confirmation[0]
      console.log(formFields)
      await axios.post('/api/auth/register/', formFields)
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='register'>
      <div className='register-border'>
        <form action="" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="username"></label>
          <input type="text" name="username" placeholder="username" onChange={handleChange} value={formFields.username} />
          <label htmlFor="email"></label>
          <input type="text" name="email" placeholder="email" onChange={handleChange} value={formFields.email} />
          <label htmlFor="password"></label>
          <input type="password" name="password" placeholder="password" onChange={handleChange} value={formFields.password} />
          <label htmlFor="password_confirmation"></label>
          <input type="password" name="password_confirmation" placeholder="confirm password" onChange={handleChange} value={formFields.password_confirmation} />
          <button>Register</button>
        </form>     
      </div>
    </div>
  )
}


export default Register