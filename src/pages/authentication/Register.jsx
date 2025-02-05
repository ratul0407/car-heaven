import { Link, useLocation, useNavigate } from "react-router-dom";
import registrationImg from "../../assets/registration.jpg";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
function Register() {
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await createUser(email, password);

      await updateUserProfile(userName, photo);
      toast.success("Successfully created a new account!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }

    form.reset();
  };

  return (
    <div className="my-12 flex min-h-[calc(100vh-306px)] items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="mx-auto flex justify-center">
            <h3 className="logo">Car Heaven</h3>
          </div>

          <p className="mt-3 text-center text-xl text-gray-600">
            Get Your Free Account Now.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b lg:w-1/4"></span>

            <div className="text-center text-xs uppercase text-gray-500 hover:underline">
              Register With Email
            </div>

            <span className="w-1/5 border-b lg:w-1/4 dark:border-gray-400"></span>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-4">
              <label
                className="mb-2 block text-sm font-medium text-gray-600"
                htmlFor="name"
              >
                Username
              </label>
              <input
                id="name"
                autoComplete="name"
                name="name"
                className="block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="text"
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="mb-2 block text-sm font-medium text-gray-600"
                htmlFor="photo"
              >
                Photo URL
              </label>
              <input
                id="photo"
                autoComplete="photo"
                name="photo"
                className="block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="text"
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="mb-2 block text-sm font-medium text-gray-600"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                className="block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="email"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="mb-2 block text-sm font-medium text-gray-600"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                className="block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                type="password"
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full transform rounded-lg bg-gray-800 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b md:w-1/4"></span>

            <Link
              to="/login"
              className="text-xs uppercase text-gray-500 hover:underline"
            >
              or sign in
            </Link>

            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
        <div className="hidden border bg-cover bg-center lg:block lg:w-1/2">
          <img className="h-full" src={registrationImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
