import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import historiasRoutes from './routes/historias.js';
import ongsRoutes from './routes/ongs.js';
import newsletterRoutes from './routes/newsletter.js';
import chatRoutes from './routes/chat.js';
import buscaRoutes from './routes/busca.js';
import contatoRoutes from './routes/contato.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/historias', historiasRoutes);
app.use('/api/ongs', ongsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/busca', buscaRoutes);
app.use('/api/contato', contatoRoutes);

// Rota básica
app.get('/', (req, res) => {
  res.send('API HOPE rodando.');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
