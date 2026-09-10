import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;

export const sendEmail = async (toEmail, toName, subject, htmlContent) => {
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY não configurada');
    return false;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Equipe HOPE', email: 'contato@hope-platform.com' },
        to: [{ email: toEmail, name: toName }],
        subject: subject,
        htmlContent: htmlContent
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao enviar e-mail via Brevo:', errorData);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro de rede ao enviar e-mail:', error);
    return false;
  }
};
