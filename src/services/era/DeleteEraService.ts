import prismaClient from "../../prisma";

class DeleteEraService {
  async execute(id: string) {

    if (!id) {
      throw new Error("ID inválido");
    }

    await prismaClient.era.delete({
      where: {
        id
      }
    });

    return { message: "Era deletada com sucesso" };
  }
}

export { DeleteEraService };