-- Arquivo para criação das tabelas no Supabase (SQL Editor)

-- Tabela de Histórias
CREATE TABLE IF NOT EXISTS historias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255),
  cidade VARCHAR(255) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  historia TEXT NOT NULL,
  fotos TEXT[],
  status VARCHAR(50) DEFAULT 'aprovada', -- usando aprovada por padrão para facilitar os testes iniciais
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabela de Comentários
CREATE TABLE IF NOT EXISTS comentarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  historia_id UUID REFERENCES historias(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  comentario TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'aprovado',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Habilitando RLS (Opcional, mas recomendado. Inicialmente podemos deixar aberto para a API)
-- ALTER TABLE historias ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;
