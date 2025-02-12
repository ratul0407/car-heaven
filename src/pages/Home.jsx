import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaCar, FaCheckCircle, FaDollarSign, FaHeadset } from "react-icons/fa";
import Features from "../components/Features";
import { useEffect, useState } from "react";
import LatestCars from "../components/LatestCars";
import SpecialOffers from "../components/SpecialOffers";
import Ride from "../components/Ride";
import journeyImg from "../assets/journey.jpg";
import exploreImg from "../assets/explore.jpg";
function Home() {
  const [features, setFeatures] = useState([]);
  const icons = [
    <FaCar className="text-4xl text-neutral" />,
    <FaDollarSign className="text-4xl text-neutral" />,
    <FaCheckCircle className="text-4xl text-neutral" />,
    <FaHeadset className="text-4xl text-neutral" />,
  ];

  useEffect(() => {
    fetch("features.json")
      .then((res) => res.json())
      .then((data) => setFeatures(data));
  }, []);

  return (
    <div className="py-12">
      <div className="space-y-8 rounded-lg bg-[rgba(0,0,0,0.4)] bg-banner-img bg-cover bg-center p-4 py-28 text-white bg-blend-darken">
        <h3 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-8xl">
          Drive Your <span className="underline">Dreams</span> Today.....
        </h3>
        <Link className="bg btn" to={`/available-cars`}>
          View Available Cars
        </Link>
      </div>

      {/* why chose us */}
      <section className="bg-base-100 py-16">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-gray-600"
          >
            Making your journey smooth, affordable, and hassle-free.
          </motion.p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              return (
                <Features
                  icon={icons[index]}
                  key={index}
                  feature={feature}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <LatestCars />
      </section>
      <section>
        <SpecialOffers />
      </section>
      <section>
        <Ride />
      </section>
      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          while={{ scale: 1.05 }}
          className="py-12"
        >
          <h3 className="heading"> Explore the Open Road</h3>
          <p className="py-2 text-center text-xl font-medium text-gray-500">
            Discover Freedom, Adventure, and Possibilities with Every Drive.
          </p>
          <p className="text-lg font-medium">
            Embrace the joy of exploration with our diverse fleet of vehicles
            designed to suit every traveler’s needs. From scenic road trips to
            city adventures, we ensure your journey is as memorable as your
            destination. With affordable rates and seamless service, your next
            adventure awaits!
          </p>
          <img className="rounded-lg" src={journeyImg} alt="" />
        </motion.div>
      </section>
      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          while={{ scale: 1.05 }}
          className="py-12"
        >
          <h3 className="heading"> Your Journey, Your Way</h3>
          <p className="py-2 text-center text-xl font-medium text-gray-500">
            Tailored Car Rentals for Every Trip, Every Destination.
          </p>
          <p className="text-lg font-medium">
            Take control of your travel experience with car rentals that match
            your lifestyle. Whether it’s a quick commute, a family vacation, or
            a luxurious escape, our cars are ready to make every mile count.
            Enjoy the freedom to go anywhere, anytime—your way.
          </p>
          <img className="rounded-lg" src={exploreImg} alt="" />
        </motion.div>
      </section>

      {/* faq section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        while={{ scale: 1.05 }}
        className="mx-auto max-w-xl space-y-4"
      >
        <div>
          <h3 className="heading">Faq section</h3>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            How do I book a car rental?
          </div>
          <div className="collapse-content">
            <p>
              You can book a car through our website or mobile app. Simply
              select your desired car, choose your dates, and complete the
              booking process.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            What documents do I need to rent a car?
          </div>
          <div className="collapse-content">
            <p>
              You'll need a valid driver’s license, a government-issued ID, and
              a credit or debit card for payment. Additional documents may be
              required for international renters.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Can I modify or cancel my booking?
          </div>
          <div className="collapse-content">
            <p>
              Yes, you can modify or cancel your booking through your account.
              Cancellation policies and fees may apply based on the timing and
              terms of your reservation.
            </p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Are there mileage limits for rented cars?
          </div>
          <div className="collapse-content">
            <p>
              Some cars have mileage limits depending on the rental plan. Please
              check the specific terms for each car during the booking process.
            </p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            What happens if the car breaks down during the rental period?
          </div>
          <div className="collapse-content">
            <p>
              In case of a breakdown, contact our 24/7 customer support
              immediately. We’ll assist you with roadside assistance or provide
              a replacement vehicle if necessary.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;
