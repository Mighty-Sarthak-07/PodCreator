import axios from "axios";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';
import AddPodcast from './pages/AddPodcast.jsx';
import AllPodcast from './pages/AllPodcast.jsx';
import Categories from './pages/Categories';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { authActions } from "./store/auth.js";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import DescriptionPage from "./pages/DescriptionPage.jsx";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async ()=>{
    try{
      const res = await axios.get("http://localhost:1000/api/v1/check-cookie",{withCredentials:true});
      console.log(res.data.message);
    if(res.data.message == true){
      dispatch(authActions.login());
    }
  }
  catch(error){
    console.log(error);
  };
    fetch();
}
  }, [dispatch]);

  
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<MainLayout/>}>
        {" "}
           <Route index element = {<Home/>}/>
           <Route path='/' element = {<AuthLayout/>}/>
           <Route path='/profile' element = {<Profile/>}/>
           <Route path='/categories' element = {<Categories/>}/>
           <Route path='/add-podcast' element = {<AddPodcast/>}/>
           <Route path='/all-podcasts' element = {<AllPodcast/>}/>
           <Route path='/categories/:cat' element = {<CategoriesPage/>}/>
           <Route path='/description/:id' element = {<DescriptionPage/>}/>
           <Route path='/signup' element = {<Signup/>}/>
           <Route path='/login' element = {<Login/>}/>
           </Route>
       </Routes>
      </Router>
    </div>
  )
}

export default App
