import express from 'express';
import { sendContato } from '../controllers/contatoController.js';

const router = express.Router();

router.post('/', sendContato);

export default router;
