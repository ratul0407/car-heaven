import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { formatDistance, formatDistanceToNowStrict } from "date-fns";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
function CarDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const navigate = useNavigate("");

  const {
    _id,
    model,
    imgUrl,
    carLocation,
    rentalPrice,
    features,
    description,
    date,
    carOwner,
    bookingStatus,
    availability,
  } = car || {};

  const [totalCost, setTotalCost] = useState();
  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/car/${id}`,
      );

      setCar(data);

      const days = formatDistance(new Date(startDate), new Date(endDate));
      if (parseInt(days)) return setTotalCost(parseInt(days) * rentalPrice);

      setTotalCost(data.rentalPrice);
    };
    fetchCar();
  }, [id, rentalPrice, totalCost, startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let bookingDate = [];
    if (!endDate) bookingDate = [startDate, startDate];
    bookingDate = [startDate, endDate];
    const bookingData = {
      carId: _id,
      imgUrl,
      model,
      bookedBy: {
        email: user?.email,
        name: user?.displayName,
        time: new Date(),
      },
      carOwner,
      bookingDate,
      totalCost,
      rentalPrice,
      bookingStatus,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-booking`,
        bookingData,
      );
      toast.success("Booking SuccessFul");
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img className="w-full" src={imgUrl} alt="Car Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{model}</h2>
          <p>{description}</p>
          <div>
            <p className="font-bold">Features: </p>
            <p>{features}</p>
          </div>
          <div className="space-y-4">
            <span className="font-bold">Location: </span>
            <span className="rounded-lg bg-black/80 p-1 text-white">
              {carLocation}
            </span>
            <p>
              Available:{" "}
              <span className="font-bold underline">{availability}</span>
            </p>
            <div className="font-bold">
              <p>Rent: ${rentalPrice}/day</p>
            </div>
            {date && (
              <div>
                <p>
                  Car Added: {formatDistanceToNowStrict(new Date(date))} ago
                </p>
              </div>
            )}
            <div>
              <p className="font-bold">Owner</p>
              {carOwner && (
                <>
                  <p>{carOwner.name}</p>
                  <p>{carOwner.email}</p>
                </>
              )}
            </div>
          </div>

          {/* modal */}
          <div className="card-actions justify-end">
            <button
              className="btn btn-neutral"
              onClick={() => {
                if (user?.email === carOwner?.email)
                  return toast.error("You can't book you own car");
                if (availability !== "Yes")
                  return toast.error("This is car is not available right now!");
                return document.getElementById("my_modal_3").showModal();
              }}
            >
              Book Now
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box flex flex-col">
                <form method="dialog">
                  <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="text-lg font-bold">Confirm Booking</h3>
                <div className="space-y-4">
                  <p className="pt-4 text-lg font-bold">{model}</p>
                  <p>{carLocation}</p>
                  <p>Rental price: ${rentalPrice}/day</p>
                  <p>{features}</p>

                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <div>
                        <label>Book For: </label>

                        <DatePicker
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={(update) => {
                            setDateRange(update);
                          }}
                          isClearable={true}
                          placeholderText="Select Date"
                          className="input input-bordered"
                          dateFormat="MMM, d, yy "
                          required
                        />
                      </div>
                      <p className="pt-4 font-black">
                        Total Cost: ${totalCost}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-neutral mt-8 w-fit justify-end"
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
