import { Request, Response } from "express";
import prismaClient from "../../prisma";

class DeleteCommentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID do comentário é obrigatório" });
    }

    try {
      // Verifica se existe
      const comment = await prismaClient.comment.findUnique({
        where: { id }
      });

      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }

      // Deleta
      await prismaClient.comment.delete({
        where: { id }
      });

      return res.json({ 
        success: true, 
        message: "Comentário deletado com sucesso!" 
      });

    } catch (error: any) {
      console.error("Erro ao deletar comentário:", error);
      return res.status(500).json({ error: "Erro interno ao deletar comentário" });
    }
  }
}

export { DeleteCommentController };