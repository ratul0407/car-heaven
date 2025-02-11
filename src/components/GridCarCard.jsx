import { format } from "date-fns";
import { FaLocationArrow } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";

function GridCarCard({ car }) {
  const { _id, model, imgUrl, rentalPrice, carLocation, date, description } =
    car || {};
  return (
    <div>
      <div className="grid-view-card">
        <figure className="relative">
          <img
            className="grid-view-img"
            src={imgUrl}
            width={200}
            height={200}
            alt="Shoes"
          />
          <p className="absolute bottom-0 left-0 rounded-lg bg-black/50 px-8 py-2 font-bold text-white">
            ${rentalPrice} /Day
          </p>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{model}</h2>
          <p>{description.substring(0, 70)}.....</p>
          <p className="grid-view-location">
            <IoLocation /> {carLocation}
          </p>
          <p>Car Added at: {format(new Date(date), "P")}</p>
          <div className="card-actions justify-end">
            <Link to={`/car-details/${_id}`} className="btn btn-neutral">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridCarCard;
