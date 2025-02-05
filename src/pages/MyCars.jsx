import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AddSomeCars from "../components/AddSomeCars";
import { compareAsc, format } from "date-fns";
import { FaPen } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

function MyCars() {
  const [cars, setCars] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  useEffect(() => {
    fetchCars();
  }, [sortBy, order]);
  const fetchCars = async () => {
    const { data } = await axiosSecure.get(
      `/cars/${user?.email}?sortBy=${sortBy}&order=${order}`,
    );

    setCars(data);
  };
  const confirmDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3">
        <div>
          <p>Are you you want to delete it?</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete-car/${id}`);
      toast.success("Deleted successfully");
      fetchCars();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div>
        <div className="dropdown dropdown-right">
          <select
            onChange={(e) => {
              setOrder(e.target.value);
              setSortBy("price");
            }}
            className="rounded-lg p-2 shadow-xl outline-gray-300"
          >
            <option value="">Filter Price</option>
            <option value="high">Price (High)</option>
            <option value="low">Price (Low)</option>
          </select>
          <select
            className="rounded-lg p-2 shadow-xl outline-gray-300"
            onChange={(e) => {
              setOrder(e.target.value);
              setSortBy("date");
            }}
          >
            <option value="">Filter Date</option>
            <option value="asc">Newest</option>
            <option value="dsc">Oldest</option>
          </select>
        </div>
      </div>
      {cars.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Car Image</th>
                <th>Car Model</th>
                <th>Daily Rental Price</th>
                <th>Availablility</th>
                <th>Date Added</th>
                <th>Booking count</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {cars?.map((car) => {
                return (
                  <tr key={car._id}>
                    <td>
                      <img
                        className="h-10 rounded-lg md:h-20"
                        src={car.imgUrl}
                      ></img>
                    </td>
                    <td>{car.model}</td>
                    <td>{car.rentalPrice}</td>
                    <td>{car.availability}</td>
                    <td>{format(new Date(car.date), "P")}</td>
                    <td>{car.bookingCount}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/update-car/${car._id}`}
                          className="btn btn-warning"
                        >
                          {" "}
                          <FaPen size={15} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(car._id)}
                          className="btn btn-error"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <AddSomeCars />
      )}
    </div>
  );
}

export default MyCars;
