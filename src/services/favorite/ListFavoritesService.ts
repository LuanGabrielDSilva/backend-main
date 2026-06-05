import prismaClient from "../../prisma";

class ListFavoritesService {

  async execute(userId: string) {

    const favorites =
      await prismaClient.favorite.findMany({
        where: {
          userId
        },

        include: {
          animal: true
        }
      });

    return favorites;
  }
}

export { ListFavoritesService };