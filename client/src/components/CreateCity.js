import { useEffect, useState } from 'react'
import axios from 'axios'

const CreateCity = () => {

  const [ regions, setRegions ] = useState('')
  const [ attractions, setAttractions ] = useState('')

  const [ formFields, setFormFields ] = useState({
    name: '',
    description: '',
    region: '',
    musts: '',
    image: '',
    email: 'giorgia@email.com',
  })

  const handleChange = async (e) => {
    setFormFields({ ...formFields, [e.target.name]: [e.target.value] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/sweden/', formFields)
      console.log(formFields)
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

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/mustsee/')
        setAttractions(data)
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
          <select name="region">
            <option selected disabled value="">-- Select Region --</option>
            {regions.length > 0 ? 
              regions.map(region => {
                const { id, name } = region
                return (
                  <option key={id} value={formFields.region} onChange={handleChange}>{name}</option>
                )
              })
              : 'error'
            }
          </select>


          <label htmlFor="musts"></label>
          <select className='select' name="musts" multiple>
            <option className='big-option' selected disabled value="">-- Select Attractions --</option>
            {attractions.length > 0 ? 
              attractions.map(attraction => {
                const { id, name } = attraction
                return (
                  <option key={id} value={formFields.musts} onChange={handleChange}>{name}</option>
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