import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    fetch("/offers.json")
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);
  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto">
        <h2 className="heading">Special Offers</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-start rounded-lg bg-white p-6 shadow-lg"
            >
              <h3 className="mb-2 text-2xl font-semibold">{offer.title}</h3>
              <p className="mb-4 text-gray-600">{offer.description}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-neutral"
              >
                {offer.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
