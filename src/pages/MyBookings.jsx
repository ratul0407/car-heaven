import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import toast from "react-hot-toast";

import MyBookingsRow from "../components/MyBookingsRow";
import useAxiosSecure from "../hooks/useAxiosSecure";
import BookingDataGraph from "../components/BookingDataGraph";
import BookCar from "../components/BookCar";

function MyBookings() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myBookings, setMyBookings] = useState([]);
  useEffect(() => {
    if (user?.email) fetchCars();
  }, [user]);

  const fetchCars = async () => {
    const { data } = await axiosSecure.get(`/my-bookings/${user?.email}`);
    setMyBookings(data);
  };

  const confirmCancel = (id, carId) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3">
        <div>
          <p>Are you you want to Cancel it?</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleCancel(id, carId);
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

  const handleCancel = async (id, carId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/cancel-booking/${id}?owner=${carId}`,
      );
      toast.success("Canceled Booking");
      fetchCars();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      {myBookings.length !== 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-center font-bold text-white">
                  <th className="bg-red-400">Car Image</th>
                  <th className="bg-violet-400">Car Model</th>
                  <th className="bg-green-500">Booking Date</th>
                  <th className="bg-blue-400">Total Cost</th>
                  <th className="bg-zinc-400">Booking Status</th>
                  <th className="bg-red-500">Cancel</th>
                  <th className="bg-orange-400">modify</th>
                </tr>
              </thead>
              <tbody>
                {myBookings?.map((booking) => {
                  return (
                    <MyBookingsRow
                      key={booking._id}
                      booking={booking}
                      fetchCars={fetchCars}
                      confirmCancel={confirmCancel}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center py-12">
            <h3 className="heading pb-4">Your Bookings Data</h3>
            <BookingDataGraph data={myBookings} />
          </div>
        </>
      ) : (
        <BookCar />
      )}
    </div>
  );
}

export default MyBookings;
