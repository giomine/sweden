import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, isAuthenticated } from '../helpers/auth'
import Card from './Card'
import { Link } from 'react-router-dom'

const ProfilePage = () => {

  const [ profile, setProfile ] = useState('')
  const [ cities, setCities ] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setProfile(data)
        // console.log('Original profile -->', profile)
        // console.log('USER ID -->', profile.id)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/sweden/')
        setCities(data)
        // console.log('all cities -->', data.map(city => city))
        // console.log('cities -->', data.map(city => city.owner.id))
        const arr = []
        data.map(city => city.owner.id === profile.id && arr.push(city))
        // setCities(arr)
        // console.log('CITIES BELONGING TO THIS USER -->', arr)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  return (
    <>
      { isAuthenticated() ?
        profile ?
          <div className='profile-page'>
            <div className='profile-container'>
            

              <>
                <div className='profile-top'>
                  <div className='profile-image' style={{ backgroundImage: `url('${profile.profile_image}')` }}></div>
                  
                  <div>
                    <p>{profile.username}</p>
                    <p>{profile.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex' }} className='profile-section'>
                  <div style={{ margin: '0 10px' }}>Cards added by {profile.username}</div>
                  <div style={{ margin: '0 10px' }}>Facts added by {profile.username}</div>
                  <div style={{ margin: '0 10px' }}>Attractions added by {profile.username}</div>
                </div>

                <div className='grid-container'>
                  <div className='card-container'>
                    {cities ? 
                      cities.map(city => {
                        if (city.owner.id === profile.id) {
                          const { id, image, name, description } = city
                          return (
                            <div key={id}>
                              <Link to={`/city/${id}`}>
                                <Card
                                  image={image}
                                  name={name}
                                  description={description}
                                />
                              </Link>
                            </div>
                          )
                        }
                      })
                      : 'No cards added yet!'
                    }
                  </div>
                </div>

                <div  style={{ display: 'none' }} className='profile-section'>
                  <div>Facts added by {profile.username}</div>
                </div>

                <div style={{ display: 'none' }} className='profile-section'>
                  <div>Attractions added by {profile.username}</div>
                </div>
              </>


            </div>
          </div>

          : 'error'
          
        : 'please log in!'
      }
    </>
  )
}


export default ProfilePage