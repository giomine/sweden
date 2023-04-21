import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })

const CreateAttraction = () => {

  const navigate = useNavigate()
  const [ lat, setLat ] = useState()
  const [ lng, setLng ] = useState()

  const [ cities, setCities ] = useState('')
  const [ formFields, setFormFields ] = useState({
    name: '',
    description: '',
    city: '',
    lat: '',
    long: '',
    // url: '',
  })

  const handleChange = async (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleCity = async (e) => {
    formFields.city = e.target.value
  }

  const handleDblClick = (map, event) => {
    const lngLat = event.lngLat
    // console.log(lngLat, lngLat.lat, lngLat.lng)
    setLat(lngLat.lat)
    setLng(lngLat.lng)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    formFields.lat = lat
    formFields.long = lng
    try {
      await axios.post('/api/attractions/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(formFields)
      navigate(`/city/${formFields.city}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {            
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/cities/')
        setCities(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  return (
    <div className='register'>
      <div className='register-border attraction'>

        <form action="" onSubmit={handleSubmit}>
          <h1>Create attraction</h1>

          <label htmlFor="city"></label>
          <select onChange={handleCity} name="city">
            <option selected disabled value="">-- Select City --</option>
            {cities.length > 0 ? 
              cities.map(city => {
                const { id, name } = city
                return (
                  <option key={id} value={id} onChange={handleChange}>{name}</option>
                )
              })
              : 'error'
            }
          </select>

          <label htmlFor="name"></label>
          <input type="text" name="name" placeholder='Add new attraction' value={formFields.name} onChange={handleChange} />


          <label htmlFor="description"></label>
          <textarea name="description" style={{ width: '220px' }} rows="5" placeholder='Description' value={formFields.description} onChange={handleChange}></textarea>


          {/* <label htmlFor="url"></label>
          <input type="url" name="url" placeholder='Add link to website or Google Maps pin' value={formFields.url} onChange={handleChange} /> */}

          Double click to drop pin
          <Map
            onDblClick={handleDblClick}
            center={[14.66, 60.23]}
            zoom={[4.3]}
            mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
            style="mapbox://styles/mapbox/streets-v8"
            containerStyle={{
              height: '300px',
              width: '398px',
            }}>
            {lng && 
              <Marker
                coordinates={[lng, lat]}
                anchor="bottom">
                <i style={{ color: 'red' }} className="fa-solid fa-map-marker"></i>
              </Marker>
            }
          </Map>

          <button>Submit</button>

        </form>

      </div>
    </div>
  )
}


export default CreateAttraction