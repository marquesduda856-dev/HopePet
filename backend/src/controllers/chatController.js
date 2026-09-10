import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const AI_API_KEY = process.env.AI_API_KEY;

export const chatWithHope = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória.' });
    }

    if (!AI_API_KEY) {
      return res.status(500).json({ error: 'Chave da API de IA não configurada.' });
    }

    const systemPrompt = `Você é o Hope, um assistente virtual amigável, acolhedor e especialista em proteção animal da plataforma HOPE.
Seu objetivo é ajudar as pessoas com dúvidas sobre adoção, cuidados com cães e gatos, ONGs e também orientar em casos de animais em risco.
Regras:
1. Seja sempre acolhedor e educado (use emojis ocasionalmente).
2. Não invente informações médicas. Se o assunto envolver saúde ou emergência grave, oriente a pessoa a buscar um veterinário ou autoridade competente imediatamente.
3. Não dê respostas muito longas, seja direto e claro.
4. Lembre o usuário de que a plataforma HOPE possui seções de Histórias, Mapa de ONGs e Indicação de ONGs.
`;

    // Utilizando a API do Groq (que é compatível com o formato da OpenAI)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Modelo rápido e gratuito do Groq
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na API de IA:', errorData);
      throw new Error('Falha na comunicação com a IA.');
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
