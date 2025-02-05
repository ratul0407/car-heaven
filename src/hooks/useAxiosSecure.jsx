import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});
function useAxiosSecure() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err.status === 401 || err.status === 403) {
          toast.error("unauthorized access");
          logOut().then(() => {
            navigate("/login");
          });
        }
        Promise.reject(err);
      },
    );
  }, []);
  return axiosInstance;
}

export default useAxiosSecure;
