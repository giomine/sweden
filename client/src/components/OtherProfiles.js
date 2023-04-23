import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Card from './Card'

const ProfilePage = () => {

  const { id } = useParams()

  const [ profile, setProfile ] = useState('')
  const [ attractions, setAttractions ] = useState()
  const [ cities, setCities ] = useState()
  const [ activeTab, setActiveTab ] = useState('tab3')


  const handleTab2 = () => {
    setActiveTab('tab2')
  }
  const handleTab3 = () => {
    setActiveTab('tab3')
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile/${id}`)
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  let claudios
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/attractions/')
        setAttractions(data)
        // console.log('ATTRACTIONS -->', data)
        // console.log('FIRST OWNER ID -->', data[0].owner.id)
        // console.log('ATTRACTIONS OWNERS -->', data.map(attraction => attraction.owner.id === profile.id))
        // console.log('CLAUDIOS ID -->', id)

      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[claudios])

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
      { profile ?
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

              <div style={{ display: 'flex' }} className='profile-section tabs-container'>
                <div onClick={handleTab3} className={activeTab === 'tab3' ? 'active tabs' : 'tabs'} >Cities</div>
                <div onClick={handleTab2} className={activeTab === 'tab2' ? 'active tabs' : 'tabs'} >Attractions</div>
              </div>

              <div className='edit-profile'>        

                {activeTab === 'tab2' && attractions &&
                  <div className='grid-container'>
                    <div className='card-container'>
                      {attractions.length > 0 ? 
                        attractions.map(attraction => {
                          if (attraction.owner.id === profile.id) {
                            const { id, city, name, description, image } = attraction
                            const shortDescription = description.slice(0,55) + '....'
                            let title = `${city.name} - ${name}`
                            title = title.slice(0,15) + '....'
                            return (
                              <div key={id}>
                                <Link to={`/city/${city.id}`}>
                                  <Card 
                                    cardClass={'card'}
                                    name={title}
                                    image={image}
                                    text={shortDescription}
                                  />
                                </Link>
                              </div>
                            )
                          }
                        })
                        : <><div></div><div>No attractions added yet!</div></>
                      }
                    </div>
                  </div>}

                {activeTab === 'tab3' && cities &&                
                  <div className='grid-container'>
                    <div className='card-container'>
                      {cities.length > 0 ? 
                        cities.map(city => {
                          if (city.owner.id === profile.id) {
                            const { id, name, image, description } = city
                            const shortDescription = description.slice(0,50) + '....'
                            return (
                              <div key={id}>
                                <Link to={`/city/${id}`}>
                                  <Card 
                                    cardClass={'card'}
                                    name={name}
                                    image={image}
                                    text={shortDescription}
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

        : 'Account not found'
      }
    </>
  )
}


export default ProfilePage