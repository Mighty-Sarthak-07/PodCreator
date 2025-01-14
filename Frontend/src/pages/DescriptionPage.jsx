import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DescriptionPage = () => {
    const {id} = useParams();
    const [Podcasts, setPodcasts] = useState([]);
  
    useEffect(() => {
      const fetchPodcasts = async () => {
        try {
          const res = await axios.post(
            `http://localhost:1000/api/v1/get-podcast/${id}`,{},
            { withCredentials: true }
          );
          setPodcasts(res.data.data);
        } catch (error) {
          console.error("Error fetching podcasts:", error);
        }
      };
      fetchPodcasts();
    }, []);
  return (
    <div className='px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4' >
      {Podcasts && <>
      <div className="w-2/6 flex items-center justify-center md:justify-start md:items-start">
      <img src={`http://localhost:1000/${Podcasts.frontImage}`} alt="img" className='rounded shadow-xl size-[50vh] object-cover' />
      </div>
      <div className="w-4/6">
      <div className="text-4xl font-semibold">{Podcasts.title}</div>
      <p className='text-2xl mt-4 text-gray-700'>{Podcasts.description}</p>
      <div className="text-blue-800 text-lg bg-blue-200 mt-2 border w-[20%] text-center border-blue-900 rounded-full px-4 py-2">
          {Podcasts.category?.categoryName || 'No Category'}
        </div>
      </div>
      </>
      
      }
    </div>
  )
}

export default DescriptionPage
