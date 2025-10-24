# Projeto 

Esta é a realização de uma atividade passada em faculdade (UniAnchieta Jundiaí) para modificar uma API typescript conforme orientado pelo professor eduardo popovici com o objetivo de demonstrar uma funcionalidade essencial no desenvolvimento de software: **conectar uma aplicação a um banco de dados e inserir informações.**

Desenvolvido pelos alunos: <br>
    **Eduardo Fernando De Almeida Loschi - (RA:2509964)** <br>
    **João Quirino Ramos- (RA: 2526428)**

Referências:
https://www.eduardopopovici.com/2025/09/como-montar-um-conteiner-com-postgre.html (Passo a passo da instalação do PostgreSQL via container pelo docker) <br>
https://github.com/edupopov/ExercicioBancoDeDados (API original do professor)



<img width="1240" height="677" alt="image" src="https://github.com/user-attachments/assets/74b13711-87cc-4b2f-9077-c5a6c5478079" />

Representação passada pelo professor sobre a comunicação entre as plataformas e processos.

---

### O Que Esse Projeto Faz?

O script simula o registro de um aluno no sistema na seguinte ordem: 

1.  **Conecta-se** a um banco de dados PostgreSQL (que deve estar rodando via Docker).
2.  **Pede ao usuário** para digitar um nome, uma idade e uma serie.
3.  **Executa um comando SQL `INSERT`** para salvar esses dados em uma tabela pública chamada `aluno`.
4.  **Encerra a conexão** de forma segura.

---

### Quais ferramentas você vai precisar?

1. VSCode
2. Docker
3. PGAdmin
4. Typescript - NodeJS
5. GitBash

---

### ⚠️ Aviso de Segurança Importante: Credenciais no Código

No arquivo `ExercicioBancoDeDados.ts`, o usuário e a senha do banco de dados estão escritos diretamente no código (uma prática conhecida como *hardcoding*).

```typescript
const dbConfig = {
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030', // <--- PERIGO!
    port: 5432,
};
```

**Para um exercício em aula, isso é aceitável para simplificar o aprendizado.** No entanto, em um projeto real, **isso é uma falha de segurança gravíssima**. Se este código fosse enviado para um repositório público no GitHub, qualquer pessoa poderia ver suas credenciais e obter acesso total ao seu banco de dados.

A maneira correta de gerenciar informações sensíveis como essa é usar **Variáveis de Ambiente**, geralmente com o auxílio de arquivos `.env` e bibliotecas como `dotenv`.

---

### Estrutura do Projeto

Ao clonar ou criar o projeto, você encontrará os seguintes arquivos e diretórios principais:

```
/ExercicioBancoDeDados
|
|-- /dist/
|   |-- ExercicioBancoDeDados.js  <-- O código JavaScript compilado que será executado.
|
|-- /node_modules/
|   |-- ... (várias pastas)     <-- Dependências e bibliotecas do projeto.
|
|-- ExercicioBancoDeDados.ts      <-- Nosso código-fonte principal, escrito em TypeScript.
|
|-- package.json                  <-- O "RG" do projeto: lista as dependências e scripts.
|
|-- tsconfig.json                 <-- Arquivo de configuração com as regras para o compilador TypeScript.
|
|-- README.md                     <-- Este arquivo de documentação.
```

---

### Como Executar o Projeto

Siga os passos abaixo no terminal, dentro da pasta do projeto.

#### Pré-requisitos
1.  Ter o **Node.js** instalado na sua máquina.
2.  Garantir que o **container Docker do PostgreSQL** esteja em execução.

#### Passo a Passo

1.  **Instalar as Dependências**
    Este comando lê o `package.json` e baixa todas as bibliotecas necessárias (como `pg` e `readline-sync`) para a pasta `node_modules`.
    ```bash
    npm install
    ```

2.  **Compilar o Código TypeScript**
    Este comando invoca o compilador do TypeScript (`tsc`), que lê o arquivo `ExercicioBancoDeDados.ts`, segue as regras do `tsconfig.json`, e gera o arquivo JavaScript correspondente dentro da pasta `/dist`.
    ```bash
    npx tsc
    ```


3. **Criar uma Tabela no seu banco de dados**

    Instruções passo a passo em imagens a partir do seu banco de dados conectado no pgAdmin4:

    <img width="433" height="603" alt="Image" src="https://github.com/user-attachments/assets/8e9ce884-56df-4486-8945-f19642c9daca" />

    ---

    Escreva ou copie o seguinte código no Query:

    ```SQL
        CREATE TABLE public.aluno(
	nome VARCHAR(100),
	idade INTEGER,
	serie CHAR(7),
	notaMat NUMERIC(4,2),
	notaGeo NUMERIC(4,2),
	notaHist NUMERIC(4,2)
    )
    ```

    <img width="1019" height="462" alt="Image" src="https://github.com/user-attachments/assets/4d2c624d-ff2e-4490-add9-bf39170dcb4b" />

    Caso a tabela seja criada com sucesso aparecerá esta mensagem no console conforme na imagem, e você pode vizualizar a tabela com (também no Query): 

    ```SQL
    SELECT * FROM public.aluno
    ```

4.  **Executar o Programa**
    Agora, executamos o arquivo JavaScript que foi gerado no passo anterior.
    ```bash
    node dist/ExercicioBancoDeDados.js
    ```
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/5abe7048-e5a3-436d-baed-725b9da67beb" />

Ao executar o último comando, o terminal irá fazer as perguntas. Após respondê-las, verifique no pgAdmin se os novos dados apareceram na sua tabela `aluno`!

Quando acessar o banco de dados, será possível validar se houve a escrita ou não, atualizando a lista ou o banco de dados.

<img width="947" height="509" alt="Image" src="https://github.com/user-attachments/assets/b9462875-6fdd-4d01-8d34-7da9d5a7a5b8" />

Obrigado pela atenção!
