

const Card = ({ image, name, description }) => {

  return (
    <div className="card">
      <div className="card-image" style={{ backgroundImage: `url('${image}')` }}></div>
      <div className="card-bottom">
        <div>{name}</div>
        <div>{description}</div>
      </div>
    </div>
  )
}


export default Card