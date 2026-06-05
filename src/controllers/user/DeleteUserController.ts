import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteUserService();

    const result = await service.execute(id);

    return res.json({ teste: "DELETE FUNCIONANDO" });
  }
}

export { DeleteUserController };