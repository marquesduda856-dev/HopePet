import express from 'express';
import { globalSearch } from '../controllers/buscaController.js';

const router = express.Router();

router.get('/', globalSearch);

export default router;
