import { hash } from "bcryptjs";
import prismaClient from "../database/prisma";   // ← Caminho corrigido

interface EditUserRequest {
  id: string;
  name?: string;
  password?: string;
}

class EditUserService {
  async execute({ id, name, password }: EditUserRequest) {
    const userExists = await prismaClient.user.findFirst({
      where: { id }
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }

    let hashedPassword = undefined;

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres.");
      }
      hashedPassword = await hash(password, 8);
    }

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        name: name?.trim() || userExists.name,
        ...(hashedPassword && { password: hashedPassword })
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    return updatedUser;
  }
}

export { EditUserService };