import { Request, Response } from "express";
import { prisma } from "../../database/prisma";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const products = await prisma.product.findMany();

    return res.json(products);
  }
}