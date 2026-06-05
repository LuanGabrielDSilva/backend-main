import { Request, Response } from "express";
import { DeleteAnimalService } from "../../services/animal/DeleteAnimalService";

class DeleteAnimalController {

  // Controller responsável por deletar um animal
  async handle(req: Request, res: Response) {

    // Pega o ID enviado pela rota
    // Exemplo: /animals/123
    const { id } = req.params;

    // Instancia o service que contém
    // a lógica de remoção do animal
    const service = new DeleteAnimalService();

    // Executa a exclusão do animal
    const result = await service.execute(id);

    // Retorna o resultado em JSON
    return res.json(result);
  }
}

export { DeleteAnimalController };