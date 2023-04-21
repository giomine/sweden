import { useEffect, useState } from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import axios from 'axios'
import Card from './Card'
import { Link } from 'react-router-dom'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })

const Home = () => {

  const [ showPopup, setShowPopup ] = useState(false)
  const [ popupId, setPopupId ] = useState()
  const [ popupData, setPopupData ] = useState()

  const handlePopup = (e) => {
    // setShowPopup(!showPopup)
    setShowPopup(true)
    console.log(showPopup)
    setPopupId(Number(e.target.id))
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


  return (
    <div className='grid-container'>
      <div className='hero'><h1>Home</h1></div>

      <Map
        center={[14.66, 60.23]}
        zoom={[4.3]}
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
          <Popup
            coordinates={[popupData.long, popupData.lat]}
            style={{ width: '200px' }}>
            <h3>{popupData.name}</h3>
            <p>{popupData.description.slice(0,50)}....</p>
            <div style={{ backgroundImage: `url('${popupData.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '180px', height: '100px' }}></div>
          </Popup>
          : ''
        }

      </Map>

      <div className='card-container'>
        {allData.length > 0 ? 
          allData.map(data => {
            const { id, image, name, description } = data
            const shortDescription = description.slice(0,50) + '....'
            return (
              <div key={id}>
                <Link to={`/city/${id}`}>
                  <Card
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