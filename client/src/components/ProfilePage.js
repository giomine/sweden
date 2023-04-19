import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, isAuthenticated } from '../helpers/auth'
import { Link } from 'react-router-dom'
import Card from './Card'
import EditProfile from './EditProfile'

const ProfilePage = () => {

  const [ profile, setProfile ] = useState('')
  const [ attractions, setAttractions ] = useState()
  const [ cities, setCities ] = useState()
  const [ activeTab, setActiveTab ] = useState('tab1')
  const [ editTab, setEditTab ] = useState(false)

  const handleTab1 = () => {
    setActiveTab('tab1')
  }
  const handleTab2 = () => {
    setActiveTab('tab2')
  }
  const handleTab3 = () => {
    setActiveTab('tab3')
  }

  const handleClick = () => {
    setEditTab(!editTab)
    setActiveTab('tab1')
  }

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
                  <div onClick={handleClick} className='profile-image' style={{ backgroundImage: `url('${profile.profile_image}')` }}></div>
                  
                  <div>
                    <p>{profile.username}</p>
                    <p>{profile.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex' }} className='profile-section tabs-container'>
                  <div onClick={handleTab1} className={activeTab === 'tab1' ? 'active tabs' : 'tabs'} >Profile</div>
                  <div onClick={handleTab3} className={activeTab === 'tab3' ? 'active tabs' : 'tabs'} >Cards</div>
                  <div onClick={handleTab2} className={activeTab === 'tab2' ? 'active tabs' : 'tabs'} >Attractions</div>
                </div>

                <div className='edit-profile'>        
                  {activeTab === 'tab1' && 
                  <>
                    {/* <div>No profile info</div> */}
                    {editTab === false &&
                    <>
                      <button className='button' onClick={handleClick}>Upload new profile photo</button>
                    </>
                    }
                    <div>
                      {editTab === true &&
                      <div>
                        <EditProfile />
                      </div>
                      }
                    </div>
                  </>}

                  {activeTab === 'tab2' && 
                  <div className='grid-container'>
                    <div className='card-container'>
                      {attractions.length > 0 ? 
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
                        : <><div></div><div>No attractions added yet!</div></>
                      }
                    </div>
                  </div>}

                  {activeTab === 'tab3' &&                 
                  <div className='grid-container'>
                    <div className='card-container'>
                      {cities.length > 0 ? 
                        cities.map(city => {
                          if (city.owner.id === profile.id) {
                            const { id, name, image } = city
                            return (
                              <div key={id}>
                                <Link to={`/city/${city.id}`}>
                                  <Card 
                                    name={name}
                                    image={image}
                                  />
                                </Link>
                              </div>
                            )
                          }
                        })
                        : <><div></div><div>No cards added yet!</div></>
                      }
                    </div>
                  </div>}

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