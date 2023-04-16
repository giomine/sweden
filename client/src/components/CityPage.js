import { useEffect, useState } from 'react'
import axios from 'axios'

const CityPage = () => {

  const [ city, setCity ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/sweden/8')
        setCity(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        { city ?
          <>
            <div className='city-top'>
              <div className='city-image' style={{ backgroundImage: `url('${city.image}')` }}></div>

              <div className='text'>
                <div>{city.name}</div>
                <div>{city.description}</div>
                <div>{city.owner}</div>
              </div>
            </div>

            <div className='profile-section'>
              <div>{city.facts ? <p>{city.facts}</p> : 'no facts yet!'}</div>
            </div>

            <div className='profile-section'>
              <div>{city.musts ? <p>{city.musts}</p> : 'no attractions yet!'}</div>
            </div>

            <div className='profile-section'>
              <div>{city.region ? <p>{city.region}</p> : 'no region yet!'}</div>
            </div>
          </>
          : 'error'
        }
      </div>
    </div>
  )
}


export default CityPage