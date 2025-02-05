import { addDays, formatDistance, formatDistanceStrict } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

function BookingModal({
  bookingId,
  dateRange,
  onDateChange,
  handleSubmit,
  closeModal,
  totalCost,
  rentalPrice,
}) {
  const [startDate, endDate] = dateRange;

  const [newTotalCost, setNewTotalCost] = useState(totalCost);

  useEffect(() => {
    const days = formatDistance(
      new Date(startDate),
      addDays(new Date(endDate), 1),
    );
    if (parseInt(days)) return setNewTotalCost(parseInt(days) * rentalPrice);
  }, [startDate, endDate]);

  return (
    <dialog id={`modal-${bookingId}`} className="modal modal-open">
      <div className="modal-box min-h-96">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
        <form
          className="flex flex-col space-y-4"
          onSubmit={(e) => {
            handleSubmit(e, bookingId, newTotalCost);
          }}
        >
          <label>Select the new booking date</label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={onDateChange}
            isClearable={true}
            placeholderText="Select Date"
            className="input input-bordered"
            dateFormat="MMM, d, yy "
            required
          />
          <p className="py-4 text-lg font-bold">Total Cost: ${newTotalCost}</p>
          <button type="submit" className="btn btn-neutral">
            Modify
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default BookingModal;
