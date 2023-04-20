import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { useNavigate, useParams } from 'react-router-dom'

const EditAttraction = () => {


  const { id } = useParams()
  const navigate = useNavigate()

  const [ attraction, setAttraction ] = useState('')
  const [ cities, setCities ] = useState('')
  const [ formFields, setFormFields ] = useState({
    name: '',
    description: '',
    city: '',
    // url: '',
  })

  const handleChange = async (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleCity = async (e) => {
    formFields.city = e.target.value
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
    try {
      await axios.put(`/api/attractions/${id}/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(formFields)
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


            <button>Submit</button>

          </form>
        }

      </div>
    </div>
  )
}


export default EditAttraction