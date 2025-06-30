import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true},
  isPublic: Boolean,
  views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
