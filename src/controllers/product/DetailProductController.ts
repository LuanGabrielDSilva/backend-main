import { Request, Response } from "express";
import prismaClient from "../../prisma";

class DetailProductController {

  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const product =
      await prismaClient.product.findUnique({
        where: {
          id
        }
      });

    return res.json(product);
  }

}

export { DetailProductController };