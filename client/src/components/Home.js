import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'

const Home = () => {


  const [ allData, setAllData ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/sweden/')
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
      <div className='card-container'>
        {allData.length > 0 ? 
          allData.map(data => {
            const { id, image, name, description } = data
            // console.log(id, image, name, description)
            return (
              <div key={id}>
                <Card
                  image={image}
                  name={name}
                  description={description}
                />
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