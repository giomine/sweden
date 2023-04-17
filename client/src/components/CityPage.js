import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CityPage = () => {

  const { id } = useParams()

  const [ city, setCity ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/sweden/${id}/`)
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
                <div>Name: {city.name}</div>
                <div>Region: {city.region}</div>
                <div>Description: {city.description}</div>
                <div>Owner: {city.owner}</div>

                <div className='profile-section'>
                  <div>Facts: {city.facts ? <p>{city.facts}</p> : 'no facts yet!'}</div>
                </div>
                
                <div className='profile-section'>
                  <div>Must-Sees: {city.musts ? <>{city.musts}</> : 'no attractions yet!'}</div>
                </div>
              </div>
            </div>

            {/* <div className='profile-section'>
              <div>Facts: {city.facts ? <p>{city.facts}</p> : 'no facts yet!'}</div>
            </div> */}

            {/* <div className='profile-section'>
              <div>Must-Sees: {city.musts ? <p>{city.musts}</p> : 'no attractions yet!'}</div>
            </div> */}

            {/* <div className='profile-section'>
              <div>Region: {city.region ? <p>{city.region}</p> : 'no region yet!'}</div>
            </div> */}
          </>
          : 'error'
        }
      </div>
    </div>
  )
}


export default CityPage