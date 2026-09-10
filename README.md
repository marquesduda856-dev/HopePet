# Projeto HOPE 🐾

Plataforma completa de proteção animal, adoção, conscientização e divulgação de ONGs, com IA integrada.

## Tecnologias Utilizadas
- **Frontend:** React + Vite + Tailwind CSS + Lucide React + React Leaflet
- **Backend:** Node.js + Express + Supabase (PostgreSQL) + Brevo (E-mails) + Groq (IA Chatbot LLaMA 3)

## Como executar o projeto

### Pré-requisitos
- Node.js instalado (v16+)
- Conta no Supabase (Gratuito)
- Conta no Brevo (Gratuito)
- Conta no Groq Console (Gratuito)

### 1. Clonando o repositório
\`\`\`bash
git clone https://github.com/seu-usuario/hope.git
cd hope
\`\`\`

### 2. Configurando o Banco de Dados (Supabase)
1. Crie um projeto no Supabase.
2. Vá ao "SQL Editor" e execute os scripts contidos na pasta \`database/\` na seguinte ordem:
   - \`schema.sql\`
   - \`schema_fase3.sql\`
   - \`schema_fase5.sql\`
   - \`schema_fase9.sql\`

### 3. Configurando Variáveis de Ambiente
Crie um arquivo \`.env\` nas pastas \`frontend\` e \`backend\`, baseado no arquivo \`.env.example\` que está na raiz.

**Backend (\`backend/.env\`):**
\`\`\`env
SUPABASE_URL=sua_url_aqui
SUPABASE_ANON_KEY=sua_chave_anon_aqui
BREVO_API_KEY=sua_chave_brevo_aqui
AI_API_KEY=sua_chave_groq_aqui
PORT=3000
NODE_ENV=development
\`\`\`

**Frontend (\`frontend/.env\`):**
\`\`\`env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
\`\`\`

### 4. Executando o Backend
Abra um terminal e rode:
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`
*(O servidor rodará na porta 3000)*

### 5. Executando o Frontend
Abra outro terminal e rode:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
*(Acesse http://localhost:5173 no seu navegador)*

## Estrutura do Projeto
- **Busca Global:** Procura em histórias e ONGs simultaneamente.
- **Chatbot Hope:** IA integrada com Groq para responder perguntas sobre cuidados com os animais e indicar rotas da plataforma.
- **Mapa:** Mapa interativo construído com Leaflet, exibindo as ONGs cadastradas.
- **Newsletter:** Captura e-mails e dispara mensagens de boas-vindas utilizando Brevo.
- **Formulário de Contato:** Envia e-mails automáticos para a equipe.
- **Histórias e ONGs:** CRUD completo, listando, detalhando e recebendo novas histórias e comentários dos usuários.

## Licença
MIT License
