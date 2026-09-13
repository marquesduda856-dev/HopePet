import { supabase } from '../config/supabase.js';

// Mock de banco de dados em memória para quando o Supabase estiver off
let mockHistoriasDB = [
  {
    id: 1,
    nome: 'Mariana Silva',
    cidade: 'São Paulo',
    titulo: 'O resgate do pequeno Thor',
    historia: 'Encontrei o Thor em uma noite chuvosa deitado embaixo de um carro antigo. Ele estava muito assustado, magro e com frio. Demorou horas para ganhar a confiança dele, mas com a ajuda de um petisco, ele finalmente cedeu.\n\nLevei ao veterinário, tratamos as pulgas e hoje, 2 anos depois, é o cachorro mais feliz do mundo e a verdadeira alegria da casa!',
    fotos: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    nome: 'Carlos Souza',
    cidade: 'Curitiba',
    titulo: 'Mia: de gata de rua a rainha da casa',
    historia: 'A Mia me adotou, na verdade. Ela apareceu na minha porta e nunca mais foi embora. O amor mais puro!',
    fotos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    created_at: new Date().toISOString()
  }
];

export const getHistorias = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('historias')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.log('Erro ao buscar histórias no Supabase, retornando mock data:', error.message);
    // Ordena do mais novo pro mais antigo
    const sortedMock = [...mockHistoriasDB].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(sortedMock);
  }
};

export const getHistoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('historias')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.log('Erro ao buscar história no Supabase, retornando mock data:', error.message);
    const mockHistoria = mockHistoriasDB.find(h => h.id.toString() === req.params.id);
    if (mockHistoria) {
      res.json(mockHistoria);
    } else {
      res.status(404).json({ error: 'História não encontrada' });
    }
  }
};

export const createHistoria = async (req, res) => {
  try {
    const { nome, cidade, titulo, historia } = req.body;
    
    // Insere no banco
    const { data, error } = await supabase
      .from('historias')
      .insert([{ nome, cidade, titulo, historia }])
      .select();

    if (error) throw error;

    // TODO: Enviar email de confirmação via Brevo (Fase futura)

    res.status(201).json(data[0]);
  } catch (error) {
    console.log('Erro ao criar história no Supabase, adicionando ao mock em memória:', error.message);
    const { nome, cidade, titulo, historia } = req.body;
    
    const novaHistoria = {
      id: Date.now(), // ID fake baseado no timestamp
      nome,
      cidade,
      titulo,
      historia,
      fotos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'], // Foto genérica
      created_at: new Date().toISOString()
    };
    
    mockHistoriasDB.push(novaHistoria);
    
    res.status(201).json({ success: true, message: 'História enviada com sucesso (mock)', data: novaHistoria });
  }
};

export const getComentarios = async (req, res) => {
  try {
    const { historiaId } = req.params;
    const { data, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('historia_id', historiaId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.log('Erro ao buscar comentários, retornando mock data:', error.message);
    res.json([
      { id: 1, nome: 'Ana Paula', comentario: 'Que história linda!', created_at: new Date().toISOString() },
      { id: 2, nome: 'Lucas', comentario: 'Parabéns pela atitude 👏', created_at: new Date().toISOString() }
    ]);
  }
};

export const createComentario = async (req, res) => {
  try {
    const { historiaId } = req.params;
    const { nome, comentario } = req.body;
    
    const { data, error } = await supabase
      .from('comentarios')
      .insert([{ historia_id: historiaId, nome, comentario }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
