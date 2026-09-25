import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import historiasRoutes from './routes/historias.js';
import ongsRoutes from './routes/ongs.js';
import newsletterRoutes from './routes/newsletter.js';

import buscaRoutes from './routes/busca.js';
import contatoRoutes from './routes/contato.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use('/api/historias', historiasRoutes);
app.use('/api/ongs', ongsRoutes);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Muitas requisições. Tente novamente mais tarde.' }
});

app.use('/api/newsletter', limiter, newsletterRoutes);
app.use('/api/busca', buscaRoutes);
app.use('/api/contato', limiter, contatoRoutes);

// Rota básica
app.get('/', (req, res) => {
  res.send('API HOPE rodando.');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
