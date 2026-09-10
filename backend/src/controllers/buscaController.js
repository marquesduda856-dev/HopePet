import { supabase } from '../config/supabase.js';

export const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ historias: [], ongs: [] });
    }

    // Busca nas histórias
    const { data: historias, error: histError } = await supabase
      .from('historias')
      .select('id, titulo, historia, cidade')
      .ilike('titulo', `%${q}%`)
      .limit(5);

    if (histError) throw histError;

    // Busca nas ONGs
    const { data: ongs, error: ongError } = await supabase
      .from('ongs')
      .select('id, nome, descricao, cidade, estado')
      .ilike('nome', `%${q}%`)
      .limit(5);

    if (ongError) throw ongError;

    res.json({ historias, ongs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
