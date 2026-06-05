import { Request, Response } from "express";
import prisma from "../../prisma";

class ListPeriodoController {
  async handle(req: Request, res: Response) {
    const periodos = await prisma.periodo.findMany({
      include: {
        era: true  
      }
    });

    return res.json(periodos);
  }
}

export { ListPeriodoController };