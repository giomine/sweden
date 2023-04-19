import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, isAuthenticated } from '../helpers/auth'
import { Link } from 'react-router-dom'
import Card from './Card'

const ProfilePage = () => {

  const [ profile, setProfile ] = useState('')
  const [ attractions, setAttractions ] = useState()
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
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/attractions/')
        setAttractions(data)
        // console.log('ATTRACTIONS -->', attractions)
        // console.log('ATTRACTIONS OWNER -->', attractions.map(attraction => attraction.owner.username))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/cities/')
        setCities(data)
        // console.log('CITIES -->', data)
        // console.log('CITIES OWNER -->', cities.map(city => city.owner.username))
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
                  <div style={{ margin: '0 10px' }}>Attractions added by {profile.username}</div>
                </div>

                <div className='grid-container'>
                  <div className='card-container'>
                    {attractions ? 
                      attractions.map(attraction => {
                        if (attraction.owner.id === profile.id) {
                          const { id, city, name, description } = attraction
                          return (
                            <div className='card' key={id}>
                              <Link to={`/city/${city.id}`}>
                                <div>{city.name} - {name} - {description}</div>
                              </Link>
                            </div>
                          )
                        }
                      })
                      : 'No cards added yet!'
                    }
                  </div>
                </div>

                <div className='grid-container'>
                  <div className='card-container'>
                    {cities ? 
                      cities.map(city => {
                        if (city.owner.id === profile.id) {
                          const { id, name, description, image } = city
                          return (
                            <div key={id}>
                              <Link to={`/city/${city.id}`}>
                                <Card 
                                  name={name}
                                  description={description}
                                  image={image}
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