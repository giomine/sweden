import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })

const EditAttraction = () => {

  const [ error, setError ] = useState('')
  const [ lat, setLat ] = useState()
  const [ lng, setLng ] = useState()
  
  // ! cloudinary
  const handleUpload = async (e) => {
    const cloudName = 'duhpvaov2'
    const uploadPreset = 'sweden_image'

    const image = e.target.files[0]
    // console.log(image)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', uploadPreset)

    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      // console.log(data)
      setFormFields({ ...formFields, image: data.secure_url })
    } catch (err) { 
      setError(err)
    }
  }
  // ! end of cloudinary

  const { id } = useParams()
  const navigate = useNavigate()

  const [ attraction, setAttraction ] = useState('')
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
    if (formFields.name === ''){
      formFields.name = attraction.name
    }
    if (formFields.description === ''){
      formFields.description = attraction.description
    }
    if (formFields.city === ''){
      formFields.city = attraction.city
    }
    formFields.lat = lat
    formFields.long = lng
    try {
      await axios.put(`/api/attractions/${id}/`, formFields, {
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
        const { data } = await axios.get(`/api/attractions/${id}`)
        setAttraction(data)
        // console.log(data)
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
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  return (
    <div className='register'>
      <div className='register-border attraction'>

        {attraction &&
        

          <form action="" onSubmit={handleSubmit}>
            <h1>Edit attraction</h1>
            ** All fields optional **

            <label htmlFor="city"></label>
            <select onChange={handleCity} name="city">

              {cities.length > 0 ? 
                cities.map(city => {
                  const { id, name } = city
                  return (
                    <option selected={ attraction.city === id ? true : false } key={id} value={id} onChange={handleChange}>{name}</option>
                  )
                })
                : 'error'
              }
            </select>

            <label htmlFor="name"></label>
            <input type="text" name="name" placeholder={attraction.name} value={formFields.name} onChange={handleChange} />


            <label htmlFor="description"></label>
            <textarea name="description" style={{ width: '220px' }} rows="5" placeholder={attraction.description} value={formFields.description} onChange={handleChange}></textarea>


            {/* <label htmlFor="url"></label>
            <input type="url" name="url" placeholder='Add link to website or Google Maps pin' value={formFields.url} onChange={handleChange} /> */}

            <div className='image-box'>
              {/* <div style={{ width: '90%', color: 'gray', margin: '0 0 -5px'  }}>* Optional</div> */}
              <p>Upload or enter image url</p>
              <label htmlFor="image"></label>
              <input className='input' type="url" name="image" placeholder='image url' value={formFields.image} onChange={handleChange} />
              {/* //! cloudinary */}
              <div className='field'>
                { formFields.image ? 
                  <img style={{ height: '180px' }} src={formFields.image} /> 
                  : 
                  <input style={{ fontSize: '14px', width: '200px', margin: '10px 0', padding: '0' }} type="file" onChange={handleUpload}/>
                }
                {error && <p className='text-center'>{error}</p>}
              </div>
              {/* //! end of cloudinary */}
            </div>

            Double click to drop pin
            <Map
              onDblClick={handleDblClick}
              onTouchStart={handleDblClick}
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
        }

      </div>
    </div>
  )
}


export default EditAttraction