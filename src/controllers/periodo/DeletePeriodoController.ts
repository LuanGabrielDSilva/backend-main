import { Request, Response } from "express";
import prisma from "../../prisma";

class DeletePeriodoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const periodoExists = await prisma.periodo.findUnique({
      where: { id },
      include: { animals: true }
    });

    if (!periodoExists) {
      return res.status(404).json({
        error: "Período não encontrado"
      });
    }

    // 🔥 PROTEÇÃO
    if (periodoExists.animals.length > 0) {
      return res.status(400).json({
        error: "Não é possível deletar um período com animais"
      });
    }

    await prisma.periodo.delete({
      where: { id }
    });

    return res.json({
      message: "Período deletado com sucesso"
    });
  }
}

export { DeletePeriodoController };