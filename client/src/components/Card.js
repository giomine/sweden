

const Card = ({ id, image, name, description, text, cardClass }) => {

  return (
    <div id={id} data-textafter={text} className={cardClass} >
      <div id={id} className="card-image" style={{ backgroundImage: `url('${image}')` }}></div>
      <div id={id} className="card-bottom">
        <div>{name}</div>
        <div>{description}</div>
      </div>
    </div>
  )
}


export default Card