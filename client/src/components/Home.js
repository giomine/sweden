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
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  return (
    <div className='page-container'>
      <div className='hero'><h1>Home</h1></div>
      <div className='card-container'>
        {allData.length > 0 ? 
          allData.map(data => {
            const { id, name, description } = data
            console.log(id, name, description)
            return (
              <div key={id}>
                <Card
                  image={'https://i0.wp.com/www.mymorningtravelguide.com/wp-content/uploads/2016/11/NIK_9178-2.jpg?w=2000&ssl=1'}
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