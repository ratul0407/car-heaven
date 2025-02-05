import { motion } from "motion/react";
import destinationImg from "../assets/destination.jpg";
function Ride() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-10"
    >
      <h3 className="heading">Ride to your destination</h3>
      <p className="py-4 text-lg font-medium">
        Discover the freedom of effortless travel with our premium car rental
        service. Whether you're planning a weekend getaway, a business trip, or
        simply exploring the city, our reliable and well-maintained vehicles are
        here to get you there in comfort and style. With a wide range of options
        to choose from—compact cars for solo travelers, spacious SUVs for family
        trips, or luxurious sedans for special occasions—we have something for
        everyone. Experience seamless booking, transparent pricing, and
        unparalleled customer support as you ride to your destination, your way.
      </p>
      <img className="rounded-lg" src={destinationImg} alt="" />
    </motion.div>
  );
}

export default Ride;
