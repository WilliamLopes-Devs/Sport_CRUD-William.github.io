window.onload = function() {
    listarAlunos();
};

async function listarAlunos() {
    const tabela = document.getElementById("tabela");

    try {
        const resposta = await fetch("http://20.20.0.219:3000/alunos");
        
        if (!resposta.ok) {
            throw new Error("Não foi possível buscar os dados do servidor.");
        }

        const alunos = await resposta.json();

        tabela.innerHTML = "";

        if (alunos.length === 0) {
            return;
        }

        alunos.forEach(aluno => {
            const linha = document.createElement("div");
            linha.classList.add("row"); 

    let dataFormatada = "Não informada";
    if (aluno.dataNascimento) {
        const data = new Date(aluno.dataNascimento);
        dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }

            linha.innerHTML = `
                <span>${aluno.nome}</span>
                <span>${dataFormatada}</span>
                <span>${aluno.modalidade ? aluno.modalidade.nome : "ID: " + aluno.modalidadeId}</span>
                <span>
                    <button class="btn-edit" onclick="editarAluno(${aluno.id}, '${aluno.nome}')">Editar</button>
                    <button class="btn-delete" onclick="deletarAluno(${aluno.id})">Deletar</button>
                </span>
            `;
            
            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao listar:", erro);
        tabela.innerHTML = '<div class="row"><span style="color: red;">Erro ao conectar com o servidor.</span></div>';
    }
}

async function deletarAluno(id) {
    try {
        const resposta = await fetch(`http://20.20.0.219:3000/alunos/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Aluno removido com sucesso!");
            listarAlunos(); 
        } else {
            alert("Erro ao deletar aluno.");
        }
    } catch (erro) {
        console.error("Erro:", erro);
    }
}
function editarAluno(id) {
    localStorage.setItem("editando_id", id);
    window.location.href = "crud.html";
}
