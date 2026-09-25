const API_URL = import.meta.env.VITE_API_URL;

export const getHistorias = async () => {
  const res = await fetch(`${API_URL}/historias`);
  if (!res.ok) throw new Error('Erro ao buscar histórias');
  return res.json();
};

export const getHistoriaById = async (id) => {
  const res = await fetch(`${API_URL}/historias/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar a história');
  return res.json();
};

export const createHistoria = async (data) => {
  const res = await fetch(`${API_URL}/historias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar a história');
  return res.json();
};

export const getComentarios = async (historiaId) => {
  const res = await fetch(`${API_URL}/historias/${historiaId}/comentarios`);
  if (!res.ok) throw new Error('Erro ao buscar comentários');
  return res.json();
};

export const createComentario = async (historiaId, data) => {
  const res = await fetch(`${API_URL}/historias/${historiaId}/comentarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar comentário');
  return res.json();
};

export const getOngs = async (cidade = '') => {
  const url = cidade ? `${API_URL}/ongs?cidade=${encodeURIComponent(cidade)}` : `${API_URL}/ongs`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar ONGs');
  return res.json();
};

export const createSugestaoOng = async (data) => {
  const res = await fetch(`${API_URL}/ongs/sugestoes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao enviar sugestão de ONG');
  return res.json();
};

export const askHope = async (message) => {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Erro ao falar com o Hope');
  return res.json();
};

export const subscribeNewsletter = async (email) => {
  const res = await fetch(`${API_URL}/newsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Erro ao cadastrar na newsletter');
  }
  return res.json();
};

export const globalSearch = async (query) => {
  const res = await fetch(`${API_URL}/busca?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Erro na busca');
  return res.json();
};

export const sendContato = async (data) => {
  const res = await fetch(`${API_URL}/contato`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao enviar mensagem');
  return res.json();
};
