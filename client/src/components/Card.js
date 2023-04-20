

const Card = ({ image, name, description, text }) => {

  return (
    <div data-textafter={text} className="card">
      <div className="card-image" style={{ backgroundImage: `url('${image}')` }}></div>
      <div className="card-bottom">
        <div>{name}</div>
        <div>{description}</div>
      </div>
    </div>
  )
}


export default Card