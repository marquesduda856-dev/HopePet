import express from 'express';
import { chatWithHope } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', chatWithHope);

export default router;
