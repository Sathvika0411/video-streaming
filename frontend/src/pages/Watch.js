import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';

const Watch = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${id}`);
        setVideo(res.data);
        await axios.put(`/videos/${id}/views`); // Increment view count
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to load video');
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{video.title}</h2>
      <video src={video.videoUrl} controls width="100%" />
      <p>{video.description}</p>
      <p><strong>Views:</strong> {video.views}</p>
      <p><strong>Uploaded by:</strong> {video.uploadedBy?.name || 'Unknown'}</p>
    </div>
  );
};

export default Watch;
