import express from 'express';
import { getOngs, createSugestaoOng } from '../controllers/ongsController.js';

const router = express.Router();

router.get('/', getOngs);
router.post('/sugestoes', createSugestaoOng);

export default router;
