import { Request, Response } from "express";
import { ListAnimalByEraService } from "../../services/animal/ListAnimalByEraService";

class ListAnimalByEraIdController {

  // Controller responsável por listar
  // todos os animais de uma era específica
  async handle(req: Request, res: Response) {

    // Pega o ID da era enviado pela rota
    // Exemplo: /eras/:eraId/animals
    const eraId = req.params.eraId;

    // Instancia o service com a lógica
    // de busca dos animais da era
    const service = new ListAnimalByEraService();

    // Executa a busca no banco
    const animals = await service.execute(eraId);

    // Retorna a lista de animais em JSON
    return res.json(animals);
  }
}

export { ListAnimalByEraIdController };