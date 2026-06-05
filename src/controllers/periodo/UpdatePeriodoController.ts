import { Request, Response } from "express";
import prisma from "../../prisma";

class UpdatePeriodoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, image, eraId } = req.body;

    const periodo = await prisma.periodo.update({
      where: { id },
      data: {
        name,
        description,
        image,
        eraId
      }
    });

    return res.json(periodo);
  }
}

export { UpdatePeriodoController };