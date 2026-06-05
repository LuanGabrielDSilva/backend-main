import { Request, Response } from "express";
import { ListAnimalService } from "../../services/animal/ListAnimalService";

class ListAnimalController {

  // Controller responsável por listar
  // todos os animais cadastrados
  async handle(req: Request, res: Response) {

    // Instancia o service que contém
    // a lógica da listagem
    const service = new ListAnimalService();

    // Busca todos os animais no banco
    const animals = await service.execute();

    // Retorna os animais em JSON
    return res.json(animals);

    // ⚠️ Este console.log nunca será executado,
    // pois o código já retornou acima
    console.log(req.body.preyIds);
  }
}

export { ListAnimalController };