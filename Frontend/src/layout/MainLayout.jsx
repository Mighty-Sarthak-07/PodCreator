import React from 'react'
import { Outlet } from "react-router-dom"
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'
import Navbar from '../components/Navbar'
const MainLayout = () => {
  return (
    <div className='relative'>
      <Navbar/>
      <Outlet/>
      <div className='fixed bottom-0 left-0 w-full' >
        <AudioPlayer/>
      </div>
    </div>
  )
}

export default MainLayout
