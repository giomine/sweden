import { useEffect, useState } from 'react'
import axios from 'axios'

const ProfilePage = () => {

  const [ profile, setProfile ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/2/')
        setProfile(data)
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  return (
    <div className='profile-page'>
      <div className='profile-container'>

        { profile ?
          <>
            <div className='profile-top'>
              <div className='profile-image' style={{ backgroundImage: `url('${profile.profile_image}')` }}></div>
              
              <div>
                <p>{profile.username}</p>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className='profile-section'>
              <div>Cards added by {profile.username}</div>
            </div>

            <div className='profile-section'>
              <div>Facts added by {profile.username}</div>
            </div>

            <div className='profile-section'>
              <div>Attractions added by {profile.username}</div>
            </div>

          </>


          : 'error'
        }

      </div>
    </div>
  )
}


export default ProfilePage