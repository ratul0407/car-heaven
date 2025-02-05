import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
function AddCars() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [availability, setAvailability] = useState("Yes");
  const navigate = useNavigate();
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
      bookingCount: 0,
      date: new Date(),
      carOwner: {
        name: user.displayName,
        email: user.email,
      },
      availability,
      bookingStatus: "Pending",
    };

    try {
      const result = await axiosSecure.post(`/add-cars`, carData);
      if (result.status !== 401)
        toast.success("Car's Data Added Successfully!");
      navigate("/my-cars");
      form.reset();
    } catch (err) {
      toast.error(err.message);
    }
  };
  // await axios.post(`${import.meta.env.VITE_API_URL}/add-cars`, carData);
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
        />

        {/* Daily Rental Price*/}
        <InputField
          type="text"
          name="rental_price"
          placeholder="What is your dailsy rental price"
          label="Daily Rental Price"
        />

        {/* avialability */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Abailability</span>
          </label>
          <select
            onChange={(e) => setAvailability(e.target.value)}
            defaultValue="Yes"
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
        />

        {/* Features */}
        <TextArea
          label="Features"
          name="features"
          placeholder="What are the features of your car?"
        />

        {/* description */}
        <TextArea
          label="Description"
          name="description"
          placeholder="Write a small description about the car"
        />

        {/* image url */}
        <InputField
          type="url"
          name="photo"
          placeholder="Enter the image url of your vehicle"
          label="Image Url"
        />

        {/* location */}
        <InputField
          label="Location"
          type="text"
          placeholder="Enter Location"
          name="location"
        />
        {/* Submit Button */}
        <div className="form-control pt-4 sm:col-span-2">
          <button className="btn btn-success text-white">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddCars;
