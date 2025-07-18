import dotenv from 'dotenv';
dotenv.config(); // ✅ Loads variables from .env

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'video_streaming',
    resource_type: 'video', // ✅ ensures it handles videos
  },
});

export { cloudinary, storage };
