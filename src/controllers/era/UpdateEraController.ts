import { Request, Response } from "express";
import { UpdateEraService } from "../../services/era/UpdateEraService";

class UpdateEraController {

  async handle(req: Request, res: Response) {

    // 🆔 pega ID da era pela URL
    const { id } = req.params;

    // 📦 dados enviados pelo frontend
    const {
      name,
      description,
      image
    } = req.body;

    // ⚙️ instancia o service responsável
    // por atualizar a era
    const service = new UpdateEraService();

    // 🌍 atualiza dados da era
    const era = await service.execute({

      // ID da era
      id,

      // novo nome
      name,

      // nova descrição
      description,

      // nova imagem
      image

    });

    // 📤 retorna era atualizada
    return res.json(era);
  }
}

export { UpdateEraController };