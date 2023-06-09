import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })
const zoom = [10]

const CityPage = () => {
  // console.log('rendering') // for checking why page was crashing. sometime rendered 25+ times on page load. I believe this was solved by changing the default popupid (see lines 15+16)

  const { id } = useParams()
  const [ city, setCity ] = useState('')
  const [ showPopup, setShowPopup ] = useState(true)
  // const [ popupId, setPopupId ] = useState(localStorage.getItem('attrId') ? (Number(localStorage.getItem('attrId'))) : setShowPopup(false))
  const [ popupId, setPopupId ] = useState(localStorage.getItem('attrId') ? (Number(localStorage.getItem('attrId'))) : '')
  const [ popupData, setPopupData ] = useState('')


  const handlePopup = (e) => {
    setShowPopup(true)
    setPopupId(Number(e.target.id))
  }
  const removePopup = () => {
    setShowPopup(false)
  }

  const handleClick = (e) => {
    setShowPopup(true)
    setPopupId(Number(e.target.id))
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/cities/${id}/`)
        setCity(data)

        // this captures only the attraction for the clicked pin
        data.attractions.map(data => {
          if (data.id === popupId){
            // console.log('match!!!', popupId, data.id)
            setPopupData(data)
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [popupId])

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        
        { city ?
          <>
            <Map
              onClick={removePopup}
              center={[city.long, city.lat]}
              zoom={zoom}
              mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
              style="mapbox://styles/mapbox/streets-v8"
              containerStyle={{
                height: '70vh',
                width: '100vw',
              }}>

              { city.attractions.length > 0 ?
                city.attractions.map(attraction => {
                  const { id, name, description, lat, long } = attraction
                  return (
                    <Marker
                      key={id}
                      onClick={handlePopup}
                      coordinates={[long, lat]}
                      anchor="bottom">
                      <i id={id} style={{ color: 'red' }} className="fa-solid fa-xl fa-map-marker"></i>
                    </Marker>
                  )
                })
                : ''
              }

              { showPopup === true ?
                popupData ?
                  <Popup
                    coordinates={[popupData.long, popupData.lat]}
                    style={{ width: '300px' }}>
                    <h3>{popupData.name}</h3>
                    <p>{popupData.description}</p>
                    <div style={{ backgroundImage: `url('${popupData.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '280px', height: '100px' }}></div>
                  </Popup>
                  : ''
                : ''
              }
            </Map>

            <div className='city-top'>
              <div className='city-image' style={{ backgroundImage: `url('${city.image}')` }}></div>

              <div className='text'>
                <div>
                  <h2>{city.name}</h2>
                  <h4>{city.region.name} municipality</h4>
                  <p>{city.description}</p>
                </div>
                
                <div className='featured'>
                  <div><h3>Featured Attraction:</h3> 
                    {city.attractions.length > 0 ? 
                      <div className='comment-boxes' key={id}>
                        <div className='city-attraction-cards'>
                          <div className='attraction-comment'>
                            <div onClick={handleClick} id={city.attractions[0].id} className='attraction-image' style={{ backgroundImage: `url('${city.attractions[0].image}')` }}></div>
                            <p onClick={handleClick} id={city.attractions[0].id}>{city.attractions[0].name}</p>
                          </div>
                          <Link to={`/profile/${city.attractions[0].owner.id}/`}>
                            <div className='user-attractions'>
                              <div>
                                <div className='profile' style={{ backgroundImage: `url('${city.attractions[0].owner.profile_image}')`  }}></div>
                                <div>{city.attractions[0].owner.username}</div>
                              </div>
                              <div>{city.attractions[0].description}</div>
                            </div>
                          </Link>
                        </div>
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
                    const { id, name, description, owner, image } = attraction
                    return (
                      <div className='comment-boxes' key={id}>
                        <div className='city-attraction-cards'>
                          <div className='attraction-comment'>
                            <div onClick={handleClick} id={id} className='attraction-image' style={{ backgroundImage: `url('${image}')` }}></div>
                            <p>{name}</p>
                          </div>
                          <Link to={`/profile/${owner.id}/`}>
                            <div className='user-attractions'>
                              <div>
                                <div className='profile' style={{ backgroundImage: `url('${owner.profile_image}')`  }}></div>
                                <div>{owner.username}</div>
                              </div>
                              <div onClick={handleClick} id={id}>{description}</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                    
                  })
                  : <><div></div><div>No attractions added yet!</div></>
                }
              </div>
            </div>
          </>
          : <div style={{ marginTop: '30vh' }}><div className='loading'></div></div>
        }

      </div>
    </div>
  )
}


export default CityPage