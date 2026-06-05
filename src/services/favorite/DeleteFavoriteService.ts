import prismaClient from "../../prisma";

interface DeleteRequest {
  userId: string;
  animalId: string;
}

class DeleteFavoriteService {

  async execute({
    userId,
    animalId
  }: DeleteRequest) {

    await prismaClient.favorite.deleteMany({
      where: {
        userId,
        animalId
      }
    });

    return {
      message: "Favorito removido"
    };
  }
}

export { DeleteFavoriteService };