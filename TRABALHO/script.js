const form = document.getElementById("formCadastro");
let idEdicao = localStorage.getItem("editando_id");

async function inicializarPagina() {
    if (idEdicao) {
        try {
            const resposta = await fetch(`http://20.20.0.219:3000/alunos`);
            const alunos = await resposta.json();
            const aluno = alunos.find(a => a.id == idEdicao);

            if (aluno) {
                document.querySelector("h1").innerText = "Editar Aluno";
                document.querySelector("button[type='submit']").innerText = "Salvar Alterações";
                
                document.getElementById("nome").value = aluno.nome;
                document.getElementById("modalidade").value = aluno.modalidadeId;
                if (aluno.dataNascimento) {
                    document.getElementById("datanascimento").value = aluno.dataNascimento.split('T')[0];
                }
            } else {
                localStorage.removeItem("editando_id");
                idEdicao = null;
            }
        } catch (erro) {
            console.error("Erro ao carregar dados:", erro);
        }
    }
}

inicializarPagina();

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        modalidadeId: Number(document.getElementById("modalidade").value),
        dataNascimento: document.getElementById("datanascimento").value
    };

    const url = idEdicao 
        ? `http://20.20.0.219:3000/alunos/${idEdicao}` 
        : `http://20.20.0.219:3000/alunos`;
    
    const metodo = idEdicao ? "PUT" : "POST";

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert(idEdicao ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
            
            if (idEdicao) {
                localStorage.removeItem("editando_id");
                idEdicao = null;
                document.querySelector("h1").innerText = "Cadastrar Aluno";
                document.querySelector("button[type='submit']").innerText = "Cadastrar";
            }

            form.reset(); 

            
        } else {
            const erroServidor = await resposta.json();
            alert("Erro ao salvar: " + (erroServidor.erro || "Verifique os dados"));
        }
    } catch (erro) {
        alert("Erro de conexão com o servidor.");
    }
});