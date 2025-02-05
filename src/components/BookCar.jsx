import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BookCar() {
  const [animation, setAnimation] = useState();
  useEffect(() => {
    fetch("/bookCars.json")
      .then((res) => res.json())
      .then((data) => {
        setAnimation(data);
      });
  }, []);
  return (
    <div className="mx-auto w-8/12">
      <h3 className="heading">You didn't book a car yet!</h3>
      <Link to="/available-cars" className="btn">
        <FaArrowLeft /> Book a car
      </Link>
      <Lottie animationData={animation} loop={true} />
    </div>
  );
}

export default BookCar;
