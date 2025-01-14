import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../store/auth";
import ErrorPage from "./ErrorPage";

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    if (!Values.email || !Values.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true); 
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        Values,
        { withCredentials: true }
      );
      
      toast.success(res.data.message);
      setTimeout(() => {
        dispatch(authActions.login()); 
        navigate("/profile"); 
      }, 1000); 

    } catch (error) {
      console.error("Error Response:", error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <div className="bg-gradient-to-r from-yellow-200 via-lime-400 to-green-600 flex h-screen items-center justify-center">
          <div className="flex flex-col backdrop-blur-sm py-8 bg-white/30 items-center justify-center w-[400px]">
            <h1 className="text-3xl text-center font-bold">PodCreator</h1>
            <div className="mt-6">
              <div className="flex w-full flex-col gap-2 mt-2 text-xl font-bold">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="px-2 py-2 hover:scale-105 ease-in-out duration-300 rounded-lg border my-2 border-black"
                  value={Values.email}
                  onChange={change}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={Values.password}
                  onChange={change}
                  className="px-2 py-2 hover:scale-105 ease-in-out duration-300 rounded-lg border my-2 border-black"
                />
              </div>
              <button
                className="bg-blue-700 w-full font-semibold text-xl text-white rounded mt-2 py-2 hover:scale-105 ease-in-out duration-300"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Login"}
              </button>
              <div className="flex w-full mt-4">
                <p className="text-center text-lg">
                  Don't have an account?{" "}
                  <a href="/signup" className="font-bold hover:text-blue-600">
                    Sign up
                  </a>{" "}
                  now
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
