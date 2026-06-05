import { Request, Response } from "express";
import prismaClient from "../../prisma";

class ListAnimalsRandBySize {

  // Controller responsável por listar
  // animais aleatórios com filtro opcional de tamanho
  async handle(req: Request, res: Response) {

    try {

      // Pega o tamanho vindo da query
      // Exemplo:
      // /animals/random?size=Grande
      const size =
        req.query.size as string | undefined;

      // Busca os animais no banco
      // Se existir "size", filtra
      // Se não existir, busca todos
      const animals =
        await prismaClient.animal.findMany({
          where: size
            ? { size }
            : undefined,
        });

      // Embaralha os animais aleatoriamente
      const shuffled =
        animals.sort(() => Math.random() - 0.5);

      // Retorna os animais embaralhados
      return res.json(shuffled);

    } catch (error: any) {

      // Retorna erro caso algo falhe
      return res.status(500).json({
        error: error.message,
      });

    }
  }
}

export { ListAnimalsRandBySize };