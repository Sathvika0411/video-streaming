import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import './MyVideos.css';

const MyVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const res = await axios.get('/videos/my');
        setVideos(res.data);
      } catch (err) {
        alert('Failed to load your videos');
      }
    };

    fetchMyVideos();
  }, []);

  return (
    <div className="myvideos-container">
      <h2>🎥 My Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p className="no-videos">You haven't uploaded any videos yet.</p>
      ) : (
        <div className="video-list">
          {videos.map(video => (
            <div key={video._id} className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p><strong>Privacy:</strong> {video.isPublic ? 'Public' : 'Private'}</p>
              <p><strong>Views:</strong> {video.views}</p>
              <Link to={`/watch/${video._id}`} className="watch-link">▶ Watch</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVideos;
