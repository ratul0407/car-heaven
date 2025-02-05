import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.jpg";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const { signInUser, signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signInUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      toast.success("Sign In Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="my-12 flex min-h-[calc(100vh-306px)] items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm items-center overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">
        <img className="hidden lg:block lg:h-fit lg:w-1/2" src={loginImg}></img>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="mx-auto flex justify-center space-y-4">
            <h3 className="logo">Car Heaven</h3>
          </div>

          <p className="mt-3 text-center text-xl text-gray-600">
            Welcome back!
          </p>

          <div
            onClick={handleGoogleSignIn}
            className="mt-4 flex transform cursor-pointer items-center justify-center rounded-lg border text-gray-600 transition-colors duration-300 hover:bg-gray-50"
          >
            <div className="px-4 py-2">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 text-center font-bold">
              Sign in with Google
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b lg:w-1/4"></span>

            <div className="text-center text-xs uppercase text-gray-500 hover:underline">
              or login with email
            </div>

            <span className="w-1/5 border-b lg:w-1/4 dark:border-gray-400"></span>
          </div>
          <form onSubmit={handleSubmit}>
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
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full transform rounded-lg bg-gray-800 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="pt-4 text-sm font-medium">New to our website?</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/3 border-b md:w-1/3"></span>

            <Link
              to="/registration"
              className="text-xs uppercase text-gray-500 hover:underline"
            >
              sign up
            </Link>

            <span className="w-1/3 border-b md:w-1/3"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
