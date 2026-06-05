import { Request, Response } from "express";
import { CreateEraService } from "../../services/era/CreateEraService";

class CreateEraController {

  async handle(req: Request, res: Response) {

    // 📦 dados enviados pelo frontend
    const {
      name,
      description,
      image
    } = req.body;

    // ⚙️ instancia o service responsável
    // por criar uma nova era
    const service = new CreateEraService();

    // 🌍 cria era no banco
    const era = await service.execute({

      // nome da era
      // Ex: Mesozoico
      name,

      // descrição da era
      description,

      // imagem da era
      image

    });

    // 📤 retorna era criada
    return res.json(era);
  }
}

export { CreateEraController };