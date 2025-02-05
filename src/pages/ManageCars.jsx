import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

function ManageCars() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchBookingData();
  }, [user]);

  const fetchBookingData = async () => {
    const { data } = await axiosSecure.get(
      `/booking-requests/${user?.email}?owner=${user.email}`,
    );
    setBookings(data);
  };

  const confirmCancel = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3">
        <div>
          <p>Are you you want to Cancel it?</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleCancel(id);
            }}
            className="btn btn-success btn-sm text-white"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-error btn-sm text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleCancel = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cancel-booking/${id}`);
      toast.success("Cancelled booking");
      fetchBookingData();
    } catch (err) {}
  };

  const handleConfirm = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/confirm-booking/${id}`,
      );
      toast.success("Confirmed Booking!");
      fetchBookingData();
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <div>
      <div className="py-4">
        <h3 className="font-bold">Bookings On your Car: </h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Model</th>
                <th>Customer</th>
                <th>Cost</th>
                <th>status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td>
                      <img
                        className="h-10 rounded-lg md:h-20"
                        src={booking.imgUrl}
                      />
                    </td>
                    <td>{booking.model}</td>
                    <td>{booking.bookedBy.name}</td>

                    <td>${booking.totalCost}</td>
                    <td>
                      <div
                        className={`${booking.bookingStatus === "Cancelled" ? "bg-red-500" : booking.bookingStatus === "Confirmed" ? "bg-green-500" : "bg-blue-500"} h-fit w-fit rounded-lg p-1 text-white`}
                      >
                        {booking.bookingStatus}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <div className="tooltip" data-tip="confirm">
                          <button
                            className="btn"
                            disabled={
                              booking.bookingStatus === "Confirmed" ||
                              booking.bookingStatus === "Cancelled"
                            }
                            onClick={() => handleConfirm(booking._id)}
                          >
                            <TiTick
                              size={25}
                              className="hover:text-green-700"
                            />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="cancel">
                          <button
                            className="btn"
                            disabled={
                              booking.bookingStatus === "Cancelled" ||
                              booking.bookingStatus === "Confirmed"
                            }
                            onClick={() => confirmCancel(booking._id)}
                          >
                            <MdBlock size={22} className="hover:text-red-700" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageCars;
