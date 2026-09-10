import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';

const connectionString = 'postgresql://postgres:Dudinhadivonica@db.djbkqfdqbfpjohwyrssu.supabase.co:5432/postgres';

const client = new Client({
  connectionString,
});

async function run() {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados Supabase com sucesso.');

    const basePath = path.join(process.cwd(), '..', 'database');
    const filesToRun = ['schema_fase5.sql', 'schema_fase9.sql'];

    for (const file of filesToRun) {
      const filePath = path.join(basePath, file);
      if (fs.existsSync(filePath)) {
        console.log(`Executando ${file}...`);
        const sql = fs.readFileSync(filePath, 'utf8');
        await client.query(sql);
        console.log(`✅ ${file} executado com sucesso.`);
      } else {
        console.warn(`Arquivo não encontrado: ${filePath}`);
      }
    }

  } catch (err) {
    console.error('Erro ao executar as queries:', err);
  } finally {
    await client.end();
  }
}

run();
