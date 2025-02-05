import axios from "axios";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function ErrorPage() {
  const [animation, setAnimation] = useState();
  useEffect(() => {
    fetch("/errorAnimation.json")
      .then((res) => res.json())
      .then((data) => setAnimation(data));
  }, []);
  return (
    <div className="py-12">
      <figure className="mx-auto w-8/12">
        <p className="text-xl font-bold text-red-700">
          No Page Found On your desired destination
        </p>
        <Lottie animationData={animation} loop={true}></Lottie>
        <Link to="/" className="btn">
          <FaArrowLeft />
          Back To Home
        </Link>
      </figure>
    </div>
  );
}

export default ErrorPage;
