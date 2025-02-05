import { format } from "date-fns";
import { Link } from "react-router-dom";

function ListCarCard({ car }) {
  const { _id, model, imgUrl, carLocation, rentalPrice, description, date } =
    car || {};
  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <figure className="relative">
        <img className="list-view-img" src={imgUrl} alt="Shoes" />
        <p className="absolute bottom-0 left-0 h-fit w-fit rounded-lg bg-black/50 px-8 py-2 font-bold text-white">
          ${rentalPrice} /Day
        </p>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{model}</h2>
        <p>{description}</p>
        <p className="grid-view-location">{carLocation}</p>
        <p>Car Added at: {format(new Date(date), "P")}</p>
        <div className="card-actions justify-end">
          <Link to={`/car-details/${_id}`} className="btn btn-neutral">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListCarCard;
