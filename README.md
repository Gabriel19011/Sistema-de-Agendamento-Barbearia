# Sistema de Agendamento - Barbearia API (Multivix)

> **Disciplina:** Programação para Internet (PPI) 
> **Curso:** Bacharelado em Sistemas de Informação - 4º/5º Período 
> **Professor:** Msc. Edgard da Cunha Pontes 
> **Instituição:** Faculdade Multivix 
> **Ano:** 2026/1 

---

## 👥 Integrantes e Divisão de Papéis

Este projeto foi desenvolvido em grupo, com uma separação clara de responsabilidades entre as camadas de Front-end (Cliente) e Back-end (Servidor):

*   **Gabriel Smarzaro Santos** (Desenvolvedor Front-end & UI/UX)
    *   *Contribuições:* Estruturação semântica das telas em HTML5, estilização responsiva com CSS3 (Mobile-First), lógica de interação dinâmica do DOM, manipulação do seletor Dia/Noite com persistência em cache e integração assíncrona com a API utilizando Fetch/Promises.
*   **Ewerton Decoté de Aguiar Gomes** (Desenvolvedor Back-end)
    *   *Contribuições:* Modelagem das interfaces de contrato de dados, estruturação e configuração inicial do servidor Node.js com Express e TypeScript.
*   **Giuseppe Pedruzzi Scherrer** (Desenvolvedor Back-end)
    *   *Contribuições:* Criação e validação das rotas RESTful (GET e POST) na manipulação de dados em memória.
*   **Igor Schuina Xavier** (Desenvolvedor Back-end)
    *   *Contribuições:* Desenvolvimento das rotas adicionais de persistência (PUT e DELETE) e algoritmo de reaproveitamento dinâmico de chaves identificadoras (IDs).

---

## 💻 Sobre o Projeto

O **Sistema de Agendamento de Barbearia** é um ecossistema Web Full Stack projetado para gerenciar e agilizar a marcação de horários de clientes de forma prática e em tempo real, sem necessidade de recarregamento de página. A aplicação demonstra na prática o ciclo completo de Requisição/Resposta HTTP entre um navegador e um servidor local através de contratos rígidos de software em TypeScript.

### 🌟 Diferenciais e Funcionalidades do Projeto
*   **CRUD Completo em Memória:** Além das rotas de Listagem (GET) e Cadastro (POST) exigidas no escopo, o grupo implementou as rotas de Atualização (PUT) e Exclusão (DELETE) unificadas na mesma tela.
*   **Algoritmo de Reaproveitamento de IDs:** O servidor varre a memória e encontra dinamicamente o menor número inteiro disponível após exclusões, evitando saltos desnecessários de chaves primárias.
*   **Tema Claro/Escuro Persistente:** Seletor interativo AM/PM (Dia/Noite) flutuante com persistência de escolha do usuário no `localStorage` do navegador.
*   **Segurança de Tipos (Null Safety):** Tratamento rigoroso de objetos nulos com Type Guards no front-end, blindando a aplicação contra falhas catastróficas de execução (como *Cannot read properties of null*).
*   **Feedback de Digitação:** Mãozinha animada em CSS puro (`:focus-within`) que simula digitação na tela sempre que o usuário interage com um campo de formulário.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

### Camada de Front-end (Client):
*   **HTML5 Semântico:** Estruturação lógica e acessível.
*   **CSS3 Moderno:** Layout responsivo, animações deslizantes interativas, estilização avançada de campos datetime nativos e efeito de vidro fosco (Glassmorphic Card).
*   **TypeScript (ESNext):** Manipulação segura do DOM, tipagem forte e chamadas assíncronas.

### Camada de Back-end (Server):
*   **Node.js:** Plataforma de execução do servidor.
*   **Express.js:** Framework para roteamento e gerenciamento HTTP.
*   **TypeScript (CommonJS):** Definição estrita das estruturas de dados e tipagem dos contratos de API.

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado em sua máquina. Siga os passos no terminal para subir a aplicação localmente:

### 1. Inicializar o Back-end (Servidor)

Abra um terminal, navegue até a pasta do servidor e instale as dependências:
```bash
cd server
npm install
```
Para rodar o servidor em modo de desenvolvimento (com reinicialização automática via nodemon):
```bash
npm run dev
```
O servidor iniciará com sucesso no endereço: `http://localhost:3000`.

### 2. Configurar o Front-end (Cliente)

Abra um segundo terminal, navegue até a pasta do cliente e instale o compilador TypeScript:
```bash
cd client
npm install
```
Para compilar os arquivos TypeScript (.ts) para JavaScript (.js) nativo que o navegador consome:
```bash
npx tsc
```
### 3. Abrir a Aplicação no Navegador

Como configuramos o servidor Express de forma avançada para servir os arquivos do cliente estaticamente, você não precisa de extensões externas (como Live Server) para rodar o projeto.
Basta abrir o seu navegador de preferência e acessar a URL oficial:
👉 `http://localhost:3000`
