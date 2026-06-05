import { Request, Response } from "express";
import { ForgotPasswordService } from "../../services/auth/ForgotPasswordService";

class ForgotPasswordController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    const service =
      new ForgotPasswordService();

    const result =
      await service.execute(email);

    return res.json(result);
  }
}

export { ForgotPasswordController };