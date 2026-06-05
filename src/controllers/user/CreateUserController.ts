import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required"
      });
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      role
    });

    return res.status(201).json(user);
  }
}

export { CreateUserController };