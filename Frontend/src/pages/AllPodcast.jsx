import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PodcastCard from "../components/PodcastCard/PodcastCard";

const AllPodcast = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.post("http://localhost:1000/api/v1/get-podcasts");
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    fetchPodcasts();
  }, []);

  return (
    <div>
      <div className="w-full px-4 lg:px-12 grid py-4 grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {podcasts && podcasts.map((items,i) =><div key={i}><PodcastCard items={items}/>{" "}</div>)}
       </div>
    </div>
  )
}

export default AllPodcast
