import { supabase } from '../config/supabase.js';

export const getOngs = async (req, res) => {
  try {
    const { cidade } = req.query;
    
    let query = supabase
      .from('ongs')
      .select('*')
      .eq('status', 'aprovada')
      .order('nome', { ascending: true });

    if (cidade) {
      query = query.ilike('cidade', `%${cidade}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSugestaoOng = async (req, res) => {
  try {
    const { nome_ong, cidade, estado, endereco, instagram, site, telefone, descricao, motivo } = req.body;
    
    const { data, error } = await supabase
      .from('sugestoes_ongs')
      .insert([{ nome_ong, cidade, estado, endereco, instagram, site, telefone, descricao, motivo }])
      .select();

    if (error) throw error;

    // TODO: Disparar e-mail via Brevo para a equipe aprovar

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
