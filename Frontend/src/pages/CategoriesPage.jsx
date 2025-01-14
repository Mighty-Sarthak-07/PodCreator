import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastCard from '../components/PodcastCard/PodcastCard';

const CategoriesPage = () => {
  const { cat } = useParams(); 
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(
          `http://localhost:1000/api/v1/category/${cat}`
        );

        // Check if data is received
        if (response.data && response.data.data) {
          setPodcasts(response.data.data);
        } else {
          setError("No podcasts found for this category.");
        }
      } catch (err) {
        console.error("Error fetching podcasts:", err);
        setError("Failed to fetch podcasts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [cat]);

  return (
    <div className="px-4 py-4 lg:px-12">
      <h1 className="text-2xl font-bold mb-4 capitalize">{cat}</h1>

      {loading && <p>Loading podcasts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && podcasts.length === 0 && (
        <p>No podcasts found for the "{cat}" category.</p>
      )}
      <div className="w-full px-4 lg:px-12 grid py-4 grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {podcasts.map((podcast, index) => (
          <div key={index}>
            <PodcastCard items={podcast} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
