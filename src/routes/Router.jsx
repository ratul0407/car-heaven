import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AddCars from "../pages/AddCars";
import PrivateRoute from "./PrivateRoute";
import MyCars from "../pages/MyCars";
import UpdateCar from "../pages/UpdateCar";
import AvailableCars from "../pages/AvailableCars";
import MyBookings from "../pages/MyBookings";
import CarDetails from "../pages/CarDetails";
import ManageCars from "../pages/ManageCars";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/add-cars",
        element: (
          <PrivateRoute>
            <AddCars />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-cars",
        element: (
          <PrivateRoute>
            <MyCars />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-car/:id",
        element: (
          <PrivateRoute>
            <UpdateCar />
          </PrivateRoute>
        ),
      },
      {
        path: "/available-cars",
        element: <AvailableCars />,
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-cars",
        element: (
          <PrivateRoute>
            <ManageCars />
          </PrivateRoute>
        ),
      },
      {
        path: "/car-details/:id",
        element: <CarDetails />,
      },
    ],
  },
]);

export default router;
