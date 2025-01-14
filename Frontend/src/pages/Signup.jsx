import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(Values);
    try {
      const res = await axios.post("http://localhost:1000/api/v1/sign-up", Values);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error Response:", error.response?.data); 
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>{isLoggedIn?<ErrorPage/>:  <div className='bg-gradient-to-r from-yellow-200 via-lime-400 to-green-600 flex h-screen items-center justify-center'>
      <ToastContainer />
      <div className="flex flex-col backdrop-blur-sm py-8 bg-white/30 items-center justify-center w-[400px] lg:w-2/6">
        <h1 className='text-3xl text-center font-bold'>PodCreator</h1>
        <div className="mt-6">
          <div className='flex w-full flex-col gap-2 mt-2 text-xl font-bold'>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder='Username'
              name='username'
              className='px-2 py-2 hover:scale-105 ease-in-out duration-300 rounded-lg border my-2 border-black'
              value={Values.username}
              onChange={change}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name='email'
              placeholder="ex- Podcast@gmail.com"
              className='px-2 hover:scale-105 ease-in-out duration-300 py-2 my-2 rounded-lg border border-black'
              value={Values.email}
              onChange={change}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name='password'
              placeholder='Password'
              className='px-2 py-2 hover:scale-105 ease-in-out duration-300 rounded-lg border my-2 border-black'
              value={Values.password}
              onChange={change}
              required
            />
          </div>
          <button
            className='bg-green-700 w-full font-semibold text-xl text-white rounded mt-2 py-2 hover:scale-105 ease-in-out duration-300'
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <div className='flex w-full mt-4'>
            <p className='text-center text-lg'>Already have an account? <a href="/login" className="font-bold hover:text-blue-600">Login</a></p>
          </div>
        </div>
      </div>
    </div>
}</>
  );
};

export default Signup;
