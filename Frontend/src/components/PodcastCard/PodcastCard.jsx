import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playerActions } from "../../store/player";
const PodcastCard = ({ items }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handlePlay = (e) =>{
    if (!isLoggedIn) {
      setShowPopup(true);
    }
    else{
      e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(
        playerActions.changeImage(`http://localhost:1000/${items.frontImage}`)
      );
      dispatch(
        playerActions.changeSong(`http://localhost:1000/${items.audioFile}`)
      );
    }
  }


  const closePopup = () => {
    setShowPopup(false); 
  };

  return (
    <div>
      <Link
        to={`/description/${items._id}`}
        className="border p-4 rounded-lg flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <div>
          <img
            src={`http://localhost:1000/${items.frontImage}`}
            alt="img"
            className="rounded size-[42vh] object-cover"
          />
        </div>
        <div className="font-bold text-xl mt-2 ">
          {items.title.slice(0, 20)}
        </div>
        <div className="font-semibold text-xl text-gray-500 ">
          {items.description.slice(0, 50)}
        </div>
        <div className="text-blue-800 text-lg bg-blue-200 mt-2 border border-blue-900 rounded-full px-4 py-2 text-center items-center">
          {items.category?.categoryName || 'No Category'}
        </div>
      

      <div className="mt-2">
        <Link
          onClick={ handlePlay} 
          className="bg-green-800 text-white border flex border-green-950 rounded-lg px-4 py-2 text-center items-center justify-center text-lg font-bold hover:bg-green-700 transition-all duration-300 gap-2"
        >
          <span className="material-symbols-outlined">play_circle</span> Play Now
        </Link>
        
      </div>
      </Link>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="mb-6">
              You need to log in or sign up to access this feature.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastCard;
