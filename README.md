# Sistema de Gestão de Pacientes

Sistema web CRUD completo para gestão de pacientes, desenvolvido com React, Node.js (Express) e MySQL.

**Desenvolvido por:** Guilherme Augusto Santiago Abib

---

## Tecnologias Utilizadas

- **Frontend:** React 18, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL

---

## Como Rodar o Projeto

### 1. Banco de Dados

1. Abra o MySQL Workbench (ou outro cliente MySQL)
2. Importe o arquivo `database/pacientes.sql`
3. O script cria o banco `sistema_pacientes` e insere dados de exemplo

> **Nota:** O backend está configurado para conectar com `user: root` e `password: ''` (vazio). Se sua senha for diferente, altere em `backend/src/config/database.js`.

### 2. Backend

```bash
cd backend
npm install
npm start
```

O servidor iniciará na porta **3001**.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend iniciará na porta **5173**. Acesse: http://localhost:5173

---

## Estrutura do Projeto

```
PjBL/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuração do banco de dados
│   │   ├── controllers/    # Lógica dos endpoints
│   │   ├── routes/         # Definição das rotas
│   │   ├── services/       # Queries e regras de negócio
│   │   └── server.js       # Arquivo principal do servidor
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis (Layout)
│   │   ├── pages/          # Telas (Lista, Formulário, Detalhes)
│   │   ├── services/       # Configuração do Axios
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── database/
│   └── pacientes.sql       # Script de criação do banco
└── README.md
```

---

## Funcionalidades

- Listagem de pacientes com paginação
- Cadastro de novos pacientes
- Edição de pacientes existentes
- Exclusão de pacientes (com confirmação)
- Visualização detalhada de um paciente
- Validação de dados no backend
- Tratamento de erros com mensagens no frontend
