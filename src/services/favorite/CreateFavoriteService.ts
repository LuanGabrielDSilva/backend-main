import prismaClient from "../../prisma";

interface FavoriteRequest {
  userId: string;
  animalId: string;
}

class CreateFavoriteService {

  async execute({
    userId,
    animalId
  }: FavoriteRequest) {

    const alreadyExists =
      await prismaClient.favorite.findFirst({
        where: {
          userId,
          animalId
        }
      });

    if (alreadyExists) {
      throw new Error("Animal já favoritado");
    }

    const favorite =
      await prismaClient.favorite.create({
        data: {
          userId,
          animalId
        }
      });

    return favorite;
  }
}

export { CreateFavoriteService };