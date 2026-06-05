import { Request, Response } from "express";
import prismaClient from "../../prisma";

export class ListOrdersController {

  async handle(req: Request, res: Response) {

    // 📦 busca todos os pedidos no banco
    const orders = await prismaClient.order.findMany({

      // 🔗 inclui dados do usuário e itens do pedido
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      },

      // 📅 ordena do mais recente para o mais antigo
      orderBy: {
        created_at: "desc"
      }

    });

    // 📤 retorna lista de pedidos completos
    return res.json(orders);
  }
}