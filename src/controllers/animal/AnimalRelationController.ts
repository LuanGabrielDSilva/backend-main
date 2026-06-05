import { Request, Response } from "express";

/* =========================================================
   SERVICES
========================================================= */

// 🔥 Service responsável por criar relação:
// predador -> presa
import { CreatepredatorRelationService }
from "../../services/animalRelation/CreateAnimalRelationService";

// 🔥 Service responsável por buscar
// cadeia alimentar do animal
import { GetAnimalFoodChainService }
from "../../services/animalRelation/GetAnimalFoodChainService";

// 🔥 Service responsável por remover
// relação entre animais
import { DeleteAnimalRelationService }
from "../../services/animalRelation/DeleteAnimalRelationService";

/* =========================================================
   CONTROLLER
========================================================= */

class AnimalRelationController {

  /* =========================================================
     🦖 CREATE RELATION
     Cria relação predador/presa
  ========================================================= */

  async create(req: Request, res: Response) {

    // 🔥 Dados vindos do frontend
    const {
      predatorId,
      preyId,
    } = req.body;

    // 🔥 Instancia o service
    const service =
      new CreatepredatorRelationService();

    // 🔥 Executa criação da relação
    const relation =
      await service.execute({
        predatorId,
        preyId,
      });

    // 🔥 Retorna relação criada
    return res.json(relation);
  }

  /* =========================================================
     🍖 SHOW FOOD CHAIN
     Busca cadeia alimentar do animal
  ========================================================= */

  async show(req: Request, res: Response) {

    // 🔥 ID do animal vindo da URL
    const { animalId } = req.params;

    // 🔥 Instancia service
    const service =
      new GetAnimalFoodChainService();

    // 🔥 Busca informações:
    // quem ele caça
    // quem caça ele
    const result =
      await service.execute(animalId);

    // 🔥 Retorna resultado
    return res.json(result);
  }

  /* =========================================================
     ❌ DELETE RELATION
     Remove relação alimentar
  ========================================================= */

  async delete(req: Request, res: Response) {

    // 🔥 ID da relação
    const { id } = req.params;

    // 🔥 Instancia service
    const service =
      new DeleteAnimalRelationService();

    // 🔥 Remove relação do banco
    const result =
      await service.execute(id);

    // 🔥 Retorna confirmação
    return res.json(result);
  }
}

/* =========================================================
   EXPORT
========================================================= */

export { AnimalRelationController };