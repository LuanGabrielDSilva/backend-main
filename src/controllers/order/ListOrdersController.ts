import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const isAdmin = user.role === "admin";

    const orders = await prismaClient.order.findMany({
      where: isAdmin ? {} : { userId: user.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return res.json(orders);
  }
}