import { supabase } from '../config/supabase.js';

export const getHistorias = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('historias')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
