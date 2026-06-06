import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class ListAllOrdersController {
  async handle(req: Request, res: Response) {
    try {
      const userRole = (req as any).userRole;

      if (userRole !== "admin") {
        return res.status(403).json({ error: "Acesso negado" });
      }

      const orders = await prismaClient.order.findMany({
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
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  price: true
                }
              }
            }
          }
        },
        orderBy: {
          created_at: "desc"
        }
      });

      return res.json(orders);
    } catch (error) {
      console.error("Erro ao listar todos pedidos:", error);
      return res.status(500).json({
        error: "Erro ao buscar pedidos"
      });
    }
  }
}