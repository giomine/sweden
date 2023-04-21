import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAP_TOKEN })

const EditCity = () => {
  const [ lat, setLat ] = useState()
  const [ lng, setLng ] = useState()

  // ! cloudinary
  const [ error, setError ] = useState('')

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

  const navigate = useNavigate()

  const { id } = useParams()
  const [ cityData, setCityData ] = useState()

  const [ regions, setRegions ] = useState('')
  const [ formFields, setFormFields ] = useState({
    name: '',
    description: '',
    region: '',
    image: '',
    lat: '',
    long: '',
  })

  const handleChange = async (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleRegion = async (e) => {
    console.log(e.target.value)
    formFields.region = e.target.value
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
      formFields.name = cityData.name
    }
    if (formFields.region === ''){
      formFields.region = cityData.region.id
    }
    if (formFields.description === ''){
      formFields.description = cityData.description
    }
    if (formFields.image === ''){
      formFields.image = cityData.image
    }
    formFields.lat = lat
    formFields.long = lng
    // console.log(formFields)
    try {
      await axios.put(`/api/cities/${id}/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(formFields)
      navigate(`/city/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getCity = async () => {
      const { data } = await axios.get(`/api/cities/${id}`)
      setCityData(data)
    }
    getCity()
  },[])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/regions/')
        setRegions(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  return (
    <div className='register'>
      <div className='register-border city-form'>

        <form action="" onSubmit={handleSubmit}>
          <h1>Edit city</h1>
          ** All fields optional **

          {cityData &&
            <>
              <label htmlFor="name"></label>
              <input type="text" name="name" placeholder={cityData.name} value={formFields.name} onChange={handleChange} />
            
              <label htmlFor="region"></label>
              <select onChange={handleRegion} name="region">
                <option selected disabled value="">-- {cityData.region.name} --</option>
                {regions.length > 0 ? 
                  regions.map(region => {
                    const { id, name } = region
                    // console.log(region.id)
                    return (
                      <option key={id} value={region.id} onChange={handleChange}>{name}</option>
                    )
                  })
                  : 'error'
                }
              </select>
              
              <label htmlFor="description"></label>
              <textarea name="description" style={{ width: '220px' }} rows="5" placeholder={cityData.description} value={formFields.description} onChange={handleChange}></textarea>
    
    
              <div className='image-box'>
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

              Double click to drop new pin
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
            </> 
          }

          <button>Submit</button>

        </form>

      </div>
    </div>
  )
}


export default EditCity