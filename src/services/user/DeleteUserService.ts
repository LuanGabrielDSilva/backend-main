import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(id: string) {
    if (!id) {
      throw new Error("ID inválido");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.role === "admin") {
      throw new Error("Administradores não podem ser excluídos");
    }

    await prismaClient.user.delete({
      where: {
        id,
      },
    });

    return {
      message: "Usuário deletado com sucesso",
    };
  }
}

export { DeleteUserService };