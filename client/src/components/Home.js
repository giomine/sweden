import { useEffect, useState, useRef } from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import axios from 'axios'
import Card from './Card'
import { Link } from 'react-router-dom'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })

const Home = () => {

  const [ showPopup, setShowPopup ] = useState(false)
  const [ popupId, setPopupId ] = useState()
  // const [ clickedCity, setClickedCity ] = useState({
  //   long: '',
  //   lat: '',
  //   name: '',
  // })

  const handlePopup = (e) => {
    // setShowPopup(!showPopup)
    setShowPopup(true)
    console.log(showPopup)
    setPopupId(Number(e.target.id))
    console.log('POPUPID --->', popupId)
  }


  const [ allData, setAllData ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/cities/')
        setAllData(data)

        data.map(data => {
          if (data.id === popupId){
            console.log('match!!!', data.name)
            // setClickedCity()
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
        center={[14.66, 58.63]}
        zoom={[5]}
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
            // const shortDescription = description.slice(0,50) + '....'
            // console.log(popupId, id)
            // console.log(data)
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
                {/* { showPopup === true &&
                  // popupId === id ?
                  allData.map(data => {
                    const { id, image, name, description, lat, long } = data
                    const shortDescription = description.slice(0,50) + '....'
                    console.log(lat, long)
                    popupId === data.id ?
                      <Popup
                        id={data.id}
                        coordinates={[data.long, data.lat]}
                        style={{ width: '200px' }}
                      >
                        <h3>{name}</h3>
                        <p>{shortDescription}</p>
                        <div style={{ backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '180px', height: '100px' }}></div>
                      </Popup>
                      : ''
                  })
                } */}
              </div>
            )
          })
        }

        {/* //! this gets one hard-coded popup to show */}
        { showPopup === true &&
              <Popup
                coordinates={[allData[0].long, allData[0].lat]}
                style={{ width: '200px' }}
              >
                <h3>{allData[0].name}</h3>
                <p>{allData[0].description.slice(0,50)}....</p>
                <div style={{ backgroundImage: `url('${allData[0].image}')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '180px', height: '100px' }}></div>
              </Popup>
          //   )
          // })
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