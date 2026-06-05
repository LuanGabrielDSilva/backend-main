import { Request, Response } from "express";
import prismaClient from "../../prisma";

export async function listExpeditions(req: Request, res: Response) {

  try {

    // 👤 pega ID do usuário autenticado
    // vindo do middleware JWT/auth
    const userId = (req as any).userId;

    // 🧭 busca expedições do usuário
    const expeditions = await prismaClient.expedition.findMany({

      // 🔎 filtra apenas expedições
      // do usuário logado
      where: {
        userId
      },

      // 📦 inclui produtos ligados
      // à expedição
      include: {
        products: true
      },

      // 📅 ordena das mais recentes
      // para as mais antigas
      orderBy: {
        createdAt: "desc"
      }

    });

    // 🧠 mostra no terminal
    // para debug/desenvolvimento
    console.log(
      JSON.stringify(expeditions, null, 2)
    );

    // 📤 retorna expedições
    return res.json(expeditions);

  } catch (error) {

    // ❌ mostra erro no terminal
    console.error(error);

    // 🚨 retorna erro ao frontend
    return res.status(500).json({
      error: "Erro ao buscar expedições"
    });

  }
}