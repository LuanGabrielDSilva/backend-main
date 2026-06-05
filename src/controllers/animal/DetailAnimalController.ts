import { Request, Response } from "express";
import { DetailAnimalService } from "../../services/animal/DetailAnimalService";

class DetailAnimalController {

  // Controller responsável por buscar
  // os detalhes de um animal específico
  async handle(req: Request, res: Response) {

    // Pega o ID enviado pela rota
    // Exemplo: /animals/123
    const id = req.params.id;

    // Instancia o service que contém
    // a lógica de busca do animal
    const service = new DetailAnimalService();

    // Executa a busca do animal no banco
    const animal = await service.execute(id);

    // Retorna os dados do animal em JSON
    return res.json(animal);
  }
}

export { DetailAnimalController };