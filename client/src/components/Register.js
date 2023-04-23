import { useState, useEffect } from 'react'
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
    if (formFields.profile_image === ''){
      formFields.profile_image = 'https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
    }
    try {
      console.log(formFields)
      await axios.post('/api/auth/register/', formFields)
      navigate('/login')
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
          <h1>Register</h1>
          <label htmlFor="username"></label>
          <input type="text" name="username" placeholder="username" onChange={handleChange} value={formFields.username} />
          <label htmlFor="email"></label>
          <input type="text" name="email" placeholder="email" onChange={handleChange} value={formFields.email} />
          <label htmlFor="password"></label>
          <input type="password" name="password" placeholder="password" onChange={handleChange} value={formFields.password} />
          <label htmlFor="password_confirmation"></label>
          <input type="password" name="password_confirmation" placeholder="confirm password" onChange={handleChange} value={formFields.password_confirmation} />

          <div style={{ width: '90%', color: 'gray', margin: '20px 0 -15px' }}>* Optional</div>
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