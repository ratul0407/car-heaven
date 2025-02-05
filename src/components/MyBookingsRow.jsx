import axios from "axios";
import { format, formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { CgCalendarDates } from "react-icons/cg";
import { IoTrashBin } from "react-icons/io5";
import BookingModal from "./BookingModal";

function MyBookingsRow({ booking, confirmCancel, fetchCars }) {
  const {
    model,
    bookingDate,
    totalCost,
    bookingStatus,
    _id,
    carId,
    imgUrl,
    rentalPrice,
  } = booking;
  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([bookingDate[0], bookingDate[1]]);

  // handle submit
  const handleSubmit = async (e, id, newTotalCost) => {
    e.preventDefault();
    const bookingDate = dateRange;
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/modify-booking/${id}`,
        {
          bookingDate,
          newTotalCost,
        },
      );
      fetchCars();
      setModalOpen(false);
      toast.success("Date modified successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  //handle date change in date picker
  const onDateChange = (update) => {
    setDateRange(update);
  };
  return (
    <tr
      key={_id}
      className="text-center transition-all duration-300 hover:bg-slate-100"
    >
      <td>
        <img className="h-10 rounded-lg md:h-20" src={imgUrl}></img>
      </td>
      <td>{model}</td>
      {bookingDate && (
        <td>
          {format(new Date(bookingDate[0]), "P")} -
          {format(new Date(bookingDate[1]), "P")}
        </td>
      )}
      <td>{totalCost}</td>

      {bookingStatus && (
        <td>
          <div
            className={`${bookingStatus === "Cancelled" ? "bg-red-500" : bookingStatus === "Confirmed" ? "bg-green-500" : "bg-blue-500"} h-fit w-fit rounded-lg p-1 text-white`}
          >
            {bookingStatus}
          </div>
        </td>
      )}
      <td>
        <button
          disabled={
            bookingStatus === "Confirmed" || bookingStatus === "Cancelled"
          }
          onClick={() => confirmCancel(_id, carId)}
          className="btn btn-error"
        >
          <IoTrashBin />
          cancel
        </button>
      </td>
      <td>
        <button
          disabled={
            bookingStatus === "Confirmed" || bookingStatus === "Cancelled"
          }
          onClick={() => setModalOpen(true)}
          className="btn bg-blue-500 text-white"
        >
          <CgCalendarDates />
          modify date
        </button>
        {modalOpen && (
          <BookingModal
            bookingId={_id}
            dateRange={dateRange}
            closeModal={() => setModalOpen(false)}
            handleSubmit={handleSubmit}
            onDateChange={onDateChange}
            totalCost={totalCost}
            rentalPrice={rentalPrice}
          />
        )}
      </td>
    </tr>
  );
}

export default MyBookingsRow;
