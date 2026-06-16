"use strict";
const URL_API_APP = "http://localhost:3000/agendamentos";
const lista = document.querySelector(".lista-agendamentos");
async function carregarAgendamentos() {
    try {
        const resposta = await fetch(URL_API_APP);
        const dados = await resposta.json();
        lista.innerHTML = "";
        dados.forEach((agendamento) => {
            const item = document.createElement("li");
            item.className = "item-agendamento";
            // Garantimos que o horário seja tratado caso esteja vazio
            const horarioFormatado = (agendamento.horario || "").replace("T", " às ");
            // Exibimos o ID para que o usuário saiba qual usar no alterar.html
            item.innerHTML = `
                <div class="info-cliente">
                    <h3>ID: ${agendamento.id} - ${agendamento.nome}</h3>
                    <p><strong>Serviço:</strong> ${agendamento.corte}</p>
                </div>
                <div class="hora-agendamento">
                    ${horarioFormatado}
                </div>
            `;
            lista.appendChild(item);
        });
    }
    catch (erro) {
        console.error("Erro ao carregar agendamentos:", erro);
        lista.innerHTML = "<p style='color: white; text-align: center;'>Erro ao carregar agendamentos.</p>";
    }
}
carregarAgendamentos();
const URL_API_ALTERAR = "http://localhost:3000/agendamentos";
const formAlterar = document.getElementById("formAlterar");
const idInput = document.getElementById("id");
const nomeInput = document.getElementById("nome");
const horarioInput = document.getElementById("horario");
const corteInput = document.getElementById("corte");
const btnDeletar = document.getElementById("btnDeletar");
if (idInput)
    idInput.placeholder = "Digite o ID do agendamento";
if (nomeInput)
    nomeInput.placeholder = "Nome do cliente";
if (corteInput)
    corteInput.placeholder = "Tipo de serviço / corte";
// Busca os dados antigos do agendamento assim que o usuário digita o ID e sai do campo (evento blur)
if (idInput && nomeInput && horarioInput && corteInput) {
    idInput.addEventListener("blur", async () => {
        const id = idInput.value.trim();
        if (!id)
            return;
        try {
            const resposta = await fetch(URL_API_ALTERAR);
            if (resposta.ok) {
                const agendamentos = await resposta.json();
                const agendamento = agendamentos.find(a => String(a.id) === id);
                if (agendamento) {
                    nomeInput.value = agendamento.nome;
                    horarioInput.value = agendamento.horario;
                    corteInput.value = agendamento.corte;
                }
                else {
                    alert("Nenhum agendamento com este ID foi encontrado.");
                    nomeInput.value = "";
                    horarioInput.value = "";
                    corteInput.value = "";
                }
            }
        }
        catch (erro) {
            console.error("Erro ao carregar agendamento:", erro);
        }
    });
}
// AÇÃO 1: Atualizar (Submit do formulário)
if (formAlterar && idInput && nomeInput && horarioInput && corteInput) {
    formAlterar.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const id = idInput.value.trim();
        const nome = nomeInput.value;
        const horario = horarioInput.value;
        const corte = corteInput.value;
        if (!id) {
            alert("Por favor, informe o ID do agendamento que deseja alterar.");
            return;
        }
        try {
            const resposta = await fetch(`${URL_API_ALTERAR}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, horario, corte })
            });
            if (resposta.ok) {
                alert("Agendamento atualizado com sucesso!");
                formAlterar.reset();
                window.location.href = "index.html";
            }
            else {
                alert("Erro ao atualizar o agendamento no servidor.");
            }
        }
        catch (erro) {
            console.error(erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
}
// AÇÃO 2: Deletar (Clique no botão Deletar)
if (btnDeletar && idInput && formAlterar) {
    btnDeletar.addEventListener("click", async () => {
        const id = idInput.value.trim();
        if (!id) {
            alert("Por favor, informe o ID do agendamento que deseja deletar.");
            return;
        }
        const confirmou = confirm("Tem certeza de que deseja remover este agendamento permanentemente?");
        if (!confirmou)
            return;
        try {
            const resposta = await fetch(`${URL_API_ALTERAR}/${id}`, {
                method: "DELETE"
            });
            if (resposta.ok) {
                alert("Agendamento excluído com sucesso!");
                formAlterar.reset();
                window.location.href = "index.html";
            }
            else {
                alert("Erro ao deletar o agendamento no servidor.");
            }
        }
        catch (erro) {
            console.error("Erro ao deletar agendamento:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
}
const URL_API_ADICIONAR = "http://localhost:3000/agendamentos";
const formCadastro = document.getElementById("formCadastro");
formCadastro.addEventListener("submit", async (evento) => {
    // Impede o formulário de recarregar a página
    evento.preventDefault();
    const nome = document.getElementById("nome").value;
    const horario = document.getElementById("horario").value;
    const corte = document.getElementById("corte").value;
    try {
        const resposta = await fetch(URL_API_ADICIONAR, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                horario,
                corte
            })
        });
        if (resposta.status === 201) {
            alert("Agendamento criado com sucesso!");
            formCadastro.reset();
            // Redireciona o utilizador de volta para a lista
            window.location.href = "index.html";
        }
        else {
            alert("Erro ao cadastrar. Verifique o servidor.");
        }
    }
    catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
});
