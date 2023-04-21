import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, isAuthenticated } from '../helpers/auth'
import { Link, useNavigate } from 'react-router-dom'
import Card from './Card'
import EditProfile from './EditProfile'

const ProfilePage = () => {

  const handleScroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      // behavior: 'smooth',
    })
  }

  const navigate = useNavigate()

  const [ profile, setProfile ] = useState('')
  const [ attractions, setAttractions ] = useState()
  const [ cities, setCities ] = useState()
  const [ activeTab, setActiveTab ] = useState('tab1')
  const [ editTab, setEditTab ] = useState(false)
  const [ deleteModal, setDeleteModal ] = useState(false)
  const [ cardId, setCardId ] = useState()
  const [ editModel, setEditModal ] = useState(false)
  const [ editModelAttr, setEditModalAttr ] = useState(false)
  const [ deleteModalAttr, setDeleteModalAttr ] = useState(false)

  const handleTab1 = () => {
    setActiveTab('tab1')
  }
  const handleTab2 = () => {
    setActiveTab('tab2')
  }
  const handleTab3 = () => {
    setActiveTab('tab3')
  }

  const handleClick = () => {
    setEditTab(!editTab)
    setActiveTab('tab1')
  }

  //! CRUD for city cards
  const handleEdit = (e) => {
    setEditModal(!editModel)
    setCardId(e.target.id)
    console.log(editModel)
    handleScroll()
  }

  const editEntry = () => {
    setEditModal(!editModel)
    navigate(`/editcity/${cardId}`)
  }

  const handleDelete = (e) => {
    setDeleteModal(!deleteModal)
    console.log(e.target.id)
    setCardId(e.target.id)
    handleScroll()
  }

  const deleteEntry = async (e) => {
    console.log('deleted', e.target)
    // setCardId(e.target.value)
    await axios.delete(`/api/cities/${cardId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    setDeleteModal(false)
  }

  //! CRUD for attraction cards
  const handleEditAttraction = (e) => {
    setEditModalAttr(!editModelAttr)
    setCardId(e.target.id)
    console.log(editModelAttr)
    handleScroll()
  }

  const editEntryAttr = () => {
    setEditModalAttr(!editModelAttr)
    navigate(`/editattraction/${cardId}`)
  }

  const handleDeleteAttraction = (e) => {
    setDeleteModalAttr(!deleteModalAttr)
    console.log(e.target.id)
    setCardId(e.target.id)
    handleScroll()
  }

  const deleteEntryAttr = async (e) => {
    console.log('deleted', e.target)
    // setCardId(e.target.value)
    await axios.delete(`/api/attractions/${cardId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    setDeleteModalAttr(false)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[deleteModal])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/attractions/')
        setAttractions(data)
        // console.log('ATTRACTIONS -->', attractions)
        // console.log('ATTRACTIONS OWNER -->', attractions.map(attraction => attraction.owner.username))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[deleteModalAttr])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/cities/')
        setCities(data)
        // console.log('CITIES -->', data)
        // console.log('CITIES OWNER -->', cities.map(city => city.owner.username))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[deleteModal])

  return (
    <>
      { isAuthenticated() ?
        profile ?
          <div className='profile-page'>
            <div className='profile-container'>
              <>
                <div className='profile-top'>
                  <div onClick={handleClick} className='profile-image' style={{ backgroundImage: `url('${profile.profile_image}')` }}></div>
                  
                  <div>
                    <p>{profile.username}</p>
                    <p>{profile.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex' }} className='profile-section tabs-container'>
                  <div onClick={handleTab1} className={activeTab === 'tab1' ? 'active tabs' : 'tabs'} >Profile</div>
                  <div onClick={handleTab3} className={activeTab === 'tab3' ? 'active tabs' : 'tabs'} >Cities</div>
                  <div onClick={handleTab2} className={activeTab === 'tab2' ? 'active tabs' : 'tabs'} >Attractions</div>
                </div>

                <div className='edit-profile'>        
                  {activeTab === 'tab1' && 
                  <div className='profile-first-tab'>
                    <div className='card add-box'>
                      <Link className='add' to={'/createcity/'}>
                        <div><i className="fa-regular fa-plus"></i>Add city</div>
                      </Link>
                      <Link className='add' to={'/createattraction/'}>
                        <div><i className="fa-regular fa-plus"></i>Add attraction</div>
                      </Link>
                    </div>
                    {/* <div>No profile info</div> */}
                    {editTab === false &&
                    <div>
                      <button className='button' onClick={handleClick}>Upload profile photo</button>
                    </div>
                    }
                    <div>
                      {editTab === true &&
                      <div>
                        <EditProfile />
                      </div>
                      }
                    </div>
                  </div>}

                  {activeTab === 'tab2' && 
                  <div className='grid-container'>
                    <div className='card-container'>
                      {attractions.length > 0 ? 
                        attractions.map(attraction => {
                          if (attraction.owner.id === profile.id) {
                            const { id, city, name, description, image } = attraction
                            const shortDescription = description.slice(0,55) + '....'
                            let title = `${city.name} - ${name}`
                            title = title.slice(0,17) + '....'
                            return (
                              <div key={id}>
                                <div className='edit-delete'>
                                  <div id={id} onClick={handleEditAttraction}>✏️</div>
                                  <div id={id} onClick={handleDeleteAttraction}>🗑️</div>
                                </div>
                                <Link to={`/city/${city.id}`}>
                                  {/* <div className="card attraction-card">
                                    <div style={{ backgroundImage: `url('${image}')` }} className='attraction-content'>
                                      <div>{city.name}</div>
                                      <div>{name}</div>
                                      <div>{shortDescription}</div>
                                    </div>
                                  </div> */}
                                  <Card 
                                    name={title}
                                    image={image}
                                    text={shortDescription}
                                  />
                                </Link>
                              </div>
                            )
                          }
                        })
                        : <><div></div><div>No attractions added yet!</div></>
                      }
                    </div>
                  </div>}

                  {activeTab === 'tab3' &&                 
                  <div className='grid-container'>
                    <div className='card-container'>
                      {cities.length > 0 ? 
                        cities.map(city => {
                          if (city.owner.id === profile.id) {
                            const { id, name, image, description } = city
                            const shortDescription = description.slice(0,50) + '....'
                            return (
                              <div key={id}>
                                <div className='edit-delete'>
                                  <div id={id} onClick={handleEdit}>✏️</div>
                                  <div id={id} onClick={handleDelete}>🗑️</div>
                                </div>
                                <Link to={`/city/${id}`}>
                                  <Card 
                                    name={name}
                                    image={image}
                                    text={shortDescription}
                                  />
                                </Link>
                              </div>
                            )
                          }
                        })
                        : <><div></div><div>No cards added yet!</div></>
                      }
                    </div>
                  </div>}


                  {/* //! City modals */}
                  {deleteModal &&
                  <div className='delete-modal'>
                    <div className='modal-container'>Are you sure you want to delete this card?</div>
                    <div className='button-container'>
                      <div onClick={deleteEntry} className='button-sm'>Yes, confirm</div>
                      <div onClick={handleDelete} className='button-sm'>Cancel</div>
                    </div>
                  </div>
                  }

                  {editModel &&
                  <div className='delete-modal'>
                    <div className='modal-container'>Do you want to edit this card?</div>
                    <div className='button-container'>
                      <div onClick={editEntry} className='button-sm'>Yes, edit</div>
                      <div onClick={handleEdit} className='button-sm'>Cancel</div>
                    </div>
                  </div>
                  }

                  {/* //! Attraction modals */} 
                  {deleteModalAttr &&
                  <div className='delete-modal'>
                    <div className='modal-container'>Are you sure you want to delete this attraction?</div>
                    <div className='button-container'>
                      <div onClick={deleteEntryAttr} className='button-sm'>Yes, confirm</div>
                      <div onClick={handleDeleteAttraction} className='button-sm'>Cancel</div>
                    </div>
                  </div>
                  }

                  {editModelAttr &&
                  <div className='delete-modal'>
                    <div className='modal-container'>Do you want to edit this attraction?</div>
                    <div className='button-container'>
                      <div onClick={editEntryAttr} className='button-sm'>Yes, edit</div>
                      <div onClick={handleEditAttraction} className='button-sm'>Cancel</div>
                    </div>
                  </div>
                  }

                </div>
              </>


            </div>
          </div>

          : 'error'
          
        : 'please log in!'
      }
    </>
  )
}


export default ProfilePage