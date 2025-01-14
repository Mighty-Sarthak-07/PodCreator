import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from "../../store/auth";
const Header = () => {
    const navigate = useNavigate();
    const [UserData, setUserData] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchUserDetails = async ()=>{
         const res = await axios.get("http://localhost:1000/api/v1/user-details",{withCredentials:true,});
         setUserData(res.data.user);
      };
      fetchUserDetails();
    }, [])
    const LogoutHandler = async () =>{
        const res = await axios.post("http://localhost:1000/api/v1/logout",{withCredentials:true,});
        console.log(res);
        dispatch(authActions.logout());
        navigate("/");
    }
  return (
    <>
    {UserData && (<div className='bg-green-900 rounded p-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between'>
        <div className='flex flex-col items-center md:items-start'>
          <p className="text-zinc-300">Profile</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">{UserData.username}</h1>
          <p className="text-zinc-300 mt-1">{UserData.email}</p>
        </div>
        <div>
          <button className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 " onClick={LogoutHandler}>Log Out</button>
        </div>
      </div>
      
    )}</>
  );
}

export default Header
