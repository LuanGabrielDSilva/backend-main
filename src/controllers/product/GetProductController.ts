import { Request, Response } from "express";
import prismaClient from "../../prisma";

class GetProductController {

  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontrado"
      });
    }

    return res.json(product);
  }
}

export { GetProductController };