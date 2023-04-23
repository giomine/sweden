import { useEffect, useState } from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import axios from 'axios'
import Card from './Card'
import { Link } from 'react-router-dom'
import { getToken, isAuthenticated } from '../helpers/auth'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })
const zoom = [4.3]
const center = [14.66, 60.23]

const Home = () => {

  const [ showPopup, setShowPopup ] = useState(false)
  const [ popupId, setPopupId ] = useState()
  const [ popupData, setPopupData ] = useState()
  const [ profile, setProfile ] = useState()

  const handlePopup = (e) => {
    // setShowPopup(!showPopup) 
    setShowPopup(true)
    // console.log(showPopup)
    setPopupId(Number(e.target.id))
  }
  const removePopup = () => {
    setShowPopup(false)
  }
  const handleMouseOver = (e) => {
    // console.log(e.target)
    setShowPopup(true)
    setPopupId(Number(e.target.id))
    // window.scroll({
    //   top: 500,
    //   left: 0,
    //   behavior: 'smooth',
    // })
  }

  // get lngLat on dblClick for dropping pins - use on create city page?
  const handleDblClick = (map, event) => {
    const lngLat = event.lngLat
    // console.log(lngLat, lngLat.lat, lngLat.lng)
  }


  const [ allData, setAllData ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        // this capture the whole cities data
        const { data } = await axios.get('/api/cities/')
        setAllData(data)

        // this captures only the city for the clicked pin
        data.map(data => {
          if (data.id === popupId){
            // console.log('match!!!', popupId, data)
            setPopupData(data)
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[popupId])

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
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className='grid-container'>
      <div className='hero'><h1>Discover <span>S</span>weden</h1></div>

      <Map
        onClick={removePopup}
        onDblClick={handleDblClick}
        center={center}
        zoom={zoom}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        // style='mapbox://styles/giorgiamineo/clgmck52m00ci01qybnxh2gw8'
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: '70vh',
          width: '100vw',
        }}>

        {allData.length > 0 &&
          allData.map(data => {
            const { id, lat, long } = data
            return (
              <div key={id}>
                <>
                  <Marker
                    onClick={handlePopup}
                    coordinates={[long, lat]}
                    anchor="bottom">
                    <i id={id} style={{ color: 'red' }} className="fa-solid fa-map-marker"></i>
                  </Marker>
                </>
              </div>
            )
          })
        }

        { showPopup === true &&
          popupData ?
          <Link to={`/city/${popupData.id}`}>
            <Popup
              coordinates={[popupData.long, popupData.lat]}
              style={{ width: '200px' }}>
              <h3>{popupData.name}</h3>
              <p>{popupData.description.slice(0,50)}....</p>
              <div style={{ backgroundImage: `url('${popupData.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '180px', height: '100px' }}></div>
            </Popup>
          </Link>
          : ''
        }

      </Map>

      <div className='home-card-container'>
        { isAuthenticated() ?
          <div className='card add-box'>
            <Link className='add' to={'/createcity/'}>
              <i className="fa-regular fa-plus"></i>
              <p>City</p>
            </Link>
            <Link className='add' to={'/createattraction/'}>
              <i className="fa-regular fa-plus"></i>
              <p>Attraction</p>
            </Link>
          </div>
          :
          <div className='card add-box'>
            <Link className='add unlogged' to={'/login'}>
              <i className="fa-regular fa-plus"></i>
            </Link>
          </div>
        }
        {allData.length > 0 ? 
          allData.map(data => {
            const { id, image, name, description } = data
            const shortDescription = description.slice(0,50) + '....'
            return (
              <div key={id}>
                <Link id={id} onMouseOver={handleMouseOver} onTouchStart={handleMouseOver} to={`/city/${id}`}>
                  <Card
                    cardClass='card home'
                    id={id}
                    image={image}
                    name={name}
                    text={shortDescription}
                  />
                </Link>
              </div>
            )
          })
          : <></>
        }
      </div>
    </div>
  )
}


export default Home