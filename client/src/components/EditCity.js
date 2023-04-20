import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const EditCity = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [ cityData, setCityData ] = useState()

  const [ regions, setRegions ] = useState('')
  const [ formFields, setFormFields ] = useState({
    name: '',
    description: '',
    region: '',
    image: '',
  })

  const handleChange = async (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleRegion = async (e) => {
    console.log(e.target.value)
    formFields.region = e.target.value
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
    console.log(formFields)
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
    
    
              <label htmlFor="image"></label>
              <input type="url" name="image" placeholder='image url' value={formFields.image} onChange={handleChange} />
            </> 
          }

          <button>Submit</button>

        </form>

      </div>
    </div>
  )
}


export default EditCity