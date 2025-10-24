const { Pool } = require('pg');
const readlineSync = require('readline-sync');

// configuração para entrar no banco de dados
const dbConfig = {
  user: 'aluno',
  host: 'localhost',
  database: 'db_profedu',
  password: '102030',
  port: 5432,
};

const pool = new Pool(dbConfig);

// Função para requisitar as 8 notas de uma materia
async function media(materia: any) {
  console.log(`\nDigite suas 8 notas de ${materia}:`);
  let soma = 0;

  for (let i = 1; i <= 8; i++) {
    let notaTemp = readlineSync.questionFloat(`Nota da P${i}: `);
    if (!notaTemp) notaTemp = 0;
    soma += notaTemp;
  }

  const mediaFinal: number = parseFloat((soma / 8).toFixed(2));
  console.log(`Media de ${materia}: ${mediaFinal.toFixed(2)}\n`);
  return mediaFinal;
}

// Função para registrar um aluno
async function registro() {
  console.log("--------- Cadastro de Aluno ----------");
  const nome = readlineSync.question('Nome: ');
  const idade = readlineSync.questionInt('Idade: ');
  const serie = readlineSync.question('Serie (ex de formato: 1A - EM): ');

  const notaMat = await media("Matematica");
  const notaGeo = await media("Geografia");
  const notaHist = await media("Historia");

  if (!nome || !idade || !serie) {
    console.error("Erro: Todos os campos sao obrigatorios!");
    await pool.end();
    return;
  }

  try {
    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO aluno (nome, idade, serie, notaMat, notaGeo, notaHist)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await client.query(insertQuery, [nome, idade, serie, notaMat, notaGeo, notaHist]);
    client.release();

    console.log(` Aluno ${nome} cadastrado com sucesso!`);
  } catch (error) {
    console.error("Erro ao salvar no banco:", error);
  } finally {
    await pool.end();
  }
}

// Chama a função para inicio
registro();
