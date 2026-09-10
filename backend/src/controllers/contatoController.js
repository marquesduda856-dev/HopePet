import { supabase } from '../config/supabase.js';
import { sendEmail } from '../services/brevoService.js';

export const sendContato = async (req, res) => {
  try {
    const { nome, email, assunto, mensagem } = req.body;
    
    const { data, error } = await supabase
      .from('contatos')
      .insert([{ nome, email, assunto, mensagem }])
      .select();

    if (error) throw error;

    // Notificar equipe
    const html = `
      <h3>Novo Contato pelo Site</h3>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Assunto:</strong> ${assunto}</p>
      <p><strong>Mensagem:</strong> ${mensagem}</p>
    `;
    
    sendEmail('contato@hope-platform.com', 'Equipe HOPE', `Novo Contato: ${assunto}`, html);

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
