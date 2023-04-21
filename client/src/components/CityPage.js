import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })

const CityPage = () => {

  const { id } = useParams()

  const [ city, setCity ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/cities/${id}/`)
        setCity(data)
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        
        { city ?
          <>
            <Map
              center={[city.long, city.lat]}
              zoom={[10]}
              mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
              style="mapbox://styles/mapbox/streets-v8"
              containerStyle={{
                height: '30vh',
                width: '100vw',
              }}>
              <Marker
                coordinates={[city.long, city.lat]}
                anchor="bottom">
                <i id={id} style={{ color: 'red' }} className="fa-solid fa-2xl fa-map-marker"></i>
              </Marker>
            </Map>

            <div className='city-top'>
              <div className='city-image' style={{ backgroundImage: `url('${city.image}')` }}></div>

              <div className='text'>
                <h2>{city.name}</h2>
                <h4>{city.region.name} municipality</h4>
                <p>{city.description}</p>
                
                <div className='profile-section'>
                  <div><h3>Latest Attraction:</h3> {city.attractions.length > 0 ? 
                    <div key={id}>
                      <div className='user-attractions'>
                        <div className='profile' style={{ backgroundImage: `url('${city.attractions[0].owner.profile_image}')`  }}></div>
                        {city.attractions[0].owner.username}
                      </div>
                      <div>{city.attractions[0].name}</div>
                      <div>{city.attractions[0].description}</div>
                    </div>
                    : 'No attractions added yet!'}
                  </div>
                </div>

              </div>
            </div>

            <div className='city-bottom-container'>
              <h3>All Attractions</h3>

              <div className='city-bottom'>
                {city.attractions.length > 0 ? 
                  city.attractions.map(attraction => {
                    const { id, name, description, owner } = attraction
                    return (
                      <div key={id}>
                        <div className='city-attraction-cards'>
                          <div className='user-attractions'>
                            <div className='profile' style={{ backgroundImage: `url('${owner.profile_image}')`  }}></div>
                            {owner.username}
                          </div>
                          <div>
                            <div>
                              <div>{name}</div>
                              <div>{description}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                    
                  })
                  : <><div></div><div>No attractions added yet!</div></>
                }
              </div>
            </div>
          </>
          : 'error'
        }

      </div>
    </div>
  )
}


export default CityPage