import express from "express";
import { PrismaClient } from "@prisma/client";

class App {
  constructor() {
    this.prisma = new PrismaClient();
    this.app = express();
    this.app.use(express.json());
    this.routes();
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.json({ mensagem: "API funcionando 🚀" });
    });

    // Added 'async' back and properly closed all brackets
    this.app.post("/alunos", async (req, res) => {
      try {
        const { nome, dataNascimento, modalidadeId } = req.body;
        console.log(req.body);

        // Example logic with Prisma
        const novoAluno = await this.prisma.aluno.create({
          data: {
            nome,
            dataNascimento: new Date(dataNascimento),
            modalidadeId,
          },
        });

        return res.status(201).json(novoAluno);
      } catch (error) {
        console.error("Erro ao criar aluno:", error);   
        return res.status(400).json({ erro: error.message });
      }
    }); // <-- This closing bracket was missing
  }
}

export default new App().app;