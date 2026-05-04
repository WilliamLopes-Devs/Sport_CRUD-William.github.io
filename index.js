const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando 🚀" })
})



app.post("/alunos", async (req, res) => {
  const { nome, dataNascimento, modalidadeId } = req.body

  if (!nome || nome.trim() === "") {
    return res.status(400).json({
      erro: "O campo nome é obrigatório."
    })
  }

  try {
    const aluno = await prisma.aluno.create({
      data: {
        nome: nome.trim(),
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        modalidadeId: Number(modalidadeId)
      }
    })

    res.json(aluno)

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao cadastrar aluno" })
  }
})


app.get("/alunos", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      include: {
        modalidade: true
      }
    })

    res.json(alunos)

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao buscar alunos" })
  }
})


app.put("/alunos/:id", async (req, res) => {
  const { id } = req.params
  const { nome, dataNascimento, modalidadeId } = req.body

  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: {
        nome,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        modalidadeId: Number(modalidadeId)
      }
    })

    res.json(alunoAtualizado)

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao atualizar aluno" })
  }
})


app.delete("/alunos/:id", async (req, res) => {
  const { id } = req.params

  try {
    await prisma.aluno.delete({
      where: { id: Number(id) }
    })

    res.json({ mensagem: "Aluno deletado com sucesso" })

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao deletar aluno" })
  }
})



app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando em http://localhost:3000 🚀")
})