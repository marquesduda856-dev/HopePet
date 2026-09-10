import { supabase } from '../config/supabase.js';
import { sendEmail } from '../services/brevoService.js';

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Verifica se já existe
    const { data: existingUser } = await supabase
      .from('newsletter')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado na newsletter.' });
    }

    const { data, error } = await supabase
      .from('newsletter')
      .insert([{ email }])
      .select();

    if (error) throw error;

    // Tenta enviar e-mail de boas-vindas
    const emailHtml = `
      <h2>Seja bem-vindo(a) à HOPE 💛</h2>
      <p>Obrigado por fazer parte da nossa comunidade.</p>
      <p>Em breve, você receberá histórias inspiradoras, informações sobre proteção animal e novidades da nossa plataforma diretamente no seu e-mail.</p>
      <br>
      <p>Com carinho,</p>
      <p><strong>Equipe HOPE</strong></p>
    `;
    
    // Envio não deve bloquear a resposta de sucesso
    sendEmail(email, 'Amigo(a) dos Animais', 'Bem-vindo(a) à comunidade HOPE!', emailHtml);

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
