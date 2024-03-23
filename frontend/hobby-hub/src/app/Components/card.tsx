const Card = ({ image, title, description, buttonText }) => (
  <div className="col-md-4 mb-4">
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary">{buttonText}</button>
      </div>
    </div>
  </div>
);
export default Card;
