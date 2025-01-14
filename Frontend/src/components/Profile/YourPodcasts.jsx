import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PodcastCard from "../PodcastCard/PodcastCard";
const YourPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.post(
          "http://localhost:1000/api/v1/get-user-podcasts",{},
          { withCredentials: true }
        );
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    fetchPodcasts();
  }, [token]);

  return (
    <div>
      <div className="px-4 lg:px-12 my-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold md:font-bold">Your Podcasts</h1>
          <Link
            to="/add-podcast"
            className="px-4 py-2 bg-zinc-800 rounded font-semibold text-white"
          >
            Add Podcast
          </Link>
        </div>
      </div>
      <div className="w-full px-4 lg:px-12 grid py-4 grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {podcasts.map((item, i) => (
          <PodcastCard key={i} items={item} />
        ))}
      </div>
    </div>
  );
};

export default YourPodcasts;
