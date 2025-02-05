import { motion } from "motion/react";
function Features({ feature, index, icon }) {
  const { title, description } = feature;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="rounded-lg bg-base-200 p-6 shadow-lg"
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default Features;
