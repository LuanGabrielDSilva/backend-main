import { Request, Response } from "express";
import prismaClient from "../../prisma";

class CreateCommentController {

  async handle(req: Request, res: Response) {

    // 🆔 pega o ID do produto pela URL
    // Ex: /products/123/comments
    const { id } = req.params;

    // 💬 dados enviados pelo frontend
    const {
      text,
      rating
    } = req.body;

    // 👤 usuário autenticado
    // vindo do middleware JWT/auth
    const userId = req.user.id;

    // 🧠 cria comentário no banco
    const comment = await prismaClient.comment.create({

      data: {

        // texto do comentário
        text,

        // nota/avaliação
        rating,

        // produto relacionado
        productId: id,

        // usuário que comentou
        userId

      }

    });

    // 📤 retorna comentário criado
    return res.json(comment);

  }

}

export { CreateCommentController };