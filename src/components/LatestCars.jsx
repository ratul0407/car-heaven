import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const LatestCars = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/few-cars`,
      );
      setCars(data);
    };

    fetchCars();
  }, []);
  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">Latest Cars</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Link key={car._id} to={`/car-details/${car._id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-lg bg-base-200 shadow-lg"
              >
                {/* Car Image */}
                <div className="relative">
                  <img
                    src={car.imgUrl}
                    alt={car.model}
                    className="h-48 w-full object-cover"
                  />
                  {car.availability && (
                    <span className="absolute left-2 top-2 rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                      Available
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold">{car.model}</h3>
                  <p className="mb-2 text-lg font-bold text-primary">
                    ${car.rentalPrice}/day
                  </p>
                  <p className="mb-2 text-sm text-gray-500">
                    <strong>Booking Count:</strong> {car.bookingCount}
                  </p>
                  <p className="text-xs text-gray-400">
                    Added {format(new Date(car.date), "P")} ago
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCars;
