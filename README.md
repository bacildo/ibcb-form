# Aplicativo de Gerenciamento de Mensagens

Este é um aplicativo de gerenciamento de mensagens construído com **React, TypeScript, Node.js, Express e MongoDB**.  
Ele permite que usuários enviem mensagens e que um administrador autenticado gerencie essas mensagens (visualizar, imprimir e excluir).

---

## 🚀 Funcionalidades

- Envio de mensagens por usuários (público).
- Área administrativa restrita, protegida por autenticação JWT.
- Fluxo de **primeiro acesso**:
  - O usuário `admin` é criado automaticamente no banco na primeira execução.
  - No primeiro login, é obrigatório trocar a senha.
- Operações CRUD para mensagens.
- Validações no frontend e backend.
- Proteção contra acesso direto a rotas administrativas (guards).
- Estilização responsiva com Tailwind CSS.

---

## 🛠 Tecnologias Utilizadas

- **Frontend**: React, Vite, Axios, React Hook Form, Zod
- **Backend**: Node.js, Express, TypeScript, MongoDB, TypeORM, Typedi
- **Autenticação**: JWT (com roles e flag de `mustChangePassword`)
- **Estilização**: Tailwind CSS
- **Outros**: Cookies para persistência do token, Winston para logs, bcrypt para hashing de senhas

---

## 📂 Estrutura de Rotas

- **Públicas**

  - `/` → Formulário de envio de mensagens
  - `/thank-you` → Tela de agradecimento

- **Admin**

  - `/admin/login` → Login administrativo
  - `/admin/first-access` → Troca obrigatória da senha no primeiro acesso
  - `/admin/change-password` → Alterar senha logado
  - `/admin` → Home administrativa
  - `/admin/messages` → Listagem de mensagens

- As rotas administrativas são protegidas por:
  - `FirstAccessGuard`: só acessa `/first-access` se o token tiver `mustChangePassword = true`.
  - `AdminGuard`: só acessa `/admin` e demais se for admin **e já tiver trocado a senha**.

---

## ⚙️ Como Começar

Clone o repositório:

git clone https://github.com/bacildo/ibcb-form
cd ibcb-form

### 1. Instale as dependências

Na raiz do projeto:

npm install

Isso instala dependências tanto do frontend quanto do backend (via postinstall).

### 2. Configuração

O projeto não usa `.env`.  
As configurações estão em `backend/src/config/env/development.ts`, incluindo:

- Banco MongoDB (`dev` por padrão)
- Porta do servidor (`3000`)
- Chave secreta JWT (`SECRET`)
- Usuário admin seed:

export const adminSeed = {
name: "admin",
password: "Trocar@123",
role: "admin",
mustChangeOnFirstLogin: true,
};

### 3. Rodando em desenvolvimento

Frontend:
npm run start:frontend

Backend:
npm run start:backend

Aplicação completa (com build automático do backend):
npm run application

---

## 🔑 Fluxo de Autenticação

1. Primeiro login com usuário `admin / Trocar@123`.
2. Backend retorna `token` com flag `mustChangePassword = true`.
3. Frontend redireciona automaticamente para `/admin/first-access`.
4. Nova senha deve ter **mínimo 8 caracteres** (validado no front e no back).
5. Após trocar, o backend devolve novo `token` sem flag, liberando acesso ao `/admin`.

---

## 📡 Endpoints da API

- No backend, os endpoints podem ser verificados nos `controllers` em `backend/src/controllers/`.
- No frontend, as chamadas estão em `src/services/`.

---

## 🔄 Reset do admin (guia rápido)

Se precisar resetar o admin (caso esqueça a senha):

1. Acesse seu banco MongoDB (`dev.user`).
2. Apague o documento do admin.
3. Reinicie a aplicação.
4. O seed recriará o admin com as credenciais padrão:
   - Usuário: `admin`
   - Senha: `admin@123` (obrigará troca no primeiro acesso).

---

## 📜 Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter mais detalhes.
