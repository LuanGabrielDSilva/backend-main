import { Request, Response } from "express";
import prismaClient from "../../prisma";

class ListAllCommentsController {
  async handle(req: Request, res: Response) {
    try {
      const comments = await prismaClient.comment.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            }
          },
          product: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        orderBy: {
          created_at: "desc"
        }
      });

      return res.json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao carregar comentários" });
    }
  }
}

export { ListAllCommentsController };