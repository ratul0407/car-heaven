import Lottie from "lottie-react";

import { useEffect, useState } from "react";

import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AddSomeCars() {
  const [animation, setAnimation] = useState();
  useEffect(() => {
    fetch("/addCars.json")
      .then((res) => res.json())
      .then((data) => setAnimation(data));
  }, []);
  return (
    <div className="flex flex-col items-center py-12 md:justify-center lg:flex-row">
      <div className="lg:space-y-4">
        <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
          Looks Like You didn&apos;t add any cars.
        </h3>
        <Link
          to="/add-cars"
          className="flex items-center gap-4 text-xl hover:underline"
        >
          <span>Try adding some cars</span>
          <span>
            <FaArrowUpRightFromSquare />
          </span>
        </Link>
      </div>
      <Lottie animationData={animation} loop={true}></Lottie>
    </div>
  );
}

export default AddSomeCars;
