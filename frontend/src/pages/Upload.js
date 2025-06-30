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

  // ⬇️ NEW
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return alert('Please select a video');

    const data = new FormData();
    data.append('video', file);
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('isPublic', form.isPublic);

    try {
      setIsUploading(true);          // ⬅️ start loader
      setProgress(0);

      await axios.post('/videos/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
        // Axios gives you native progress
        onUploadProgress: e => {
          const pct = Math.round((e.loaded * 100) / e.total);
          setProgress(pct);
        },
      });

      alert('Video uploaded successfully!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);         // ⬅️ stop loader
      setProgress(0);
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
          disabled={isUploading}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          disabled={isUploading}
        />
        <select
          name="isPublic"
          onChange={handleChange}
          value={form.isPublic}
          disabled={isUploading}
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          required
          disabled={isUploading}
        />

        {/* BUTTON swaps label / content while uploading */}
        <button type="submit" disabled={isUploading}>
          {isUploading ? (
            <>
              <span className="spinner" /> Uploading… {progress}%
            </>
          ) : (
            'Upload'
          )}
        </button>
      </form>
    </div>
  );
};

export default Upload;
