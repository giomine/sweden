import ProfileUpload from './ProfileUpload.js'
import { getToken } from '../helpers/auth'
import { useState } from 'react'
import axios from 'axios'

const EditProfile = () => {

  const [ newUser, setNewUser] = useState({
    // username: '',
    // email: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })

  const [ toggle, setToggle ] = useState(false)

  const handleConfirm = () => {
    setToggle(!toggle)
    console.log(toggle)
  }

  const handlePassword = (e) => {
    setNewUser({ ...newUser, password: e.target.value, password_confirmation: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      // console.log(newUser)
      await axios.put('/api/auth/profile/', newUser, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      window.location.reload() // naughty but it'll do for now
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <div className='form-container'>
        <div className="form-border">

          <form action="" onSubmit={handleSubmit}>

            {/* <label htmlFor="username"></label>
            <input type="text" name="username" placeholder='update username' value={newUser.username} />
            <label htmlFor="email"></label>
            <input type="email" name="email" placeholder='update email' value={newUser.email}  /> */}

            <h3>Upload photo</h3>

            <ProfileUpload 
              setFormFields={setNewUser}
              formFields={newUser}
            />

            {toggle === true &&
            <>
              <label htmlFor="password"></label>
              <input style={{ marginBottom: '10px' }} type="password" name="password" placeholder='Enter password to confirm changes' value={newUser.password} onChange={handlePassword} />
            </>
            }
            
            <button className='button' type="submit" onClick={handleConfirm}>Submit</button>

          </form>

        </div>
      </div>
      
    </>
  )
}


export default EditProfile