import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'


const CreateAttraction = () => {

  const navigate = useNavigate()

  const [ attractions, setAttractions ] = useState('')
  const [ formFields, setFormFields ] = useState({
    name: '',
    description: '',
    // url: '',
  })

  const handleChange = async (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // formFields.name = formFields.name[0]
    // formFields.description = formFields.description[0]
    // formFields.url = formFields.url[0]
    try {
      await axios.post('/api/attractions/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(formFields)
      navigate('/createcity')
    } catch (err) {
      console.log(err)
    }
  }

  {/* Get rid of this later or display on page for user to see what currently exists on the list  */}
  useEffect(() => {            
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/attractions/')
        setAttractions(data)
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

        <form action="" onSubmit={handleSubmit}>
          <h1>Create attraction</h1>

          <label htmlFor="name"></label>
          <input type="text" name="name" placeholder='Add new attraction' value={formFields.name} onChange={handleChange} />


          <label htmlFor="description"></label>
          <textarea name="description" style={{ width: '220px' }} rows="5" placeholder='Description' value={formFields.description} onChange={handleChange}></textarea>


          {/* <label htmlFor="url"></label>
          <input type="url" name="url" placeholder='Add link to website or Google Maps pin' value={formFields.url} onChange={handleChange} /> */}


          <button>Submit</button>

        </form>

      </div>
    </div>
  )
}


export default CreateAttraction