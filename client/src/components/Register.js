import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProfileUpload from './ProfileUpload'


const Register = () => {

  const navigate = useNavigate()

  const [ formFields, setFormFields ] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
  })


  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
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
          <ProfileUpload 
            setFormFields={setFormFields}
            formFields={formFields}
          />
          <button>Register</button>
        </form>     
      </div>
    </div>
  )
}


export default Register