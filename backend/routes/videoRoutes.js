import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  uploadVideo, getPublicVideos, getMyVideos, getVideoById, incrementViews
} from '../controllers/videoController.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/upload', verifyToken, upload.single('video'), uploadVideo);
router.get('/public', getPublicVideos);
router.get('/my', verifyToken, getMyVideos);
router.get('/:id', verifyToken, getVideoById);
router.put('/:id/views', incrementViews);

export default router;
