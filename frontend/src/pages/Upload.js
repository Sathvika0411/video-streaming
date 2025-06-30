import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    isPublic: 'true',
  });
  const [file, setFile] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return alert('Please select a video');

    const data = new FormData();
    data.append('video', file);
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('isPublic', form.isPublic);

    try {
      await axios.post('/videos/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      alert('Video uploaded successfully!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select name="isPublic" onChange={handleChange} value={form.isPublic}>
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
        <input type="file" accept="video/*" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
