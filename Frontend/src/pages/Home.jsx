import React from 'react';
import { Link } from 'react-router-dom';
import MainCard from '../components/Maincard';

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-yellow-200 via-lime-400 to-green-600 px-12 h-screen w-screen md:w-full lg:h-[90vh] flex flex-col items-center justify-center py-6 animate-gradient'>
      <div className="flex w-full items-center justify-between gap-4">
        <div className='w-[80%] text-center lg:text-start ml-7'>
          <h1 className='lg:text-8xl md:text-7xl text-6xl text-center font-bold'>
            Create & listen to the <br />
            <span className='flex ml-12 md:ml-36 text-center items-center justify-center'>
              p<img src="https://www.pngmart.com/files/6/Headphone-PNG-Clipart.png" className='lg:w-36 md:w-28 items-center justify-center w-20' alt="headphone" />dcast
            </span>
          </h1>
        </div><MainCard/>
      </div>
      <div className="mt-10 w-full flex items-end justify-between">
        <div className="flex flex-col items-center lg:items-start justify-center">
          <div className='text-xl font-semibold text-center lg:text-start'>
            <p>
              Listen to the most popular podcasts on just one platform - <b>PODCREATOR</b>
            </p>
            
            <Link to="/login">
              <button className='px-5 py-4 bg-green-700 text-white font-bold rounded-full mt-8 hover:scale-110 transition-all duration-300 ease-in-out animate-pulse'>
                Login to listen
              </button>
            </Link>
            <div>
              <p className='text-zinc-700 text-center lg:text-end lg:ml-[1000px] font-bold animate-slide-in'>
                Our app contains more than 1000 podcasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
