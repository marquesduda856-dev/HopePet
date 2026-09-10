-- Tabela de ONGs
CREATE TABLE IF NOT EXISTS ongs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  endereco VARCHAR(255),
  telefone VARCHAR(50),
  instagram VARCHAR(255),
  site VARCHAR(255),
  descricao TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  imagem TEXT,
  status VARCHAR(50) DEFAULT 'aprovada',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabela de Sugestões de ONGs
CREATE TABLE IF NOT EXISTS sugestoes_ongs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_ong VARCHAR(255) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  endereco VARCHAR(255),
  instagram VARCHAR(255),
  site VARCHAR(255),
  telefone VARCHAR(50),
  descricao TEXT,
  motivo TEXT,
  status VARCHAR(50) DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
