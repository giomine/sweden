import axios from 'axios'
import { useState } from 'react'

const ProfileUpload = ({ formFields, setFormFields }) => {

  const [ error, setError ] = useState('')

  const handleUpload = async (e) => {
    const cloudName = 'duhpvaov2'
    const uploadPreset = 'sweden_image'

    const image = e.target.files[0]
    console.log(image)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', uploadPreset)

    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      // console.log(data)
      setFormFields({ ...formFields, profile_image: data.secure_url })
    } catch (err) { 
      setError(err)
    }
  }

  return (
    <div className='field'>
      {/* <label>Image</label> */}
      { formFields.profile_image ? 
        <img style={{ height: '180px' }} src={formFields.profile_image} /> 
        : 
        <input style={{ fontSize: '14px', width: '200px', margin: '20px 0' }} type="file" onChange={handleUpload}/>
      }
      {error && <p className='text-center'>{error}</p>}
    </div>
  )
}



export default ProfileUpload