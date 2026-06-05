import { Request, Response } from "express";
import { DeleteEraService } from "../../services/era/DeleteEraService";

class DeleteEraController {

  async handle(req: Request, res: Response) {

    // 🆔 pega o ID da era pela URL
    // Ex: /eras/123
    const { id } = req.params;

    // ⚙️ instancia o service responsável
    // por remover a era
    const service = new DeleteEraService();

    // 🗑️ executa exclusão da era
    const result = await service.execute(id);

    // 📤 retorna resultado da operação
    return res.json(result);
  }
}

export { DeleteEraController };