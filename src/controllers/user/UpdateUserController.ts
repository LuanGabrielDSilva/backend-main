import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {

  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const { name, password } = req.body;

    const service = new UpdateUserService();

    const user = await service.execute({
      id,
      name,
      password
    });

    return res.json(user);

  }

}

export { UpdateUserController };