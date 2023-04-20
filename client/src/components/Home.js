import { useEffect, useState, useRef } from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import axios from 'axios'
import Card from './Card'
import { Link } from 'react-router-dom'

const Home = () => {

  const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })

  const [ allData, setAllData ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/cities/')
        setAllData(data)
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

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
        }}
      >
        <Marker
          coordinates={[14.66, 58.63]}
          anchor="bottom">
          <i style={{ color: 'red' }} className="fa-solid fa-map-marker"></i>
        </Marker>
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