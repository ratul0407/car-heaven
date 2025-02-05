import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

function UpdateCar() {
  const { user } = useAuth();
  const [availability, setAvailability] = useState();
  const [car, setCar] = useState([]);
  const navigate = useNavigate();
  const {
    model,
    rentalPrice,
    carLocation,
    description,
    imgUrl,
    availability: available,
    features,
    regNumber,
  } = car || {};
  const { id } = useParams();

  useEffect(() => {
    const fetchCarData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/car/${id}`,
      );
      setCar(data);
    };
    fetchCarData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const model = form.model.value;
    const rentalPrice = parseFloat(form.rental_price.value);
    const regNumber = form.registration.value;
    const features = form.features.value;
    const description = form.description.value;
    const imgUrl = form.photo.value;
    const carLocation = form.location.value;
    const carData = {
      model,
      rentalPrice,
      regNumber,
      features,
      description,
      imgUrl,
      carLocation,
      bookingCount: car.bookingCount,
      date: car.date,
      carOwner: {
        name: user.displayName,
        email: user.email,
      },
      availability,
    };
    console.table(carData);

    //update the data
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-car/${id}`,
        carData,
      );

      toast.success("Data Updated Successfully");
      navigate("/my-cars");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="mt-12 rounded-xl px-8 font-medium shadow-2xl md:mx-auto md:max-w-xl md:py-12 lg:max-w-2xl">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2"
      >
        {/* Car model */}
        <InputField
          label="Car Model"
          type="text"
          placeholder="Car Model Name"
          name="model"
          defaultValue={model}
        />

        {/* Daily Rental Price*/}
        <InputField
          type="text"
          name="rental_price"
          placeholder="What is your dailsy rental price"
          label="Daily Rental Price"
          defaultValue={rentalPrice}
        />

        {/* avialability */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Abailability</span>
          </label>
          <select
            onChange={(e) => setAvailability(e.target.value)}
            defaultValue={available}
            className="select select-bordered"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Registration Number */}
        <InputField
          type="text"
          name="registration"
          label="Vehicle Registration Number"
          placeholder="Enter Registration Number"
          defaultValue={regNumber}
        />

        {/* Features */}
        <TextArea
          label="Features"
          name="features"
          placeholder="What are the features of your car?"
          defaultValue={features}
        />

        {/* description */}
        <TextArea
          label="Description"
          name="description"
          placeholder="Write a small description about the car"
          defaultValue={description}
        />

        {/* image url */}
        <InputField
          type="url"
          name="photo"
          placeholder="Enter the image url of your vehicle"
          label="Image Url"
          defaultValue={imgUrl}
        />

        {/* location */}
        <InputField
          label="Location"
          type="text"
          placeholder="Enter Location"
          name="location"
          defaultValue={carLocation}
        />
        {/* Submit Button */}
        <div className="form-control pt-4 sm:col-span-2">
          <button className="btn btn-success text-white">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCar;
