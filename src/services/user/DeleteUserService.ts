import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(id: string) {

    if (!id) {
      throw new Error("ID inválido");
    }

    await prismaClient.user.delete({
      where: {
        id
      }
    });

    return { message: "Usuário deletado com sucesso" };
  }
}

export { DeleteUserService };