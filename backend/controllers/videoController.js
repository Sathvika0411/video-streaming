import Video from '../models/videoModel.js';

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;
    const video = new Video({
      title,
      description,
      videoUrl: req.file.path,
      uploadedBy: req.userId,
      isPublic,
    });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', err });
  }
};

export const getPublicVideos = async (req, res) => {
  const videos = await Video.find({ isPublic: true }).populate('uploadedBy', 'name');
  res.json(videos);
};

export const getMyVideos = async (req, res) => {
  const videos = await Video.find({ uploadedBy: req.userId });
  res.json(videos);
};
export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id).populate('uploadedBy', 'name'); // ✅ populate name
  if (!video) return res.status(404).json({ message: 'Not found' });

  if (!video.isPublic && video.uploadedBy._id.toString() !== req.userId) {
    return res.status(403).json({ message: 'Private video' });
  }

  res.json(video);
};

export const incrementViews = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: 'Not found' });

  video.views += 1;
  await video.save();
  res.json({ views: video.views });
};
