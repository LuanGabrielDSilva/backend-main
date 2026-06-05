import { Request, Response } from "express";
import prismaClient from "../../prisma";

class ListCommentsController {

  async handle(req: Request, res: Response) {

    // 🆔 pega o ID do produto pela URL
    const productId = req.params.id;

    // 💬 busca comentários do produto
    const comments = await prismaClient.comment.findMany({

      // 🔎 filtra comentários pelo produto
      where: {
        productId
      },

      // 👤 inclui dados do usuário
      // que fez o comentário
      include: {
        user: {
          select: {

            // apenas campos necessários
            id: true,
            name: true

          }
        }
      },

      // 📅 ordena pelos mais recentes
      orderBy: {
        created_at: "desc"
      }

    });

    // 📤 retorna comentários
    return res.json(comments);
  }
}

export { ListCommentsController };