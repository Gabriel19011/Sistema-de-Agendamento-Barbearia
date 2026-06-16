import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

// Serve os arquivos do frontend de forma estática na rota "/"
app.use(express.static(path.join(__dirname, '../client')));

interface Agendamento {
  id: string;
  nome: string;
  horario: string;
  corte: string;
}

// Banco de dados em memória temporário
let agendamentos: Agendamento[] = [];
let proximoId = 1;

// 1. ROTA GET - Listar todos os agendamentos
app.get('/agendamentos', (req: Request, res: Response) => {
  res.json(agendamentos);
});

// 2. ROTA POST - Criar um novo agendamento
app.post('/agendamentos', (req: Request, res: Response) => {
  const { nome, horario, corte } = req.body;

  if (!nome || !horario || !corte) {
    res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    return;
  }

  const novoAgendamento: Agendamento = {
    id: String(proximoId++),
    nome,
    horario,
    corte
  };

  agendamentos.push(novoAgendamento);
  res.status(201).json(novoAgendamento);
});

// 3. ROTA PUT - Atualizar um agendamento existente
app.put('/agendamentos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, horario, corte } = req.body;

  const index = agendamentos.findIndex(a => a.id === id);

  if (index === -1) {
    res.status(404).json({ erro: "Agendamento não encontrado." });
    return;
  }

  agendamentos[index] = {
    ...agendamentos[index],
    nome: nome || agendamentos[index].nome,
    horario: horario || agendamentos[index].horario,
    corte: corte || agendamentos[index].corte
  };

  res.json(agendamentos[index]);
});

// 4. ROTA DELETE - Deletar um agendamento existente
app.delete('/agendamentos/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const index = agendamentos.findIndex(a => a.id === id);

  if (index === -1) {
    res.status(404).json({ erro: "Agendamento não encontrado." });
    return;
  }

  // Remove o elemento do array em memória
  agendamentos.splice(index, 1);
  res.status(200).json({ mensagem: "Agendamento removido com sucesso." });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});