import express from 'express';
import { getHistorias, getHistoriaById, createHistoria, getComentarios, createComentario } from '../controllers/historiasController.js';

const router = express.Router();

router.get('/', getHistorias);
router.post('/', createHistoria);
router.get('/:id', getHistoriaById);
router.get('/:historiaId/comentarios', getComentarios);
router.post('/:historiaId/comentarios', createComentario);

export default router;
