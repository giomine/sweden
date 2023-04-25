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
  console.log(process.env.REACT_APP_MAP_TOKEN)

  const [ showPopup, setShowPopup ] = useState(false)
  const [ showPopupAttr, setShowPopupAttr ] = useState(false)
  const [ popupId, setPopupId ] = useState()
  const [ popupIdAttr, setPopupIdAttr ] = useState()
  const [ popupData, setPopupData ] = useState()
  const [ popupDataAttr, setPopupDataAttr ] = useState()
  const [ profile, setProfile ] = useState()
  const [ allData, setAllData ] = useState('')
  const [ attractions, setAttractions ] = useState('')
  const [ activeTab, setActiveTab ] = useState('tab1')

  const handleTab1 = () => {
    setActiveTab('tab1')
  }
  const handleTab2 = () => {
    setActiveTab('tab2')
  }

  const handlePopup = (e) => {
    setShowPopup(true)
    setShowPopupAttr(false)
    setPopupId(Number(e.target.id))
  }
  const handlePopupAttr = (e) => {
    setShowPopup(false)
    setShowPopupAttr(true)
    setPopupIdAttr(Number(e.target.id))
  }
  const removePopup = () => {
    setShowPopup(false)
  }
  const handleMouseOver = (e) => {
    // console.log(e.target)
    setShowPopup(true)
    setShowPopupAttr(false)
    setPopupId(Number(e.target.id))
  }

  const handleMouseOverAttr = (e) => {
    // console.log(e.target)
    window.localStorage.setItem('attrId', e.target.id)
    setShowPopup(false)
    setShowPopupAttr(true)
    setPopupIdAttr(Number(e.target.id))
  } 

  //! delete? get lngLat on dblClick for dropping pins - use on create city page?
  const handleDblClick = (map, event) => {
    const lngLat = event.lngLat
    // console.log(lngLat, lngLat.lat, lngLat.lng)
  }



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
    const getAttr = async () => {
      try {
        // this capture the whole cities data
        const { data } = await axios.get('/api/attractions/')
        setAttractions(data)
        // console.log(data)

        // this captures only the attraction for the clicked pin
        data.map(attraction => {
          // console.log(attraction)
          if (attraction.id === popupIdAttr){
            // console.log('match!!!', popupId, attraction)
            setPopupDataAttr(attraction)
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    getAttr()
  },[popupIdAttr])

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

      <div className='home-top' >
        <div>Your definitive guide to Sweden</div>
        <div>Discover new spots for relaxation, travel, and entertainment</div>

      </div>

      <div className='home-buttons'>
        { isAuthenticated() ?
          <div>
            <Link to={'/createcity/'}><div className='buttons plus'>+ city</div></Link>
            <Link to={'/createattraction/'}><div className='buttons plus'>+ attraction</div></Link>
          </div>
          :
          <div>
            <Link to={'/register/'}><div className='buttons'>Sign up</div></Link>
            <Link to={'/login/'}><div className='buttons'>Log in</div></Link>
          </div>
        }
      </div>

      <div style={{ display: 'flex' }} className='home-tabs tabs-container'>
        <div onClick={handleTab1} className={activeTab === 'tab1' ? 'active tabs' : 'tabs'} >Browse cities</div>
        <div onClick={handleTab2} className={activeTab === 'tab2' ? 'active tabs' : 'tabs'} >Browse attractions</div>
      </div>

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
        {/* //! cities carousel */}
        {activeTab === 'tab1' && allData.length > 0 ? 
          allData.map(data => {
            const { id, image, name, description } = data
            // console.log(data, id)
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
        {/* //! attractions carousel */}
        {activeTab === 'tab2' && attractions.length > 0 ?
          attractions.map(attraction => {
            const { id, name, image, lat, long, city } = attraction
            // console.log(id, name, image, lat, long, city.id)
            const shortName = name.slice(0,13) + '....'
            return (
              <div key={id}>
                <Link id={id} onMouseOver={handleMouseOverAttr} onTouchStart={handleMouseOverAttr} to={`/city/${city.id}`}>
                  <Card
                    cardClass='card home'
                    id={id}
                    image={image}
                    name={shortName}
                  />
                </Link>
              </div>
            )
          })
          : <></>
        }
      </div>

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

        {/* //! city markers */}
        {allData.length > 0 &&
          allData.map(city => {
            const { id, lat, long } = city
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

        {/* //! attraction markers */}
        {attractions.length > 0 &&
          attractions.map(attraction => {
            const { id, lat, long } = attraction
            // console.log(attraction)
            return (
              <div key={id}>
                <>
                  <Marker
                    onClick={handlePopupAttr}
                    coordinates={[long, lat]}
                    anchor="bottom">
                    <i id={id} style={{ color: 'red' }} className="fa-solid fa-map-marker"></i>
                  </Marker>
                </>
              </div>
            )
          })
        }

        {/* //! city popups */}
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

        {/* //! attraction popups */}
        { showPopupAttr === true &&
          popupDataAttr ?
          // console.log(popupDataAttr, popupDataAttr)
          <Link to={`/city/${popupDataAttr.city.id}`}>
            <Popup
              coordinates={[popupDataAttr.long, popupDataAttr.lat]}
              style={{ width: '200px' }}>
              <h3>{popupDataAttr.name}</h3>
              <p>{popupDataAttr.description.slice(0,50)}....</p>
              <div style={{ backgroundImage: `url('${popupDataAttr.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '180px', height: '100px' }}></div>
            </Popup>
          </Link>
          : ''
        }

      </Map>

    </div>
  )
}


export default Home