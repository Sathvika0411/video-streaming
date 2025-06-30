import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPublicVideos = async () => {
      try {
        const res = await axios.get('/videos/public');
        setVideos(res.data);
      } catch (err) {
        alert('Failed to load public videos');
      }
    };
    fetchPublicVideos();
  }, []);

  return (
    <div className="home-container">
      <h2>🌐 Public Videos</h2>
      {videos.length === 0 ? (
        <p className="no-videos">No public videos found.</p>
      ) : (
        <div className="video-list">
          {videos.map(video => (
            <div key={video._id} className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p><strong>By:</strong> {video.uploadedBy?.name || 'Unknown'}</p>
              <p><strong>Views:</strong> {video.views}</p>
              <Link to={`/watch/${video._id}`} className="watch-link">▶ Watch</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
