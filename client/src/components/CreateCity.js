import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'

const CreateCity = () => {

  const navigate = useNavigate()

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

  // const handleAttractions = async (e) => {
  //   console.log(e.target.selectedOptions)
  //   const choices = Array.from(e.target.selectedOptions, option => option.value)
  //   console.log(choices)
  //   formFields.musts = choices
  // }

  const handleRegion = async (e) => {
    console.log(e.target.value)
    formFields.region = e.target.value
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formFields)
    try {
      await axios.post('/api/cities/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(formFields)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }


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
          <h1>Create city</h1>

          <label htmlFor="name"></label>
          <input type="text" name="name" placeholder='city name' value={formFields.name} onChange={handleChange} />


          <label htmlFor="region"></label>
          <select onChange={handleRegion} name="region">
            <option selected disabled value="">-- Select Region --</option>
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
          <textarea name="description" style={{ width: '220px' }} rows="5" placeholder='Description' value={formFields.description} onChange={handleChange}></textarea>


          <label htmlFor="image"></label>
          <input type="url" name="image" placeholder='image url' value={formFields.image} onChange={handleChange} />


          <button>Submit</button>

        </form>

      </div>
    </div>
  )
}


export default CreateCity