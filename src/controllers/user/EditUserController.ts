import { Request, Response } from "express";
import { EditUserService } from "../../services/EditUserService";

class EditUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, password } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID do usuário é obrigatório." });
    }

    const service = new EditUserService();

    try {
      const user = await service.execute({
        id,
        name,
        password
      });

      return res.json({
        message: "Perfil atualizado com sucesso!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error: any) {
      return res.status(400).json({ 
        message: error.message || "Erro ao atualizar perfil." 
      });
    }
  }
}

export { EditUserController };