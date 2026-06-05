import prismaClient from "../../prisma";

class DeleteAnimalService {
  async execute(id: string) {

    if (!id) {
      throw new Error("ID inválido");
    }

    await prismaClient.animal.delete({
      where: { id }
    });

    return {
      message: "Animal deletado com sucesso 🦖"
    };
  }
}

export { DeleteAnimalService };